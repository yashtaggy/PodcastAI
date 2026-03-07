"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Mail, LifeBuoy, Clock, CheckCircle2 } from "lucide-react";

export default function SupportPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="max-w-md w-full glass-vivid border-primary/20 shadow-2xl rounded-[2.5rem] p-8 text-center animate-in fade-in zoom-in duration-500">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                            <CheckCircle2 className="w-12 h-12 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-headline font-black">Message Received!</CardTitle>
                        <CardDescription className="text-lg mt-2">
                            Your message has been received, we will revert back soon.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => setSubmitted(false)}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-2xl shadow-lg transition-all"
                        >
                            Send Another Message
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-12">
            {/* Header Section */}
            <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-background to-background border border-primary/10 overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    <div className="p-4 bg-primary/20 rounded-3xl shadow-inner">
                        <LifeBuoy className="w-12 h-12 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-headline font-black tracking-tight text-foreground">
                            Support Center
                        </h1>
                        <p className="text-muted-foreground text-lg mt-1">
                            Need help? Our team is here to support your podcasting journey.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Form */}
                <Card className="lg:col-span-2 border-none shadow-2xl glass-vivid rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="p-8 pb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <MessageSquare className="w-6 h-6 text-primary" />
                            <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
                        </div>
                        <CardDescription className="text-base">
                            Send us a message and we'll get back to you as soon as possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-sm font-bold ml-1 text-foreground/70">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="Technical Issue, Feature Request, etc."
                                        required
                                        className="h-14 rounded-2xl bg-background/50 border-border focus:ring-2 focus:ring-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-bold ml-1 text-foreground/70">Category</Label>
                                    <div className="relative">
                                        <select
                                            id="category"
                                            className="w-full h-14 rounded-2xl bg-background/50 border border-border px-4 focus:ring-2 focus:ring-primary outline-none appearance-none transition-all"
                                            required
                                        >
                                            <option value="general">General Inquiry</option>
                                            <option value="technical">Technical Support</option>
                                            <option value="feature">Feature Request</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <LifeBuoy className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-sm font-bold ml-1 text-foreground/70">How can we help you?</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Describe your issue or request in detail..."
                                    required
                                    className="min-h-[200px] rounded-2xl bg-background/50 border-border focus:ring-2 focus:ring-primary transition-all p-4"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto px-8 h-14 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-black text-lg rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3"
                            >
                                {loading ? "Sending..." : (
                                    <>
                                        Send Message
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card className="border-none shadow-xl bg-background rounded-[2rem] border border-border">
                        <CardHeader>
                            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6 text-secondary-foreground" />
                            </div>
                            <CardTitle className="text-xl font-bold">Email Support</CardTitle>
                            <CardDescription>
                                Prefer email? Reach us directly at:
                                <div className="mt-2 font-black text-foreground">info.podcastai@gmail.com</div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    );
}
