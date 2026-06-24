import mqtt from 'mqtt';
import { Telegraf } from 'telegraf';
import { AlertRuleEngine, MQTT_TOPICS } from './rule-engine.mjs';
import { formatAlertList, formatHelp, formatNotification, formatStatus } from './formatters.mjs';

const config = readConfig();
const engine = new AlertRuleEngine({
  robotId: config.robotId,
  offlineAfterMs: config.offlineAfterMs,
  repeatCooldownMs: config.repeatCooldownMs,
  batteryLowSoc: config.batteryLowSoc,
  batteryCriticalSoc: config.batteryCriticalSoc,
});

const bot = new Telegraf(config.telegramBotToken);

bot.use(async (ctx, next) => {
  const chatId = ctx.chat?.id ? String(ctx.chat.id) : null;

  if (!chatId || !config.telegramChatIds.has(chatId)) {
    if (chatId) {
      console.warn(`[telegram] ignored unauthorized chat ${chatId}`);
    }
    return;
  }

  return next();
});

bot.start((ctx) => ctx.reply(formatHelp()));
bot.help((ctx) => ctx.reply(formatHelp()));
bot.command('status', (ctx) => ctx.reply(formatStatus(engine.getStatus())));
bot.command('alerts', (ctx) => ctx.reply(formatAlertList(engine.getActiveAlerts())));
bot.command('ack', (ctx) => {
  const alertId = extractCommandArgument(ctx.message?.text);

  if (!alertId) {
    return ctx.reply('Usage: /ack <alertId>');
  }

  const alert = engine.ackAlert(alertId);
  if (!alert) {
    return ctx.reply(`Alert not found: ${alertId}`);
  }

  return ctx.reply(`Acknowledged ${alert.id}. Repeats are suppressed until recovery.`);
});

await bot.launch();
console.log('[telegram] bot started');

const mqttClient = mqtt.connect(config.mqttUrl, {
  clientId: config.mqttClientId,
  username: config.mqttUsername,
  password: config.mqttPassword,
  reconnectPeriod: 1000,
  reconnectOnConnackError: true,
  connectTimeout: 30000,
  clean: true,
});

mqttClient.on('connect', () => {
  console.log('[mqtt] connected');
  void dispatchNotifications(engine.setMqttConnected(true, Date.now(), { url: config.mqttUrl }));

  mqttClient.subscribe(MQTT_TOPICS, { qos: 1 }, (error) => {
    if (error) {
      console.error('[mqtt] subscribe failed', error);
      return;
    }

    console.log(`[mqtt] subscribed ${MQTT_TOPICS.length} topics`);
  });
});

mqttClient.on('offline', () => {
  console.warn('[mqtt] offline');
  void dispatchNotifications(engine.setMqttConnected(false, Date.now(), { event: 'offline' }));
});

mqttClient.on('close', () => {
  console.warn('[mqtt] closed');
  void dispatchNotifications(engine.setMqttConnected(false, Date.now(), { event: 'close' }));
});

mqttClient.on('error', (error) => {
  console.error('[mqtt] error', error);
});

mqttClient.on('message', (topic, payload) => {
  const notifications = engine.ingestMessage(topic, payload, Date.now());
  void dispatchNotifications(notifications);
});

const timer = setInterval(() => {
  void dispatchNotifications(engine.checkTimers(Date.now()));
}, Math.max(1000, Math.min(10000, Math.floor(config.offlineAfterMs / 2))));

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => {
    void shutdown(signal);
  });
}

async function dispatchNotifications(notifications) {
  if (!notifications.length) {
    return;
  }

  for (const notification of notifications) {
    const message = formatNotification(notification);

    for (const chatId of config.telegramChatIds) {
      try {
        await bot.telegram.sendMessage(chatId, message);
      } catch (error) {
        console.error(`[telegram] failed to send to ${chatId}`, error);
      }
    }
  }
}

async function shutdown(signal) {
  console.log(`[runtime] shutting down after ${signal}`);
  clearInterval(timer);
  mqttClient.end(true);
  bot.stop(signal);
}

function readConfig() {
  const telegramBotToken = readRequiredEnv('TELEGRAM_BOT_TOKEN');
  const telegramChatIds = readChatIds(readRequiredEnv('TELEGRAM_CHAT_IDS'));
  const mqttUrl = readRequiredEnv('MQTT_URL');

  return {
    telegramBotToken,
    telegramChatIds,
    mqttUrl,
    mqttUsername: process.env.MQTT_USERNAME || undefined,
    mqttPassword: process.env.MQTT_PASSWORD || undefined,
    mqttClientId: process.env.MQTT_CLIENT_ID || `robot-alert-bot-${Math.random().toString(16).slice(2)}`,
    robotId: process.env.ROBOT_ID || 'NOVA-X1',
    offlineAfterMs: readNumberEnv('ALERT_OFFLINE_AFTER_MS', 30000),
    repeatCooldownMs: readNumberEnv('ALERT_REPEAT_COOLDOWN_MS', 300000),
    batteryLowSoc: readNumberEnv('BATTERY_LOW_SOC', 20),
    batteryCriticalSoc: readNumberEnv('BATTERY_CRITICAL_SOC', 10),
  };
}

function readRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function readNumberEnv(name, fallback) {
  const raw = process.env[name];

  if (!raw) {
    return fallback;
  }

  const value = Number(raw);
  if (!Number.isFinite(value)) {
    throw new Error(`Environment variable ${name} must be a number.`);
  }

  return value;
}

function readChatIds(raw) {
  const ids = raw
    .split(/[,\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!ids.length) {
    throw new Error('TELEGRAM_CHAT_IDS must contain at least one chat id.');
  }

  return new Set(ids);
}

function extractCommandArgument(text) {
  if (!text) {
    return '';
  }

  return text.trim().split(/\s+/)[1] ?? '';
}
