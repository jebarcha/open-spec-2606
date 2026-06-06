import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DraggableTaskCard } from '../components/DraggableTaskCard';
import type { Task } from '../types';

vi.mock('@dnd-kit/core', () => ({
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    isDragging: false,
  }),
}));

describe('DraggableTaskCard', () => {
  const task: Task = {
    id: '1',
    title: 'Click Test Task',
    description: 'Some description',
    status: 'ToDo',
    assignedTo: 'Alice',
  };

  it('clicking the card body calls onTaskClick with the task', async () => {
    const user = userEvent.setup();
    const onTaskClick = vi.fn();
    render(<DraggableTaskCard task={task} onTaskClick={onTaskClick} />);

    await user.click(screen.getByText('Click Test Task'));

    expect(onTaskClick).toHaveBeenCalledWith(task);
  });

  it('clicking the drag handle does not call onTaskClick', async () => {
    const user = userEvent.setup();
    const onTaskClick = vi.fn();
    render(<DraggableTaskCard task={task} onTaskClick={onTaskClick} />);

    await user.click(screen.getByTestId('drag-handle'));

    expect(onTaskClick).not.toHaveBeenCalled();
  });
});
