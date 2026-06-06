## Why

Teams need a lightweight, browser-based sprint task manager to visualise and manage work-in-progress without adopting a heavy external tool. Building a purpose-built Kanban board with a React/Node.js stack gives the team full control over the data model and workflow rules from day one.

## What Changes

- Introduce a new full-stack web application (React frontend + Express backend) that did not previously exist.
- Provide a four-lane Kanban board (To Do → In Progress → Review → Done) with drag-and-drop card movement.
- Expose a RESTful API for task and team-member CRUD backed by in-memory storage.
- Add unit, integration, and end-to-end (Playwright) tests following TDD Red-Green-Refactor.
- Scaffold a monorepo workspace so `npm run dev` starts both frontend and backend concurrently.

## Capabilities

### New Capabilities

- `task-board`: Kanban board UI with four lanes, drag-and-drop between lanes, and card display (title, description, assignee).
- `task-management`: Create, read, update, and delete task cards with fields: id, title, description, status, assignedTo.
- `team-management`: Manage team members (id, name) used for task assignment via a simple UI and API.
- `api-tasks`: RESTful Express endpoints for task CRUD with status-enum validation.
- `api-team-members`: RESTful Express endpoints for team-member CRUD.
- `testing-suite`: Vitest + React Testing Library frontend tests, Supertest backend API tests, and Playwright E2E drag-and-drop tests.

### Modified Capabilities

<!-- No existing capabilities — this is a greenfield application. -->

## Impact

- **New code**: `client/` (React/Vite/TypeScript/Tailwind) and `server/` (Node.js/Express/TypeScript) directories under a monorepo root.
- **Dependencies**: React, Vite, Tailwind CSS, `@dnd-kit` (or equivalent) for drag-and-drop, Express, cors, Vitest, Supertest, Playwright.
- **APIs**: `/api/tasks` and `/api/team-members` endpoints introduced; no existing APIs modified.
- **Data**: In-memory only — no persistence layer, state resets on server restart.
- **CORS**: Enabled on the backend to allow the Vite dev server to communicate with Express.
