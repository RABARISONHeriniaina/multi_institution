"use client"

import * as React from "react"
import {
  IconInnerShadowTop,
  IconDashboard
} from "@tabler/icons-react"

import { Loader2, Building2, Mail, MapPin, ChevronRight, ChevronLeft, Check, Globe, Users, Image, Upload, X, UserPlus, Lock } from 'lucide-react'

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

const data = {
  user: {
    name: "Plateform Admin",
    email: "admin@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
  },
  navMain: [
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
      url: "#",
      icon: Users,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
