
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
import { Rocket, Podcast, Sparkles, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

const navItems = [
    { href: "/dashboard/onboarding", icon: Rocket, label: "Onboarding" },
    { href: "/dashboard", icon: Podcast, label: "Episodes" },
    { href: "/dashboard/authority-engine", icon: Sparkles, label: "Authority Engine"},
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
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="size-7 text-primary" />
          <span className="font-headline text-xl font-semibold text-primary">PodCastAI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
            {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                        <SidebarMenuButton tooltip={item.label} isActive={getIsActive(item.href)}>
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
           <SidebarMenuItem>
            <Link href="/login">
                <SidebarMenuButton tooltip="Logout">
                    <LogOut />
                    <span>Logout</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
