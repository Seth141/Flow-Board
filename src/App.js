import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';

function App() {
  const [projectDescription, setProjectDescription] = useState('');
  const [categories, setCategories] = useState([
    { title: "Backlog", tasks: [] },
    { title: "To Do", tasks: [] },
    { title: "Doing", tasks: [] },
    { title: "Completed", tasks: [] },
  ]);

  const handleGenerateTasks = async () => {
    try {
      const response = await axios.post('http://localhost:3080/generate-tasks', { projectDescription });
      const tasks = response.data.tasks;
      const updatedCategories = [...categories];
      updatedCategories[0].tasks = tasks; // Add tasks to the "Backlog" category
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error generating tasks:', error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="App-header">
          <h2>Your project</h2>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Describe your project here"
          />
          <button onClick={handleGenerateTasks}>Generate Tasks</button>
        </header>
        <Board categories={categories} setCategories={setCategories} />
      </div>
    </DndProvider>
  );
}

export default App;
