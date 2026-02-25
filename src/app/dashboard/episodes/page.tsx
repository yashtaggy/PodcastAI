import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { episodes } from "@/lib/mock-data"
import { EpisodeUploadDialog } from "@/components/episode-upload-dialog"
import Link from "next/link"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function EpisodesPage() {

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">Completed</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse">Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20">Failed</Badge>;
      default:
        return <Badge variant="outline">Draft</Badge>;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">Episodes</h1>
        <EpisodeUploadDialog />
      </div>

       <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
        <CardHeader>
            <CardTitle className="font-headline">All Uploads</CardTitle>
            <CardDescription>Manage your podcast episodes and view their analysis.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Viral Score</TableHead>
                <TableHead className="hidden md:table-cell">Upload Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {episodes.map((episode) => (
                <TableRow key={episode.id}>
                    <TableCell className="hidden sm:table-cell">
                        <Image
                            alt={episode.title}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={episode.imageUrl}
                            width="64"
                            data-ai-hint={episode.imageHint}
                        />
                    </TableCell>
                  <TableCell className="font-medium">
                     <Link href={`/dashboard/episodes/${episode.id}`} className="hover:underline">{episode.title}</Link>
                  </TableCell>
                  <TableCell>{getStatusBadge(episode.status)}</TableCell>
                  <TableCell className="hidden md:table-cell font-mono">
                    {episode.podScore?.viralScore ? `${episode.podScore.viralScore}%` : 'N/A'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{episode.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/episodes/${episode.id}`}>
                            <MoreVertical className="h-4 w-4" />
                        </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}