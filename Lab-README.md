# Lab: Spec-Driven Development with OpenSpec

A hands-on workshop where you use the **OpenSpec** framework to drive the implementation of a full-stack React + Node.js Kanban board application from a plain-English brief — following Spec-Driven Development (SDD) and Test-Driven Development (TDD) throughout.

---

## What You Will Build

A single-tenant **Agile Sprint Task Manager** with a drag-and-drop Kanban board. The full brief is in [`initial-prompt.md`](./initial-prompt.md) — read it before starting.

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, @dnd-kit/core |
| Backend | Node.js, Express, TypeScript, in-memory storage |
| Unit / API tests | Vitest, React Testing Library, Supertest |
| End-to-end tests | Playwright |
| Methodology | TDD — Red → Green → Refactor |

---

## Prerequisites

### 1. Runtime

| Tool | Minimum | Recommended | Install |
|---|---|---|---|
| Node.js | 20 LTS | 22 LTS | [nodejs.org](https://nodejs.org) or [nvm](https://github.com/nvm-sh/nvm) |
| npm | 9 | bundled with Node | — |
| Git | any | latest | [git-scm.com](https://git-scm.com) |

#### Installing Node.js

**Option A — nvm (macOS / Linux, recommended)**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart your shell, then install and activate Node 22 LTS
nvm install 22
nvm use 22
nvm alias default 22
```

**Option B — fnm (macOS / Linux / Windows, fast alternative)**

```bash
# macOS / Linux
curl -fsSL https://fnm.vercel.app/install | bash

# Windows (PowerShell)
winget install Schniz.fnm

# Then install Node
fnm install 22
fnm use 22
fnm default 22
```

**Option C — Direct download (all platforms)**

Download the Node.js 22 LTS installer from [nodejs.org/en/download](https://nodejs.org/en/download) and follow the wizard. npm is bundled automatically.

#### Verify

```bash
node --version   # v20.x or higher
npm --version    # 9.x or higher
```

### 2. IDE

This workshop uses **Windsurf** (Codeium's AI IDE) for its `/opsx-*` slash-command integration with OpenSpec.

- Download: [codeium.com/windsurf](https://codeium.com/windsurf)
- The AI chat panel is where all OpenSpec slash commands are invoked.

> **Alternative:** Any editor works for the implementation phase, but the `/opsx-*` commands require an AI assistant that supports the OpenSpec workflow files.

### 3. OpenSpec CLI

Install the OpenSpec CLI globally:

```bash
npm install -g @fission-ai/openspec
```

Verify:

```bash
openspec --version
```

---

## Workshop Setup

### Step 1 — Get the repo

```bash
git clone <repo-url>
cd <repo-folder>
```

The repo contains only two files at this point:

```
initial-prompt.md   ← the project brief — read this first
Lab-README.md       ← this file
```

### Step 2 — Initialize OpenSpec

Run once from the project root. When prompted for AI tools, select **windsurf**:

```bash
openspec init --tools windsurf
```

This creates the workflow files under `.windsurf/workflows/` so the `/opsx-*` slash commands are available in the Windsurf AI chat panel.

Verify the setup:

```bash
openspec list     # should show no changes yet
openspec view     # opens the OpenSpec dashboard
```

### Step 3 — Configure the project context

Open `./openspec/config.yaml` and add the `context` block below the `schema` line. This context is injected into every AI prompt, so the more accurate it is, the better the generated specs and tasks will be.

```yaml
context: |
  Tech stack: TypeScript, React, Node.js
  Runtime: The app should be scaffolded to run frontend and backend together with a single command (npm run dev)
  Domain: scrum task manager
  TDD is REQUIRED: Follow Red-Green-Refactor, For every behavior in the specs, write test FIRST (failing), then implement.
  Add E2E test with Playwright to validate functionality
```

> **Why this matters:** OpenSpec uses this context when generating `proposal.md`, `design.md`, `specs/`, and `tasks.md`. Without it, the AI has to infer your stack and conventions from scratch on every command.

### Step 4 — Enable the Expanded Mode of OpenSpec

By default, OpenSpec installs with the `core` profile, which provides a minimal command set. This workshop uses the **expanded mode**, which unlocks step-by-step artifact control (`/opsx:new`, `/opsx:continue`), implementation verification (`/opsx:verify`), and more.

Run the following to switch to the expanded profile and pull the updated workflow files:

```bash
openspec config profile
openspec update
```

When prompted by `openspec config profile`, select the **expanded** (or **full**) option.

Verify the new commands are available by checking the workflow files:

```bash
ls .windsurf/workflows/
```

You should now see entries for `opsx-new.md`, `opsx-continue.md`, `opsx-verify.md`, and others.

> 📖 Reference: [Expanded/Full Workflow](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md#expandedfull-workflow-custom-selection)

---

## Workshop

### Exercise 1 — Build the Kanban Board from a Brief

In this exercise you will take `initial-prompt.md` through the full OpenSpec cycle — generating specs and a task list with the AI, then implementing the application with TDD.

#### Steps

**1. Confirm setup is ready**

Make sure you have completed all three steps in [Workshop Setup](#workshop-setup):
- OpenSpec CLI installed and `openspec init --tools windsurf` has been run
- The `context` block is present in `./openspec/config.yaml`
- Windsurf Cascade "Auto Execution" is set on "Turbo"
- Windsurf Cascade Model: "Claude Sonnet 4.6 Thinking"

---

**2. Create a new change from the project brief**

In the Windsurf AI chat panel, run:

```
/opsx-new @initial-prompt.md
```

The agent will read the brief and generate the change.

> 📂 **Checkpoint:** Open the `openspec/` folder. What files and folders were created? 

---

**3. Generate the remaining artifacts one at a time**

Run the following command in the AI chat panel:

```
/opsx-continue
```

Each invocation produces the next artifact in sequence (`proposal.md``design.md` → `specs/` → `tasks.md`). After each run:

> 📂 **Checkpoint:** Review what was added to `openspec/`. Read the new artifact — do the decisions and requirements match your expectations? Edit the file directly if you want to adjust anything before proceeding.

Repeat `/opsx-continue` until the agent indicates all artifacts are complete and suggests running `/opsx-apply`.

---

**4. Review the task list before implementing**

Open `openspec/changes/<change-name>/tasks.md` and read through the full list. Check:
- Are the tasks ordered logically (tests before implementation)?
- Is the scope reasonable?
- Are there any tasks you want to add, remove, or reword?

Edit `tasks.md` directly if needed. This is your last chance to shape the implementation plan before the AI starts writing code.

---

**5. Apply — implement all tasks with TDD**

```
/opsx-apply <change-name>
```

The agent works through every task in `tasks.md` following Red → Green → Refactor. It will mark each task `[x]` as it is completed and pause if it hits a blocker.

---

**5.1. Run the app and test it manually**


```bash
npm install       # first time only
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser and verify:
- [ ] All four lanes are visible (To Do, In Progress, Review, Done)
- [ ] You can create a task via the modal
- [ ] You can drag a card between lanes
- [ ] You can add a team member and assign them to a task


---

**6. Verify the implementation**

```
/opsx-verify <change-name>
```

The agent audits the implementation against the specs and tasks across three dimensions: completeness, correctness, and coherence. Ask the aggent to fix any **CRITICAL** issues it reports and **update the corresponding artifacts**.

Once all critical issues are resolved, run the verification again to confirm. Keep doing this until the agent reports no more critical issues and the artifacts are complete.

---

**7. Sync specs to the main spec directory**

```
/opsx-sync <change-name>
```

This promotes the delta specs from `openspec/changes/<change-name>/specs/` into the permanent main spec directory at `openspec/specs/`. The agent merges requirements and scenarios intelligently — new requirements are added, modified ones are updated, removed ones are deleted, without overwriting unrelated content. Please notice the **artifacts in the change are not touched at all**, only the specs are merged.

> 📂 **Checkpoint:** After the sync, open `openspec/specs/`. You should see the capability folders (`task-management/`, `team-management/`, `kanban-board/`) with a `spec.md` in each one. These are now the living specification for the project.

---

**8. Archive the change**

```
/opsx-archive <change-name>
```

The agent checks that all tasks are `[x]` and all artifacts are complete, then moves the change directory to `openspec/changes/archive/YYYY-MM-DD-<change-name>/`. The archived folder is preserved for reference but is no longer part of the active workspace.

> ✅ The change is now complete. The main specs in `openspec/specs/` serve as the baseline for any future changes built on top of this application.

---

**8.1. Run the app and test it manually, again**


```bash
npm install       # first time only
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser and verify:
- [ ] All four lanes are visible (To Do, In Progress, Review, Done)
- [ ] You can create a task via the modal
- [ ] You can drag a card between lanes
- [ ] You can add a team member and assign them to a task

---

### Exercise 2 — Add a Feature with Explore-First

In this exercise you will add a new feature on top of the existing application using the `/opsx:explore` command as the starting point. This represents the typical day-to-day SDD workflow for incremental feature development.

#### Context

> *"The tasks SHALL be editable. When the user clicks a card, a modal popup will rise and allow to edit the card (Title, Description, Assignee)"*

---

#### Steps

**1. Confirm Exercise 1 is archived**

Check that the previous change no longer appears in the active list:

```bash
openspec list
```

The Kanban Board change should not be listed (or should show as archived). If it is still active, complete Exercise 1 steps 7–8 first.

---

**2. Explore the new requirement**

In the Windsurf AI chat panel, run:

```
/opsx:explore "The tasks SHALL be editable. When the user clicks a card, a modal popup will rise and allow to edit the card (Title, Description, Assignee)"
```

The agent will analyse the existing codebase and specs, identify what already exists (`TaskModal`, `useTasks`), what needs to change (read-only cards → clickable cards), and surface any edge cases or design questions (e.g. conflict between drag click and edit click, validation, optimistic updates).

> 💡 **Read the exploration output carefully.** The agent may raise questions about UX behaviour — answer them directly in the chat before proceeding. This is where SDD catches ambiguity before a single line of code is written.

---

**3. Create a new change from the exploration**

When the agent finishes exploring and asks how you would like to proceed, choose to **create a new change proposal**. The agent will scaffold the change using the insights from the exploration:

```
/opsx:new edit-task-modal
```

> 📂 **Checkpoint:** Confirm `openspec/changes/edit-task-modal/` was created.

---

**4. Generate artifacts one at a time**

```
/opsx:continue
```

Each run produces the next artifact (`proposal.md` → `design.md` → `specs/` → `tasks.md`). After each one:

> 📂 **Checkpoint:** Read the new artifact. Pay particular attention to:
> - `specs/` — does the edit modal scenario cover validation, cancel, and pre-populated fields?
> - `tasks.md` — are tests sequenced before implementation (Red → Green → Refactor)?

Repeat until the agent suggests running `/opsx:apply`.

---

**5. Apply — implement the feature with TDD**

```
/opsx:apply edit-task-modal
```

The agent implements every task. Watch for the test-first discipline: each behaviour should have a failing test committed before the implementation lands.

---

**5.1. Run the app and test the new feature manually**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and verify the new feature:
- [ ] Clicking a task card opens the edit modal
- [ ] The modal is pre-populated with the card's current title, description, and assignee
- [ ] Saving the changes updates the card on the board
- [ ] Cancelling the modal makes no changes
- [ ] The title field cannot be cleared (validation)
- [ ] Dragging a card does NOT accidentally open the modal

---

**6. Verify the implementation**

```
/opsx:verify edit-task-modal
```

Ask the agent to fix any **CRITICAL** issues and **update the corresponding artifacts**. Re-run verify until no critical issues remain.

---

**7. Sync specs to the main spec directory**

```
/opsx:sync edit-task-modal
```

> 📂 **Checkpoint:** Open `openspec/specs/`. The existing capability specs should now include the new edit modal scenarios merged in alongside the original ones.

---

**8. Archive the change**

```
/opsx:archive edit-task-modal
```

---

**8.1. Run the app and test it manually, again**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and do a final smoke test of both exercises together:
- [ ] All four lanes still load correctly
- [ ] Task creation still works
- [ ] Drag and drop still works
- [ ] Clicking a card opens the edit modal
- [ ] Edits persist on the board

---

## The SDD Cycle

OpenSpec supports two workflow modes depending on how much control you want over the artifact creation process. Both are summarised below. For full details see the [OpenSpec Workflows documentation](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md).

---

### Mode 1 — Default Quick Path (`core` profile)

The default install uses the `core` profile, which provides a minimal set of commands for a fast, linear flow:

```text
/opsx:propose ──► /opsx:apply ──► /opsx:sync ──► /opsx:archive
```

| Command | Purpose |
|---|---|
| `/opsx:propose` | Read the brief, generate all planning artifacts in one shot (`proposal.md`, `design.md`, `specs/`, `tasks.md`) |
| `/opsx:apply` | Implement every task in `tasks.md` following Red → Green → Refactor |
| `/opsx:sync` | Merge delta specs from the change into the permanent `openspec/specs/` directory |
| `/opsx:archive` | Mark the change complete and move it to `openspec/changes/archive/` |

**Best for:** straightforward features where you can describe the full scope upfront and want to move fast.

> 📖 Reference: [Default Quick Path](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md#default-quick-path-core-profile)

---

### Mode 2 — Expanded / Full Workflow (custom selection)

The expanded mode adds step-by-step artifact control and a verification command. Enable it with:

```bash
openspec config profile
openspec update
```

This unlocks `/opsx:new`, `/opsx:continue`, `/opsx:ff`, `/opsx:verify`, `/opsx:bulk-archive`, and `/opsx:onboard`.

#### Typical expanded flow

```text
/opsx:new ──► /opsx:continue (repeat) ──► /opsx:apply ──► /opsx:verify ──► /opsx:sync ──► /opsx:archive
```

| Command | Purpose | When to use |
|---|---|---|
| `/opsx:new` | Create the change scaffold | Start of a new feature |
| `/opsx:continue` | Generate the next artifact one at a time | Want to review and edit each step |
| `/opsx:ff` | Generate all remaining artifacts at once | Clear scope, want to skip step-by-step |
| `/opsx:apply` | Implement tasks with TDD | All artifacts ready |
| `/opsx:verify` | Audit implementation against specs and tasks | Before archiving — checks completeness, correctness, coherence |
| `/opsx:sync` | Merge delta specs into main | After verify passes |
| `/opsx:archive` | Finalise and archive the change | All work done |

#### `/opsx:ff` vs `/opsx:continue`

| Situation | Use |
|---|---|
| Clear requirements, ready to build | `/opsx:ff` |
| Want to review and edit each artifact | `/opsx:continue` |
| Want to iterate on proposal before writing specs | `/opsx:continue` |
| Time pressure | `/opsx:ff` |
| Complex change, want full control | `/opsx:continue` |

**This lab uses the expanded flow** — that is why Exercise 1 uses `/opsx:new` and `/opsx:continue`.

> 📖 Reference: [Expanded/Full Workflow](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md#expandedfull-workflow-custom-selection)

---

## Development Commands Reference

After the apply phase scaffolds the project, use these commands:

```bash
# Install all workspace dependencies (client + server)
npm install

# Start both client (http://localhost:5173) and server (http://localhost:3001)
npm run dev

# Run backend unit + API integration tests (Vitest + Supertest)
npm run test --workspace=server

# Run frontend component tests (Vitest + React Testing Library)
npm run test --workspace=client

# Run end-to-end tests (Playwright) — dev servers must be running
npm run test:e2e
```

---

## Project Structure (after apply)

```
/
├── client/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/       # TaskCard, Lane, KanbanBoard, TaskModal, TeamPanel
│   │   ├── hooks/            # useTasks, useMembers, useBoardDnd
│   │   ├── types.ts
│   │   └── __tests__/        # Vitest + React Testing Library
│   ├── vite.config.ts
│   └── package.json
├── server/                   # Node.js + Express backend
│   ├── src/
│   │   ├── routes/           # tasks.ts, members.ts
│   │   ├── store/            # inMemory.ts
│   │   ├── types.ts
│   │   └── validators.ts
│   ├── tests/                # Vitest + Supertest
│   └── package.json
├── e2e/                      # Playwright end-to-end tests
│   └── kanban.spec.ts
├── playwright.config.ts
├── package.json              # npm workspaces root
├── initial-prompt.md
└── Lab-README.md
```

---

## TDD Cheat Sheet

| Phase | Rule |
|---|---|
| RED | Write the test first — it **must fail** before you write any implementation |
| GREEN | Write the **minimum** code needed to make the test pass |
| REFACTOR | Improve structure and clarity — tests must still pass |

> **Never skip RED.** Writing a test against code that already exists is not TDD — it is verification. The discipline of seeing the test fail first is what proves the test is actually testing the right thing.

---

## Tips

- **Read `initial-prompt.md` carefully** before running `/opsx-propose`. The richer your brief, the better the generated specs and tasks.
- **Review artifacts before applying.** The `tasks.md` sequencing directly controls what the AI builds and in what order. Adjust it if needed.
- **Run tests after every green step.** Don't let multiple failing tests accumulate.
- **Playwright drag-and-drop** requires the dev servers to be running. The `playwright.config.ts` webServer block handles this automatically when you run `npm run test:e2e`.
- **In-memory storage resets on server restart.** This is by design — there is no database. Seed data in your tests using the API directly (`page.request.post`).