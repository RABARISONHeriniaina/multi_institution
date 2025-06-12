'use client'

import * as React from "react"
import { SiteHeader } from "@/components/site-header"
import {
  IconInnerShadowTop,
  IconDashboard
} from "@tabler/icons-react"

import { Building2, Users } from 'lucide-react'

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { 
  getUserData, 
  getInstitutionData, 
  isAuthenticated,
  clearAuthCookies
} from "@/lib/cookies"

export default function RootLayout({ children }) {
  const [user, setUser] = React.useState(null)
  const [institution, setInstitution] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const loadUserData = () => {
      try {
        if (isAuthenticated()) {
          const userData = getUserData()
          const institutionData = getInstitutionData()
          
          setUser(userData)
          setInstitution(institutionData)
        } else {
          window.location.href = '/login'
          return
        }
      } catch (error) {
        console.error('Error loading user data:', error)
        clearAuthCookies()
        window.location.href = '/login'
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAuthenticated()) {
    return null
  }

  const navMain = [
    {
      title: "Tableau de bord",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Établissements",
      url: "/institutions",
      icon: Building2,
    },
    {
      title: "Utilisateurs",
      url: "/users",
      icon: Users,
    },
  ]
  
  const userData = {
    name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "Utilisateur",
    email: user?.email || "user@example.com",
    avatar: user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    role: user?.role || "Utilisateur",
    institution: institution?.name || "Institution"
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <a href="#">
                  <IconInnerShadowTop className="!size-5" />
                  <span className="text-base font-semibold">MindSpace-Bridge</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={userData} />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <SiteHeader user={userData} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}