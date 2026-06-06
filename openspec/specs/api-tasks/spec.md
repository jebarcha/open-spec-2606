## ADDED Requirements

### Requirement: List all tasks
The system SHALL provide a `GET /api/tasks` endpoint that returns an array of all tasks currently in memory.

#### Scenario: Returns empty array when no tasks exist
- **WHEN** `GET /api/tasks` is called and no tasks have been created
- **THEN** the response is HTTP 200 with body `[]`

#### Scenario: Returns all tasks
- **WHEN** `GET /api/tasks` is called after tasks have been created
- **THEN** the response is HTTP 200 with an array containing all task objects

### Requirement: Create a task
The system SHALL provide a `POST /api/tasks` endpoint that accepts a JSON body with `title` (required), `description` (optional), and `assignedTo` (optional). The server SHALL assign a unique `id` and set `status` to `"InProgress"`.

#### Scenario: Successful task creation
- **WHEN** `POST /api/tasks` is called with a valid JSON body containing a title
- **THEN** the response is HTTP 201 with the created task object including a generated id and status "InProgress"

#### Scenario: Missing title returns 400
- **WHEN** `POST /api/tasks` is called without a title field
- **THEN** the response is HTTP 400 with a descriptive error message

### Requirement: Get a single task
The system SHALL provide a `GET /api/tasks/:id` endpoint that returns the task with the given id.

#### Scenario: Task found
- **WHEN** `GET /api/tasks/:id` is called with an existing task id
- **THEN** the response is HTTP 200 with the task object

#### Scenario: Task not found returns 404
- **WHEN** `GET /api/tasks/:id` is called with a non-existent id
- **THEN** the response is HTTP 404

### Requirement: Update a task
The system SHALL provide a `PATCH /api/tasks/:id` endpoint that accepts partial task fields and updates the task in memory.

#### Scenario: Successful status update
- **WHEN** `PATCH /api/tasks/:id` is called with a valid status value
- **THEN** the response is HTTP 200 with the updated task object reflecting the new status

#### Scenario: Invalid status value returns 400
- **WHEN** `PATCH /api/tasks/:id` is called with a status value not in the allowed enum (ToDo, InProgress, Review, Done)
- **THEN** the response is HTTP 400 with a descriptive error message

#### Scenario: Update non-existent task returns 404
- **WHEN** `PATCH /api/tasks/:id` is called with a non-existent id
- **THEN** the response is HTTP 404

### Requirement: Delete a task
The system SHALL provide a `DELETE /api/tasks/:id` endpoint that removes the task from memory.

#### Scenario: Successful deletion
- **WHEN** `DELETE /api/tasks/:id` is called with an existing task id
- **THEN** the response is HTTP 204 and the task no longer appears in `GET /api/tasks`

#### Scenario: Delete non-existent task returns 404
- **WHEN** `DELETE /api/tasks/:id` is called with a non-existent id
- **THEN** the response is HTTP 404

### Requirement: CORS enabled
The backend SHALL enable CORS so the Vite dev server (default port 5173) can communicate with the Express server without browser cross-origin errors.

#### Scenario: Preflight request succeeds
- **WHEN** a preflight OPTIONS request is sent to any `/api/*` endpoint from origin `http://localhost:5173`
- **THEN** the response includes appropriate CORS headers and HTTP 204
