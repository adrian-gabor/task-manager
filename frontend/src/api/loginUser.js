import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        //console.log('Login successful:', response.data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            console.log('Token saved to localStorage');
        }
        return response.data;
    } catch (error) {
        //console.error('Login error:', error.response?.data?.error || error.message);
        throw error.response?.data?.error || 'Wystąpił błąd podczas logowania.';
    }
};


export const logoutUser = () => {
    localStorage.removeItem('token');
};