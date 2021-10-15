import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.101.2:3333',
    timeout: 60
})

export default api