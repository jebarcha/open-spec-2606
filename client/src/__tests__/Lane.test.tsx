import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Lane } from '../components/Lane';
import type { Task, TaskStatus } from '../types';

vi.mock('@dnd-kit/core', () => ({
  useDroppable: () => ({ setNodeRef: vi.fn(), isOver: false }),
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    isDragging: false,
  }),
}));

describe('Lane', () => {
  const tasks: Task[] = [
    { id: '1', title: 'Todo Task', description: '', status: 'ToDo', assignedTo: '' },
    { id: '2', title: 'In Progress Task', description: '', status: 'InProgress', assignedTo: '' },
    { id: '3', title: 'Another Todo', description: '', status: 'ToDo', assignedTo: '' },
  ];

  it('renders the lane title', () => {
    render(
      <Lane title="To Do" status={'ToDo' as TaskStatus} tasks={tasks} colorClass="bg-blue-50" />,
    );
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('only shows tasks matching the lane status', () => {
    render(
      <Lane title="To Do" status={'ToDo' as TaskStatus} tasks={tasks} colorClass="bg-blue-50" />,
    );
    expect(screen.getByText('Todo Task')).toBeInTheDocument();
    expect(screen.getByText('Another Todo')).toBeInTheDocument();
    expect(screen.queryByText('In Progress Task')).not.toBeInTheDocument();
  });

  it('displays empty state when no tasks match the lane status', () => {
    render(
      <Lane title="Done" status={'Done' as TaskStatus} tasks={tasks} colorClass="bg-green-50" />,
    );
    expect(screen.getByText(/no tasks/i)).toBeInTheDocument();
  });

  it('shows correct task count in heading', () => {
    render(
      <Lane title="To Do" status={'ToDo' as TaskStatus} tasks={tasks} colorClass="bg-blue-50" />,
    );
    expect(screen.getByText('(2)')).toBeInTheDocument();
  });
});
