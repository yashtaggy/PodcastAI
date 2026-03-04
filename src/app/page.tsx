import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import {
  ArrowRight,
  Zap,
  Target,
  BarChart3,
  Globe,
  Sparkles
} from 'lucide-react'
import Image from 'next/image'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7fee7] dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-lime-200/40 dark:bg-lime-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-violet-200/30 dark:bg-violet-900/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {/* NAV */}
      <nav className="flex items-center justify-end px-4 sm:px-6 md:px-12 py-6 relative z-50">
        <Button asChild className="bg-slate-950 hover:bg-slate-800 dark:bg-slate-100 dark:text-black text-white font-bold rounded-xl px-6 py-3 text-base shadow-md">
          <Link href="/login">Login</Link>
        </Button>
      </nav>

      <main className="flex-grow relative z-10 px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20 sm:pb-24 max-w-7xl mx-auto">

        {/* HERO */}
        <section className="text-center mb-20">

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
            <Logo className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32" />

            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-950 via-slate-700 to-slate-500 dark:from-white dark:to-slate-400">
              Podcast AI
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[900] tracking-tight text-slate-950 dark:text-white leading-tight mb-6">
            The AI Engine <br />
            <span className="italic font-serif font-medium text-slate-700 dark:text-slate-300">
              for
            </span>{' '}
            <span className="underline decoration-lime-400 decoration-4 sm:decoration-6 underline-offset-8">
              Bharat
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Podcast AI is an <span className="font-semibold text-slate-900 dark:text-white">
              Intelligence & Authority Platform
            </span>{' '}
            designed for Indian creators. Scale your brand across
            20+ languages effortlessly.
          </p>

          <Button
            asChild
            className="w-full sm:w-auto h-14 sm:h-16 px-6 sm:px-10 text-lg sm:text-xl font-bold bg-[#bef264] hover:bg-[#a3e635] text-black rounded-2xl border-2 border-black dark:border-white shadow-lg transition hover:translate-y-1"
          >
            <Link href="/login" className="flex items-center gap-2 justify-center">
              Create Account <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
          </Button>

        </section>

        {/* BENTO GRID */}

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-6 md:auto-rows-[220px]">

          {/* PodScore */}
          <div className="md:col-span-6 lg:col-span-8 row-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition">

            <div className="flex justify-end mb-6">
              <div className="w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center text-white">
                <BarChart3 />
              </div>
            </div>

            <span className="text-violet-600 text-sm font-bold uppercase tracking-wider">
              Proprietary AI
            </span>

            <h3 className="text-3xl md:text-4xl font-black mt-3 mb-4 dark:text-white">
              Introducing PodScore
            </h3>

            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              The only engine that measures engagement, emotion,
              and domain depth across multilingual Indian content.
            </p>

          </div>

          {/* Multilingual */}
          <div className="md:col-span-3 lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">

            <Globe className="w-10 h-10 text-lime-600 mb-3" />

            <h4 className="text-xl font-bold dark:text-white">
              Multilingual Mastery
            </h4>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Built for 22+ Indian languages.
            </p>

          </div>

          {/* Stats */}
          <div className="md:col-span-3 lg:col-span-4 bg-slate-950 text-white p-6 rounded-3xl flex flex-col justify-center">

            <div className="text-3xl font-black text-lime-400">
              10x
            </div>

            <p className="text-sm opacity-80">
              Faster repurposing with Authority Engine.
            </p>

          </div>

          {/* Launch */}
          <div className="md:col-span-3 lg:col-span-4 row-span-2 bg-lime-100 dark:bg-lime-950/20 p-6 rounded-3xl border border-lime-300 dark:border-lime-900">

            <Target className="w-10 h-10 mb-4" />

            <h4 className="text-2xl font-black mb-4 dark:text-white">
              Launch Smarter
            </h4>

            <ul className="space-y-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <li>Identity Definition</li>
              <li>Episode Structure</li>
              <li>Guest Personas</li>
            </ul>

          </div>

          {/* Authority */}
          <div className="md:col-span-3 lg:col-span-4 row-span-2 bg-violet-600 text-white p-6 rounded-3xl">

            <Zap className="w-10 h-10 mb-4" />

            <h4 className="text-2xl font-black mb-4">
              Authority Engine
            </h4>

            <p className="text-sm opacity-90">
              Turn every episode into 10+ social media assets automatically.
            </p>

          </div>

          {/* Social */}
          <div className="md:col-span-6 lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">

            <div className="grid grid-cols-4 gap-4 max-w-[260px]">

              {['youtube.png', 'instagram.png', 'x.png', 'facebook.png'].map((img) => (
                <Image
                  key={img}
                  src={`/${img}`}
                  alt={img}
                  width={50}
                  height={50}
                  className="w-full h-auto object-contain"
                />
              ))}

            </div>

            <p className="text-xs uppercase mt-6 font-bold tracking-wider">
              Auto Posting Ready
            </p>

          </div>

        </section>

        {/* CTA */}

        <section className="mt-20 sm:mt-28 md:mt-40 text-center">

          <div className="p-8 sm:p-12 md:p-16 rounded-3xl md:rounded-[4rem] bg-slate-950 text-white">

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-[900] mb-8">
              Every creator is an <span className="text-lime-400">empire.</span>
              <br />
              Podcast AI is your <span className="underline decoration-lime-400">engine.</span>
            </h2>

            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-slate-200 text-black font-bold text-lg px-8 h-14 rounded-full"
            >
              <Link href="/login">Get Started for Free</Link>
            </Button>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  )
}