import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.101.10:3333/api',
    timeout: 60
})

export default api