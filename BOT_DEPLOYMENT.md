# 🚀 Phase 3: Bot Deployment - Self Service Guide

**Bot hoạt động tốt? Giờ deploy nó 24/7 trên server!**

---

## 🎯 Deployment Options

Pick one:

| Option | Difficulty | Pros | Cons |
|--------|-----------|------|------|
| **PM2** | Easy ⭐ | Simple, one command | Need Linux/Mac/WSL |
| **Docker** | Medium ⭐⭐ | Platform-independent | Need Docker installed |
| **Windows Task Scheduler** | Easy ⭐ | Native Windows | Less reliable |

---

## 🔴 Option 1: PM2 (Recommended - Easiest)

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

| Aspect | PM2 | Docker | Task Scheduler |
|--------|-----|--------|--------|
| Setup time | 2 min | 10 min | 5 min |
| Auto-restart | ✅ | ✅ | ✅ |
| Logs | ✅ | ✅ | ❌ |
| Multi-server | ✅ | ✅ | ❌ |
| Resource usage | Low | Medium | Low |
| Monitoring | ✅ | ✅ | ❌ |

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

- [ ] `.env` has real MQTT credentials
- [ ] `npm run bot:start` works locally
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
