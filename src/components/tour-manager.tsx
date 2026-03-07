"use client";

import { useState, useEffect } from "react";
import { PodcastTour } from "./podcast-tour";

export function TourManager() {
    const [showTour, setShowTour] = useState(false);

    useEffect(() => {
        // Check if first time user
        const hasSeenTour = localStorage.getItem("podcast-tour-seen");
        if (!hasSeenTour) {
            setShowTour(true);
            localStorage.setItem("podcast-tour-seen", "true");
        }

        // Listen for manual tour start from header
        const handleStartTour = () => setShowTour(true);
        window.addEventListener("start-podcast-tour", handleStartTour);

        return () => window.removeEventListener("start-podcast-tour", handleStartTour);
    }, []);

    return <PodcastTour open={showTour} onOpenChange={setShowTour} />;
}
