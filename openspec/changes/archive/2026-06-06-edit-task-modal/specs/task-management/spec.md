## ADDED Requirements

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
