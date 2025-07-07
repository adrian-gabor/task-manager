import axios from "axios";

const API_URL = 'http://localhost:3001';

export const deleteTask = async ( taskID ) => {
    try {
        const response = await axios.delete(`${API_URL}/tasks/${taskID}`);
        return response.data;
    } catch (err) {
        console.error('Błąd usuwania zadania:', err);
    }
}