import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { membersStore } from '../store';
import { TeamMember } from '../types';

const router = Router();

router.get('/', (_req: Request, res: Response): void => {
  res.json(Array.from(membersStore.values()));
});

router.post('/', (req: Request, res: Response): void => {
  const { name } = req.body as { name?: unknown };
  if (typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ error: 'name is required and must be a non-empty string' });
    return;
  }
  const member: TeamMember = { id: randomUUID(), name: name.trim() };
  membersStore.set(member.id, member);
  res.status(201).json(member);
});

router.delete('/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  if (!membersStore.has(id)) {
    res.status(404).json({ error: 'Team member not found' });
    return;
  }
  membersStore.delete(id);
  res.status(204).send();
});

export default router;
