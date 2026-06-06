## ADDED Requirements

### Requirement: Create task
The system SHALL provide a form/modal to create a new task with fields: title (required), description (optional), and an optional dropdown to assign a team member. The initial status of a newly created task SHALL be "InProgress".

#### Scenario: Create task with title only
- **WHEN** the user submits the create-task form with only a title
- **THEN** a new task is created with that title, empty description, no assignee, and status "InProgress"

#### Scenario: Create task with all fields
- **WHEN** the user submits the create-task form with title, description, and a selected team member
- **THEN** a new task is created with all provided fields and status "InProgress"

#### Scenario: Create task without title is rejected
- **WHEN** the user attempts to submit the create-task form without a title
- **THEN** the form prevents submission and displays a validation error

### Requirement: View task details on card
The system SHALL display the task title, description excerpt, and assignee name directly on the card so they are readable from the board without further interaction.

#### Scenario: Task details visible on board
- **WHEN** a task exists in any lane
- **THEN** its title, partial description, and assignee (if set) are visible on the card

### Requirement: Task status update via drag-and-drop
The system SHALL update a task's status field whenever the card is dropped into a different lane. Status values SHALL map to lanes: "ToDo" ↔ To Do, "InProgress" ↔ In Progress, "Review" ↔ Review, "Done" ↔ Done.

#### Scenario: Status updates to target lane value on drop
- **WHEN** the user drops a task card on a lane
- **THEN** the task's status is updated to the corresponding enum value for that lane

### Requirement: Task data model
Each task SHALL carry the following fields: `id` (unique, system-generated), `title` (string, required), `description` (string, optional), `status` (enum: ToDo | InProgress | Review | Done), `assignedTo` (string, optional).

#### Scenario: Task has all required fields after creation
- **WHEN** a task is created via the API
- **THEN** the response body includes id, title, description, status, and assignedTo fields

### Requirement: Edit task fields
The system SHALL provide a mechanism to update an existing task's title, description, and assignedTo fields. Title SHALL remain required and non-empty after editing. The task's status SHALL NOT be modifiable through the edit mechanism.

#### Scenario: Update task title via API
- **WHEN** a PATCH request is sent to /api/tasks/:id with a new title
- **THEN** the task is updated and the response body reflects the new title

#### Scenario: Update task description and assignee via API
- **WHEN** a PATCH request is sent to /api/tasks/:id with updated description and assignedTo values
- **THEN** the task is updated and the response body reflects the new values

#### Scenario: Edit with empty title is rejected
- **WHEN** a PATCH request is sent to /api/tasks/:id with an empty or blank title
- **THEN** the server responds with a 400 error

### Requirement: Delete task
The system SHALL allow a task to be permanently deleted. Once deleted, the task SHALL no longer appear on the board and SHALL NOT be retrievable.

#### Scenario: Delete task via API
- **WHEN** a DELETE request is sent to /api/tasks/:id for an existing task
- **THEN** the server responds with 204 and the task no longer exists

#### Scenario: Delete non-existent task returns 404
- **WHEN** a DELETE request is sent to /api/tasks/:id for a task that does not exist
- **THEN** the server responds with 404
