'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Rocket, Podcast, Sparkles, Zap, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

const navItems = [
  { href: "/dashboard/onboarding", icon: Rocket, label: "Planning & Launch" },
  { href: "/dashboard", icon: Podcast, label: "Episodes" },
  { href: "/dashboard/authority-engine", icon: Sparkles, label: "Authority Engine" },
  { href: "/dashboard/distribution-hub", icon: Zap, label: "Distribution Hub" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const getIsActive = (itemHref: string) => {
    if (itemHref === '/dashboard') {
      return pathname === itemHref || pathname.startsWith('/dashboard/episodes');
    }
    return pathname.startsWith(itemHref);
  }

  return (
    // Hidden on small screens, shown as a fixed sidebar at lg and above. On smaller screens
    // the Sidebar component will render a slide-over (Sheet) thanks to the `useIsMobile` hook.
    <Sidebar className="hidden lg:flex lg:w-72 border-r border-sidebar-border bg-sidebar-background flex-col">
      <SidebarHeader className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <Logo className="size-10 transition-transform duration-500 group-hover:rotate-12" />
          <span className="text-xl sm:text-2xl font-black tracking-tighter text-sidebar-foreground">PodCast AI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu className="gap-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  tooltip={item.label}
                  isActive={getIsActive(item.href)}
                  className="rounded-xl h-12 px-4 font-bold text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-lg active:scale-95 flex items-center gap-3"
                >
                  <item.icon className="size-5" />
                  <span className="text-sm sm:text-base tracking-tight">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/login">
              <SidebarMenuButton
                tooltip="Logout"
                className="rounded-xl h-12 px-4 font-bold text-destructive hover:bg-destructive/10 transition-all"
              >
                <LogOut className="size-5" />
                <span className="text-base">Logout</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
