import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getUserData } from '@/lib/cookies';

export function cn(...inputs: any[]) {
  return twMerge(clsx(...inputs))
}


export function getRedirectUrlByAuthenticatedUser() {
  let roles = getUserData()?.roles;

  if (!roles) {
    return '/login'
  }

  if (roles.includes('ROLE_SUPER_ADMIN')) {
    return '/admin/institutions'
  }
  if (roles.includes('ROLE_ADMIN')) {
    return '/admin/institutions'
  }
  if (roles.includes('ROLE_INSTITUTION_MANAGER')) {
    return '/institution'
  }
  if (roles.includes('ROLE_STUDENT')) {
    return '/student/dashboard'
  }
  
  return '/dashboard'
}