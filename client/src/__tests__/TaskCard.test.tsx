import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskCard } from '../components/TaskCard';
import type { Task } from '../types';

describe('TaskCard', () => {
  const task: Task = {
    id: '1',
    title: 'Fix login bug',
    description: 'The login form does not validate email properly',
    status: 'ToDo',
    assignedTo: 'Alice',
  };

  it('renders the task title', () => {
    render(<TaskCard task={task} />);
    expect(screen.getByText('Fix login bug')).toBeInTheDocument();
  });

  it('renders a portion of the description', () => {
    render(<TaskCard task={task} />);
    expect(screen.getByText(/login form/i)).toBeInTheDocument();
  });

  it('renders the assignee name', () => {
    render(<TaskCard task={task} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('renders no buttons on the card surface', () => {
    render(<TaskCard task={task} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a grip drag handle element with grab cursor', () => {
    render(<TaskCard task={task} />);
    const handle = screen.getByTestId('drag-handle');
    expect(handle).toBeInTheDocument();
    expect(handle.className).toContain('cursor-grab');
  });

  it('does not render assignee section when assignedTo is empty', () => {
    const noAssigneeTask = { ...task, assignedTo: '' };
    render(<TaskCard task={noAssigneeTask} />);
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
  });

  it('does not render description when description is empty', () => {
    const noDescTask = { ...task, description: '' };
    render(<TaskCard task={noDescTask} />);
    expect(screen.queryByText(/login form/i)).not.toBeInTheDocument();
  });
});
