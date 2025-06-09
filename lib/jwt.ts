import { jwtDecode } from "jwt-decode"

interface JwtPayload {
  exp: number
  roles: string[]
  username: string
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch {
    return true
  }
}

export function getUserRoles(token: string): string[] {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.roles || []
  } catch {
    return []
  }
}

export function getUsername(token: string): string | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.username
  } catch {
    return null
  }
}
