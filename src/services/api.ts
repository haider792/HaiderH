import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export const api = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  },

  createTask: async (task: { title: string; description: string }): Promise<Task> => {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, updates);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/tasks/${id}`);
  },
}; 