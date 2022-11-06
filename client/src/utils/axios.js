import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:5000',
    // baseURL: 'http://172.16.1.3:5000',
    baseURL: 'https://api.habilidad.tk',
    headers: {
        "Access-Control-Allow-Origin": '*'
    }, 
    mode: 'cors'
});

export default instance
