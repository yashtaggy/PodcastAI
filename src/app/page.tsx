import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Zap, Target, BarChart3, Globe, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7fee7] dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden selection:bg-lime-200 transition-colors">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-lime-200/40 dark:bg-lime-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-violet-200/30 dark:bg-violet-900/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-end px-6 py-6 md:px-12 relative z-50">
        <Button asChild className="bg-slate-950 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-black text-white font-bold rounded-2xl px-8 py-6 text-lg border-b-4 border-slate-700 active:border-b-0 active:translate-y-1 transition-all shadow-xl">
          <Link href="/login">Login</Link>
        </Button>
      </nav>

      <main className="flex-grow relative z-10 px-6 pt-12 pb-24 max-w-7xl mx-auto">
        {/* Innovative Hero Section */}
        <section className="text-center mb-32 relative">
          <div className="flex flex-row items-center justify-center gap-8 mb-12 animate-fade-in group cursor-default">
            <Logo className="h-32 w-32 transition-transform duration-700 group-hover:scale-110" />
            <span className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400">
              PodCast AI
            </span>
          </div>

          <h1 className="text-4xl md:text-[5.5rem] font-[900] tracking-tighter text-slate-950 dark:text-white leading-[0.9] mb-8">
            The AI Engine <br />
            <span className="italic font-serif font-medium text-slate-800 dark:text-slate-300 opacity-80">for</span> <span className="underline decoration-lime-400 decoration-8 underline-offset-[12px]">Bharat</span>
          </h1>

          <p className="text-2xl md:text-3xl font-medium text-slate-600 dark:text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            PodCast AI is an <span className="text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white">Intelligence & Authority Platform</span> designed for Indian creators. Scale your brand across 20+ languages effortlessly.
          </p>

          <div className="flex justify-center items-center">
            <Button asChild size="lg" className="h-20 px-12 text-2xl font-black bg-[#bef264] hover:bg-[#a3e635] text-black rounded-[2rem] border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
              <Link href="/login" className="flex items-center gap-3">
                Create Account <ArrowRight className="w-8 h-8" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Bento Intelligence Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[240px]">

          <div className="md:col-span-6 lg:col-span-8 row-span-2 group relative overflow-hidden bg-white dark:bg-slate-900 p-10 rounded-[3rem] border-2 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute top-0 right-0 p-8">
              <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-violet-200 dark:shadow-none animate-bounce">
                <BarChart3 className="w-8 h-8" />
              </div>
            </div>
            <div className="h-full flex flex-col justify-between">
              <div>
                <span className="text-violet-600 dark:text-violet-400 font-black text-sm uppercase tracking-widest mb-4 block">Proprietary AI</span>
                <h3 className="text-4xl md:text-5xl font-black mb-6 dark:text-white">Introducing PodScore</h3>
                <p className="text-xl text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                  The only analysis engine that measures <span className="text-slate-900 dark:text-white font-bold">engagement, emotion, and domain depth</span> across multilingual Indian content.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-4 row-span-1 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border-2 border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center group hover:border-lime-400 transition-all">
            <Globe className="w-12 h-12 text-lime-600 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-2xl font-bold mb-2 dark:text-white">Multilingual Mastery</h4>
            <p className="text-slate-500 dark:text-slate-400">Built for 22+ Indian languages. Authenticity at its core.</p>
          </div>

          <div className="md:col-span-3 lg:col-span-4 row-span-1 bg-slate-950 text-white p-8 rounded-[3rem] border-2 border-black flex flex-col justify-center gap-2">
            <div className="text-4xl font-black text-lime-400">10x</div>
            <p className="text-lg opacity-80">Faster repurposing with Authority Engine.</p>
          </div>

          <div className="md:col-span-3 lg:col-span-4 row-span-2 bg-lime-100 dark:bg-lime-950/20 p-8 rounded-[3rem] border-2 border-lime-300 dark:border-lime-900 relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-lime-300 dark:bg-lime-900 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-700"></div>
            <Target className="w-12 h-12 text-slate-900 dark:text-white mb-6" />
            <h4 className="text-3xl font-black mb-6 dark:text-white">Launch Smarter</h4>
            <ul className="space-y-4 relative z-10">
              {["Identity Definition", "Episode Structure", "Guest Personas"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 font-bold text-slate-800 dark:text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-4 row-span-2 bg-violet-600 text-white p-8 rounded-[3rem] border-2 border-violet-800 relative group overflow-hidden">
            <Sparkles className="absolute top-8 right-8 w-12 h-12 opacity-30 group-hover:rotate-45 transition-transform" />
            <Zap className="w-12 h-12 text-white mb-6" />
            <h4 className="text-3xl font-black mb-6 leading-tight">Authority Engine</h4>
            <p className="text-lg opacity-80 leading-relaxed">
              Turn every episode into 10+ social media assets automatically.
            </p>
          </div>

          <div className="md:col-span-6 lg:col-span-4 row-span-1 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border-2 border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center hover:shadow-lg transition-all">
            <div className="flex gap-4 mb-4">
              <span className="p-3 bg-red-100 dark:bg-red-900/20 rounded-2xl text-[10px] font-bold">YT</span>
              <span className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl text-[10px] font-bold">IN</span>
              <span className="p-3 bg-sky-100 dark:bg-sky-900/20 rounded-2xl text-[10px] font-bold">TW</span>
            </div>
            <p className="font-bold text-slate-700 dark:text-slate-400 uppercase tracking-widest text-[10px]">Auto-Posting Ready</p>
          </div>
        </section>

        {/* Branding Statement at Bottom */}
        <section className="mt-40 text-center">
          <div className="p-16 rounded-[4rem] bg-slate-950 text-white overflow-hidden relative group">
            <div className="absolute inset-0 bg-[#a3e635] opacity-0 group-hover:opacity-5 transition-opacity duration-1000"></div>
            <h2 className="text-4xl md:text-6xl font-[900] mb-8 relative z-10 leading-tight">
              Every creator is an <span className="text-lime-400">empire.</span> <br />
              PodCast AI is your <span className="underline decoration-lime-400">engine.</span>
            </h2>
            <Button asChild size="lg" className="bg-white hover:bg-slate-200 text-black font-black text-xl px-12 h-16 rounded-full relative z-10 transition-transform hover:scale-105 active:scale-95">
              <Link href="/login">Get Started for Free</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
