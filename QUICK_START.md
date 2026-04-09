# 🚀 QUICK START GUIDE

## Prerequisites
- Python 3.9+
- Node.js 16+
- Docker (for Redis & MongoDB)

## Setup

### 1. Start Docker Services
```bash
cd d:\ai-software-engineer-v2
docker-compose up -d
```

Verify services:
- Redis: `localhost:6379`
- MongoDB: `localhost:27017`

### 2. Install Python Dependencies
```bash
cd d:\ai-software-engineer-v2
pip install -r requirements.txt
```

### 3. Start Backend Server
```bash
python -m uvicorn app.main:app --reload --port 8000
```

Expected output:
```
Uvicorn running on http://127.0.0.1:8000
```

### 4. Install Frontend Dependencies (New Terminal)
```bash
cd d:\ai-software-engineer-v2\frontend
npm install
```

### 5. Start Frontend Dev Server (New Terminal)
```bash
cd d:\ai-software-engineer-v2\frontend
npm run dev
```

Expected output:
```
VITE v4.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Test Application

### 1. Open Frontend
```
http://localhost:5173
```

### 2. Try Commands
- "Build a todo app"
- "Create a chat interface"
- "Fix this bug"
- "Explain the code"
- "How do I use this?"

### 3. Check Backend API Docs
```
http://localhost:8000/docs
```

## Verify Integration

### Test Session Creation
```bash
curl -X POST http://localhost:8000/session/create \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Test Command Execution
```bash
curl -X POST http://localhost:8000/command/execute \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "YOUR_SESSION_ID",
    "command": "Build a calculator",
    "mode": "MODE_2"
  }'
```

## Troubleshooting

### Backend Won't Start
```bash
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Kill process (get PID from above)
taskkill /PID <PID> /F
```

### Frontend Won't Load
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
cd frontend
npm install
```

### Redis/MongoDB Not Running
```bash
# Check Docker
docker ps

# Restart Docker
docker-compose restart
```

## File Structure Reference

```
d:\ai-software-engineer-v2/
├── app/
│   ├── api/v1/
│   │   ├── command.py     ← Main API endpoint
│   │   ├── session.py     ← Session management
│   │   ├── chat.py
│   │   └── build.py
│   ├── services/
│   │   ├── orchestrator.py
│   │   ├── intent_detector.py
│   │   └── ...
│   ├── memory/
│   │   ├── redis_client.py
│   │   └── mongo_client.py
│   └── main.py            ← FastAPI app
│
├── frontend/
│   ├── src/
│   │   ├── components/    ← React components
│   │   ├── api/
│   │   │   └── client.js  ← API calls
│   │   ├── hooks/         ← Custom hooks
│   │   ├── styles/        ← CSS files
│   │   └── App.jsx        ← Main app
│   ├── .env
│   └── package.json
│
├── docker-compose.yml
├── requirements.txt
└── PROJECT_STATUS.md
```

## Development Tips

### Hot Reload
- Backend: Uvicorn automatically reloads on file changes
- Frontend: Vite hot module replacement is enabled

### Debug Frontend
- Open browser DevTools (F12)
- Check Network tab for API calls
- Check Console for errors

### Debug Backend
- Check terminal where uvicorn is running
- View logs in console
- Add print statements for debugging

### Environment Variables
Frontend config: `frontend/.env`
Backend config: Can be added to `app/core/config.py`

## Next Steps

1. ✅ Run the application
2. ✅ Send a command from the UI
3. ✅ Check execution logs
4. ⏭️ Implement agent execution
5. ⏭️ Add code generation
6. ⏭️ Deploy to cloud

---

Questions? Check PROJECT_STATUS.md for architecture details.
