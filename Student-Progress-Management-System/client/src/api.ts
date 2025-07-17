import axios from 'axios';
// import dotenv from 'dotenv'

// dotenv.config()

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust if your API base path differs
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
