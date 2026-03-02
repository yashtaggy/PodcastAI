import { Logo } from '@/components/logo';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="py-6 px-6 md:px-12 relative z-50 bg-[#7c3aed] text-white">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[100%] bg-white/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-50%] right-[-10%] w-[30%] h-[80%] bg-lime-400/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-white/10 pb-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Logo className="h-24 w-24 text-white" />
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-[900] tracking-tighter">PodCast AI</h3>
                            <p className="text-violet-100 max-w-sm text-base font-medium leading-relaxed">
                                The Intelligence & Authority Engine for <span className="text-lime-300 font-bold">Bharat's creators</span>.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-4">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-violet-200">Contact Us</span>
                        <a
                            href="mailto:info.podcastai@gmail.com"
                            className="text-xl md:text-2xl font-black text-white hover:text-lime-300 transition-all duration-300 flex items-center gap-3 group"
                        >
                            info.podcastai@gmail.com
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-lime-400 group-hover:text-black transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-violet-200/60">
                    <div className="flex items-center gap-4">
                        <span>&copy; 2026 PodCast AI</span>
                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                        <span className="italic">Built for Bharat</span>
                    </div>

                    <div className="flex items-center gap-8 bg-white/5 py-3 px-6 rounded-2xl border border-white/10 group transition-all hover:bg-white/10">
                        <span className="opacity-50">Hackathon Edition</span>
                        <div className="h-14 w-44 relative">
                            <Image
                                src="/hackathon-banner.png"
                                alt="AI for Bharat"
                                fill
                                className="object-contain filter brightness-200 grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
