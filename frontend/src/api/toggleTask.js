import apiClient from './apiClient';

export const toggleTask = async (taskId) => {
    const response = await apiClient.put(`/tasks/${taskId}`);
    return response.data;
}; 