import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(132,77,240,0.3),rgba(255,255,255,0))]"></div>
      
      <div className="mb-8">
        <Logo className="h-20 w-20 text-primary" />
      </div>
      
      <h1 className="font-headline text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
        PodCastAI
      </h1>
      
      <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        The Intelligent Podcast Performance & Viral Engine.
        Transform your content, amplify your reach, and go viral.
      </p>

      <div className="mt-8 flex gap-4">
        <Button asChild size="lg" className="font-semibold text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
          <Link href="/dashboard/onboarding">Get Started</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="font-semibold text-lg">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>

      <div className="mt-24 w-full max-w-6xl mx-auto">
        <div className="relative rounded-xl bg-card/30 backdrop-blur-lg border border-white/10 shadow-2xl shadow-primary/10">
          <div className="p-4 border-b border-white/10 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="p-8">
            <p className="font-code text-left text-muted-foreground">
              <span className="text-accent">// Your podcast's future, powered by AI.</span><br/>
              <span className="text-primary">const</span> podcastai = <span className="text-accent">new</span> AI_Engine(&#123; <br />
              &nbsp;&nbsp;audio: <span className="text-green-400">'your-podcast.mp3'</span>,<br/>
              &nbsp;&nbsp;goals: [<span className="text-green-400">'grow_audience'</span>, <span className="text-green-400">'increase_engagement'</span>, <span className="text-green-400">'go_viral'</span>]<br/>
              &#125;);<br/><br/>
              podcastai.analyze().then(<span className="text-accent">results</span> =&gt; &#123;<br/>
              &nbsp;&nbsp;console.log(<span className="text-accent">results</span>.viralContent);<br/>
              &#125;);
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
