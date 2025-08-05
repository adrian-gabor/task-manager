import apiClient from '../api/apiClient';

export const loginUser = async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token saved to localStorage');
    }   
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};