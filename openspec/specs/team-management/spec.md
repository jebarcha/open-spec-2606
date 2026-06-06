## ADDED Requirements

### Requirement: Team member data model
Each team member SHALL carry the following fields: `id` (unique, system-generated) and `name` (string, required).

#### Scenario: Team member has id and name after creation
- **WHEN** a team member is created via the API
- **THEN** the response body includes both id and name fields

### Requirement: Manage team members via UI
The system SHALL provide a simple UI to add and remove team members so they become available for task assignment.

#### Scenario: Add a team member
- **WHEN** the user submits the add-team-member form with a name
- **THEN** the new team member appears in the team member list and in the task assignment dropdown

#### Scenario: Team member name is required
- **WHEN** the user submits the add-team-member form without a name
- **THEN** the form prevents submission and displays a validation error

### Requirement: Assign team member to task
The create-task modal SHALL include an optional dropdown populated with all available team members. Selecting a team member sets the task's `assignedTo` field to that member's name.

#### Scenario: Dropdown lists all team members
- **WHEN** the user opens the create-task modal and at least one team member exists
- **THEN** the assignment dropdown lists all available team members by name

#### Scenario: Task created with no assignment has empty assignedTo
- **WHEN** the user creates a task without selecting a team member
- **THEN** the task's assignedTo field is empty/null
