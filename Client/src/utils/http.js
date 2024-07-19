import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://expense-management-pq7m.onrender.com/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})
