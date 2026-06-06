import React, { useState } from 'react';
import type { TeamMember } from '../types';

interface TeamPanelProps {
  members: TeamMember[];
  onAdd: (name: string) => Promise<void>;
  onDelete: (id: string) => void;
}

export function TeamPanel({ members, onAdd, onDelete }: TeamPanelProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    setError('');
    await onAdd(name.trim());
    setName('');
  }

  return (
    <aside className="w-56 shrink-0 bg-white rounded-lg shadow-md p-4 flex flex-col gap-3 self-start">
      <h2 className="font-bold text-gray-700 text-xs uppercase tracking-wide">Team Members</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Member name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1.5 rounded transition"
        >
          Add Member
        </button>
      </form>
      <ul className="flex flex-col gap-1">
        {members.map(member => (
          <li
            key={member.id}
            className="flex items-center justify-between text-sm text-gray-700 bg-gray-50 rounded px-2 py-1"
          >
            <span>{member.name}</span>
            <button
              onClick={() => onDelete(member.id)}
              aria-label={`Remove ${member.name}`}
              className="text-gray-400 hover:text-red-500 transition text-base leading-none font-bold ml-2"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
