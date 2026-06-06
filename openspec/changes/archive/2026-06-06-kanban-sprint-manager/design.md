## Context

This is a greenfield full-stack application. There is no existing codebase to migrate. The solution is a single-page Kanban board backed by an in-memory Express API. The frontend and backend must be startable with a single `npm run dev` command via a monorepo workspace (or concurrently script). TDD is mandatory; every behavioural unit is covered by a failing test before implementation.

## Goals / Non-Goals

**Goals:**
- Four-lane Kanban board (To Do, In Progress, Review, Done) with drag-and-drop support.
- RESTful API for task and team-member CRUD with in-memory storage and status-enum validation.
- Team-member assignment to tasks via a dropdown in the create/edit modal.
- Vitest + React Testing Library frontend tests, Supertest backend tests, Playwright E2E tests.
- TypeScript strict mode on both client and server; no `any`.
- Single `npm run dev` starts both Vite dev server and Express concurrently.

**Non-Goals:**
- Persistent storage (database, file system).
- Authentication or multi-tenancy.
- Real-time collaboration (websockets).
- Sprint planning, burndown charts, or velocity metrics.
- Deployment pipeline or containerisation.

## Decisions

### 1. Monorepo layout with `concurrently`
**Decision:** Root `package.json` with `client/` and `server/` workspaces; `npm run dev` uses `concurrently` to run `vite` (port 5173) and `ts-node-dev`/`tsx` (port 3001) simultaneously.  
**Rationale:** Keeps frontend and backend self-contained; no extra tooling (Nx, Turborepo) required for a project of this size.  
**Alternative considered:** Separate `npm start` commands — rejected for UX friction.

### 2. Drag-and-drop via `@dnd-kit/core`
**Decision:** Use `@dnd-kit/core` and `@dnd-kit/sortable` for drag-and-drop.  
**Rationale:** Actively maintained, accessible, tree-shakeable, and works well with React 18+. Provides a clean programmatic API for detecting over-lane drops.  
**Alternative considered:** `react-beautiful-dnd` — archived/unmaintained; `react-dnd` — lower-level, more boilerplate.

### 3. In-memory storage as plain TypeScript Maps
**Decision:** Server stores tasks and team members in `Map<string, Task>` / `Map<string, TeamMember>` module-level singletons. IDs generated with `crypto.randomUUID()`.  
**Rationale:** Simplest possible state — no ORM, no schema migrations, trivially resettable between test runs by re-importing the module.  
**Alternative considered:** SQLite in-memory — overkill given the no-persistence requirement.

### 4. API design — REST under `/api`
**Decision:**  
- `GET/POST /api/tasks`, `GET/PATCH/DELETE /api/tasks/:id`  
- `GET/POST /api/team-members`, `DELETE /api/team-members/:id`  
**Rationale:** Flat resource paths are sufficient; no nested routes needed.  
**Alternative considered:** GraphQL — over-engineered for a 2-resource CRUD API.

### 5. Status enum validation on the server
**Decision:** Express middleware validates that `status` field on task write/update is one of `'ToDo' | 'InProgress' | 'Review' | 'Done'`. Returns 400 with descriptive message on violation.  
**Rationale:** Prevents invalid state from entering memory; satisfies the brief's explicit validation requirement.

### 6. Tailwind CSS + Trello-inspired palette
**Decision:** Card and lane colours reference Trello's blue/green/orange/purple palette using Tailwind utility classes.  
**Rationale:** Brief explicitly asks for Trello-alike palette; Tailwind is already part of the required stack.

### 7. TDD with Red-Green-Refactor
**Decision:** Every spec scenario maps to a test written before any implementation code. Backend tests use Vitest + Supertest; frontend tests use Vitest + React Testing Library; E2E tests use Playwright.  
**Rationale:** Mandatory per brief. Test files are co-located (`*.test.ts` / `*.test.tsx`) except Playwright tests which live in `e2e/`.

## Risks / Trade-offs

- **In-memory reset on server restart** → Data loss is expected and acceptable per spec. No mitigation needed.
- **Drag-and-drop accessibility** → `@dnd-kit` provides keyboard support out of the box; no extra work required.
- **Concurrent dev server port conflicts** → Documented in README; users may need to free ports 5173/3001.
- **`@dnd-kit` bundle size** → Acceptable for a dev/demo app; tree-shaking keeps production build lean.
- **E2E flakiness with drag-and-drop** → Playwright's `dragTo` / `locator.dispatchEvent` will be used with explicit waits to reduce flakiness.
