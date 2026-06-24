#!/usr/bin/env node

/**
 * Mock MQTT Bot Demo - Test bot alerts without real MQTT broker
 * Usage: pnpm bot:mock
 */

import { existsSync, readFileSync } from 'node:fs';
import { Telegraf } from 'telegraf';
import { AlertRuleEngine } from './rule-engine.mjs';
import { formatAlertList, formatHelp, formatNotification, formatStatus } from './formatters.mjs';

// Load .env
if (existsSync('.env')) {
  readFileSync('.env', 'utf8')
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .forEach(line => {
      const [key, ...valueParts] = line.split('=');
      process.env[key.trim()] = valueParts.join('=').trim();
    });
}

// Helper: Read config from env
function readConfig() {
  const telegramChatIds = new Set(
    (process.env.TELEGRAM_CHAT_IDS || '')
      .split(',')
      .map(id => id.trim())
      .filter(Boolean)
  );

  return {
    mqttUrl: process.env.MQTT_URL || 'mqtt://localhost:1883',
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatIds,
    robotId: process.env.ROBOT_ID || 'NOVA-X1',
    offlineAfterMs: parseInt(process.env.ALERT_OFFLINE_AFTER_MS || '30000', 10),
    repeatCooldownMs: parseInt(process.env.ALERT_REPEAT_COOLDOWN_MS || '300000', 10),
    batteryLowSoc: parseInt(process.env.BATTERY_LOW_SOC || '20', 10),
    batteryCriticalSoc: parseInt(process.env.BATTERY_CRITICAL_SOC || '10', 10),
  };
}

// Helper: Extract command arguments
function extractCommandArgument(text) {
  if (!text) return null;
  const match = text.match(/\/\w+\s+(\S+)/);
  return match ? match[1] : null;
}

const config = readConfig();

// Validate config
if (!config.telegramBotToken) {
  console.error('❌ TELEGRAM_BOT_TOKEN not set in .env');
  console.error('   Get it from: https://t.me/BotFather');
  process.exit(1);
}

if (config.telegramChatIds.size === 0) {
  console.error('❌ TELEGRAM_CHAT_IDS not set in .env');
  console.error('   Add your chat ID from bot /start or /status');
  process.exit(1);
}

// Initialize engine and bot
const engine = new AlertRuleEngine({
  robotId: config.robotId,
  offlineAfterMs: config.offlineAfterMs,
  repeatCooldownMs: config.repeatCooldownMs,
  batteryLowSoc: config.batteryLowSoc,
  batteryCriticalSoc: config.batteryCriticalSoc,
});

const bot = new Telegraf(config.telegramBotToken);

// Setup bot commands
bot.use(async (ctx, next) => {
  const chatId = ctx.chat?.id ? String(ctx.chat.id) : null;
  if (!chatId || !config.telegramChatIds.has(chatId)) {
    if (chatId) console.warn(`  ⚠️  ignored unauthorized chat ${chatId}`);
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
  return ctx.reply(`✅ Acknowledged ${alert.id}`);
});

// Helper: Dispatch notifications to Telegram
async function dispatchNotifications(notifications) {
  for (const notification of notifications) {
    const emoji = notification.severity === 'critical' ? '🔴' : '⚠️ ';
    console.log(`${emoji} [${notification.severity}] ${notification.title}`);
    for (const chatId of config.telegramChatIds) {
      try {
        await bot.telegram.sendMessage(chatId, formatNotification(notification));
      } catch (error) {
        console.error(`  ❌ failed to send to ${chatId}: ${error.message}`);
      }
    }
  }
}

// Start bot
await bot.launch();
console.log('🤖 [telegram] bot started (mock mode)\n');
console.log(`📡 [mqtt] MOCK MODE - connected (simulated)`);
console.log(`   Robot: ${config.robotId}`);
console.log(`   MQTT URL: ${config.mqttUrl}\n`);

// Simulate MQTT connection
await dispatchNotifications(
  engine.setMqttConnected(true, Date.now(), { url: config.mqttUrl })
);

// Setup timer for periodic checks
const timer = setInterval(() => {
  void dispatchNotifications(engine.checkTimers(Date.now()));
}, Math.max(1000, Math.min(10000, Math.floor(config.offlineAfterMs / 2))));

// ========== DEMO SCENARIOS ==========
console.log('📋 Demo scenarios starting...\n');

// Scenario 1: Normal operation
setTimeout(() => {
  console.log('  [Demo 1] Sending: Battery 95%, Robot IDLE');
  engine.ingestMessage('robot/battery/soc', '95', Date.now());
  engine.ingestMessage('robot/battery/status', '{"status": "charging"}', Date.now());
  engine.ingestMessage('robot/state/state', '{"state": "IDLE"}', Date.now());
  void dispatchNotifications(engine.checkTimers(Date.now()));
}, 2000);

// Scenario 2: Low battery warning
setTimeout(() => {
  console.log('  [Demo 2] Sending: Battery 20% (LOW WARNING)');
  const notif = engine.ingestMessage('robot/battery/soc', '20', Date.now());
  void dispatchNotifications(notif);
}, 5000);

// Scenario 3: Critical battery
setTimeout(() => {
  console.log('  [Demo 3] Sending: Battery 9% (CRITICAL!)');
  const notif = engine.ingestMessage('robot/battery/soc', '9', Date.now());
  void dispatchNotifications(notif);
}, 8000);

// Scenario 4: Service failure
setTimeout(() => {
  console.log('  [Demo 4] Sending: Service FAILED');
  const notif = engine.ingestMessage(
    'robot/state/service_feedback',
    '{"command_id": "task-123", "status": "FAILED"}',
    Date.now()
  );
  void dispatchNotifications(notif);
}, 11000);

// Scenario 5: Graceful shutdown
setTimeout(() => {
  console.log('  [Demo 5] Sending: Graceful shutdown request');
  const notif = engine.ingestMessage(
    'robot/powerswitch/event',
    '{"event": "shutdown_request"}',
    Date.now()
  );
  void dispatchNotifications(notif);
}, 14000);

// Scenario 6: Simulate disconnection
setTimeout(() => {
  console.log('  [Demo 6] Simulating MQTT disconnection');
  void dispatchNotifications(
    engine.setMqttConnected(false, Date.now(), { event: 'offline' })
  );
}, 17000);

// Scenario 7: Reconnection
setTimeout(() => {
  console.log('  [Demo 7] Simulating MQTT reconnection');
  void dispatchNotifications(
    engine.setMqttConnected(true, Date.now(), { event: 'reconnected' })
  );
}, 20000);

// End message
setTimeout(() => {
  console.log('\n✅ Demo completed!');
  console.log('   Check Telegram for alerts');
  console.log('   Type /status or /alerts in Telegram');
  console.log('   Press Ctrl+C to stop\n');
}, 22000);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down...');
  clearInterval(timer);
  await bot.stop();
  process.exit(0);
});
