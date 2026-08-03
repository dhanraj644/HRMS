import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/auth/authSlice';

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
});

// Response interceptor — handle 401 and refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/login') &&
            !originalRequest.url.includes('/auth/refresh-token')
        ) {
            originalRequest._retry = true;
            try {
                await api.post('/auth/refresh-token');
                return api(originalRequest);
            } catch {
                store.dispatch(logout());
                window.location.href = '/';
            }
        }

        return Promise.reject(error);
    }
);

export default api;