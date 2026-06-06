import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskModal } from '../components/TaskModal';
import type { TeamMember } from '../types';

describe('TaskModal', () => {
  const members: TeamMember[] = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ];

  const editTask = {
    id: '99',
    title: 'Existing Task',
    description: 'Existing description',
    status: 'InProgress' as const,
    assignedTo: 'Alice',
  };

  // --- Create mode (2.1) ---
  it('create mode: renders heading "Add Task" and submit button "Add Task"', () => {
    render(<TaskModal members={[]} onSubmit={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /add task/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^add task$/i })).toBeInTheDocument();
  });

  // --- Edit mode (2.2) ---
  it('edit mode: renders heading "Edit Task", submit button "Save Changes", and a Delete button', () => {
    render(
      <TaskModal members={[]} task={editTask} onSubmit={vi.fn()} onDelete={vi.fn()} onClose={vi.fn()} />,
    );
    expect(screen.getByRole('heading', { name: /edit task/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  // --- Edit mode pre-population (2.3) ---
  it('edit mode: pre-populates title, description, and assignee from task prop', () => {
    render(
      <TaskModal members={members} task={editTask} onSubmit={vi.fn()} onDelete={vi.fn()} onClose={vi.fn()} />,
    );
    expect(screen.getByLabelText(/title/i)).toHaveValue('Existing Task');
    expect(screen.getByLabelText(/description/i)).toHaveValue('Existing description');
    expect(screen.getByRole('combobox')).toHaveValue('Alice');
  });

  // --- Edit mode status read-only (2.4) ---
  it('edit mode: displays current status as read-only text, not an input', () => {
    render(
      <TaskModal members={[]} task={editTask} onSubmit={vi.fn()} onDelete={vi.fn()} onClose={vi.fn()} />,
    );
    expect(screen.getByText('InProgress')).toBeInTheDocument();
    expect(screen.queryByLabelText(/status/i)?.tagName).not.toBe('INPUT');
    expect(screen.queryByLabelText(/status/i)?.tagName).not.toBe('SELECT');
  });

  // --- Validation (2.5) ---
  it('shows validation error and does not call onSubmit when title is empty', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TaskModal members={[]} onSubmit={onSubmit} onClose={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /^add task$/i }));

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  // --- Escape closes (2.6) ---
  it('pressing Escape calls onClose without submitting', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onSubmit = vi.fn();
    render(<TaskModal members={[]} onSubmit={onSubmit} onClose={onClose} />);

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  // --- Retained create-mode tests ---
  it('calls onSubmit with correct data when only title provided', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<TaskModal members={[]} onSubmit={onSubmit} onClose={vi.fn()} />);

    await user.type(screen.getByLabelText(/title/i), 'My New Task');
    await user.click(screen.getByRole('button', { name: /^add task$/i }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'My New Task' }),
    );
  });

  it('lists all team members in the dropdown', () => {
    render(<TaskModal members={members} onSubmit={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByRole('option', { name: 'Alice' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Bob' })).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<TaskModal members={[]} onSubmit={vi.fn()} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onClose).toHaveBeenCalled();
  });

  it('passes assignedTo when a member is selected', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<TaskModal members={members} onSubmit={onSubmit} onClose={vi.fn()} />);

    await user.type(screen.getByLabelText(/title/i), 'Task with assignee');
    await user.selectOptions(screen.getByRole('combobox'), 'Alice');
    await user.click(screen.getByRole('button', { name: /^add task$/i }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Task with assignee', assignedTo: 'Alice' }),
    );
  });
});
