import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { tasksStore } from '../store';
import { Task } from '../types';
import { isValidStatus } from '../middleware/validate';

const router = Router();

router.get('/', (_req: Request, res: Response): void => {
  res.json(Array.from(tasksStore.values()));
});

router.post('/', (req: Request, res: Response): void => {
  const { title, description, assignedTo } = req.body as {
    title?: unknown;
    description?: unknown;
    assignedTo?: unknown;
  };
  if (typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ error: 'title is required and must be a non-empty string' });
    return;
  }
  const task: Task = {
    id: randomUUID(),
    title: title.trim(),
    description: typeof description === 'string' ? description.trim() : '',
    status: 'InProgress',
    assignedTo: typeof assignedTo === 'string' ? assignedTo.trim() : '',
  };
  tasksStore.set(task.id, task);
  res.status(201).json(task);
});

router.get('/:id', (req: Request, res: Response): void => {
  const task = tasksStore.get(req.params.id);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }
  res.json(task);
});

router.patch('/:id', (req: Request, res: Response): void => {
  const task = tasksStore.get(req.params.id);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }
  const updates = req.body as Partial<Task>;
  if (updates.title !== undefined && (typeof updates.title !== 'string' || updates.title.trim() === '')) {
    res.status(400).json({ error: 'title must be a non-empty string' });
    return;
  }
  if (updates.status !== undefined && !isValidStatus(updates.status)) {
    res.status(400).json({
      error: 'Invalid status. Must be one of: ToDo, InProgress, Review, Done',
    });
    return;
  }
  const updated: Task = { ...task, ...updates };
  tasksStore.set(task.id, updated);
  res.json(updated);
});

router.delete('/:id', (req: Request, res: Response): void => {
  if (!tasksStore.has(req.params.id)) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }
  tasksStore.delete(req.params.id);
  res.status(204).send();
});

export default router;
