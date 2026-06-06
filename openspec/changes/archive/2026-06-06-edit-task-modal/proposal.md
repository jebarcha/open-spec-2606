## Why

Tasks on the board are read-only — once created, their title, description, and assignee cannot be changed without deleting and recreating the card. Users need a frictionless way to correct or update task details in place.

## What Changes

- Clicking a task card opens a unified **TaskModal** in edit mode, pre-populated with the task's current title, description, and assignee
- The modal displays the task's current **status as read-only** context (status changes remain drag-only)
- The modal includes a **Delete** button to remove the task
- Task cards gain a **drag handle** (grip icon); only the handle initiates drag-and-drop — the rest of the card surface becomes the click target
- `CreateTaskModal` is replaced by a unified `TaskModal` component that handles both create and edit modes
- A new `updateTask` and `deleteTask` function are added to the client API layer (server `PATCH` and `DELETE` endpoints already exist)

## Capabilities

### New Capabilities
- `task-editing`: Edit and delete an existing task via a modal; covers the edit modal UI, field validation, drag handle UX, and task deletion

### Modified Capabilities
- `task-board`: Card interaction model changes — cards become clickable (edit trigger) and gain a visible drag handle; the existing requirement that "cards SHALL NOT contain any buttons or interactive controls" must be updated to permit the drag handle
- `task-management`: New edit-task and delete-task requirements are added to the task lifecycle

## Impact

- **Client components**: `TaskCard`, `DraggableTaskCard`, `CreateTaskModal` (→ `TaskModal`), `Lane`, `Board`, `App`
- **Client API**: `api.ts` — add `updateTask(id, data)` and `deleteTask(id)`
- **Server**: No changes required — `PATCH /api/tasks/:id` and `DELETE /api/tasks/:id` already implemented
- **Tests**: New unit tests for `TaskModal` (edit mode, delete flow); updated E2E test for card click → edit → save and card click → delete flows
