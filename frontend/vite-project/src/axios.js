const axiosInstance = axios.create({
    baseURL: "https://rideshare-backend-eg6m.onrender.com",
});

// Automatically add token to headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;