'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { generateLaunchStrategy, AiLaunchStrategyInput } from "@/ai/flows/ai-launch-strategy-flow";
import { Loader2, Rocket, ChevronLeft } from "lucide-react";
import Balancer from "react-wrap-balancer";

const languages = [
    { id: "english", label: "English" },
    { id: "hindi", label: "Hindi" },
    { id: "tamil", label: "Tamil" },
    { id: "telugu", label: "Telugu" },
    { id: "bengali", label: "Bengali" },
    { id: "marathi", label: "Marathi" },
    { id: "gujarati", label: "Gujarati" },
    { id: "kannada", label: "Kannada" },
    { id: "malayalam", label: "Malayalam" },
    { id: "punjabi", label: "Punjabi" },
];

const platforms = [
    { id: "Instagram", label: "Instagram" },
    { id: "LinkedIn", label: "LinkedIn" },
    { id: "YouTube", label: "YouTube" },
    { id: "Twitter", label: "Twitter" },
];

const formSchema = z.object({
    podcastNiche: z.string().min(3, "Niche must be at least 3 characters long."),
    targetAudience: z.string().min(10, "Target audience description must be at least 10 characters long."),
    languages: z.array(z.string()).min(1, "Please select at least one language."),
    tone: z.enum(['Professional', 'Casual', 'Humorous', 'Inspirational', 'Educational']),
    postingFrequency: z.enum(['Daily', 'Weekly', 'Bi-Weekly', 'Monthly']),
    platformPriority: z.array(z.string()).min(1, "Please select at least one platform."),
    expertiseLevel: z.enum(['Beginner', 'Intermediate', 'Expert']),
    brandColors: z.object({
        primary: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color."),
        accent: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color."),
    }),
});

type OnboardingFormValues = z.infer<typeof formSchema>;

export default function OnboardingPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnboardingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            languages: ["english"],
            platformPriority: ["Instagram"],
            tone: 'Casual',
            postingFrequency: 'Weekly',
            expertiseLevel: 'Intermediate',
            brandColors: { primary: '#8b5cf6', accent: '#ec4899' }
        },
    });

    const onSubmit = async (data: OnboardingFormValues) => {
        setIsLoading(true);
        try {
            const strategy = await generateLaunchStrategy(data as AiLaunchStrategyInput);
            // Store strategy in local storage to pass to the next page
            localStorage.setItem("launchStrategy", JSON.stringify(strategy));
            // Store onboarding inputs for other features
            localStorage.setItem("onboardingData", JSON.stringify(data));
            toast({
                title: "Strategy Generated!",
                description: "Your AI-powered launch strategy is ready.",
            });
            router.push("/dashboard/onboarding/strategy");
        } catch (error) {
            console.error("Failed to generate strategy:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Could not generate your launch strategy. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!showForm) {
        return (
            <div className="flex items-center justify-center min-h-[80vh] p-6">
                <Card className="glass-vivid text-center max-w-2xl px-8 py-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
                    <CardHeader className="space-y-6">
                        <div className="mx-auto bg-primary/20 p-6 rounded-3xl w-fit transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                            <Rocket className="w-12 h-12 text-primary" />
                        </div>
                        <div className="space-y-4">
                            <CardTitle className="font-headline text-4xl md:text-5xl font-black tracking-tighter leading-tight text-foreground">
                                Create Your <span className="text-primary italic">AI-Powered</span> Launch Strategy
                            </CardTitle>
                            <CardDescription className="text-lg md:text-xl text-muted-foreground pt-4 leading-relaxed">
                                <Balancer>
                                    Answer a few questions about your podcast, and our AI will generate a personalized, step-by-step launch plan to help you grow your audience from day one.
                                </Balancer>
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-8 flex flex-col items-center">
                        <Button size="lg" onClick={() => setShowForm(true)} className="h-16 px-12 text-xl font-black rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:translate-y-[-2px] active:scale-95">
                            Start Onboarding
                        </Button>
                        <p className="text-xs text-muted-foreground mt-8 font-bold uppercase tracking-widest opacity-60 italic">It only takes a few minutes!</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-6">
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl glass-vivid border-white/20 hover:bg-white/10" onClick={() => setShowForm(false)}>
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Back</span>
                </Button>
                <div>
                    <h1 className="font-headline text-4xl font-black tracking-tight text-foreground">Creator Onboarding</h1>
                    <p className="text-lg text-muted-foreground">
                        Tell us about your podcast to generate a personalized AI launch strategy.
                    </p>
                </div>
            </div>

            <Card className="glass-vivid border-none">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader className="pb-8">
                        <CardTitle className="text-2xl font-black text-foreground">Podcast Details</CardTitle>
                        <CardDescription className="text-base text-muted-foreground">The more details you provide, the better the strategy will be.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label htmlFor="podcastNiche" className="text-sm font-bold uppercase tracking-widest text-foreground/60">Podcast Niche</Label>
                                <Input id="podcastNiche" placeholder="e.g., Tech Startups, Mindfulness, True Crime" {...register("podcastNiche")} className="h-14 rounded-2xl border-white/20 bg-background/20 focus:ring-primary text-foreground" />
                                {errors.podcastNiche && <p className="text-sm text-destructive font-medium">{errors.podcastNiche.message}</p>}
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="targetAudience" className="text-sm font-bold uppercase tracking-widest text-foreground/60">Target Audience</Label>
                                <Input id="targetAudience" placeholder="e.g., Aspiring entrepreneurs, Busy professionals, History buffs" {...register("targetAudience")} className="h-14 rounded-2xl border-white/20 bg-background/20 focus:ring-primary text-foreground" />
                                {errors.targetAudience && <p className="text-sm text-destructive font-medium">{errors.targetAudience.message}</p>}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-sm font-bold uppercase tracking-widest text-foreground/60">Posting Frequency</Label>
                                <Controller
                                    name="postingFrequency"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="h-14 rounded-2xl border-white/20 bg-background/20 text-foreground">
                                                <SelectValue placeholder="Select frequency" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-vivid">
                                                <SelectItem value="Daily">Daily</SelectItem>
                                                <SelectItem value="Weekly">Weekly</SelectItem>
                                                <SelectItem value="Bi-Weekly">Bi-Weekly</SelectItem>
                                                <SelectItem value="Monthly">Monthly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.postingFrequency && <p className="text-sm text-destructive font-medium">{errors.postingFrequency.message}</p>}
                            </div>
                            <div className="space-y-3">
                                <Label className="text-sm font-bold uppercase tracking-widest text-foreground/60">Your Expertise Level</Label>
                                <Controller
                                    name="expertiseLevel"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="h-14 rounded-2xl border-white/20 bg-background/20 text-foreground">
                                                <SelectValue placeholder="Select your expertise" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-vivid">
                                                <SelectItem value="Beginner">Beginner</SelectItem>
                                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                                <SelectItem value="Expert">Expert</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.expertiseLevel && <p className="text-sm text-destructive font-medium">{errors.expertiseLevel.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Label className="text-sm font-bold uppercase tracking-widest text-foreground/60">Preferred Languages</Label>
                            <Controller
                                name="languages"
                                control={control}
                                render={({ field }) => (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-4 gap-x-8">
                                        {languages.map((lang) => (
                                            <div key={lang.id} className="flex items-center space-x-3 group">
                                                <Checkbox
                                                    id={`lang-${lang.id}`}
                                                    checked={field.value?.includes(lang.id)}
                                                    className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-5 w-5 rounded-md"
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...(field.value || []), lang.id])
                                                            : field.onChange(field.value?.filter((value) => value !== lang.id));
                                                    }}
                                                />
                                                <Label htmlFor={`lang-${lang.id}`} className="font-medium text-foreground/80 group-hover:text-foreground transition-colors cursor-pointer">{lang.label}</Label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                            {errors.languages && <p className="text-sm text-destructive font-medium">{errors.languages.message}</p>}
                        </div>

                        <div className="space-y-4">
                            <Label>Platform Priority</Label>
                            <Controller
                                name="platformPriority"
                                control={control}
                                render={({ field }) => (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {platforms.map((platform) => (
                                            <div key={platform.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`platform-${platform.id}`}
                                                    checked={field.value?.includes(platform.id)}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...(field.value || []), platform.id])
                                                            : field.onChange(field.value?.filter((value) => value !== platform.id));
                                                    }}
                                                />
                                                <Label htmlFor={`platform-${platform.id}`} className="font-normal">{platform.label}</Label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                            {errors.platformPriority && <p className="text-sm text-destructive">{errors.platformPriority.message}</p>}
                        </div>


                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label>Tone & Content Style</Label>
                                <Controller
                                    name="tone"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a tone" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Professional">Professional</SelectItem>
                                                <SelectItem value="Casual">Casual</SelectItem>
                                                <SelectItem value="Humorous">Humorous</SelectItem>
                                                <SelectItem value="Inspirational">Inspirational</SelectItem>
                                                <SelectItem value="Educational">Educational</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.tone && <p className="text-sm text-destructive">{errors.tone.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="brandPrimary">Primary Brand Color</Label>
                                <Input id="brandPrimary" type="color" {...register("brandColors.primary")} className="p-1 h-10" />
                                {errors.brandColors?.primary && <p className="text-sm text-destructive">{errors.brandColors.primary.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="brandAccent">Accent Brand Color</Label>
                                <Input id="brandAccent" type="color" {...register("brandColors.accent")} className="p-1 h-10" />
                                {errors.brandColors?.accent && <p className="text-sm text-destructive">{errors.brandColors.accent.message}</p>}
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="pt-8 border-t border-white/10">
                        <Button type="submit" disabled={isLoading} className="h-16 px-10 text-xl font-black rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:translate-y-[-2px] active:scale-95 w-full md:w-auto">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                    Analyzing & Planning...
                                </>
                            ) : "Generate AI Launch Strategy"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
