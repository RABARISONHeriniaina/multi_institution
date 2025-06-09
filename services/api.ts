import axios from "axios"
import { useAuthStore } from "@/store/auth-store"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
})

api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { refreshToken } = useAuthStore.getState()
        if (refreshToken) {
          const response = await api.post("/refresh-token", {
            refresh_token: refreshToken,
          })
          const { token, refresh_token } = response.data

          useAuthStore.getState().updateTokens(token, refresh_token)

          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        useAuthStore.getState().logout()
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export const apiLogin = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password })
  return response.data
}

export const refreshToken = async (refreshToken: string) => {
  const response = await api.post("/auth/refresh-token", { refresh_token: refreshToken })
  return response.data
}

export const logout = async () => {
  const response = await api.get("/auth/logout")
  return response.data
}

export const fetchStudents = async () => {
  const response = await api.get("/students")
  return response.data
}

export const createStudent = async (studentData: {
  firstName: string
  lastName: string
  email: string
  password: string
  gender: string
}) => {
  const response = await api.post("/students", studentData)
  return response.data
}

export const fetchInstitutions = async () => {
  const response = await api.get("/institutions")
  return response.data
}

export const fetchInstitution = async (id: string) => {
  const response = await api.get(`/institutions/${id}`)
  return response.data
}

export const createInstitution = async (institutionData: any) => {
  const response = await api.post("/institutions", institutionData)
  return response.data
}

export default api
