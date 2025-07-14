import apiClient from '../api/apiClient';

export const registerUser = async (email, password, firstname, lastname) => {
    const response = await apiClient.post('/auth/register', { email, password, firstname, lastname });
    return response.data;
};