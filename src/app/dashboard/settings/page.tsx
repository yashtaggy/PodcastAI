"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, Moon, Sun, Monitor, User, Palette, Shield, BellRing, UserCircle, Save, CheckCircle2, ChevronRight } from "lucide-react";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-12">
            <div className="space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                {/* Header Section */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg blur-3xl -z-10" />
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                            Settings
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Manage your account settings and preferences.
                        </p>
                    </div>
                </div>

                {/* Appearance Card */}
                <Card className="overflow-hidden border-none shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                    <CardHeader className="relative pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                                <Palette className="size-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-semibold">Appearance</CardTitle>
                                <CardDescription className="text-base">
                                    Customize how PodCast AI looks on your device.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="relative space-y-6">
                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-muted-foreground">Theme Preference</Label>
                            <RadioGroup
                                defaultValue={theme}
                                onValueChange={(val) => setTheme(val)}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                                {[
                                    { value: "light", icon: Sun, label: "Light", description: "Bright and clean" },
                                    { value: "dark", icon: Moon, label: "Dark", description: "Easy on the eyes" },
                                    { value: "system", icon: Monitor, label: "System", description: "Follows your device" },
                                ].map(({ value, icon: Icon, label, description }) => (
                                    <div key={value} className="relative group">
                                        <RadioGroupItem
                                            value={value}
                                            id={value}
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor={value}
                                            className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-card p-6 hover:bg-accent/50 hover:border-primary/50 hover:shadow-lg transition-all duration-200 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                                        >
                                            <Icon className="mb-3 h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                            <span className="font-medium">{label}</span>
                                            <span className="text-xs text-muted-foreground mt-1">{description}</span>
                                            {theme === value && (
                                                <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-primary" />
                                            )}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Card */}
                <Card className="overflow-hidden border-none shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                    <CardHeader className="relative pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                                <Shield className="size-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-semibold">Security</CardTitle>
                                <CardDescription className="text-base">
                                    Update your password and secure your account.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="relative space-y-5">
                        <div className="grid gap-5">
                            <div className="grid gap-2.5">
                                <Label htmlFor="current" className="text-sm font-medium">Current Password</Label>
                                <Input 
                                    id="current" 
                                    type="password" 
                                    placeholder="Enter current password" 
                                    className="h-11 bg-background/50 border-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <div className="grid gap-2.5">
                                <Label htmlFor="new" className="text-sm font-medium">New Password</Label>
                                <Input 
                                    id="new" 
                                    type="password" 
                                    placeholder="Enter new password" 
                                    className="h-11 bg-background/50 border-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <div className="grid gap-2.5">
                                <Label htmlFor="confirm" className="text-sm font-medium">Confirm New Password</Label>
                                <Input 
                                    id="confirm" 
                                    type="password" 
                                    placeholder="Confirm new password" 
                                    className="h-11 bg-background/50 border-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            className="mt-4 w-full sm:w-auto group relative overflow-hidden"
                            onClick={() => alert("Password change is non-functional in this demo.")}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Update Password
                                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </CardContent>
                </Card>

                {/* Notifications Card */}
                <Card className="overflow-hidden border-none shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                    <CardHeader className="relative pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                                <BellRing className="size-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-semibold">Notifications</CardTitle>
                                <CardDescription className="text-base">
                                    Choose what you want to be notified about.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="relative space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                            <div className="space-y-1">
                                <Label className="text-base font-medium">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive weekly digest of your podcast performance.</p>
                            </div>
                            <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                        </div>
                        <Separator className="bg-muted/50" />
                        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                            <div className="space-y-1">
                                <Label className="text-base font-medium">Viral Alerts</Label>
                                <p className="text-sm text-muted-foreground">Get notified when an episode starts trending.</p>
                            </div>
                            <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                        </div>
                    </CardContent>
                </Card>

                {/* Account Information Card */}
                <Card className="overflow-hidden border-none shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                    <CardHeader className="relative pb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                                <UserCircle className="size-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-semibold">Account Information</CardTitle>
                                <CardDescription className="text-base">
                                    General profile settings.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="relative space-y-5">
                        <div className="grid gap-5">
                            <div className="grid gap-2.5">
                                <Label htmlFor="name" className="text-sm font-medium">Display Name</Label>
                                <Input 
                                    id="name" 
                                    defaultValue="Podcast Creator" 
                                    className="h-11 bg-background/50 border-muted focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <div className="grid gap-2.5">
                                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                                <Input 
                                    id="email" 
                                    defaultValue="creator@example.com" 
                                    disabled 
                                    className="h-11 bg-muted/30 border-muted text-muted-foreground cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <Button 
                            className="mt-4 w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all"
                            onClick={() => alert("Profile saves are non-functional in this demo.")}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Save Profile
                                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}