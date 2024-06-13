import React from 'react';
import { useDrag } from 'react-dnd';

function Task({ task, index }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'TASK',
    item: { id: task.id, index }, // Include the index of the task in the item
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={dragRef} className="Task" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="Task-title">{task.title}</div>
      <div className="Task-detail">Points: {task.storyPoints}</div>
      <div className="Task-detail">Urgency: {task.urgency}</div>
    </div>
  );
}

export default Task;
