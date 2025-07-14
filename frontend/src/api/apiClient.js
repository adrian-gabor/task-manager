import axios from "axios";


const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        let errorMessage = 'Wystąpił nieoczekiwany błąd sieciowy.';
        if (error.response && error.response.data) {
            if (error.response.data.error && error.response.data.error.message) {
                errorMessage = error.response.data.error.message;
            } 
            else if (typeof error.response.data.error === 'string') {
                errorMessage = error.response.data.error;
            }
        }
        return Promise.reject(new Error(errorMessage));
    }
);

export default apiClient;