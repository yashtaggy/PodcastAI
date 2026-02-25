import { Mountain } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return <Mountain className={cn("text-primary", className)} />;
}
