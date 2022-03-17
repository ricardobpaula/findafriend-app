import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.101.49:3333',
  timeout: 500
})

export default api
