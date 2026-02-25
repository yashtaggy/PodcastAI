'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Rocket } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center" style={{minHeight: 'calc(100vh - 10rem)'}}>
      <Card className="bg-card/70 backdrop-blur-lg border border-border/50 text-center max-w-lg">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <Rocket className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl mt-4">Welcome to PodVision AI</CardTitle>
          <CardDescription className="text-base">
            Let's get started by creating a personalized launch strategy for your podcast.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Button asChild size="lg">
                <Link href="/dashboard/onboarding">
                    Generate Your Launch Strategy
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  )
}
