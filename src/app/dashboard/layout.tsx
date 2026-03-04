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
                <main className="flex-grow">
                  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                  </div>
                </main>
            </SidebarInset>
          </div>
          <Footer />
        </div>
      </SidebarProvider>
    </EpisodesProvider>
  )
}
