import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeamPanel } from '../components/TeamPanel';
import type { TeamMember } from '../types';

describe('TeamPanel', () => {
  const members: TeamMember[] = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ];

  it('renders existing team members', () => {
    render(<TeamPanel members={members} onAdd={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('calls onAdd with trimmed name when form is submitted', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn().mockResolvedValue(undefined);
    render(<TeamPanel members={[]} onAdd={onAdd} onDelete={vi.fn()} />);

    await user.type(screen.getByPlaceholderText(/name/i), 'Charlie');
    await user.click(screen.getByRole('button', { name: /add member/i }));

    expect(onAdd).toHaveBeenCalledWith('Charlie');
  });

  it('shows validation error when name is empty', async () => {
    const user = userEvent.setup();
    render(<TeamPanel members={[]} onAdd={vi.fn()} onDelete={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /add member/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });

  it('calls onDelete when remove button is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<TeamPanel members={members} onAdd={vi.fn()} onDelete={onDelete} />);

    await user.click(screen.getByRole('button', { name: /remove alice/i }));

    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('clears the input after successful add', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn().mockResolvedValue(undefined);
    render(<TeamPanel members={[]} onAdd={onAdd} onDelete={vi.fn()} />);

    const input = screen.getByPlaceholderText(/name/i);
    await user.type(input, 'Dave');
    await user.click(screen.getByRole('button', { name: /add member/i }));

    expect(input).toHaveValue('');
  });
});
