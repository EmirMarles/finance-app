import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL

const apiClient = axios.create({
    baseURL: backend_url,
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

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await apiClient.post("/api/auth/refresh");

                localStorage.setItem("token", data.accessToken);

                originalRequest.headers.Authorization =
                    `Bearer ${data.accessToken}`;

                return apiClient(originalRequest);
            } catch (err) {
                localStorage.removeItem("token");
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient