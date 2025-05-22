import React, { useEffect, useState } from 'react';
import { getAllTasks, deleteTask } from '../services/supbase.service';
import TaskCard from '../components/organisms/TaskCard';

const TaskView = ({ filter }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await getAllTasks();
    if (!error) {
      let filtered = data;

      if (filter === 'completed') {
        filtered = data.filter((task) => task.completion === true);
      } else if (filter === 'pending') {
        filtered = data.filter((task) => task.completion === false);
      }

      setTasks(filtered);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const { error } = await deleteTask(id);
    if (!error) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  return (
    <div className="mt-6 w-full flex flex-col gap-4">
      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No {filter} tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default TaskView;
