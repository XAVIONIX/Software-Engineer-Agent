# System Architecture Diagram

## Component Interaction Flow

```
┌────────────────────────────────────────────────────────────────┐
│                      USER INTERFACE                             │
│              (React + Vite @ localhost:5173)                    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ CommandInput Component                                   │  │
│  │ User types: "Build a todo app"                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                       │
│                         │ onClick: executeCommand()            │
│                         ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ API Call: POST /command/execute                         │  │
│  │ {                                                        │  │
│  │   session_id: "uuid",                                  │  │
│  │   command: "Build a todo app",                         │  │
│  │   mode: "MODE_2"                                       │  │
│  │ }                                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────┬──────────────────────────────────────────┘
                     │ HTTP POST
                     │ (JSON)
                     ▼
┌────────────────────────────────────────────────────────────────┐
│                   BACKEND SERVER                                │
│           (FastAPI @ localhost:8000)                            │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Command Router: /command/execute                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                       │
│                         ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Orchestrator.handle_request()                           │  │
│  │ ├─ Save to Hot Memory (Redis)                          │  │
│  │ ├─ Call Intent Detector                                │  │
│  │ └─ Route based on Intent & Mode                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                       │
│         ┌───────────────┼───────────────┐                      │
│         │               │               │                      │
│         ▼               ▼               ▼                      │
│    MODE_1         MODE_2 Handlers    Error                    │
│  (Structured)   ┌──────────────────┐ Handler                  │
│                 │ BUILD            │                          │
│                 │ EDIT             │                          │
│                 │ FIX              │                          │
│                 │ EXPLAIN          │                          │
│                 │ CHAT             │                          │
│                 └──────────────────┘                          │
│                         │                                       │
│                         ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Response: CommandResponse                              │  │
│  │ {                                                        │  │
│  │   session_id: "uuid",                                  │  │
│  │   command: "Build a todo app",                         │  │
│  │   intent: "BUILD",                                     │  │
│  │   action: "START_BUILD",                               │  │
│  │   message: "Starting to build...",                     │  │
│  │   status: "success"                                    │  │
│  │ }                                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                       │
│         ┌───────────────┴───────────────┐                      │
│         │                               │                      │
│         ▼                               ▼                      │
│    Redis (Hot)                   MongoDB (Cold)               │
│    ├─ Session data             ├─ User profiles              │
│    ├─ Command history          ├─ Project metadata           │
│    └─ Temp state               └─ Conversation history       │
│                                                                 │
└────────────────────┬──────────────────────────────────────────┘
                     │ HTTP Response
                     │ (JSON)
                     ▼
┌────────────────────────────────────────────────────────────────┐
│                      USER INTERFACE                             │
│              (React + Vite @ localhost:5173)                    │
│                                                                 │
│  Response Handler:                                              │
│  ├─ Add message to ChatHistory                               │  │
│  ├─ Update ExecutionLog                                       │  │
│  ├─ Update SessionInfo                                        │  │
│  └─ Show success/error status                                │  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ChatHistory Component                                   │  │
│  │ - Shows conversation with AI                           │  │
│  │ - User: "Build a todo app"                             │  │
│  │ - AI: "Starting to build your project..."              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ExecutionLog Component                                 │  │
│  │ - Shows real-time execution logs                       │  │
│  │ - Intent: BUILD (badge)                                │  │
│  │ - Action: START_BUILD                                  │  │
│  │ - Status messages with timestamps                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ SessionInfo Component                                  │  │
│  │ - Session ID: uuid...                                  │  │
│  │ - Status: active                                       │  │
│  │ - Commands: 1                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

## Intent Detection Flow

```
User Input: "Build a todo app"
    │
    ▼
┌──────────────────────────────┐
│ IntentDetector.detect_intent │
└──────────────────────────────┘
    │
    ├─ Keyword matching
    ├─ Pattern recognition
    └─ Optional: LLM inference
    │
    ▼
┌──────────────────────────────┐
│ Intent Classification        │
├──────────────────────────────┤
│ BUILD     - Create new       │
│ EDIT      - Modify existing  │
│ FIX       - Debug/fix issues │
│ EXPLAIN   - Explain code     │
│ CHAT      - General question │
└──────────────────────────────┘
    │
    ▼
┌──────────────────────────────┐
│ Return Intent Result         │
│ {                            │
│   intent: "BUILD",          │
│   confidence: 0.95          │
│ }                            │
└──────────────────────────────┘
```

## Memory Architecture

```
┌────────────────────────────────────────┐
│      HOT STATE (Redis)                  │
│  Fast, in-memory, session data         │
├────────────────────────────────────────┤
│ Key: session:{session_id}              │
│ Value: {                               │
│   session_id: "...",                  │
│   user_id: "...",                     │
│   created_at: "...",                  │
│   commands: [...],                    │
│   last_intent: "BUILD",               │
│   status: "active"                    │
│ }                                      │
│                                        │
│ TTL: Usually 24 hours                 │
│ Use Case: Active sessions             │
└────────────────────────────────────────┘
              │
              │ Flush to cold storage
              │ after session expires
              ▼
┌────────────────────────────────────────┐
│      COLD STATE (MongoDB)               │
│  Persistent, searchable, historical    │
├────────────────────────────────────────┤
│ Collections:                           │
│                                        │
│ users                                  │
│ ├─ user_id (PK)                       │
│ ├─ email                               │
│ └─ created_at                          │
│                                        │
│ conversations                          │
│ ├─ conversation_id (PK)               │
│ ├─ user_id (FK)                       │
│ ├─ messages: [...]                    │
│ └─ created_at                          │
│                                        │
│ projects                               │
│ ├─ project_id (PK)                    │
│ ├─ user_id (FK)                       │
│ ├─ config                              │
│ └─ status                              │
└────────────────────────────────────────┘
```

## Module Responsibilities

```
┌─────────────────────────────────────────────────────────┐
│              API Layer (app/api/v1/)                     │
├─────────────────────────────────────────────────────────┤
│ command.py    - Command execution endpoint              │
│ session.py    - Session management CRUD                │
│ chat.py       - Chat interactions                       │
│ build.py      - Build operations                        │
│ check.py      - Validation/checking                     │
└─────────────────────────────────────────────────────────┘
                         ▲
                         │
┌─────────────────────────────────────────────────────────┐
│           Services Layer (app/services/)                │
├─────────────────────────────────────────────────────────┤
│ orchestrator.py         - Main router/dispatcher        │
│ intent_detector.py      - Intent classification        │
│ ai_provider.py          - LLM integration              │
│ builder.py              - Build service                │
│ checker.py              - Validation service           │
│ executor.py             - Execute tasks                │
└─────────────────────────────────────────────────────────┘
                         ▲
                         │
┌─────────────────────────────────────────────────────────┐
│            Core Layer (app/core/)                       │
├─────────────────────────────────────────────────────────┤
│ config.py       - Configuration management             │
│ constants.py    - Constants and enums                  │
│ security.py     - Authentication/security              │
└─────────────────────────────────────────────────────────┘
                         ▲
                         │
┌─────────────────────────────────────────────────────────┐
│           Memory Layer (app/memory/)                    │
├─────────────────────────────────────────────────────────┤
│ redis_client.py         - Redis operations             │
│ mongo_client.py         - MongoDB operations           │
│ state_manager.py        - Hot/Cold state management    │
└─────────────────────────────────────────────────────────┘
                         ▲
                         │
┌─────────────────────────────────────────────────────────┐
│          Agents (app/agents/ & app/executor/)           │
├─────────────────────────────────────────────────────────┤
│ backend_agent.py        - Backend code generation      │
│ frontend_agent.py       - Frontend code generation     │
│ qa_agent.py             - Testing and QA              │
│ executor.py             - Task execution               │
└─────────────────────────────────────────────────────────┘
```

## Request-Response Cycle

```
┌─────────────────────────────────────────────────────────┐
│ 1. User submits command from UI                         │
└─────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│ 2. Frontend makes API call                              │
│    POST /command/execute                                │
│    Headers: Content-Type: application/json              │
│    Body: {session_id, command, mode}                    │
└─────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Backend receives request                             │
│    CommandRequest validation (Pydantic)                │
└─────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│ 4. Orchestrator processes                               │
│    - Saves to Redis (hot memory)                        │
│    - Detects intent                                     │
│    - Routes to appropriate handler                      │
└─────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Handler processes request                            │
│    - Determine action based on intent                   │
│    - Prepare response                                   │
└─────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│ 6. Return CommandResponse                               │
│    {                                                     │
│      session_id,                                        │
│      command,                                           │
│      intent,                                            │
│      action,                                            │
│      message,                                           │
│      status                                             │
│    }                                                     │
└─────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│ 7. Frontend receives response                           │
│    HTTP 200 + JSON payload                              │
└─────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│ 8. Update UI components                                 │
│    - ChatHistory: Add messages                          │
│    - ExecutionLog: Update logs                          │
│    - SessionInfo: Update status                         │
└─────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────┐
│ 9. User sees results                                    │
│    Real-time feedback and next options                  │
└─────────────────────────────────────────────────────────┘
```

---

This architecture follows:
- **Separation of Concerns**: Each layer has specific responsibilities
- **SOLID Principles**: Single responsibility, dependency injection
- **API-First**: Clear contracts between frontend and backend
- **Scalability**: Can add agents, services, and handlers independently
- **Memory Efficiency**: Hot/Cold state separation
