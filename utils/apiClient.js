import axios from "axios";


// http://localhost:5000/api/crud/pot/potId`,{
//                     headers:{
//                         'Authorization' : `Bearer Jwt Tken`
//                     }
const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default apiClient