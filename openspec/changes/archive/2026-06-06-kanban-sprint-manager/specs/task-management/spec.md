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
