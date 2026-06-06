## 1. Project Scaffold & Monorepo Setup

- [x] 1.1 Create root `package.json` with workspaces for `client/` and `server/`, add `concurrently` dev dependency, and add `dev` script running both Vite and the Express server
- [x] 1.2 Scaffold `server/` with `package.json`, `tsconfig.json` (strict mode), and entry point `src/index.ts`
- [x] 1.3 Scaffold `client/` with Vite + React + TypeScript template, add Tailwind CSS, and configure `vite.config.ts` with proxy to `http://localhost:3001`
- [x] 1.4 Verify `npm run dev` from root starts both servers without errors

## 2. Backend: Shared Types & In-Memory Store

- [x] 2.1 Define `Task` and `TeamMember` TypeScript interfaces in `server/src/types.ts` with all required fields (no `any`)
- [x] 2.2 Create `server/src/store.ts` exporting `tasksStore: Map<string, Task>` and `membersStore: Map<string, TeamMember>` singletons with a `resetStore()` helper for test isolation

## 3. Backend: Team Members API (TDD)

- [x] 3.1 **[RED]** Write failing Supertest tests for `GET /api/team-members` (empty array), `POST /api/team-members` (201 success, 400 missing name), `DELETE /api/team-members/:id` (204 success, 404 not found)
- [x] 3.2 **[GREEN]** Implement `server/src/routes/teamMembers.ts` Express router with all endpoints to make tests pass
- [x] 3.3 **[REFACTOR]** Extract request validation into a shared middleware, ensure no `any` types remain

## 4. Backend: Tasks API (TDD)

- [x] 4.1 **[RED]** Write failing Supertest tests for `GET /api/tasks`, `POST /api/tasks` (201 success with status "InProgress", 400 missing title), `GET /api/tasks/:id` (200 found, 404 not found), `PATCH /api/tasks/:id` (200 valid status, 400 invalid status, 404 not found), `DELETE /api/tasks/:id` (204 success, 404 not found)
- [x] 4.2 **[GREEN]** Implement `server/src/routes/tasks.ts` Express router with all endpoints and status-enum validation to make tests pass
- [x] 4.3 **[REFACTOR]** Centralise status validation logic, ensure consistent error response shape across all endpoints

## 5. Backend: Server Entry Point & CORS

- [x] 5.1 **[RED]** Write a Supertest test verifying CORS headers are present on a preflight OPTIONS request to `/api/tasks`
- [x] 5.2 **[GREEN]** Wire up `cors` middleware and mount both routers in `server/src/index.ts`, make CORS test pass
- [x] 5.3 Confirm `npm run dev` serves both `GET /api/tasks` and `GET /api/team-members` returning HTTP 200

## 6. Frontend: API Client & Shared Types

- [x] 6.1 Copy or re-export `Task` and `TeamMember` types into `client/src/types.ts`
- [x] 6.2 Create `client/src/api.ts` with typed fetch wrappers for all task and team-member endpoints (no `any`)

## 7. Frontend: Team Management UI (TDD)

- [x] 7.1 **[RED]** Write Vitest + React Testing Library tests for `TeamPanel` component: add-member form requires name, new member appears in list after submission, validation error shown when name empty
- [x] 7.2 **[GREEN]** Implement `client/src/components/TeamPanel.tsx` with add-member input, submit button, and member list to make tests pass
- [x] 7.3 **[REFACTOR]** Ensure Tailwind classes follow Trello-inspired palette and component has no TypeScript errors

## 8. Frontend: Task Card Component (TDD)

- [x] 8.1 **[RED]** Write Vitest + RTL tests for `TaskCard` component: renders title, description excerpt, and assignee name; renders no buttons on the card surface
- [x] 8.2 **[GREEN]** Implement `client/src/components/TaskCard.tsx` displaying title, truncated description, and assignee with Trello-inspired styling to make tests pass
- [x] 8.3 **[REFACTOR]** Verify no interactive controls exist on the card surface and Tailwind classes are clean

## 9. Frontend: Lane Component (TDD)

- [x] 9.1 **[RED]** Write Vitest + RTL tests for `Lane` component: renders correct lane title, only shows tasks matching the lane's status, displays empty state when no matching tasks
- [x] 9.2 **[GREEN]** Implement `client/src/components/Lane.tsx` filtering tasks by status and rendering `TaskCard` children to make tests pass
- [x] 9.3 **[REFACTOR]** Apply distinct Trello-inspired background colour per lane via Tailwind, ensure all four lanes fit at 1920×1080 without scroll

## 10. Frontend: Create Task Modal (TDD)

- [x] 10.1 **[RED]** Write Vitest + RTL tests for `CreateTaskModal` component: submit with only title calls handler with correct data and status "InProgress"; submit without title shows validation error; team-member dropdown lists all provided members
- [x] 10.2 **[GREEN]** Implement `client/src/components/CreateTaskModal.tsx` with title input, description textarea, team-member dropdown, and submit/cancel buttons to make tests pass
- [x] 10.3 **[REFACTOR]** Ensure modal is accessible (focus trap, escape to close) and TypeScript strict

## 11. Frontend: Drag-and-Drop Integration (TDD)

- [x] 11.1 Add `@dnd-kit/core` and `@dnd-kit/sortable` to `client/package.json`
- [x] 11.2 **[RED]** Write Vitest + RTL test for `Board` component: dropping a card on a different lane triggers the status-update callback with the correct task id and new status
- [x] 11.3 **[GREEN]** Implement `client/src/components/Board.tsx` wrapping lanes in `DndContext`, handle `onDragEnd` to compute target lane status and call `PATCH /api/tasks/:id` to make tests pass
- [x] 11.4 **[REFACTOR]** Add drag overlay for smooth animation, verify all four lanes accept drops

## 12. Frontend: App Integration & Wiring

- [x] 12.1 Implement `client/src/App.tsx` composing `Board` and `TeamPanel`, loading tasks and team members from the API on mount
- [x] 12.2 Verify the "Add Task" button opens `CreateTaskModal` and new tasks appear on the board in the "In Progress" lane immediately after creation
- [x] 12.3 Confirm all four lanes are visible at 1920×1080 with no horizontal overflow

## 13. End-to-End Tests with Playwright

- [x] 13.1 Install Playwright and create `e2e/` directory with `playwright.config.ts` pointing to `http://localhost:5173`
- [x] 13.2 **[RED]** Write E2E test: drag a task card from "To Do" lane to "In Progress" lane and assert the card is visible in "In Progress" and absent from "To Do"
- [x] 13.3 **[GREEN]** Ensure the drag-and-drop implementation passes the Playwright test (fix any selector or timing issues)
- [x] 13.4 **[RED]** Write E2E test: after drag-and-drop, verify `GET /api/tasks` returns the task with updated status
- [x] 13.5 **[GREEN]** Confirm API status update test passes end-to-end

## 14. Final Verification & Cleanup

- [x] 14.1 Run full test suite (`npm test` from root) and confirm all Vitest and Supertest tests pass
- [x] 14.2 Run Playwright E2E suite and confirm all tests pass
- [x] 14.3 Run TypeScript compiler (`tsc --noEmit`) in both `client/` and `server/` and fix any type errors
- [x] 14.4 Write `README.md` with setup instructions, `npm run dev` command, and test commands
