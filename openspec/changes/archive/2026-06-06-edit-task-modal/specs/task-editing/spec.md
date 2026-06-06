## ADDED Requirements

### Requirement: Edit task via modal
The system SHALL allow users to edit an existing task's title, description, and assignee by clicking on the task card body. Clicking SHALL open a modal pre-populated with the task's current field values. The task's current status SHALL be displayed as a read-only field inside the modal. On submission, the task SHALL be updated and the modal SHALL close.

#### Scenario: Click card body opens edit modal
- **WHEN** the user clicks on the body of a task card (not the drag handle)
- **THEN** a modal opens pre-populated with the task's current title, description, assignee, and a read-only display of its current status

#### Scenario: Edit task with updated title
- **WHEN** the user changes the title in the edit modal and submits
- **THEN** the task is updated with the new title and the modal closes

#### Scenario: Edit task with updated description and assignee
- **WHEN** the user changes the description and assignee in the edit modal and submits
- **THEN** the task is updated with the new description and assignee values

#### Scenario: Edit task title cannot be cleared
- **WHEN** the user clears the title field in the edit modal and attempts to submit
- **THEN** the form prevents submission and displays a validation error

#### Scenario: Cancel edit modal discards changes
- **WHEN** the user opens the edit modal, modifies any field, then clicks Cancel or presses Escape
- **THEN** the modal closes and the task retains its original values

### Requirement: Delete task via modal
The system SHALL allow users to delete an existing task from within the edit modal. The edit modal SHALL include a Delete button. On confirmation, the task SHALL be permanently removed from the board.

#### Scenario: Delete button removes task
- **WHEN** the user opens the edit modal for a task and clicks the Delete button
- **THEN** the task is removed from the board and the modal closes

### Requirement: Drag handle as sole drag initiator
The system SHALL restrict drag-and-drop initiation to a dedicated drag handle element visible on each task card. Clicking or interacting with any part of the card outside the drag handle SHALL NOT initiate a drag. The drag handle SHALL be visually distinct (grip icon) and carry a grab cursor.

#### Scenario: Dragging via handle moves the card
- **WHEN** the user presses and drags the grip handle on a task card
- **THEN** the drag overlay appears and the card can be dropped into a different lane

#### Scenario: Clicking outside handle does not initiate drag
- **WHEN** the user clicks or briefly presses on the card body (not the handle)
- **THEN** no drag is initiated and the edit modal opens instead

### Requirement: Unified TaskModal for create and edit
The system SHALL use a single TaskModal component for both creating and editing tasks. In create mode the modal title SHALL be "Add Task" and the submit button SHALL read "Add Task". In edit mode the modal title SHALL be "Edit Task", the submit button SHALL read "Save Changes", and a Delete button SHALL be present.

#### Scenario: Create mode shows correct labels
- **WHEN** the TaskModal is opened in create mode (no existing task)
- **THEN** the modal heading reads "Add Task" and the submit button reads "Add Task"

#### Scenario: Edit mode shows correct labels and delete button
- **WHEN** the TaskModal is opened in edit mode (with an existing task)
- **THEN** the modal heading reads "Edit Task", the submit button reads "Save Changes", and a Delete button is visible
