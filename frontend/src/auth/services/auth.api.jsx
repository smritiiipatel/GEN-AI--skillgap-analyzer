import axios from "axios";

const api = axios.create({
    baseURL: "https://gen-ai-skillgap-analyzer-backend.onrender.com",
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export async function register({username, email, password}) {
    try {
        const response = await api.post("/api/auth/register", {username, email, password})
        if (response.data.token) {
            localStorage.setItem("token", response.data.token)
        }
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function login({email, password}) {
    try {
        const response = await api.post("/api/auth/login", {email, password})
        if (response.data.token) {
            localStorage.setItem("token", response.data.token)
        }
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function logout() {
    try {
        const response = await api.get("/api/auth/logout")
        localStorage.removeItem("token")
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getme() {
    try {
        const response = await api.get("/api/auth/getme")
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}