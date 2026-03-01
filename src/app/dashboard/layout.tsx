import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { EpisodesProvider } from "@/context/episodes-context"
import { Footer } from "@/components/footer"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EpisodesProvider>
      <SidebarProvider>
        <div className="flex flex-col min-h-screen w-full">
          <div className="flex flex-1 overflow-hidden">
            <DashboardSidebar />
            <SidebarInset className="bg-background flex flex-col overflow-auto">
              <DashboardHeader />
              <main className="flex-grow p-4 sm:p-6 lg:p-8">
                {children}
              </main>
            </SidebarInset>
          </div>
          <Footer />
        </div>
      </SidebarProvider>
    </EpisodesProvider>
  )
}
