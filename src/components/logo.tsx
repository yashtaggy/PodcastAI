import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden shrink-0", className)}>
      <Image
        src="/podcast-logo.png"
        alt="PodcastAI Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
