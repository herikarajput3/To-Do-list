import axios from "axios"
import { API_BASE_URL } from "../constants/api"

export const taskService = {
    getAllTasks: async () => {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        return response.data;
    },

    createTask: async (taskData) => {
        const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
        return response.data;
    },

    updateTask: async (taskId, taskData) => {
        const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData);
        return response.data;
    },

    deleteTask: async (taskId) => {
        const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
        return response.data;
    }
};
