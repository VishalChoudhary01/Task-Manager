import React, { useState } from 'react';
import { createTask } from '../../services/supbase.service';
import Button from '../atoms/Button/Button';
import { FiPlus } from 'react-icons/fi';

const AddTask = ({ onTaskCreated }) => {
  const TAGS_OPTIONS=["work","personal"]
  const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];
  const [form, setForm] = useState({
    title: '',
    description: '',
    tags: [],
    priority: 'Medium',
    due_date: '',
  });

  const [showTags, setShowTags] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleTag = (tag) => {
    setForm((prev) => {
      const hasTag = prev.tags.includes(tag);
      return {
        ...prev,
        tags: hasTag
          ? prev.tags.filter((t) => t !== tag)
          : [...prev.tags, tag],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
     try {
      const taskData = {
        title: form.title,
        description: form.description,
        tags: form.tags, 
        priority: form.priority, 
        due_date: form.due_date || null,
      };

      const { data, error } = await createTask(taskData);

      if (error) throw error;

      setForm({
        title: '',
        description: '',
        tags: [],
        priority: 'Medium',
        due_date: ''
      });
      
      onTaskCreated?.(data[0]);
      alert('Task added successfully!');
    } catch (error) {
      console.error('Task creation error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card-bg dark:bg-dark-card-bg rounded-xl p-5 w-full max-w-xl mx-auto flex flex-col gap-4">
      <h2 className="text-xl font-bold text-heading1 dark:text-dark-heading1">Create New Task</h2>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
        className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
      ></textarea>

      <div className="relative">
        <button type="button" onClick={() => setShowTags(!showTags)} className="text-sm text-gray-600 dark:text-gray-300 underline">
          Select Tags
        </button>
        {showTags && (
          <div className="absolute z-10 bg-white dark:bg-dark-card-bg border rounded-md mt-1 p-2 shadow-md">
            {TAGS_OPTIONS.map((tag) => (
        <label key={tag} className="block text-sm">
          <input
            type="checkbox"
            checked={form.tags.includes(tag)}
            onChange={() => toggleTag(tag)}
            className="mr-2"
          />
          {tag}
        </label>
      ))}
          </div>
        )}
      </div>

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        name="due_date"
        value={form.due_date}
        onChange={handleChange}
        className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
      />

      <Button
        buttoType="submit"
        buttonText={loading ? 'Creating...' : 'Add Task'}
        buttonStyles="bg-brand text-white px-4 py-2 rounded-md w-fit self-end"
        leftIcon={<FiPlus />}
        leftIconStyle="text-white"
        disabledButton={loading}
      />
    </form>
  );
};

export default AddTask;
