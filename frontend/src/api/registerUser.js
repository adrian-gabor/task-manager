import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const registerUser = async (email, password, firstname, lastname) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, { email, password, firstname, lastname });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Wystąpił błąd podczas rejestracji';
    }
};
