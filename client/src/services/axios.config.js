import axios from 'axios';

export const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const privateApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

// this config is provided by axios and before every req, it is asking if you want to add anything or i send it as it is.
privateApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('coursehub_authToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
    // This is for any error that occurs before request is sent
    console.error("Axios Interceptor Error:", error);
    //  Axios expects a rejected Promise in that specific .use() function.
    return Promise.reject(error); // Stop request  and Forward the error to .catch() (while sending api request.)
}
)