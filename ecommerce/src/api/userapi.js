import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/user`;

export const registerUser = async (data) => axios.post(`${API_URL}/reg`, data);
export const verifyOTP = async (data, token) =>
    axios.post(`${API_URL}/verify`, data, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Add token in headers
    });

export const loginUser = async (data) => axios.post(`${API_URL}/login`, data);
export const getUserProfile = async (token) =>
    axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });
