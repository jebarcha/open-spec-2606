import { Task, TaskStatus, TeamMember } from './types';

const BASE = '/api';

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE}/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json() as Promise<Task[]>;
}

export async function createTask(data: {
  title: string;
  description?: string;
  assignedTo?: string;
}): Promise<Task> {
  const res = await fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json() as Promise<Task>;
}

export async function updateTask(
  id: string,
  data: { title: string; description?: string; assignedTo?: string },
): Promise<Task> {
  const res = await fetch(`${BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json() as Promise<Task>;
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${BASE}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  const res = await fetch(`${BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json() as Promise<Task>;
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const res = await fetch(`${BASE}/team-members`);
  if (!res.ok) throw new Error('Failed to fetch team members');
  return res.json() as Promise<TeamMember[]>;
}

export async function createTeamMember(name: string): Promise<TeamMember> {
  const res = await fetch(`${BASE}/team-members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create team member');
  return res.json() as Promise<TeamMember>;
}

export async function deleteTeamMember(id: string): Promise<void> {
  const res = await fetch(`${BASE}/team-members/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete team member');
}
