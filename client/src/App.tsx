import { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { TaskModal } from './components/TaskModal';
import { TeamPanel } from './components/TeamPanel';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  fetchTeamMembers,
  createTeamMember,
  deleteTeamMember,
} from './api';
import type { Task, TaskStatus, TeamMember } from './types';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    void fetchTasks().then(setTasks).catch(console.error);
    void fetchTeamMembers().then(setMembers).catch(console.error);
  }, []);

  async function handleStatusChange(taskId: string, newStatus: TaskStatus) {
    const updated = await updateTaskStatus(taskId, newStatus);
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  }

  async function handleCreateTask(data: {
    title: string;
    description?: string;
    assignedTo?: string;
  }) {
    const task = await createTask(data);
    setTasks(prev => [...prev, task]);
    setIsModalOpen(false);
  }

  async function handleTaskUpdate(data: {
    title: string;
    description?: string;
    assignedTo?: string;
  }) {
    if (!editingTask) return;
    const updated = await updateTask(editingTask.id, data);
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    setEditingTask(null);
  }

  async function handleTaskDelete() {
    if (!editingTask) return;
    await deleteTask(editingTask.id);
    setTasks(prev => prev.filter(t => t.id !== editingTask.id));
    setEditingTask(null);
  }

  async function handleAddMember(name: string) {
    const member = await createTeamMember(name);
    setMembers(prev => [...prev, member]);
  }

  function handleDeleteMember(id: string) {
    void deleteTeamMember(id).then(() =>
      setMembers(prev => prev.filter(m => m.id !== id)),
    );
  }

  return (
    <div className="min-h-screen bg-blue-700 flex flex-col">
      <header className="bg-blue-800 px-6 py-3 flex items-center justify-between shrink-0">
        <h1 className="text-white font-bold text-xl tracking-tight">Sprint Kanban Board</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-1.5 rounded transition"
        >
          + Add Task
        </button>
      </header>
      <main className="flex flex-1 gap-4 p-4 min-h-0 overflow-hidden">
        <Board tasks={tasks} onTaskStatusChange={handleStatusChange} onTaskClick={setEditingTask} />
        <TeamPanel members={members} onAdd={handleAddMember} onDelete={handleDeleteMember} />
      </main>
      {isModalOpen && (
        <TaskModal
          members={members}
          onSubmit={handleCreateTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {editingTask && (
        <TaskModal
          members={members}
          task={editingTask}
          onSubmit={handleTaskUpdate}
          onDelete={handleTaskDelete}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}
