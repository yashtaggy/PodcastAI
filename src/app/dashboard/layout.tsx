import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
          <DashboardHeader />
          <main className="p-4 sm:p-6 lg:p-8">
              {children}
          </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
