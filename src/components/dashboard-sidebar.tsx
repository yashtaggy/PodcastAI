
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
import { LayoutGrid, ListVideo, Settings, LogOut, LifeBuoy } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { Button } from "./ui/button";

const navItems = [
    { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
    { href: "/dashboard/episodes", icon: ListVideo, label: "Episodes" },
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
                    <Link href={item.href} passHref legacyBehavior>
                        <SidebarMenuButton asChild tooltip={item.label} isActive={pathname.startsWith(item.href)}>
                            <a>
                                <item.icon />
                                <span>{item.label}</span>
                            </a>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
             <Link href="#" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="Settings">
                    <a>
                        <Settings />
                        <span>Settings</span>
                    </a>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/login" passHref legacyBehavior>
                <SidebarMenuButton asChild tooltip="Logout">
                    <a>
                        <LogOut />
                        <span>Logout</span>
                    </a>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
