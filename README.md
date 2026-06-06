# Sprint Kanban Board

A full-stack Kanban board application built with React, Vite, TypeScript, Tailwind CSS (frontend) and Node.js, Express, TypeScript (backend).

## Prerequisites

- Node.js 18+
- npm 8+

## Setup

```bash
npm install
```

## Running the App

```bash
npm run dev
```

This starts both servers concurrently:
- **Frontend** (Vite): http://localhost:5173
- **Backend** (Express): http://localhost:3001

## Running Tests

### Unit & Integration Tests (Vitest + Supertest)

```bash
npm test
```

Or run individually:

```bash
# Server tests only
npm run test --workspace=server

# Client tests only
npm run test --workspace=client
```

### End-to-End Tests (Playwright)

Requires the app to be running (or Playwright will start it automatically via `webServer` config):

```bash
npm run test:e2e
```

## Project Structure

```
├── client/               # React frontend (Vite + TypeScript + Tailwind)
│   └── src/
│       ├── components/   # Board, Lane, TaskCard, CreateTaskModal, TeamPanel
│       ├── __tests__/    # Vitest + React Testing Library tests
│       ├── api.ts        # Typed fetch wrappers
│       └── types.ts      # Shared TypeScript types
├── server/               # Express backend (TypeScript)
│   └── src/
│       ├── routes/       # tasks.ts, teamMembers.ts
│       ├── middleware/    # validate.ts
│       ├── __tests__/    # Vitest + Supertest tests
│       ├── store.ts      # In-memory Map storage
│       └── types.ts      # Task, TeamMember interfaces
├── e2e/                  # Playwright end-to-end tests
└── openspec/             # Change management artifacts
```

## API Endpoints

### Tasks

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create task (`title` required, initial status: `InProgress`) |
| GET | `/api/tasks/:id` | Get task by id |
| PATCH | `/api/tasks/:id` | Update task (validates status enum) |
| DELETE | `/api/tasks/:id` | Delete task |

### Team Members

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/team-members` | List all team members |
| POST | `/api/team-members` | Create member (`name` required) |
| DELETE | `/api/team-members/:id` | Delete member |

## Task Status Values

`ToDo` | `InProgress` | `Review` | `Done`
