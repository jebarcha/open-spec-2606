## ADDED Requirements

### Requirement: Four-lane board layout
The system SHALL display exactly four vertical lanes ordered left to right: **To Do**, **In Progress**, **Review**, and **Done**. Lane titles SHALL be clearly visible and styled. All four lanes SHALL be simultaneously visible at FHD resolution (1920×1080) without horizontal scrolling.

#### Scenario: Board renders all four lanes on load
- **WHEN** the user navigates to the root URL
- **THEN** the board displays four lanes with titles "To Do", "In Progress", "Review", and "Done" visible without scrolling at 1920×1080

### Requirement: Lane colour palette
The system SHALL apply a Trello-inspired colour palette to lanes and task cards (blue, green, orange, purple tones).

#### Scenario: Lanes have distinct background colours
- **WHEN** the board is rendered
- **THEN** each lane has a visually distinct background colour consistent with the Trello-inspired palette

### Requirement: Task card display
Each task card SHALL show the task title, a truncated portion of the description, and the assigned team member name (assignedTo). Cards SHALL NOT contain any buttons or interactive controls beyond those required for drag-and-drop.

#### Scenario: Card shows title, description excerpt, and assignee
- **WHEN** a task with title, description, and assignedTo exists on the board
- **THEN** the card displays the title, a readable excerpt of the description, and the assignee name

#### Scenario: Card shows no extra buttons
- **WHEN** a task card is rendered on the board
- **THEN** no buttons or actionable controls are visible on the card surface itself

### Requirement: Drag-and-drop between lanes
The system SHALL allow users to drag a task card from any lane and drop it onto any other lane (forward and backward transitions both allowed). On successful drop, the card SHALL move to the target lane and the task's status SHALL be updated.

#### Scenario: Drag card forward from To Do to In Progress
- **WHEN** the user drags a card from the "To Do" lane and drops it on the "In Progress" lane
- **THEN** the card appears in "In Progress" and its status is updated to "InProgress"

#### Scenario: Drag card backward from Done to Review
- **WHEN** the user drags a card from the "Done" lane and drops it on the "Review" lane
- **THEN** the card appears in "Review" and its status is updated to "Review"

#### Scenario: Drag-and-drop smooth animation
- **WHEN** the user begins dragging a card
- **THEN** the card follows the cursor with a visible drag overlay and the source lane shows a placeholder
