"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <DashboardContent />
      </SidebarInset>
    </SidebarProvider>
  )
}

