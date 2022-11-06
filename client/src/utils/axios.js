import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://128.199.202.23:5043',
    // baseURL: 'http://localhost:5000',
    headers: {
        'Access-Control-Allow-Origin': '*',
        mode: 'cors'
    },
})

export default instance
