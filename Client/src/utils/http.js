import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://localhost:1000/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})