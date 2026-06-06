import { Task, TeamMember } from './types';

export const tasksStore = new Map<string, Task>();
export const membersStore = new Map<string, TeamMember>();

export function resetStore(): void {
  tasksStore.clear();
  membersStore.clear();
}
