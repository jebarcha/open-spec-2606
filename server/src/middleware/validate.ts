import { TaskStatus } from '../types';

const VALID_STATUSES: TaskStatus[] = ['ToDo', 'InProgress', 'Review', 'Done'];

export function isValidStatus(value: unknown): value is TaskStatus {
  return typeof value === 'string' && VALID_STATUSES.includes(value as TaskStatus);
}
