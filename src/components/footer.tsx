import { Logo } from '@/components/logo';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="py-4 px-6 md:px-12 relative z-10 bg-background border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                <div className="flex items-center gap-4">
                    <Logo className="h-6 w-6 opacity-80" />
                    <span className="font-headline text-base font-bold text-foreground/80 tracking-tight">PodCast AI &copy; 2026</span>
                    <span className="hidden sm:inline w-1 h-1 rounded-full bg-border mx-2"></span>
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:inline italic text-xs opacity-60 font-medium">Engine for Bharat</span>
                        <div className="h-12 w-32 relative rounded-xl overflow-hidden border-2 border-primary/20 shadow-md group hover:border-primary/50 transition-all">
                            <Image
                                src="/hackathon-banner.png"
                                alt="Built for- AI for Bharat Hackathon"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                    <Link href="/dashboard/settings" className="hover:text-primary transition-colors">Settings</Link>
                    <a href="mailto:info.podcastai@gmail.com" className="hover:text-primary transition-colors">Support</a>
                </div>
            </div>
        </footer>
    );
}
