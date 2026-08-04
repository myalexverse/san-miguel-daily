"use client"

import * as React from "react"
import {
  LayoutDashboard,
  FileText,
  Tags,
  Users,
  Settings,
  Image as ImageIcon,
  LogOut,
  Newspaper,
  LayoutTemplate
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define the navigation items
const navItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Noticias",
    url: "/admin/posts",
    icon: FileText,
  },
  {
    title: "Medios (Tenants)",
    url: "/admin/tenants",
    icon: LayoutTemplate,
  },
  {
    title: "Categorías & Etiquetas",
    url: "/admin/taxonomies",
    icon: Tags,
  },
  {
    title: "Galerías",
    url: "/admin/galleries",
    icon: ImageIcon,
  },
  {
    title: "Usuarios",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Configuración",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border/50 bg-sidebar">
      <SidebarHeader className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Newspaper className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold tracking-tight text-sm">San Miguel Platform</span>
            <span className="text-xs text-muted-foreground">Admin Portal</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2 mt-4">
            Gestión Editorial
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => window.location.href = item.url} className="flex items-center gap-3">
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 rounded-md bg-primary text-primary-foreground">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Administrador</span>
            <span className="text-xs text-muted-foreground">admin@platform.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
