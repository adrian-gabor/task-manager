import axios from 'axios'

const API_URL = 'http://localhost:3001';


export const fetchTask = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        console.log('Pobrano taski:', response.data);
        return response.data;
    } catch (err) {
        console.log('Błąd pobierania tasków:', err);
    }
};