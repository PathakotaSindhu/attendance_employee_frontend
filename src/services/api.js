// src/api.js
import axios from 'axios';

const api = axios.create({
     baseURL: 'https://employee-attendance-31ex.onrender.com/api/auth',
    //baseURL: 'http://localhost:8080/api/auth',
    headers: {
       'Content-Type': 'application/json',
   },
});

export default api;



