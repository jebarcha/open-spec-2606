import React, { useState, useEffect } from 'react';
import type { Task, TeamMember } from '../types';

interface TaskModalProps {
  members: TeamMember[];
  task?: Task;
  onSubmit: (data: { title: string; description?: string; assignedTo?: string }) => Promise<void>;
  onDelete?: () => Promise<void>;
  onClose: () => void;
}

export function TaskModal({ members, task, onSubmit, onDelete, onClose }: TaskModalProps) {
  const isEditMode = task !== undefined;

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo ?? '');
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    await onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      assignedTo: assignedTo || undefined,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          {isEditMode ? 'Edit Task' : 'Add Task'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <div>
            <label
              htmlFor="task-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
          <div>
            <label
              htmlFor="task-assignee"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Assign to
            </label>
            <select
              id="task-assignee"
              value={assignedTo}
              onChange={e => setAssignedTo(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Unassigned</option>
              {members.map(m => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          {isEditMode && (
            <div>
              <label
                htmlFor="task-status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <p
                id="task-status"
                className="text-sm text-gray-600 bg-gray-100 rounded px-3 py-2"
              >
                {task.status}
              </p>
            </div>
          )}
          <div className="flex gap-3 justify-end mt-2">
            {isEditMode && onDelete && (
              <button
                type="button"
                onClick={() => void onDelete()}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 transition mr-auto"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition"
            >
              {isEditMode ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
