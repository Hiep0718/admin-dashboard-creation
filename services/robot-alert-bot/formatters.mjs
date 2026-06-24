import { formatDuration } from './rule-engine.mjs';

export function formatNotification(notification) {
  const { alert } = notification;
  const isRecovery = notification.type === 'recovery';
  const label = isRecovery ? 'RECOVERY' : alert.severity.toUpperCase();
  const when = formatDateTime(isRecovery ? alert.resolvedAt : alert.lastSeenAt);
  const lines = [
    `[${label}] ${alert.title}`,
    `Robot: ${alert.robotId}`,
    `Alert ID: ${alert.id}`,
    alert.topic ? `Topic: ${alert.topic}` : null,
    `Time: ${when}`,
    alert.message,
    alert.payloadSummary ? `Payload: ${alert.payloadSummary}` : null,
  ];

  return lines.filter(Boolean).join('\n');
}

export function formatStatus(status) {
  const lines = [
    `Robot: ${status.robotId}`,
    `MQTT: ${status.mqttConnected ? 'connected' : 'disconnected'}`,
    `Robot state: ${status.robotState ?? 'unknown'}`,
    `Battery: ${status.batterySoc === null ? 'unknown' : `${status.batterySoc}%`}`,
    `Battery state: ${status.batteryState ?? 'unknown'}`,
    `Last heartbeat: ${formatDuration(status.lastHeartbeatAgeMs)} ago`,
    `Last topic: ${status.lastTopic ?? 'none'}`,
    `Active alerts: ${status.activeAlertCount} (${status.unacknowledgedAlertCount} unacknowledged)`,
  ];

  return lines.join('\n');
}

export function formatAlertList(alerts) {
  if (!alerts.length) {
    return 'No active alerts.';
  }

  return alerts
    .slice(0, 20)
    .map((alert) => {
      const ack = alert.acknowledgedAt ? 'acked' : 'unacknowledged';
      return [
        `${alert.id} - ${alert.severity.toUpperCase()} - ${alert.title}`,
        `Status: ${ack}`,
        `Last seen: ${formatDateTime(alert.lastSeenAt)}`,
        alert.message,
      ].join('\n');
    })
    .join('\n\n');
}

export function formatHelp() {
  return [
    'Robot alert bot commands:',
    '/status - show MQTT, robot, battery, heartbeat, and alert state',
    '/alerts - list active alerts',
    '/ack <alertId> - acknowledge an alert and suppress repeats',
    '/help - show this help',
  ].join('\n');
}

function formatDateTime(timestamp) {
  if (!timestamp) {
    return 'unknown';
  }

  return new Date(timestamp).toISOString();
}
