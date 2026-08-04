import * as React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/app-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dark min-h-screen bg-background text-foreground selection:bg-primary/20">
      <TooltipProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex w-full flex-col flex-1 overflow-hidden">
              <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-border/50 bg-background/95 backdrop-blur px-4">
                <SidebarTrigger className="-ml-1" />
                <div className="h-4 w-px bg-border mx-2" />
                <span className="text-sm font-medium">Panel de Control</span>
              </header>
              <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <div className="mx-auto max-w-6xl w-full">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  )
}
