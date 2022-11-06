import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://habilidad_server:5000',
    // baseURL: 'http://localhost:5000',
    headers: {
        "Access-Control-Allow-Origin": '*'
    }
});

export default instance
