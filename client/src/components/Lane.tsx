import { useDroppable } from '@dnd-kit/core';
import { DraggableTaskCard } from './DraggableTaskCard';
import type { Task, TaskStatus } from '../types';

interface LaneProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  colorClass: string;
  onTaskClick?: (task: Task) => void;
}

export function Lane({ title, status, tasks, colorClass, onTaskClick }: LaneProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const laneTasks = tasks.filter(t => t.status === status);

  return (
    <div
      ref={setNodeRef}
      data-testid={`lane-${status}`}
      className={`flex flex-col flex-1 rounded-lg ${colorClass} ${isOver ? 'ring-2 ring-blue-400' : ''} min-h-0`}
    >
      <h2 className="font-bold text-sm text-gray-700 px-3 py-2 border-b border-gray-300/60">
        {title}
        <span className="ml-2 text-gray-400 font-normal text-xs">({laneTasks.length})</span>
      </h2>
      <div className="flex flex-col gap-2 p-2 flex-1 overflow-y-auto">
        {laneTasks.map(task => (
          <DraggableTaskCard key={task.id} task={task} onTaskClick={onTaskClick} />
        ))}
        {laneTasks.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">No tasks</p>
        )}
      </div>
    </div>
  );
}
