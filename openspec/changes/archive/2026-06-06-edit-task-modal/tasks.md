## 1. API Layer (client)

- [x] 1.1 Add `updateTask(id, data: { title, description?, assignedTo? })` to `client/src/api.ts` calling `PATCH /api/tasks/:id`
- [x] 1.2 Add `deleteTask(id)` to `client/src/api.ts` calling `DELETE /api/tasks/:id`

## 2. TaskModal — Failing Tests First

- [x] 2.1 Write failing unit test: create mode renders heading "Add Task" and submit button "Add Task"
- [x] 2.2 Write failing unit test: edit mode renders heading "Edit Task", submit button "Save Changes", and a Delete button
- [x] 2.3 Write failing unit test: edit mode pre-populates title, description, and assignee fields from the task prop
- [x] 2.4 Write failing unit test: edit mode displays current status as read-only (not editable)
- [x] 2.5 Write failing unit test: submitting with empty title shows validation error and does not call onSubmit
- [x] 2.6 Write failing unit test: pressing Escape calls onClose without submitting

## 3. TaskModal — Implementation

- [x] 3.1 Create `client/src/components/TaskModal.tsx` accepting optional `task` prop (edit mode when present)
- [x] 3.2 Pre-populate title, description, and assignee state from `task` prop in edit mode
- [x] 3.3 Render current status as a read-only field in edit mode
- [x] 3.4 Render Delete button in edit mode; wire to `onDelete` prop
- [x] 3.5 Set modal heading and submit button label based on mode (create vs edit)
- [x] 3.6 Replace all imports of `CreateTaskModal` with `TaskModal` across the codebase; delete `CreateTaskModal.tsx`

## 4. TaskCard & DraggableTaskCard — Failing Tests First

- [x] 4.1 Write failing unit test: task card renders a grip handle element with grab cursor
- [x] 4.2 Write failing unit test: clicking the card body (not handle) calls `onTaskClick` with the task
- [x] 4.3 Write failing unit test: clicking the drag handle does not call `onTaskClick`

## 5. TaskCard & DraggableTaskCard — Implementation

- [x] 5.1 Add a grip handle element (⠿ icon, `cursor-grab`) to `TaskCard`; expose it as the drag affordance
- [x] 5.2 Accept `onTaskClick` prop in `DraggableTaskCard`; attach `onClick` to the card wrapper calling `onTaskClick(task)`
- [x] 5.3 Move `{...listeners}` from the card wrapper div onto the handle element in `DraggableTaskCard`
- [x] 5.4 Add `e.stopPropagation()` on the handle's `onClick` to prevent triggering the card's click handler

## 6. Wiring (Lane → Board → App)

- [x] 6.1 Add `onTaskClick` prop to `Lane`; thread it down to each `DraggableTaskCard`
- [x] 6.2 Add `onTaskClick` prop to `Board`; thread it down to each `Lane`
- [x] 6.3 Add `editingTask` state (`Task | null`) to `App`; pass `setEditingTask` as `onTaskClick` through `Board`
- [x] 6.4 Render `TaskModal` in edit mode in `App` when `editingTask` is set; pass `editingTask` as the `task` prop
- [x] 6.5 Implement `handleTaskUpdate` in `App`: call `updateTask`, refresh task list, clear `editingTask`
- [x] 6.6 Implement `handleTaskDelete` in `App`: call `deleteTask`, refresh task list, clear `editingTask`

## 7. E2E Tests

- [x] 7.1 Write E2E test: clicking a card body opens the edit modal with the task's current title, description, and assignee pre-filled
- [x] 7.2 Write E2E test: editing task fields in the modal and saving updates the card on the board
- [x] 7.3 Write E2E test: clicking Delete in the edit modal removes the card from the board
- [x] 7.4 Write E2E test: pressing Escape in the edit modal closes it without modifying the task
- [x] 7.5 Write E2E test: dragging via the grip handle moves the card to a different lane (regression check)
