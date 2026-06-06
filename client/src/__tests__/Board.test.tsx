import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Board } from '../components/Board';
import type { Task, TaskStatus } from '../types';
import type { DragEndEvent } from '@dnd-kit/core';

let capturedOnDragEnd: ((event: DragEndEvent) => void) | null = null;

vi.mock('@dnd-kit/core', () => ({
  DndContext: ({
    children,
    onDragEnd,
  }: {
    children: React.ReactNode;
    onDragEnd: (e: DragEndEvent) => void;
  }) => {
    capturedOnDragEnd = onDragEnd;
    return <>{children}</>;
  },
  useDroppable: () => ({ setNodeRef: vi.fn(), isOver: false }),
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    isDragging: false,
  }),
  DragOverlay: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Board', () => {
  const tasks: Task[] = [
    { id: '1', title: 'Task A', description: '', status: 'ToDo', assignedTo: '' },
  ];

  beforeEach(() => {
    capturedOnDragEnd = null;
  });

  it('renders all four lanes', () => {
    render(<Board tasks={tasks} onTaskStatusChange={vi.fn()} />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('calls onTaskStatusChange with taskId and new status when dropped on different lane', () => {
    const onStatusChange = vi.fn();
    render(<Board tasks={tasks} onTaskStatusChange={onStatusChange} />);

    act(() => {
      capturedOnDragEnd?.({
        active: { id: '1', data: { current: undefined } },
        over: { id: 'InProgress' as TaskStatus, data: { current: undefined } },
        collisions: [],
        delta: { x: 0, y: 0 },
      } as unknown as DragEndEvent);
    });

    expect(onStatusChange).toHaveBeenCalledWith('1', 'InProgress');
  });

  it('does not call onTaskStatusChange when dropped on the same lane', () => {
    const onStatusChange = vi.fn();
    render(<Board tasks={tasks} onTaskStatusChange={onStatusChange} />);

    act(() => {
      capturedOnDragEnd?.({
        active: { id: '1', data: { current: undefined } },
        over: { id: 'ToDo' as TaskStatus, data: { current: undefined } },
        collisions: [],
        delta: { x: 0, y: 0 },
      } as unknown as DragEndEvent);
    });

    expect(onStatusChange).not.toHaveBeenCalled();
  });

  it('does not call onTaskStatusChange when dropped outside any lane', () => {
    const onStatusChange = vi.fn();
    render(<Board tasks={tasks} onTaskStatusChange={onStatusChange} />);

    act(() => {
      capturedOnDragEnd?.({
        active: { id: '1', data: { current: undefined } },
        over: null,
        collisions: [],
        delta: { x: 0, y: 0 },
      } as unknown as DragEndEvent);
    });

    expect(onStatusChange).not.toHaveBeenCalled();
  });
});
