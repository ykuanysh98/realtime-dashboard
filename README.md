# Real-time Dashboard

Production-ready dashboard with live metrics, WebSocket, JWT auth, and role-based UI.

## Stack

- Vue 3 + TypeScript + Vite
- Pinia (state management)
- WebSocket (native API, auto-reconnect)
- Docker + Nginx
- GitHub Actions CI/CD

## Quick Start

### Local development

```bash
npm install

# Terminal 1 — Mock WS server
node src/mock/ws-server.js

# Terminal 2 — Vue app
npm run dev
```

### Docker

```bash
docker-compose up --build
# App: http://localhost:3000
```

## Test accounts

| Email | Password | Role |
|-------|----------|------|
| admin@test.com | 123456 | admin |
| user@test.com  | 123456 | user  |

## Role differences

| Feature | Admin | User |
|---------|-------|------|
| All metrics | ✓ | — |
| CPU + Memory only | ✓ | ✓ |
| Admin Panel | ✓ | — |
| Activity Feed | ✓ | ✓ |

## Architecture