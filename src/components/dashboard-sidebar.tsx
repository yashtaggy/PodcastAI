
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
import { LayoutGrid, ListVideo, Settings, LogOut, LifeBuoy, Podcast } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { Button } from "./ui/button";

const navItems = [
    { href: "/dashboard", icon: Podcast, label: "Episodes" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="size-7 text-primary" />
          <span className="font-headline text-xl font-semibold text-primary">PodVision</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
            {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                        <SidebarMenuButton tooltip={item.label} isActive={pathname.startsWith(item.href) && (item.href === '/dashboard' ? pathname === item.href || pathname.startsWith('/dashboard/episodes') : true)}>
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
             <Link href="/dashboard/onboarding">
                <SidebarMenuButton tooltip="Onboarding">
                    <Settings />
                    <span>Onboarding</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
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
