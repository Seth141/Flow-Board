import React from 'react';
import List from './List';

function Board({ categories, setCategories }) {

  const moveTask = (taskId, newCategoryTitle, oldIndex, newIndex) => {
    let taskToMove;
    let originCategoryIndex;
    let newCategoryIndex;

    categories.forEach((category, index) => {
      const taskIndex = category.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        taskToMove = category.tasks[taskIndex];
        originCategoryIndex = index;
      }
      if (category.title === newCategoryTitle) {
        newCategoryIndex = index;
      }
    });

    if (!taskToMove || originCategoryIndex === undefined) return;

    let newCategories = JSON.parse(JSON.stringify(categories));
    newCategories[originCategoryIndex].tasks.splice(oldIndex, 1);

    if (originCategoryIndex === newCategoryIndex && oldIndex < newIndex) {
      newCategories[newCategoryIndex].tasks.splice(newIndex - 1, 0, taskToMove);
    } else {
      newCategories[newCategoryIndex].tasks.splice(newIndex, 0, taskToMove);
    }

    setCategories(newCategories);
  };

  return (
    <div className="Board">
      {categories.map((category, index) => (
        <List key={index} title={category.title} tasks={category.tasks} onMoveTask={moveTask} />
      ))}
    </div>
  );
}

export default Board;
