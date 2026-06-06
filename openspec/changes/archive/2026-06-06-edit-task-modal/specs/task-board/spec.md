## MODIFIED Requirements

### Requirement: Task card display
Each task card SHALL show the task title, a truncated portion of the description, and the assigned team member name (assignedTo). Each card SHALL include a visible drag handle (grip icon) as the sole control for initiating drag-and-drop. The card body (outside the drag handle) SHALL be clickable to open the task edit modal. No other buttons or interactive controls SHALL appear on the card surface.

#### Scenario: Card shows title, description excerpt, and assignee
- **WHEN** a task with title, description, and assignedTo exists on the board
- **THEN** the card displays the title, a readable excerpt of the description, and the assignee name

#### Scenario: Card shows drag handle
- **WHEN** a task card is rendered on the board
- **THEN** a grip icon drag handle is visible on the card with a grab cursor

#### Scenario: Card body click opens edit modal
- **WHEN** the user clicks the card body (not the drag handle)
- **THEN** the edit modal opens for that task
