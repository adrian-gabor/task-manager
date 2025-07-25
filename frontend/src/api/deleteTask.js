import apiClient from "./apiClient";

const API_URL = 'http://localhost:3001';

export const deleteTask = async ( taskID ) => {
    try {
        const response = await apiClient.delete(`${API_URL}/tasks/${taskID}`);
        return response.data;
    } catch (err) {
        console.error('Błąd usuwania zadania:', err);
    }
}