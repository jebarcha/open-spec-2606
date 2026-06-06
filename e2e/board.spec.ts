import { test, expect } from '@playwright/test';

test.describe('Kanban Board', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('displays all four lanes on load', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Sprint Kanban Board' })).toBeVisible();
    await expect(page.getByText('To Do')).toBeVisible();
    await expect(page.getByText('In Progress')).toBeVisible();
    await expect(page.getByText('Review')).toBeVisible();
    await expect(page.getByText('Done')).toBeVisible();
  });

  test('drag card from To Do to In Progress updates its lane', async ({ page, request }) => {
    const res = await request.post('http://localhost:3001/api/tasks', {
      data: { title: 'E2E-Drag-Task' },
    });
    const task = await res.json() as { id: string };
    await request.patch(`http://localhost:3001/api/tasks/${task.id}`, {
      data: { status: 'ToDo' },
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    const todoLane = page.locator('[data-testid="lane-ToDo"]');
    const inProgressLane = page.locator('[data-testid="lane-InProgress"]');

    await expect(todoLane.getByText('E2E-Drag-Task')).toBeVisible();

    const card = todoLane.locator('.bg-white').filter({ hasText: 'E2E-Drag-Task' });
    await card.getByTestId('drag-handle').dragTo(inProgressLane);

    await expect(inProgressLane.getByText('E2E-Drag-Task')).toBeVisible();
    await expect(todoLane.getByText('E2E-Drag-Task')).not.toBeVisible();
  });

  test('dragged card status is updated in the API', async ({ page, request }) => {
    const res = await request.post('http://localhost:3001/api/tasks', {
      data: { title: 'E2E-API-Status-Task' },
    });
    const task = await res.json() as { id: string };
    await request.patch(`http://localhost:3001/api/tasks/${task.id}`, {
      data: { status: 'ToDo' },
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    const todoLane = page.locator('[data-testid="lane-ToDo"]');
    const reviewLane = page.locator('[data-testid="lane-Review"]');

    const card = todoLane.locator('.bg-white').filter({ hasText: 'E2E-API-Status-Task' });
    await card.getByTestId('drag-handle').dragTo(reviewLane);

    await page.waitForTimeout(300);

    const checkRes = await request.get('http://localhost:3001/api/tasks');
    const tasks = await checkRes.json() as { id: string; status: string }[];
    const updated = tasks.find(t => t.id === task.id);
    expect(updated?.status).toBe('Review');
  });

  // 7.1 — clicking card body opens edit modal with pre-filled values
  test('clicking card body opens edit modal with task values pre-filled', async ({ page, request }) => {
    const res = await request.post('http://localhost:3001/api/tasks', {
      data: { title: 'E2E-Edit-Open', description: 'Edit me', assignedTo: '' },
    });
    const task = await res.json() as { id: string };
    await request.patch(`http://localhost:3001/api/tasks/${task.id}`, { data: { status: 'ToDo' } });

    await page.reload();
    await page.waitForLoadState('networkidle');

    const todoLane = page.locator('[data-testid="lane-ToDo"]');
    await todoLane.getByText('E2E-Edit-Open').click();

    await expect(page.getByRole('heading', { name: 'Edit Task' })).toBeVisible();
    await expect(page.getByLabel(/title/i)).toHaveValue('E2E-Edit-Open');
    await expect(page.getByLabel(/description/i)).toHaveValue('Edit me');
    await expect(page.getByText('ToDo')).toBeVisible();
  });

  // 7.2 — editing fields and saving updates the card
  test('editing task fields in the modal and saving updates the card on the board', async ({ page, request }) => {
    const res = await request.post('http://localhost:3001/api/tasks', {
      data: { title: 'E2E-Edit-Before' },
    });
    const task = await res.json() as { id: string };
    await request.patch(`http://localhost:3001/api/tasks/${task.id}`, { data: { status: 'ToDo' } });

    await page.reload();
    await page.waitForLoadState('networkidle');

    const todoLane = page.locator('[data-testid="lane-ToDo"]');
    await todoLane.getByText('E2E-Edit-Before').click();

    await expect(page.getByRole('heading', { name: 'Edit Task' })).toBeVisible();

    const titleInput = page.getByLabel(/title/i);
    await titleInput.clear();
    await titleInput.fill('E2E-Edit-After');
    await page.getByRole('button', { name: /save changes/i }).click();

    await expect(page.getByRole('heading', { name: 'Edit Task' })).not.toBeVisible();
    await expect(todoLane.getByText('E2E-Edit-After')).toBeVisible();
  });

  // 7.3 — clicking Delete removes the card
  test('clicking Delete in the edit modal removes the card from the board', async ({ page, request }) => {
    const res = await request.post('http://localhost:3001/api/tasks', {
      data: { title: 'E2E-Delete-Task' },
    });
    const task = await res.json() as { id: string };
    await request.patch(`http://localhost:3001/api/tasks/${task.id}`, { data: { status: 'ToDo' } });

    await page.reload();
    await page.waitForLoadState('networkidle');

    const todoLane = page.locator('[data-testid="lane-ToDo"]');
    await todoLane.getByText('E2E-Delete-Task').click();

    await expect(page.getByRole('heading', { name: 'Edit Task' })).toBeVisible();
    await page.getByRole('button', { name: /delete/i }).click();

    await expect(page.getByRole('heading', { name: 'Edit Task' })).not.toBeVisible();
    await expect(page.getByText('E2E-Delete-Task')).not.toBeVisible();
  });

  // 7.4 — Escape closes modal without modifying task
  test('pressing Escape in the edit modal closes it without modifying the task', async ({ page, request }) => {
    const res = await request.post('http://localhost:3001/api/tasks', {
      data: { title: 'E2E-Escape-Task' },
    });
    const task = await res.json() as { id: string };
    await request.patch(`http://localhost:3001/api/tasks/${task.id}`, { data: { status: 'ToDo' } });

    await page.reload();
    await page.waitForLoadState('networkidle');

    const todoLane = page.locator('[data-testid="lane-ToDo"]');
    await todoLane.getByText('E2E-Escape-Task').click();

    await expect(page.getByRole('heading', { name: 'Edit Task' })).toBeVisible();

    const titleInput = page.getByLabel(/title/i);
    await titleInput.clear();
    await titleInput.fill('Changed Title');
    await page.keyboard.press('Escape');

    await expect(page.getByRole('heading', { name: 'Edit Task' })).not.toBeVisible();
    await expect(todoLane.getByText('E2E-Escape-Task')).toBeVisible();
  });

  // 7.5 — dragging via grip handle moves card (regression)
  test('dragging via the grip handle moves the card to a different lane', async ({ page, request }) => {
    const res = await request.post('http://localhost:3001/api/tasks', {
      data: { title: 'E2E-Handle-Drag' },
    });
    const task = await res.json() as { id: string };
    await request.patch(`http://localhost:3001/api/tasks/${task.id}`, { data: { status: 'ToDo' } });

    await page.reload();
    await page.waitForLoadState('networkidle');

    const todoLane = page.locator('[data-testid="lane-ToDo"]');
    const doneLane = page.locator('[data-testid="lane-Done"]');

    const card = todoLane.locator('.bg-white').filter({ hasText: 'E2E-Handle-Drag' });
    await card.getByTestId('drag-handle').dragTo(doneLane);

    await expect(doneLane.getByText('E2E-Handle-Drag')).toBeVisible();
    await expect(todoLane.getByText('E2E-Handle-Drag')).not.toBeVisible();
  });
});
