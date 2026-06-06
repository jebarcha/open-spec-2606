## Context

The board currently renders tasks as static, display-only cards wrapped in a dnd-kit draggable. The `CreateTaskModal` handles task creation. The server already exposes `PATCH /api/tasks/:id` and `DELETE /api/tasks/:id` — no backend work is needed. All changes are front-end only.

Current component tree:
```
App
└── Board (tasks, onTaskStatusChange)
      └── Lane (tasks)
            └── DraggableTaskCard (task)
                  └── TaskCard (task)          ← display only today
```

The drag system uses `useDraggable` from `@dnd-kit/core` with pointer event listeners spread across the entire card div.

## Goals / Non-Goals

**Goals:**
- Clicking a card body opens an edit modal pre-populated with the task's current fields
- The modal allows editing title, description, and assignee; status is shown read-only
- A Delete button in the modal allows task removal
- Drag-and-drop is preserved using a dedicated grip handle
- `CreateTaskModal` is replaced by a unified `TaskModal` used for both create and edit

**Non-Goals:**
- Inline editing directly on the card (modal approach only)
- Editing task status via the modal (drag-only)
- Optimistic updates — wait for server confirmation before updating local state
- Multi-select or bulk edit

## Decisions

### 1. Drag handle vs. distance threshold

**Decision**: Add a visible drag handle (grip icon, `⠿`) as the sole drag initiator. The `{...listeners}` from `useDraggable` are applied only to the handle element, not the card wrapper.

**Rationale**: A distance threshold (e.g. `activationConstraint: { distance: 8 }`) would allow an `onClick` to coexist, but introduces a subtle race: a slow drag under 8px fires the click handler. A dedicated handle is unambiguous — no threshold tricks, no accidental modal opens mid-drag. It also makes the affordance visible.

**Alternative considered**: Distance-constraint approach — rejected due to the ambiguous interaction on slow drags.

### 2. Unified TaskModal

**Decision**: Replace `CreateTaskModal` with a single `TaskModal` component that accepts an optional `task` prop. When `task` is provided → edit mode (pre-populated, shows status, shows Delete button). When absent → create mode.

**Rationale**: The fields are identical (title, description, assignee). A single component avoids duplicated form logic and keeps the modal behavior consistent. The `onSubmit` signature stays the same (`{ title, description?, assignedTo? }`); a separate `onDelete` prop is added for edit mode.

**Alternative considered**: Separate `EditTaskModal` — simpler isolation, but redundant form code that diverges over time.

### 3. Edit modal state ownership

**Decision**: `editingTask` state lives in `App.tsx`. The `onTaskClick` callback is threaded down through `Board → Lane → DraggableTaskCard`.

**Rationale**: `App` already owns `tasks` state and `members` state (needed for the assignee dropdown). Keeping the modal in `App` avoids passing `members` and `onTaskUpdate`/`onTaskDelete` down into `Board`. The extra prop-threading through `Lane` and `DraggableTaskCard` is shallow (one prop each).

**Alternative considered**: Modal state in `Board` — avoids threading `onTaskClick` down but requires `Board` to receive `members`, `onTaskUpdate`, and `onTaskDelete`, which broadens `Board`'s interface more than threading one callback.

### 4. API layer additions

**Decision**: Add two new functions to `api.ts`:
- `updateTask(id, data: { title, description?, assignedTo? })` → `PATCH /api/tasks/:id`
- `deleteTask(id)` → `DELETE /api/tasks/:id`

`updateTaskStatus` remains unchanged (used by drag-and-drop).

## Risks / Trade-offs

- **Drag handle discoverability** → The grip icon (`⠿`) must be visually distinct enough that users understand it's the drag target. Mitigation: use a recognizable icon, style with `cursor-grab`, and keep it in a consistent position (top-left of card).
- **Click target on the drag handle** → The handle element must `stopPropagation` on click to prevent accidentally opening the modal when the user grabs it. Mitigation: `onClick={e => e.stopPropagation()}` on the handle div.
- **`TaskModal` complexity creep** → A unified modal with two modes can become hard to follow. Mitigation: keep mode-switching logic to a single `isEditMode` derived boolean; no conditional hooks.
- **DraggableTaskCard interface change** → Adding `onTaskClick` prop is a minor breaking change to the internal API. Since `Lane` is the only consumer, the blast radius is contained.
