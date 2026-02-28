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

const formSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  file: z.any().refine((files) => files?.length === 1),
});

type UploadFormValues = z.infer<typeof formSchema>;

export function UploadEpisodeDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { addEpisode } = useContext(EpisodesContext);

  const { register, handleSubmit, reset } = useForm<UploadFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: UploadFormValues) => {
    setIsLoading(true);

    try {
      const file = data.file[0];

      // 1️⃣ Get upload URL
      const uploadUrlRes = await fetch("/api/generate-upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      const { uploadUrl, key } = await uploadUrlRes.json();

      // 2️⃣ Upload file
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      // 3️⃣ Start transcription
      const startRes = await fetch("/api/start-transcription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      const { jobName } = await startRes.json();

      let status = "IN_PROGRESS";
      let transcriptUrl = null;

      while (status === "IN_PROGRESS") {
        await new Promise((r) => setTimeout(r, 4000));

        const checkRes = await fetch("/api/check-transcription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobName }),
        });

        const checkData = await checkRes.json();
        status = checkData.status;
        transcriptUrl = checkData.transcriptUrl;
      }

      if (status !== "COMPLETED") {
        throw new Error("Transcription failed");
      }

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

      // 6️⃣ Save full episode
      await addEpisode({
        title: data.title,
        description: data.description,
        transcript: rawTranscript,
        analysis: aiAnalysis,
      });

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
        description: "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UploadCloud /> Upload New Episode
          </DialogTitle>
          <DialogDescription>
            Upload your podcast and generate full AI intelligence.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input {...register("title")} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} />
          </div>

          <div>
            <Label>Audio File</Label>
            <Input type="file" {...register("file")} />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Upload & Analyze"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}