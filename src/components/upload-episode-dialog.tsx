'use client';

import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EpisodesContext } from '@/context/episodes-context';
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const formSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  file: z.any()
    .refine((files) => files?.length === 1, "Select one file")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "File must be under 50MB"),
});

type UploadFormValues = z.infer<typeof formSchema>;

import { Progress } from "@/components/ui/progress";
import { useEffect, useRef } from 'react';

export function UploadEpisodeDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { toast } = useToast();
  const { addEpisode } = useContext(EpisodesContext);

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<UploadFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  // Countdown timer for estimated time
  useEffect(() => {
    if (isLoading && timeLeft !== null && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoading, timeLeft]);

  const onSubmit = async (data: UploadFormValues) => {
    setIsLoading(true);
    setStatus("Initializing upload...");
    setProgress(5);
    setTimeLeft(180); // Start with a safe estimate for 50MB

    try {
      const file = data.file[0];

      // 1️⃣ Get upload URL
      const uploadUrlRes = await fetch("/api/generate-upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      const { uploadUrl, key } = await uploadUrlRes.json();
      setProgress(15);
      setStatus("Uploading to secure bucket...");
      setTimeLeft(160);

      // 2️⃣ Upload file
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      setProgress(40);
      setStatus("Starting AI transcription engine...");
      setTimeLeft(120);

      // 3️⃣ Start transcription
      const startRes = await fetch("/api/start-transcription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      const { jobName } = await startRes.json();

      let status_job = "IN_PROGRESS";
      let transcriptUrl = null;
      let pollCount = 0;

      while (status_job === "IN_PROGRESS") {
        pollCount++;
        // Gradually increase progress during transcription
        setProgress((prev) => Math.min(prev + 2, 75));
        setStatus(`Transcribing audio... (Step ${pollCount})`);

        await new Promise((r) => setTimeout(r, 4000));

        const checkRes = await fetch("/api/check-transcription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobName }),
        });

        const checkData = await checkRes.json();
        status_job = checkData.status;
        transcriptUrl = checkData.transcriptUrl;
      }

      if (status_job !== "COMPLETED") {
        throw new Error("Transcription failed");
      }

      setProgress(80);
      setStatus("Running intelligence analysis...");
      setTimeLeft(45);

      // 4️⃣ Get structured transcript
      const transcriptRes = await fetch("/api/get-transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcriptUrl }),
      });

      const transcriptData = await transcriptRes.json();
      const { rawTranscript, structuredTranscript } = transcriptData;

      if (!rawTranscript) {
        throw new Error("Transcript missing");
      }

      setStatus("Generating PodScore & Insights...");
      setProgress(90);
      setTimeLeft(20);

      // 5️⃣ Call AI engine directly
      const aiRes = await fetch("/api/generate-podscore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawTranscript,
          structuredTranscript,
        }),
      });

      const aiAnalysis = await aiRes.json();

      if (!aiRes.ok) {
        throw new Error("AI failed");
      }

      setStatus("Saving episode data...");
      setProgress(98);
      setTimeLeft(5);

      // 6️⃣ Save full episode
      await addEpisode({
        title: data.title,
        description: data.description,
        transcript: rawTranscript,
        analysis: aiAnalysis,
      });

      setProgress(100);
      setStatus("Success!");

      toast({
        title: "Podcast Analyzed",
        description: "Full AI intelligence generated.",
      });

      reset();
      setOpen(false);

    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
      setStatus("");
      setProgress(0);
      setTimeLeft(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            <UploadCloud className="text-purple-500" /> Upload New Episode
          </DialogTitle>
          <DialogDescription>
            High-intelligence podcast analysis. Max file size: 50MB.
          </DialogDescription>
        </DialogHeader>

        {!isLoading ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Episode Title</Label>
              <Input
                {...register("title")}
                placeholder="e.g. The Future of AI in SaaS"
                className={cn(
                  "bg-secondary/50 border-purple-500/20 focus:border-purple-500",
                  errors.title && "border-red-500/50 bg-red-500/5"
                )}
              />
              {errors.title && (
                <p className="text-xs text-red-500 font-medium">{errors.title.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Brief Description</Label>
              <Textarea
                {...register("description")}
                placeholder="What is this episode about?"
                className={cn(
                  "bg-secondary/50 border-purple-500/20 focus:border-purple-500 min-h-[100px]",
                  errors.description && "border-red-500/50 bg-red-500/5"
                )}
              />
              {errors.description && (
                <p className="text-xs text-red-500 font-medium">{errors.description.message as string}</p>
              )}
            </div>
            pieces

            <div className="space-y-2">
              <Label className="text-sm font-medium">Podcast File (Audio or Video)</Label>
              <div className="relative group">
                <Input
                  type="file"
                  accept="audio/*,video/*"
                  {...register("file")}
                  className={cn(
                    "cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600 transition-all border-dashed border-2 border-purple-500/30 py-8 h-auto text-center",
                    errors.file && "border-red-500/50 bg-red-500/5"
                  )}
                />
              </div>
              {errors.file ? (
                <p className="text-xs text-red-500 font-medium text-center">{errors.file.message as string}</p>
              ) : (
                <p className="text-[10px] text-muted-foreground text-center">
                  Strict 50MB limit. Support for MP3, WAV, M4A, MP4 (Video).
                </p>
              )}
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="ghost">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!isValid || isLoading}
                className={cn(
                  "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25 transition-all duration-300",
                  (!isValid || isLoading) && "opacity-50 grayscale cursor-not-allowed scale-95"
                )}
              >
                Start AI Analysis
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-6 py-10 px-4">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse" />
                <Loader2 className="h-12 w-12 animate-spin text-purple-500 relative" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{status}</h3>
                {timeLeft !== null && (
                  <p className="text-sm text-muted-foreground">
                    Estimated remaining: <span className="font-mono text-purple-400">{Math.floor(timeLeft / 60)}m {timeLeft % 60}s</span>
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-purple-400">Processing Pipeline</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-purple-500/10" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] text-center text-muted-foreground">
              <div className={cn("transition-colors", progress >= 15 ? "text-purple-400 font-bold" : "")}>UPLOAD</div>
              <div className={cn("transition-colors", progress >= 75 ? "text-purple-400 font-bold" : "")}>TRANSCRIBE</div>
              <div className={cn("transition-colors", progress >= 95 ? "text-purple-400 font-bold" : "")}>ANALYZE</div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
