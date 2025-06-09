"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { jwtDecode } from "jwt-decode"
import { apiLogin } from "@/services/api"

interface JwtPayload {
  exp: number
  roles: string[]
  email: string
}

interface AuthState {
  token: string | null
  refreshToken: string | null
  user: {
    email: string | null
    roles: string[]
  }
  isAuthenticated: boolean
  isPlateformAdmin: boolean
  isAdmin: boolean
  isInstitutionManager: boolean
  isStudent: boolean
  isProfessor: boolean
  isParent: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateTokens: (token: string, refreshToken: string) => void
  getAuthHeader: () => { Authorization: string } | {}
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      user: {
        email: null,
        roles: [],
      },
      isAuthenticated: false,
      isPlateformAdmin: false,
      isAdmin: false,
      isInstitutionManager: false,
      isStudent: false,
      isProfessor: false,
      isParent: false,
      login: async (email: string, password: string) => {
        try {
          const { token, refresh_token } = await apiLogin(email, password)

          const decoded = jwtDecode<JwtPayload>(token)

          const roles = decoded.roles || []
          const isPlateformAdmin = roles.includes("ROLE_PLATEFORM_ADMIN")
          const isAdmin = roles.includes("ROLE_ADMIN")
          const isInstitutionManager = roles.includes("ROLE_MANAGER")
          const isStudent = roles.includes("ROLE_USER")
          const isProfessor = roles.includes("ROLE_PROFESSOR")
          const isParent = roles.includes("ROLE_PARENT")

          set({
            token,
            refreshToken: refresh_token,
            user: {
              email: decoded.email,
              roles,
            },
            isAuthenticated: true,
            isPlateformAdmin,
            isAdmin,
            isInstitutionManager,
            isStudent,
            isProfessor,
            isParent,
          })
        } catch (error) {
          throw new Error("Invalid credentials")
        }
      },

      updateTokens: (token: string, refreshToken: string) => {
        const decoded = jwtDecode<JwtPayload>(token)
        const roles = decoded.roles || []

        set({
          token,
          refreshToken,
          user: {
            email: decoded.email,
            roles,
          },
          isAuthenticated: true,
          isPlateformAdmin: roles.includes("ROLE_PLATEFORM_ADMIN"),
          isAdmin: roles.includes("ROLE_ADMIN"),
          isInstitutionManager: roles.includes("ROLE_MANAGER"),
          isStudent: roles.includes("ROLE_USER"),
          isProfessor: roles.includes("ROLE_PROFESSOR"),
          isParent: roles.includes("ROLE_PARENT"),
        })
      },

      logout: () => {
        set({
          token: null,
          refreshToken: null,
          user: {
            email: null,
            roles: [],
          },
          isAuthenticated: false,
          isPlateformAdmin: false,
          isAdmin: false,
          isInstitutionManager: false,
          isStudent: false,
          isProfessor: false,
          isParent: false,
        })
      },

      getAuthHeader: () => {
        const { token } = get()
        return token ? { Authorization: `Bearer ${token}` } : {}
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isPlateformAdmin: state.isPlateformAdmin,
        isAdmin: state.isAdmin,
        isInstitutionManager: state.isInstitutionManager,
        isStudent: state.isStudent,
        isProfessor: state.isProfessor,
        isParent: state.isParent,
      }),
    },
  ),
)
