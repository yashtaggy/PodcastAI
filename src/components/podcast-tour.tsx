"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, Podcast, Sparkles, Zap, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { Logo } from "./logo";

interface TourStep {
    title: string;
    description: string;
    icon: any;
    color: string;
}

const TOUR_STEPS: TourStep[] = [
    {
        title: "Welcome to PodCast AI",
        description: "Your all-in-one AI engine for building authority. Let's take a quick look at how you can transform your podcasting journey.",
        icon: Logo,
        color: "text-primary",
    },
    {
        title: "Planning & Launch",
        description: "Define your identity, structure your episodes, and build your guest personas using our AI Launch Strategy engine.",
        icon: Rocket,
        color: "text-purple-500",
    },
    {
        title: "Episode Management",
        description: "Upload your recordings and let our AI analyze them. Get deep insights into engagement, emotion, and 'PodScore' depth.",
        icon: Podcast,
        color: "text-blue-500",
    },
    {
        title: "Authority Engine",
        description: "Turn a single episode into 10+ high-authority social media assets—threads, posts, and clips—automatically.",
        icon: Sparkles,
        color: "text-amber-500",
    },
    {
        title: "Distribution Hub",
        description: "Effortlessly scale your reach across 20+ languages and multiple platforms from a single command center.",
        icon: Zap,
        color: "text-lime-500",
    },
];

export function PodcastTour({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (!open) {
            const timer = setTimeout(() => setCurrentStep(0), 300);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const nextStep = () => {
        if (currentStep < TOUR_STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onOpenChange(false);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const step = TOUR_STEPS[currentStep];
    const Icon = step.icon;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] glass-vivid border-primary/20 rounded-[3rem] p-0 overflow-hidden shadow-2xl">
                <div className="relative">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-muted/20">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
                        />
                    </div>

                    <div className="p-10 pt-12 text-center space-y-6">
                        <div className={`mx-auto w-24 h-24 rounded-3xl bg-background/50 border border-border shadow-inner flex items-center justify-center ${step.color} animate-in zoom-in duration-300`}>
                            <Icon className="w-14 h-14" strokeWidth={1.5} />
                        </div>

                        <div className="space-y-3">
                            <DialogHeader>
                                <DialogTitle className="text-3xl font-headline font-black text-center tracking-tight">
                                    {step.title}
                                </DialogTitle>
                                <DialogDescription className="text-lg text-muted-foreground text-center leading-relaxed pt-2">
                                    {step.description}
                                </DialogDescription>
                            </DialogHeader>
                        </div>

                        <div className="flex justify-center gap-2 pt-2">
                            {TOUR_STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? "w-8 bg-primary" : "w-1.5 bg-muted"}`}
                                />
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="p-8 pt-0 flex flex-row justify-between items-center sm:justify-between">
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className="rounded-xl px-6 font-bold hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>

                        <Button
                            onClick={nextStep}
                            className="rounded-xl px-8 py-6 font-black text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            {currentStep === TOUR_STEPS.length - 1 ? (
                                <>
                                    Start Creating
                                    <CheckCircle2 className="h-5 w-5" />
                                </>
                            ) : (
                                <>
                                    Next
                                    <ChevronRight className="h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
