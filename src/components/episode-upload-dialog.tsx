'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, File, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function EpisodeUploadDialog() {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // Simulate upload
    if (file) {
      toast({
        title: "Upload Started",
        description: `"${file.name}" is now being processed.`,
      });
      // Here you would typically call a server action or API endpoint
      // to get a presigned URL and upload the file to S3.
      // After which, you'd trigger the Step Function.
      
      // Reset state and close dialog
      setFile(null);
      setOpen(false);
    } else {
        toast({
            variant: "destructive",
            title: "Upload Failed",
            description: "Please select a file to upload.",
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload Episode
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="font-headline">Upload New Episode</DialogTitle>
          <DialogDescription>
            Select your audio file. We'll handle the magic from there.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Episode Title</Label>
            <Input id="title" placeholder="e.g. The Future of AI" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="audio-file">Audio File</Label>
            <div
              className="relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg border-border hover:border-primary transition-colors cursor-pointer"
              onClick={() => document.getElementById('audio-file-input')?.click()}
            >
              <Input
                id="audio-file-input"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="audio/*"
              />
              {!file ? (
                <div className="text-center">
                  <UploadCloud className="w-8 h-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to browse or drag & drop
                  </p>
                  <p className="text-xs text-muted-foreground/70">MP3, WAV, AAC (max 500MB)</p>
                </div>
              ) : (
                <div className="p-4 text-center">
                  <File className="w-8 h-8 mx-auto text-primary" />
                  <p className="mt-2 text-sm text-foreground truncate">{file.name}</p>
                   <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleUpload}>Upload & Process</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
