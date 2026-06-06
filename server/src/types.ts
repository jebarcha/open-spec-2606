export type TaskStatus = 'ToDo' | 'InProgress' | 'Review' | 'Done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: string;
}

export interface TeamMember {
  id: string;
  name: string;
}
