## ADDED Requirements

### Requirement: List all team members
The system SHALL provide a `GET /api/team-members` endpoint that returns an array of all team members currently in memory.

#### Scenario: Returns empty array when no team members exist
- **WHEN** `GET /api/team-members` is called and no team members have been created
- **THEN** the response is HTTP 200 with body `[]`

#### Scenario: Returns all team members
- **WHEN** `GET /api/team-members` is called after team members have been created
- **THEN** the response is HTTP 200 with an array containing all team member objects

### Requirement: Create a team member
The system SHALL provide a `POST /api/team-members` endpoint that accepts a JSON body with `name` (required) and assigns a unique `id`.

#### Scenario: Successful team member creation
- **WHEN** `POST /api/team-members` is called with a valid JSON body containing a name
- **THEN** the response is HTTP 201 with the created team member object including a generated id and the provided name

#### Scenario: Missing name returns 400
- **WHEN** `POST /api/team-members` is called without a name field
- **THEN** the response is HTTP 400 with a descriptive error message

### Requirement: Delete a team member
The system SHALL provide a `DELETE /api/team-members/:id` endpoint that removes the team member from memory.

#### Scenario: Successful deletion
- **WHEN** `DELETE /api/team-members/:id` is called with an existing team member id
- **THEN** the response is HTTP 204 and the team member no longer appears in `GET /api/team-members`

#### Scenario: Delete non-existent team member returns 404
- **WHEN** `DELETE /api/team-members/:id` is called with a non-existent id
- **THEN** the response is HTTP 404
