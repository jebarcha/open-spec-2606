## ADDED Requirements

### Requirement: Frontend unit tests with Vitest and React Testing Library
The system SHALL include Vitest and React Testing Library tests for frontend components. Tests SHALL verify card rendering and lane filtering behaviour.

#### Scenario: Task card renders title, description, and assignee
- **WHEN** a TaskCard component is rendered with task data
- **THEN** the title, description excerpt, and assignee name are present in the rendered output

#### Scenario: Lane filters tasks by status
- **WHEN** a Lane component is rendered with a list of tasks of mixed statuses
- **THEN** only tasks matching the lane's status are displayed

#### Scenario: Create task form submits correct data
- **WHEN** the user fills in the create-task form and submits
- **THEN** the form calls the create handler with the correct title, description, and assignedTo values

### Requirement: Backend API integration tests with Vitest and Supertest
The system SHALL include Supertest integration tests for all Express API endpoints. Tests SHALL cover data validation, successful task creation, and status updates.

#### Scenario: POST /api/tasks returns 201 with valid body
- **WHEN** a POST request is sent to /api/tasks with a valid title
- **THEN** the response status is 201 and the body contains the created task

#### Scenario: POST /api/tasks returns 400 when title is missing
- **WHEN** a POST request is sent to /api/tasks without a title
- **THEN** the response status is 400

#### Scenario: PATCH /api/tasks/:id rejects invalid status
- **WHEN** a PATCH request is sent to /api/tasks/:id with an invalid status value
- **THEN** the response status is 400

#### Scenario: POST /api/team-members returns 201 with valid body
- **WHEN** a POST request is sent to /api/team-members with a valid name
- **THEN** the response status is 201 and the body contains the created team member

### Requirement: End-to-end tests with Playwright
The system SHALL include Playwright E2E tests that verify drag-and-drop functionality and lane transitions in a real browser environment.

#### Scenario: Drag card between lanes updates its position
- **WHEN** the Playwright test drags a task card from the "To Do" lane to the "In Progress" lane
- **THEN** the card is no longer visible in "To Do" and is visible in "In Progress"

#### Scenario: Dragged card status persists after drop
- **WHEN** the Playwright test drops a task card on a different lane
- **THEN** a subsequent GET /api/tasks call returns the task with the updated status matching the target lane

### Requirement: TDD Red-Green-Refactor discipline
All tests SHALL be written before the implementation code they cover. The task list SHALL sequence: write failing test → implement code → refactor.

#### Scenario: Test exists before implementation for each behaviour
- **WHEN** any new behaviour is added to the system
- **THEN** a corresponding failing test exists in the codebase prior to the implementation commit
