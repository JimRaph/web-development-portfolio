import axios from 'axios';
// import dotenv from 'dotenv'

// dotenv.config()

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL+'api',
  // timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
