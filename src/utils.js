import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json'
  }
})

export default axiosInstance
