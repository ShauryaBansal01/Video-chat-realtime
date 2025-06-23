import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://lo0calhost:5001/api",
    withCredentials: true,
})