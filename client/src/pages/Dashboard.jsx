// Dashboard.js
import React, { useEffect, useState } from 'react';
import {createTask,deleteTask,updateTaskStatus,getAllTasks} from '../services/supbase.service'

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    tags: [],
    priority: 'Medium',
    due_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data, error } = await getAllTasks();
      if (error) throw error;
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    
    try {
      const { data, error } = await createTask({
        ...newTask,
        due_date: newTask.due_date || null
      });
      
      if (error) throw error;
      
      setTasks([data[0], ...tasks]);
      setNewTask({
        title: '',
        description: '',
        tags: [],
        priority: 'Medium',
        due_date: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Task Manager</h1>
      
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="datetime-local"
          value={newTask.due_date}
          onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-meta">
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              {task.due_date && (
                <span>Due: {new Date(task.due_date).toLocaleString()}</span>
              )}
              <span className={`status ${task.status.toLowerCase()}`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;