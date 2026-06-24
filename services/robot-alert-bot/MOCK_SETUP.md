# 🤖 Robot Alert Bot - Mock Setup Guide

## ✅ Prerequisites

- ✓ `.env` file created (with your Telegram BOT_TOKEN and CHAT_IDS)
- ✓ Node.js 18+
- ✓ pnpm hoặc npm

---

## 🚀 Quick Start (Test Mode - No Real MQTT)

### 1️⃣ Get Telegram Chat ID (if not done yet)

Trên máy cậu, mở **PowerShell**:

```powershell
$TOKEN="8952603956:AAGkrkczpCSbSWNmtZYausGhae6NCLOMDc8"
Invoke-RestMethod "https://api.telegram.org/bot$($TOKEN)/getMe"
```

Nếu ra thông tin bot ✅

Rồi gửi message cho bot hoặc add vào group admin, rồi chạy:

```powershell
Invoke-RestMethod "https://api.telegram.org/bot$($TOKEN)/getUpdates" | ConvertTo-Json -Depth 10
```

Tìm `"id"` trong `"chat"` → đó là `TELEGRAM_CHAT_IDS`

---

### 2️⃣ Setup `.env` File

File `.env` đã có sẵn. Check xem có đúng không:

```ini
MQTT_URL=mqtt://mqtt.fce.local:1883
MQTT_USERNAME=
MQTT_PASSWORD=
MQTT_CLIENT_ID=robot-alert-bot-nova-x1

TELEGRAM_BOT_TOKEN=8952603956:AAGkrkczpCSbSWNmtZYausGhae6NCLOMDc8
TELEGRAM_CHAT_IDS=-5560607495

ROBOT_ID=NOVA-X1
ALERT_OFFLINE_AFTER_MS=30000
ALERT_REPEAT_COOLDOWN_MS=300000
BATTERY_LOW_SOC=20
BATTERY_CRITICAL_SOC=10
```

**Note**: MQTT_USERNAME & MQTT_PASSWORD để trống là chuẩn cho giờ.

---

### 3️⃣ Run Mock Bot (No Real MQTT Needed!)

```bash
pnpm bot:mock
```

Hoặc nếu không có `pnpm`:

```bash
corepack enable
corepack pnpm bot:mock
```

**Output sẽ như thế này:**

```
🤖 [telegram] bot started (mock mode)

📡 [mqtt] MOCK MODE - connected (simulated)
   Robot: NOVA-X1
   MQTT URL: mqtt://mqtt.fce.local:1883

📋 Demo scenarios starting...

  [Demo 1] Sending: Battery 95%, Robot IDLE
🔴 [critical] MQTT broker disconnected
🔴 [critical] MQTT broker disconnected
  [Demo 2] Sending: Battery 20% (LOW WARNING)
⚠️  [warning] Battery below 20%
  [Demo 3] Sending: Battery 9% (CRITICAL!)
🔴 [critical] Battery critical
  [Demo 4] Sending: Service FAILED
🔴 [critical] Service task-123 failed
  [Demo 5] Sending: Graceful shutdown request
🔴 [critical] Graceful shutdown requested
  [Demo 6] Simulating MQTT disconnection
🔴 [critical] MQTT broker disconnected
  [Demo 7] Simulating MQTT reconnection
✅ Demo completed!
   Check Telegram for alerts
   Type /status or /alerts in Telegram
   Press Ctrl+C to stop
```

---

### 4️⃣ Check Telegram Alerts

Vào **Telegram**, gõ:

```
/status
/alerts
/ack <alert-id>
```

Bạn sẽ nhận được các alert từ bot!

---

## 🔌 When Ready: Connect to Real Robot + MQTT

Khi cậu có credentials MQTT thật:

```ini
MQTT_USERNAME=your_real_username
MQTT_PASSWORD=your_real_password
```

Rồi chạy:

```bash
pnpm bot:start
```

Bot sẽ kết nối tới MQTT broker thực và bắt đầu monitor robot.

---

## 📋 Advanced: Test Specific Alerts

Nếu cậu muốn test với real MQTT broker (mosquitto_pub):

```bash
# Test battery critical alert
mosquitto_pub -h mqtt.fce.local -t robot/battery/soc -m 9 -q 1

# Test service failure
mosquitto_pub -h mqtt.fce.local -t robot/state/service_feedback -m '{"command_id":"test-1","status":"FAILED"}' -q 1

# Test graceful shutdown
mosquitto_pub -h mqtt.fce.local -t robot/powerswitch/event -m '{"event":"shutdown_request"}' -q 1
```

---

## 🛠️ Deploy to Server (PM2)

```bash
npm install -g pm2
pm2 start services/robot-alert-bot/index.mjs --name robot-alert-bot
pm2 save
pm2 startup
```

Nhớ chạy từ folder project để `.env` được đọc đúng!

---

## ⚡ Troubleshooting

| Problem | Solution |
|---------|----------|
| `❌ TELEGRAM_BOT_TOKEN not set` | Check `.env` file có token không |
| `❌ TELEGRAM_CHAT_IDS not set` | Gửi `/start` với bot để lấy chat ID |
| Bot không gửi alert | Check Telegram chat ID trong `/getUpdates` |
| MQTT connection failed | Check MQTT_URL có đúng không (nếu dùng real MQTT) |

---

## 📖 Scripts Available

```json
{
  "bot:start": "Connect to real MQTT broker",
  "bot:mock": "Run with simulated MQTT (demo mode)",
  "bot:test": "Run unit tests"
}
```

---

**Ready to test?** 🚀

```bash
pnpm bot:mock
```
