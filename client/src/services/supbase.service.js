import supabase from '../supabase-client';

export const getAllTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const createTask = async (taskData) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([taskData])
    .select();
  return { data, error };
};

export const updateTaskStatus = async (id, completionStatus) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ completion: completionStatus })
    .eq('id', id)
    .select();
  return { data, error };
};

export const deleteTask = async (id) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);
  return { error };
};