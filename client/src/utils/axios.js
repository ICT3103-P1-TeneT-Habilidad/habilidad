import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.habilidad.tk',
    // baseURL: 'http://localhost:5000',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
})

export default instance
