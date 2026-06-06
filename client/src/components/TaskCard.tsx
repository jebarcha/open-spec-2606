import type { HTMLAttributes } from 'react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  dragHandleProps?: HTMLAttributes<HTMLDivElement>;
}

export function TaskCard({ task, dragHandleProps }: TaskCardProps) {
  return (
    <div className="bg-white rounded shadow-sm p-3 border border-gray-200 select-none">
      <div className="flex items-start gap-2">
        <div
          data-testid="drag-handle"
          className="cursor-grab text-gray-400 mt-0.5 shrink-0 text-sm leading-none"
          {...dragHandleProps}
          onClick={e => e.stopPropagation()}
        >
          ⠿
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm mb-1 leading-snug">{task.title}</h3>
          {task.description && (
            <p className="text-xs text-gray-500 overflow-hidden line-clamp-2 mb-1">{task.description}</p>
          )}
          {task.assignedTo && (
            <span className="inline-block text-xs text-blue-600 font-medium">{task.assignedTo}</span>
          )}
        </div>
      </div>
    </div>
  );
}
