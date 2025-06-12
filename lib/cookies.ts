export function setCookie(name: string, value: string, days: number = 7): void {
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;secure;samesite=strict`
}

export function getCookie(name: string): string | null {
  const nameEQ = name + "="
  const ca = document.cookie.split(';')
  
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length))
    }
  }
  return null
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}


export function getUserData(): any | null {
  const userData = getCookie('user_data')
  if (userData) {
    try {
      return JSON.parse(userData)
    } catch (error) {
      console.error('Error parsing user data from cookie:', error)
      return null
    }
  }
  return null
}

export function getInstitutionData(): any | null {
  const institutionData = getCookie('institution_data')
  if (institutionData) {
    try {
      return JSON.parse(institutionData)
    } catch (error) {
      console.error('Error parsing institution data from cookie:', error)
      return null
    }
  }
  return null
}

export function getAuthToken(): string | null {
  return getCookie('auth_token')
}

export function getRefreshToken(): string | null {
  return getCookie('auth_refresh_token')
}


export function clearAuthCookies(): void {
  deleteCookie('auth_token')
  deleteCookie('auth_refresh_token')
  deleteCookie('user_data')
  deleteCookie('institution_data')
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}