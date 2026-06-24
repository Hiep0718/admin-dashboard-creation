# ⚡ Phase 2: Real MQTT Setup - Self Service Guide

**Sau khi bạn lấy real MQTT credentials từ FCE, làm theo hướng dẫn này.**

---

## 📋 Prerequisites

Cần có:
- ✅ `MQTT_USERNAME` (từ FCE)
- ✅ `MQTT_PASSWORD` (từ FCE)
- ✅ `MQTT_URL` (từ FCE, hoặc dùng `mqtt://mqtt.fce.local:1883`)

---

## 🔧 Step 1: Update `.env` File

Dùng editor, mở `.env` và update MQTT credentials:

```ini
MQTT_URL=mqtt://mqtt.fce.local:1883          # ← Check with FCE
MQTT_USERNAME=your_real_username_here        # ← Add from FCE
MQTT_PASSWORD=your_real_password_here        # ← Add from FCE
MQTT_CLIENT_ID=robot-alert-bot-nova-x1

TELEGRAM_BOT_TOKEN=8952603956:AAGkrkczpCSbSWNmtZYausGhae6NCLOMDc8
TELEGRAM_CHAT_IDS=-5560607495

ROBOT_ID=NOVA-X1
ALERT_OFFLINE_AFTER_MS=30000
ALERT_REPEAT_COOLDOWN_MS=300000
BATTERY_LOW_SOC=20
BATTERY_CRITICAL_SOC=10
```

**💾 Save file**

---

## 🧪 Step 2: Test Real MQTT Connection

Run bot with real MQTT broker:

```bash
npm run bot:start
```

**Expected output:**

```
[telegram] bot started
[mqtt] connected
[mqtt] subscribed 7 topics
```

If you see this ✅, then MQTT is working!

---

## 🐛 Troubleshooting

### ❌ `[mqtt] error ECONNREFUSED`
**Cause:** Can't connect to MQTT broker

**Fix:**
```bash
# Check MQTT URL is correct
ping mqtt.fce.local

# Check if MQTT broker is running on the server
# Contact FCE to verify mqtt.fce.local is reachable
```

### ❌ `[mqtt] error authentication failed`
**Cause:** Wrong username or password

**Fix:**
```bash
# Double-check credentials from FCE
# Make sure no extra spaces in .env:
MQTT_USERNAME=username    # ❌ Wrong (extra spaces)
MQTT_USERNAME=username    # ✅ Correct
```

### ❌ `[mqtt] error TIMEOUT`
**Cause:** Network is slow or broker unreachable

**Fix:**
```bash
# Wait a bit longer
# Check firewall/network connectivity
# Verify mqtt.fce.local resolves:
nslookup mqtt.fce.local
```

---

## 🧹 Step 3: Test Real Alerts

Once MQTT is connected, trigger real alerts using `mosquitto_pub`:

```bash
# Install mosquitto-clients (if not installed)
# Windows: choco install mosquitto
# macOS: brew install mosquitto
# Ubuntu: sudo apt-get install mosquitto-clients

# Test battery critical alert
mosquitto_pub -h mqtt.fce.local -u your_username -P your_password -t robot/battery/soc -m 5

# Test service failure alert
mosquitto_pub -h mqtt.fce.local -u your_username -P your_password -t robot/state/service_feedback -m '{"command_id":"test-1","status":"FAILED"}'

# Test graceful shutdown alert
mosquitto_pub -h mqtt.fce.local -u your_username -P your_password -t robot/powerswitch/event -m '{"event":"shutdown_request"}'
```

**Check Telegram** - You should receive alert messages! 🎉

---

## 📊 All MQTT Topics Bot Listens To

```
1. robot/battery/status       - Battery status
2. robot/battery/soc          - Battery percentage
3. robot/powerswitch/event    - Power events
4. robot/pi/shutdown_ack      - Shutdown ack
5. robot/state/service_feedback - Service status
6. robot/state/state          - Robot state
7. robot/state/pose           - Robot position
```

---

## ✅ Verification Checklist

- [ ] `.env` updated with real credentials
- [ ] `npm run bot:start` shows `[mqtt] subscribed 7 topics`
- [ ] Telegram receives real alerts
- [ ] `mosquitto_pub` test works
- [ ] Bot stays running 24/7 (for now)

---

## 🎯 Next: Deployment

Once real MQTT works, move to **Phase 3: Bot Deployment**

See `BOT_DEPLOYMENT.md` for server setup guide.

---

**Need help?** Check `BOT_IMPLEMENTATION.md` for architecture overview.
