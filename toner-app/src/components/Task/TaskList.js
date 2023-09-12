import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Realizar la llamada a la API para obtener las tareas
    axios.get('API_URL/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.Id}>
            <strong>{task.Descripcion}</strong> - {task.Fecha}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
