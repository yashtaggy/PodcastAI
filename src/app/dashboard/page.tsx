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
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  PieChart,
  Cell,
} from "recharts"
import { analyticsData, episodes } from "@/lib/mock-data"
import { EpisodeUploadDialog } from "@/components/episode-upload-dialog"
import Link from "next/link"
import { ArrowUpRight, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

export default function DashboardPage() {
  const recentEpisodes = episodes.slice(0, 4);

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
        <h1 className="font-headline text-3xl font-bold">Dashboard</h1>
        <EpisodeUploadDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average PodScore</CardTitle>
            <span className="text-2xl">🏆</span>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-headline">{analyticsData.averagePodScore}/10</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Viral Score</CardTitle>
             <span className="text-2xl">🚀</span>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-headline">{analyticsData.averageViralScore}%</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Episodes</CardTitle>
             <span className="text-2xl">🎙️</span>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-headline">{analyticsData.totalEpisodes}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generated Posts</CardTitle>
            <span className="text-2xl">✍️</span>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-headline">{analyticsData.totalGeneratedPosts}</div>
            <p className="text-xs text-muted-foreground">+32 this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-card/70 backdrop-blur-lg border border-border/50">
          <CardHeader>
            <CardTitle className="font-headline">PodScore Overview</CardTitle>
            <CardDescription>Your podcast performance over the last 7 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
                <ChartContainer config={{}} className="min-h-[200px] w-full">
                    <BarChart data={analyticsData.podScoreTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
                        <Tooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                labelClassName="font-bold text-lg"
                                className="bg-card/80 backdrop-blur-lg border-border/50"
                            />}
                         />
                        <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 bg-card/70 backdrop-blur-lg border border-border/50">
          <CardHeader>
            <CardTitle className="font-headline">Platform Distribution</CardTitle>
            <CardDescription>Breakdown of generated content by social platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ChartContainer config={{}} className="min-h-[200px] w-full">
                <PieChart>
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent
                        hideLabel
                        className="bg-card/80 backdrop-blur-lg border-border/50"
                    />}
                    />
                  <Pie
                    data={analyticsData.platformDistribution}
                    dataKey="count"
                    nameKey="platform"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    startAngle={90}
                    endAngle={450}
                  >
                    {analyticsData.platformDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

       <Card className="bg-card/70 backdrop-blur-lg border border-border/50">
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle className="font-headline">Recent Episodes</CardTitle>
                <CardDescription>An overview of your latest uploads.</CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/dashboard/episodes">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Episode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Duration</TableHead>
                <TableHead className="hidden md:table-cell">Upload Date</TableHead>
                <TableHead className="text-right">PodScore</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEpisodes.map((episode) => (
                <TableRow key={episode.id}>
                  <TableCell>
                    <Link href={`/dashboard/episodes/${episode.id}`} className="font-medium hover:underline">{episode.title}</Link>
                  </TableCell>
                  <TableCell>{getStatusBadge(episode.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{episode.duration}</TableCell>
                  <TableCell className="hidden md:table-cell">{episode.uploadDate}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {episode.podScore?.podScore.overallScore ? `${episode.podScore.podScore.overallScore}/10` : 'N/A'}
                  </TableCell>
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
