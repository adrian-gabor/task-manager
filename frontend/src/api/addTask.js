import axios from 'axios';

const API_URL = 'http://localhost:3001';


export const addTask = async (text) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, { text });
        console.log('Dodano zadanie:', response.data);
        return response.data;
    } catch (err) {
        console.error('Błąd dodawania zadania:', err);
    }
}