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
import { Loader2 } from "lucide-react";

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
    platformPriority: z.array(z.string()).min(1, "Please select at least one platform."),
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
            brandColors: { primary: '#8b5cf6', accent: '#ec4899' }
        },
    });
    
    const onSubmit = async (data: OnboardingFormValues) => {
        setIsLoading(true);
        try {
            const strategy = await generateLaunchStrategy(data as AiLaunchStrategyInput);
            // Store strategy in local storage to pass to the next page
            localStorage.setItem("launchStrategy", JSON.stringify(strategy));
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

    return (
        <div className="space-y-6">
            <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Creator Onboarding</CardTitle>
                    <CardDescription>
                        Tell us about your podcast. This will help us generate a personalized AI launch strategy for you.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="podcastNiche">Podcast Niche</Label>
                                <Input id="podcastNiche" placeholder="e.g., Tech Startups, Mindfulness, True Crime" {...register("podcastNiche")} />
                                {errors.podcastNiche && <p className="text-sm text-destructive">{errors.podcastNiche.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="targetAudience">Target Audience</Label>
                                <Input id="targetAudience" placeholder="e.g., Aspiring entrepreneurs, Busy professionals, History buffs" {...register("targetAudience")} />
                                {errors.targetAudience && <p className="text-sm text-destructive">{errors.targetAudience.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label>Preferred Languages</Label>
                            <Controller
                                name="languages"
                                control={control}
                                render={({ field }) => (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                        {languages.map((lang) => (
                                            <div key={lang.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`lang-${lang.id}`}
                                                    checked={field.value?.includes(lang.id)}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...(field.value || []), lang.id])
                                                            : field.onChange(field.value?.filter((value) => value !== lang.id));
                                                    }}
                                                />
                                                <Label htmlFor={`lang-${lang.id}`} className="font-normal">{lang.label}</Label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                            {errors.languages && <p className="text-sm text-destructive">{errors.languages.message}</p>}
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
                                <Input id="brandPrimary" type="color" {...register("brandColors.primary")} className="p-1 h-10"/>
                                {errors.brandColors?.primary && <p className="text-sm text-destructive">{errors.brandColors.primary.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="brandAccent">Accent Brand Color</Label>
                                <Input id="brandAccent" type="color" {...register("brandColors.accent")} className="p-1 h-10"/>
                                {errors.brandColors?.accent && <p className="text-sm text-destructive">{errors.brandColors.accent.message}</p>}
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating Strategy...
                                </>
                            ) : "Generate AI Launch Strategy"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
