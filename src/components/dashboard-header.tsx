"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Search, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { Logo } from "./logo";

export function DashboardHeader() {
  const router = useRouter();
  const [avatar, setAvatar] = useState("🎙️");
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await fetchAuthSession();
        const payload = session.tokens?.idToken?.payload;
        const userId = payload?.sub;

        const response = await fetch("/api/get-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const userData = await response.json();
        if (userData?.avatar) {
          setAvatar(userData.avatar);
        }
        if (userData?.name) {
          setUserName(userData.name);
        }

      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex h-20 sm:h-24 items-center justify-between border-b bg-background/80 backdrop-blur-xl px-4 sm:px-6 md:px-12 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {/* Show trigger on widths below lg so it opens the slide-over sidebar; hide on lg+ */}
        <SidebarTrigger className="hover:bg-accent p-2 rounded-xl transition-colors lg:hidden" />
        <Link href="/dashboard" className="flex items-center gap-4 group">
          <Logo className="h-12 w-12 transition-transform duration-500 group-hover:rotate-12" />
          <span className="text-lg sm:text-2xl font-black tracking-tighter text-foreground hidden sm:block">
            PodCast AI
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {userName && (
          <span className="hidden lg:block text-lg font-black tracking-tight text-foreground/80 lowercase italic">
            @{userName.toLowerCase().replace(/\s+/g, '')}
          </span>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-2xl p-0 hover:bg-transparent h-14 w-14 group relative">
              <Avatar className="h-14 w-14 border-2 border-transparent group-hover:border-primary p-1 transition-all bg-background shadow-sm overflow-visible">
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center text-3xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-border overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all relative">
                  {avatar.startsWith('/') ? (
                    <img
                      src={avatar}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-background">{avatar}</AvatarFallback>
                  )}
                </div>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 p-3 rounded-3xl border-border bg-popover text-popover-foreground shadow-2xl mt-4">
            <DropdownMenuLabel className="px-3 pb-3 text-muted-foreground font-bold uppercase text-[10px] tracking-widest">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border mx-[-12px] mb-2" />
            <DropdownMenuItem asChild className="rounded-xl p-3 font-bold text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors mb-1">
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl p-3 font-bold text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors mb-1">
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl p-3 font-bold text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors mb-1">
              Support
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border mx-[-12px] my-2" />
            <DropdownMenuItem onClick={handleLogout} className="rounded-xl p-3 font-black text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer transition-colors">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
