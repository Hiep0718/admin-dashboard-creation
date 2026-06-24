import { createHash } from 'node:crypto';

export const MQTT_TOPICS = [
  'robot/battery/status',
  'robot/battery/soc',
  'robot/powerswitch/event',
  'robot/pi/shutdown_ack',
  'robot/state/service_feedback',
  'robot/state/state',
  'robot/state/pose',
];

const HEARTBEAT_TOPICS = new Set([
  'robot/battery/status',
  'robot/battery/soc',
  'robot/state/state',
  'robot/state/pose',
]);

const SERVICE_CRITICAL_STATUSES = new Set([
  'FAILED',
  'REJECTED',
  'DOCK_FAILED',
  'PREEMPTED_BY_DOCK',
]);

const POWER_EVENT_ALERTS = {
  shutdown_request: {
    severity: 'critical',
    title: 'Graceful shutdown requested',
  },
  power_off: {
    severity: 'critical',
    title: 'Robot power was cut',
  },
  force_off: {
    severity: 'critical',
    title: 'Force-off command received',
  },
  soc_low: {
    severity: 'warning',
    title: 'Battery low power event',
  },
  soc_critical: {
    severity: 'critical',
    title: 'Battery critical power event',
  },
};

const DEFAULTS = {
  robotId: 'NOVA-X1',
  offlineAfterMs: 30000,
  repeatCooldownMs: 300000,
  batteryLowSoc: 20,
  batteryCriticalSoc: 10,
};

export class AlertRuleEngine {
  constructor(options = {}) {
    this.robotId = options.robotId ?? DEFAULTS.robotId;
    this.offlineAfterMs = options.offlineAfterMs ?? DEFAULTS.offlineAfterMs;
    this.repeatCooldownMs = options.repeatCooldownMs ?? DEFAULTS.repeatCooldownMs;
    this.batteryLowSoc = options.batteryLowSoc ?? DEFAULTS.batteryLowSoc;
    this.batteryCriticalSoc = options.batteryCriticalSoc ?? DEFAULTS.batteryCriticalSoc;

    const initialNow = options.initialNow ?? Date.now();
    this.startedAt = initialNow;
    this.lastHeartbeatAt = null;
    this.activeAlerts = new Map();
    this.alertsByKey = new Map();
    this.hasSeenMqttState = false;

    this.snapshot = {
      robotId: this.robotId,
      mqttConnected: false,
      batterySoc: null,
      batteryState: null,
      robotState: null,
      pose: null,
      lastTopic: null,
      lastPayload: null,
      lastMessageAt: null,
      activeCommandId: null,
    };
  }

  ingestMessage(topic, rawPayload, now = Date.now()) {
    const payload = parsePayload(rawPayload);
    const notifications = [];

    this.snapshot.lastTopic = topic;
    this.snapshot.lastPayload = summarizePayload(payload);
    this.snapshot.lastMessageAt = now;

    if (HEARTBEAT_TOPICS.has(topic)) {
      notifications.push(...this.recordHeartbeat(now, topic));
    }

    if (topic === 'robot/battery/status' || topic === 'robot/battery/soc') {
      notifications.push(...this.handleBattery(topic, payload, now));
    }

    if (topic === 'robot/powerswitch/event') {
      notifications.push(...this.handlePowerEvent(topic, payload, now));
    }

    if (topic === 'robot/state/service_feedback') {
      notifications.push(...this.handleServiceFeedback(topic, payload, now));
    }

    if (topic === 'robot/state/state') {
      this.snapshot.robotState = normalizeRobotState(payload);
      this.snapshot.activeCommandId = payload?.activeCommandId ?? this.snapshot.activeCommandId;
    }

    if (topic === 'robot/state/pose') {
      this.snapshot.pose = payload && typeof payload === 'object' ? payload : null;
    }

    return notifications;
  }

  setMqttConnected(isConnected, now = Date.now(), details = {}) {
    this.snapshot.mqttConnected = isConnected;

    if (isConnected) {
      const notifications = this.hasSeenMqttState
        ? this.resolveAlertByKey('mqtt-disconnected', now, {
            topic: 'mqtt',
            message: 'MQTT broker connection restored.',
            payload: details,
          })
        : [];

      this.hasSeenMqttState = true;
      return notifications;
    }

    this.hasSeenMqttState = true;
    return this.raiseAlert(
      {
        rule: 'mqtt-disconnected',
        key: 'mqtt-disconnected',
        severity: 'critical',
        title: 'MQTT broker disconnected',
        topic: 'mqtt',
        message: 'The alert worker lost connection to the MQTT broker.',
        payload: details,
      },
      now,
    );
  }

  checkTimers(now = Date.now()) {
    const lastKnownHeartbeat = this.lastHeartbeatAt ?? this.startedAt;
    const heartbeatAgeMs = now - lastKnownHeartbeat;

    if (heartbeatAgeMs > this.offlineAfterMs) {
      return this.raiseAlert(
        {
          rule: 'robot-offline',
          key: 'robot-offline',
          severity: 'critical',
          title: 'Robot heartbeat missing',
          topic: 'heartbeat',
          message: `No heartbeat topic received for ${formatDuration(heartbeatAgeMs)}.`,
          payload: {
            heartbeatAgeMs,
            offlineAfterMs: this.offlineAfterMs,
          },
        },
        now,
      );
    }

    return this.resolveAlertByKey('robot-offline', now, {
      topic: 'heartbeat',
      message: 'Robot heartbeat is back within the configured window.',
    });
  }

  ackAlert(alertId, now = Date.now()) {
    const alert = this.activeAlerts.get(alertId);

    if (!alert) {
      return null;
    }

    alert.acknowledgedAt = now;
    return cloneAlert(alert);
  }

  getActiveAlerts(options = {}) {
    const includeAcknowledged = options.includeAcknowledged ?? true;

    return [...this.activeAlerts.values()]
      .filter((alert) => includeAcknowledged || !alert.acknowledgedAt)
      .sort((a, b) => b.lastSeenAt - a.lastSeenAt)
      .map(cloneAlert);
  }

  getStatus(now = Date.now()) {
    const lastKnownHeartbeat = this.lastHeartbeatAt ?? this.startedAt;
    const activeAlerts = this.getActiveAlerts();
    const unacknowledgedAlerts = activeAlerts.filter((alert) => !alert.acknowledgedAt);

    return {
      ...this.snapshot,
      lastHeartbeatAt: this.lastHeartbeatAt,
      lastHeartbeatAgeMs: now - lastKnownHeartbeat,
      activeAlertCount: activeAlerts.length,
      unacknowledgedAlertCount: unacknowledgedAlerts.length,
    };
  }

  recordHeartbeat(now, topic) {
    this.lastHeartbeatAt = now;

    return this.resolveAlertByKey('robot-offline', now, {
      topic,
      message: 'Heartbeat received again.',
    });
  }

  handleBattery(topic, payload, now) {
    const soc = getBatterySoc(payload);

    if (!Number.isFinite(soc)) {
      return [];
    }

    this.snapshot.batterySoc = soc;
    if (payload && typeof payload === 'object') {
      this.snapshot.batteryState = payload.charging_state ?? this.snapshot.batteryState;
    }

    if (soc <= this.batteryCriticalSoc) {
      this.clearAlertByKey('battery-low');
      return this.raiseAlert(
        {
          rule: 'battery-critical',
          key: 'battery-critical',
          severity: 'critical',
          title: 'Robot battery critical',
          topic,
          message: `Battery is at ${soc}%.`,
          payload,
        },
        now,
      );
    }

    if (soc <= this.batteryLowSoc) {
      const notifications = this.resolveAlertByKey('battery-critical', now, {
        topic,
        message: `Battery recovered above critical threshold at ${soc}%.`,
        payload,
      });

      notifications.push(
        ...this.raiseAlert(
          {
            rule: 'battery-low',
            key: 'battery-low',
            severity: 'warning',
            title: 'Robot battery low',
            topic,
            message: `Battery is at ${soc}%.`,
            payload,
          },
          now,
        ),
      );

      return notifications;
    }

    return [
      ...this.resolveAlertByKey('battery-critical', now, {
        topic,
        message: `Battery recovered to ${soc}%.`,
        payload,
      }),
      ...this.resolveAlertByKey('battery-low', now, {
        topic,
        message: `Battery recovered to ${soc}%.`,
        payload,
      }),
    ];
  }

  handlePowerEvent(topic, payload, now) {
    const eventName = normalizePowerEvent(payload);
    const meta = POWER_EVENT_ALERTS[eventName];

    if (!meta) {
      return [];
    }

    return this.raiseAlert(
      {
        rule: 'power-event',
        key: `power-event:${eventName}`,
        severity: meta.severity,
        title: meta.title,
        topic,
        message: `Power event reported: ${eventName}.`,
        payload,
      },
      now,
    );
  }

  handleServiceFeedback(topic, payload, now) {
    if (!payload || typeof payload !== 'object') {
      return [];
    }

    const status = typeof payload.status === 'string' ? payload.status.toUpperCase() : '';
    const commandId = payload.command_id ?? payload.commandId ?? 'unknown';
    this.snapshot.activeCommandId = commandId;

    if (!SERVICE_CRITICAL_STATUSES.has(status)) {
      return [];
    }

    return this.raiseAlert(
      {
        rule: 'service-feedback',
        key: `service-feedback:${commandId}:${status}`,
        severity: 'critical',
        title: `Robot command ${status}`,
        topic,
        message: `Command ${commandId} returned ${status}.`,
        payload,
      },
      now,
    );
  }

  raiseAlert(input, now) {
    const key = input.key ?? input.rule;
    const existing = this.alertsByKey.get(key);

    if (existing) {
      existing.lastSeenAt = now;
      existing.topic = input.topic ?? existing.topic;
      existing.message = input.message ?? existing.message;
      existing.payloadSummary = summarizePayload(input.payload);

      if (existing.acknowledgedAt || now - existing.lastSentAt < this.repeatCooldownMs) {
        return [];
      }

      existing.lastSentAt = now;
      existing.repeatCount += 1;
      return [{ type: 'alert', alert: cloneAlert(existing) }];
    }

    const alert = {
      id: createAlertId(this.robotId, key),
      robotId: this.robotId,
      key,
      rule: input.rule,
      severity: input.severity,
      title: input.title,
      topic: input.topic ?? null,
      message: input.message ?? '',
      payloadSummary: summarizePayload(input.payload),
      firstSeenAt: now,
      lastSeenAt: now,
      lastSentAt: now,
      acknowledgedAt: null,
      repeatCount: 0,
    };

    this.activeAlerts.set(alert.id, alert);
    this.alertsByKey.set(key, alert);

    return [{ type: 'alert', alert: cloneAlert(alert) }];
  }

  resolveAlertByKey(key, now, details = {}) {
    const alert = this.alertsByKey.get(key);

    if (!alert) {
      return [];
    }

    this.activeAlerts.delete(alert.id);
    this.alertsByKey.delete(key);

    return [
      {
        type: 'recovery',
        alert: {
          ...cloneAlert(alert),
          resolvedAt: now,
          topic: details.topic ?? alert.topic,
          message: details.message ?? `${alert.title} recovered.`,
          payloadSummary: summarizePayload(details.payload ?? alert.payloadSummary),
        },
      },
    ];
  }

  clearAlertByKey(key) {
    const alert = this.alertsByKey.get(key);

    if (!alert) {
      return;
    }

    this.activeAlerts.delete(alert.id);
    this.alertsByKey.delete(key);
  }
}

export function parsePayload(rawPayload) {
  if (rawPayload === null || rawPayload === undefined) {
    return null;
  }

  const text = Buffer.isBuffer(rawPayload) ? rawPayload.toString('utf8') : String(rawPayload);
  const trimmed = text.trim();

  if (!trimmed || trimmed.toLowerCase() === 'null') {
    return null;
  }

  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed;
    }
  }

  const numberValue = Number(trimmed);
  if (Number.isFinite(numberValue)) {
    return numberValue;
  }

  return trimmed;
}

export function summarizePayload(payload, maxLength = 500) {
  if (payload === null || payload === undefined) {
    return '';
  }

  const text = typeof payload === 'string' ? payload : JSON.stringify(payload);
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
}

export function formatDuration(ms) {
  const seconds = Math.max(0, Math.round(ms / 1000));

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
}

function getBatterySoc(payload) {
  if (typeof payload === 'number') {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    return Number(payload.soc);
  }

  return Number.NaN;
}

function normalizePowerEvent(payload) {
  if (typeof payload === 'string') {
    return payload.trim();
  }

  if (payload && typeof payload === 'object') {
    return payload.event ?? payload.event_name ?? payload.name ?? '';
  }

  return '';
}

function normalizeRobotState(payload) {
  if (typeof payload === 'string') {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    return payload.state ?? null;
  }

  return null;
}

function createAlertId(robotId, key) {
  const hash = createHash('sha1').update(`${robotId}:${key}`).digest('hex').slice(0, 8);
  const rule = key.split(':')[0].replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  return `${rule}-${hash}`;
}

function cloneAlert(alert) {
  return { ...alert };
}
