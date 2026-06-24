import test from 'node:test';
import assert from 'node:assert/strict';
import { AlertRuleEngine } from './rule-engine.mjs';

test('service feedback FAILED creates a critical alert', () => {
  const engine = new AlertRuleEngine({ initialNow: 0 });
  const notifications = engine.ingestMessage(
    'robot/state/service_feedback',
    JSON.stringify({ command_id: 'cmd-1', status: 'FAILED' }),
    1000,
  );

  assert.equal(notifications.length, 1);
  assert.equal(notifications[0].type, 'alert');
  assert.equal(notifications[0].alert.severity, 'critical');
  assert.equal(notifications[0].alert.rule, 'service-feedback');
  assert.match(notifications[0].alert.message, /cmd-1/);
});

test('battery SoC 9 creates a critical alert', () => {
  const engine = new AlertRuleEngine({ initialNow: 0 });
  const notifications = engine.ingestMessage('robot/battery/soc', '9', 1000);

  assert.equal(notifications.length, 1);
  assert.equal(notifications[0].alert.rule, 'battery-critical');
  assert.equal(notifications[0].alert.severity, 'critical');
});

test('battery SoC 19 creates a warning alert', () => {
  const engine = new AlertRuleEngine({ initialNow: 0 });
  const notifications = engine.ingestMessage('robot/battery/status', JSON.stringify({ soc: 19 }), 1000);

  assert.equal(notifications.length, 1);
  assert.equal(notifications[0].alert.rule, 'battery-low');
  assert.equal(notifications[0].alert.severity, 'warning');
});

test('heartbeat timeout creates offline alert and later recovers', () => {
  const engine = new AlertRuleEngine({ initialNow: 0, offlineAfterMs: 1000 });
  const offlineNotifications = engine.checkTimers(1001);

  assert.equal(offlineNotifications.length, 1);
  assert.equal(offlineNotifications[0].alert.rule, 'robot-offline');

  const recoveryNotifications = engine.ingestMessage(
    'robot/state/pose',
    JSON.stringify({ time: 1213124, x: 11.11, y: 22.22, yaw: 3.14 }),
    1100,
  );

  assert.equal(recoveryNotifications.length, 1);
  assert.equal(recoveryNotifications[0].type, 'recovery');
  assert.equal(engine.getActiveAlerts().length, 0);
});

test('duplicate alerts are suppressed until cooldown expires', () => {
  const engine = new AlertRuleEngine({ initialNow: 0, repeatCooldownMs: 5000 });
  const payload = JSON.stringify({ command_id: 'cmd-2', status: 'REJECTED' });

  assert.equal(engine.ingestMessage('robot/state/service_feedback', payload, 1000).length, 1);
  assert.equal(engine.ingestMessage('robot/state/service_feedback', payload, 2000).length, 0);
  assert.equal(engine.ingestMessage('robot/state/service_feedback', payload, 7000).length, 1);
});

test('acknowledged alerts suppress future repeats', () => {
  const engine = new AlertRuleEngine({ initialNow: 0, repeatCooldownMs: 5000 });
  const payload = JSON.stringify({ command_id: 'cmd-3', status: 'DOCK_FAILED' });
  const [notification] = engine.ingestMessage('robot/state/service_feedback', payload, 1000);

  assert.ok(engine.ackAlert(notification.alert.id, 1500));
  assert.equal(engine.ingestMessage('robot/state/service_feedback', payload, 7000).length, 0);
});
