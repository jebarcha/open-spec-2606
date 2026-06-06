import type { CSSProperties } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from './TaskCard';
import type { Task } from '../types';

interface DraggableTaskCardProps {
  task: Task;
  onTaskClick?: (task: Task) => void;
}

export function DraggableTaskCard({ task, onTaskClick }: DraggableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style: CSSProperties = transform
    ? { transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.4 : 1 }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="cursor-pointer"
      onClick={() => onTaskClick?.(task)}
    >
      <TaskCard task={task} dragHandleProps={listeners} />
    </div>
  );
}
