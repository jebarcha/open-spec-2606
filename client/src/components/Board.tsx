import { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { Lane } from './Lane';
import { TaskCard } from './TaskCard';
import type { Task, TaskStatus } from '../types';

const LANES: { title: string; status: TaskStatus; colorClass: string }[] = [
  { title: 'To Do', status: 'ToDo', colorClass: 'bg-blue-100' },
  { title: 'In Progress', status: 'InProgress', colorClass: 'bg-yellow-100' },
  { title: 'Review', status: 'Review', colorClass: 'bg-purple-100' },
  { title: 'Done', status: 'Done', colorClass: 'bg-green-100' },
];

interface BoardProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onTaskClick?: (task: Task) => void;
}

export function Board({ tasks, onTaskStatusChange, onTaskClick }: BoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;
    const newStatus = over.id as TaskStatus;
    const taskId = active.id as string;
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== newStatus) {
      onTaskStatusChange(taskId, newStatus);
    }
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 flex-1 min-h-0">
        {LANES.map(lane => (
          <Lane key={lane.status} {...lane} tasks={tasks} onTaskClick={onTaskClick} />
        ))}
      </div>
      <DragOverlay>{activeTask ? <TaskCard task={activeTask} /> : null}</DragOverlay>
    </DndContext>
  );
}
