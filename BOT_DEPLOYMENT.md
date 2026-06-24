# 🚀 Phase 3: Bot Deployment - Self Service Guide

**Bot hoạt động tốt? Giờ deploy nó lên server hoặc máy tính của bạn!**

---

## 🎯 Deployment Options

Pick one:

| Option | Difficulty | Best For | Setup Time |
|--------|-----------|----------|-----------|
| **⭐ Local Machine (Quick Demo)** | Easiest ⭐ | Báo cáo đồ án, demo cho giáo viên | **2 phút** |
| **PM2 on Server** | Easy ⭐ | 24/7 production | **5 phút** |
| **Docker** | Medium ⭐⭐ | Portable deployment | **15 phút** |
| **Windows Task Scheduler** | Easy ⭐ | Auto-start on PC reboot | **10 phút** |

---

## ⭐ Option 0: Local Machine (Easiest - Dành cho Demo & Báo Cáo)

**Tình huống:** Bạn cần chạy bot trên máy tính của mình để:
- Demonstrate cho giáo viên/người khác
- Chạy demo nhanh chóng
- Báo cáo đồ án tốt nghiệp

**Ưu điểm:**
- ✅ **Siêu dễ** - Chỉ cần 1 lệnh
- ✅ **Không cần server** - Máy tính nhà bạn là server
- ✅ **Xem logs real-time** - Tất cả alert hiển thị trực tiếp trên màn hình
- ✅ **Dễ dừng** - Nhấn `Ctrl+C` để tắt

**Nhược điểm:**
- ❌ Tắt khi tắt máy tính
- ❌ Chỉ chạy khi máy tính bật lên

---

### 📖 Hướng Dẫn Chi Tiết (Từng Bước)

#### **Bước 1: Mở Command Prompt (Cửa sổ dòng lệnh)**

Trên Windows:
1. Nhấn phím **Windows** trên bàn phím
2. Gõ: `cmd` hoặc `powershell`
3. Nhấn **Enter**

Bây giờ bạn sẽ thấy cửa sổ đen với dòng chữ:
```
C:\Users\YourName>
```

#### **Bước 2: Vào Thư Mục Project**

Gõ lệnh này:
```bash
cd D:\Robot\admin-dashboard-creation
```

Nhấn **Enter**.

Bạn sẽ thấy:
```
D:\Robot\admin-dashboard-creation>
```

✅ **Bây giờ bạn đã ở đúng chỗ!**

#### **Bước 3: Chạy Bot**

Gõ lệnh này:
```bash
npm run bot:start
```

Nhấn **Enter**.

**Chờ một chút...** (khoảng 3-5 giây)

#### **Bước 4: Xem Bot Hoạt Động**

Bạn sẽ thấy:
```
🤖 Bot initialized with 7 alert subscriptions
✅ Bot connecting to MQTT broker...
[mqtt] subscribed topic: nova-x1/battery
[mqtt] subscribed topic: nova-x1/command
[mqtt] subscribed topic: nova-x1/service
[mqtt] subscribed topic: nova-x1/offline
[mqtt] subscribed topic: nova-x1/shutdown
[mqtt] subscribed topic: nova-x1/disconnected
[mqtt] subscribed topic: nova-x1/reconnected

🎧 Bot is listening for alerts... Press Ctrl+C to stop.
```

✅ **Bot đang chạy!** 🎉

Bot sẽ chờ các alert từ robot.

#### **Bước 5: Trigger Alert (Test)**

**Cách 1: Sử dụng Mock (Không cần MQTT credentials)**

Mở **Command Prompt/PowerShell thứ 2** (một cửa sổ mới):

```bash
cd D:\Robot\admin-dashboard-creation
npm run bot:mock
```

Bạn sẽ thấy demo alert:
```
⚠️  [warning] Robot battery low (95%)
🔴 [critical] Robot battery critical (20%)
🔴 [critical] Robot command FAILED
✅ Demo completed!
```

**Cách 2: Sử dụng MQTT Real (Nếu có credentials)**

Mở Command Prompt thứ 2, gõ:
```bash
mosquitto_pub -h mqtt.fce.local -u USERNAME -P PASSWORD -t nova-x1/battery -m '{"level": 15, "status": "critical"}'
```

Bot sẽ nhận alert và gửi Telegram.

#### **Bước 6: Dừng Bot**

Khi bạn muốn tắt bot:

**Trong cửa sổ Command Prompt chạy bot**, nhấn tổ hợp:
```
Ctrl + C
```

Bạn sẽ thấy:
```
^C
Gracefully shutting down...
🤖 Bot stopped.
```

✅ **Bot tắt được!**

---

### ⚠️ Khi Bot Chạy - Những Điều Cần Biết

| Trạng Thái | Ý Nghĩa | Cần Làm Gì |
|-----------|--------|----------|
| `🎧 Bot is listening...` | ✅ Bot chạy bình thường | Không cần làm gì |
| `❌ [error] MQTT connect failed` | ⚠️ Không kết nối được MQTT | Kiểm tra `.env` MQTT_URL/username/password |
| `[mqtt] subscribed...` | ✅ Bot đã subscribe topic | Bình thường, chờ alert |
| Không hiển thị gì sau 10s | ⚠️ Có thể bị lỗi Telegram | Vẫn hoạt động, chỉ Telegram bị chậm |

---

### 🎥 Demo Cho Giáo Viên - Scenario

**Thời gian:** ~5 phút

**Bước:**
1. Mở 2 cửa sổ Command Prompt
2. Cửa sổ 1: `npm run bot:start` (bot chạy)
3. Cửa sổ 2: `npm run bot:mock` (trigger demo)
4. Giáo viên thấy tất cả alert hiển thị real-time
5. Giải thích: "Bot nhận alert từ robot, xử lý, gửi Telegram!"

**Proof:**
- Logs hiển thị trực tiếp trên màn hình
- Telegram notification được nhận
- Giáo viên hiểu rõ flow

---

### 🐛 Troubleshooting (Nếu Có Vấn Đề)

#### **Q: Bot không chạy, thấy lỗi**

**Giải pháp:**
```bash
# Kiểm tra xem `.env` có ở đúng chỗ không
ls -la .env

# Kiểm tra Node.js đã cài chưa
node --version

# Cài dependencies lại
npm install

# Chạy bot lại
npm run bot:start
```

#### **Q: Cứ bật lên lại tắt ngay**

**Kiểm tra:**
1. Có lỗi màu đỏ nào không?
2. `.env` có hợp lệ không?
3. Chạy: `npm run bot:mock` để test

#### **Q: Không thấy Telegram alert**

**Vẫn bình thường!** Bot chạy rồi, chỉ là Telegram timeout. Logs hiển thị là proof đủ.

---

## 🔴 Option 1: PM2 (Recommended for Server - 24/7)

## 🔴 Option 1: PM2 (Recommended for Server - 24/7)

### Prerequisites

```bash
# Install PM2 globally
npm install -g pm2

# Enable PM2 auto-start on server reboot
pm2 startup

# (On Windows/WSL, might need sudo)
```

### Deploy Bot

```bash
cd /path/to/admin-dashboard-creation

# Start bot
pm2 start services/robot-alert-bot/index.mjs --name robot-alert-bot

# Save configuration
pm2 save

# Check status
pm2 status
pm2 logs robot-alert-bot
```

**Expected output:**

```
┌─────────────┬──────────┬──────────┬─────────┐
│ Name        │ Pid      │ Status   │ Uptime  │
├─────────────┼──────────┼──────────┼─────────┤
│ robot-alert-bot │ 12345 │ online   │ 0s     │
└─────────────┴──────────┴──────────┴─────────┘
```

### Manage Bot

```bash
# View logs
pm2 logs robot-alert-bot

# Restart bot
pm2 restart robot-alert-bot

# Stop bot
pm2 stop robot-alert-bot

# Remove from PM2
pm2 delete robot-alert-bot

# View all processes
pm2 status
```

### Auto-restart on Reboot

```bash
# On Linux/Mac
pm2 startup

# On Windows (PowerShell as Admin)
pm2 startup windows

# Save current state
pm2 save
```

**That's it!** Bot runs 24/7 automatically. ✅

---

## 🐳 Option 2: Docker

### Prerequisites

```bash
# Install Docker from https://docker.com

# Verify installation
docker --version
```

### Create Dockerfile

Create file `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy bot code
COPY services/robot-alert-bot ./services/robot-alert-bot

# Copy .env
COPY .env .env

# Run bot
CMD ["node", "services/robot-alert-bot/index.mjs"]
```

### Build Docker Image

```bash
cd /path/to/admin-dashboard-creation

# Build image
docker build -t robot-alert-bot:latest .
```

### Run Container

```bash
# Run bot in container
docker run -d \
  --name robot-alert-bot \
  --restart unless-stopped \
  --env-file .env \
  robot-alert-bot:latest

# Check logs
docker logs -f robot-alert-bot
```

### Manage Container

```bash
# View running containers
docker ps

# View logs
docker logs robot-alert-bot

# Restart container
docker restart robot-alert-bot

# Stop container
docker stop robot-alert-bot

# Remove container
docker rm robot-alert-bot
```

### Deploy to Server

```bash
# On your server:
# 1. Copy Dockerfile + .env to server
# 2. Run above commands

# Or, push to Docker Hub:
docker tag robot-alert-bot:latest yourname/robot-alert-bot:latest
docker push yourname/robot-alert-bot:latest

# Then on server:
docker pull yourname/robot-alert-bot:latest
docker run -d --restart unless-stopped yourname/robot-alert-bot:latest
```

---

## 💻 Option 3: Windows Task Scheduler (Windows Only)

### Create Batch Script

Create `start-bot.bat`:

```batch
@echo off
cd C:\path\to\admin-dashboard-creation
npm run bot:start
pause
```

### Schedule Task

1. Open **Task Scheduler**
2. Click **Create Basic Task**
3. Name: `Robot Alert Bot`
4. Trigger: **At startup**
5. Action: **Start a program**
   - Program: `C:\path\to\start-bot.bat`
6. Enable: **Run with highest privileges**
7. Click **OK**

**Bot starts automatically when PC boots!** ✅

---

## 📊 Deployment Comparison

| Aspect | Local | PM2 | Docker | Task Scheduler |
|--------|-------|-----|--------|--------|
| Setup time | **2 min** 🏃 | 5 min | 15 min | 10 min |
| Demo/Báo cáo | ✅ Perfect | ❌ | ❌ | ❌ |
| Auto-restart | ❌ Manual | ✅ | ✅ | ✅ |
| 24/7 uptime | ❌ | ✅ | ✅ | ⚠️ |
| Logs | ✅ Real-time | ✅ | ✅ | ❌ |
| Multi-server | ❌ | ✅ | ✅ | ❌ |
| Resource usage | Low | Low | Medium | Low |
| For Team? | ✅ Demo | ✅ Prod | ✅ Prod | ⚠️ Simple |

---

## 🎯 Best Practices

### 1. Keep `.env` Secure
```bash
# Don't commit .env to git
echo ".env" >> .gitignore

# Use environment variables instead for production
export MQTT_USERNAME=secret
export MQTT_PASSWORD=secret
```

### 2. Monitor Logs

```bash
# PM2
pm2 logs robot-alert-bot --lines 100

# Docker
docker logs --tail 100 robot-alert-bot
```

### 3. Set Resource Limits

```bash
# PM2 (limit memory to 512MB)
pm2 start services/robot-alert-bot/index.mjs --max-memory-restart 512M

# Docker (limit memory to 512MB)
docker run -m 512m robot-alert-bot:latest
```

### 4. Backup Logs

```bash
# PM2 saves logs automatically
cat ~/.pm2/logs/robot-alert-bot-error.log

# Docker logs can be exported
docker logs robot-alert-bot > bot-logs.txt
```

---

## ✅ Deployment Checklist

**For Local Demo:**
- [ ] `.env` có hợp lệ (có thể không có MQTT credentials)
- [ ] `npm run bot:start` hoạt động locally
- [ ] Có thể trigger alerts (`npm run bot:mock`)
- [ ] Telegram notifications được nhận (nếu có token)
- [ ] Proof: Screenshot/video logs cho giáo viên

**For Production Server:**
- [ ] `.env` có real MQTT credentials
- [ ] `npm run bot:start` works locally first
- [ ] Choose deployment method (PM2/Docker/Task Scheduler)
- [ ] Deploy bot on server
- [ ] Check bot is running: `pm2 status` or `docker ps`
- [ ] Verify logs show `[mqtt] subscribed 7 topics`
- [ ] Test real alerts via MQTT
- [ ] Enable auto-restart on reboot
- [ ] Monitor first 24 hours for errors
- [ ] Set up log rotation (optional)

---

## 🐛 Troubleshooting

### Bot stops after a few seconds

```bash
# Check error logs
pm2 logs robot-alert-bot --err

# Common causes:
# 1. .env not found → Copy .env to deployment folder
# 2. MQTT connection failed → Check credentials
# 3. Missing dependencies → Run npm install
```

### High memory usage

```bash
# Limit memory
pm2 start services/robot-alert-bot/index.mjs --max-memory-restart 512M

# Or restart daily
pm2 start services/robot-alert-bot/index.mjs --cron "0 0 * * *"
```

### Can't find .env

```bash
# Make sure .env is in project root, not in bot folder
ls -la .env

# Bot loads from current directory
npm run bot:start  # Current dir must have .env
```

---

## 📞 Getting Help

| Issue | Where to Check |
|-------|--------|
| Bot won't start | `BOT_IMPLEMENTATION.md` |
| MQTT connection | `REAL_MQTT_SETUP.md` |
| Deployment issues | This file |
| Architecture | `BOT_IMPLEMENTATION.md` |
| Mock testing | `MOCK_SETUP.md` |

---

**Bot deployed and running 24/7?** 🎉

Next: Monitor logs and set up alerts for bot failures (advanced)
