import React from 'react';
import Task from './Task';
import { useDrop } from 'react-dnd';

function List({ title, tasks, onMoveTask }) {
  const [, dropRef] = useDrop({
    accept: 'TASK',
    hover: (item, monitor) => {
      const dragIndex = item.index; // Index of the dragged item
      const hoverIndex = tasks.findIndex(t => t.id === item.id);

      // Skip replacing items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      item.hoverIndex = hoverIndex; // Update the hoverIndex in the dragging item
    },
    drop: (item, monitor) => {
      if (item.index !== item.hoverIndex) {
        onMoveTask(item.id, title, item.index, item.hoverIndex);
      }
    },
  });

  return (
    <div ref={dropRef} className="List">
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      ))}
    </div>
  );
}

export default List;
