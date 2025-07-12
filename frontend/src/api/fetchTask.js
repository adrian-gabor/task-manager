import axios from 'axios'
import apiClient from './apiClient';
const API_URL = 'http://localhost:3001';


export const fetchTask = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/tasks`);
        console.log('Pobrano taski:', response.data);
        return response.data;
    } catch (err) {
        console.log('Błąd pobierania tasków:', err);
        throw err.response?.data?.error
    }
};