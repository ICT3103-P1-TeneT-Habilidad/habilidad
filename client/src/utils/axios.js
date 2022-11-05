import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://172.16.1.3:5000',
    headers: {
        "Access-Control-Allow-Origin": '*'
    }
});

export default instance
