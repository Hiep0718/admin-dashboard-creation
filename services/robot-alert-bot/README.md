# Robot Alert Bot

Node worker that subscribes to robot MQTT topics and sends Telegram alerts when critical robot events happen.

## Setup

1. Copy `.env.example` to `.env`.
2. Fill `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_IDS`, and MQTT credentials.
3. Run:

```bash
pnpm bot:start
```

## Telegram Commands

- `/status` - show MQTT, robot, battery, heartbeat, and alert state
- `/alerts` - list active alerts
- `/ack <alertId>` - acknowledge an alert and suppress repeats
- `/help` - show command help

Only chats listed in `TELEGRAM_CHAT_IDS` are allowed to use the bot.

## Alert Rules

- MQTT disconnect/reconnect
- Missing heartbeat from battery/state/pose topics
- Battery warning at `BATTERY_LOW_SOC`
- Battery critical at `BATTERY_CRITICAL_SOC`
- Power events: `shutdown_request`, `power_off`, `force_off`, `soc_low`, `soc_critical`
- Service feedback: `FAILED`, `REJECTED`, `DOCK_FAILED`, `PREEMPTED_BY_DOCK`

Run unit tests with:

```bash
pnpm bot:test
```
