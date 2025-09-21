import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import { Droplets, Leaf, Bug, TrendingUp } from "lucide-react";
import { getDashboardSummary } from "@/ai/flows/dashboard-summary";

export default async function Dashboard() {
  const farmMap = getPlaceholderImage("farm-overview-map");
  // In a real app, you would fetch the user's saved farm location.
  // For now, we'll use the default from the settings form.
  const farmLocation = "Willow Creek, CA";
  const summary = await getDashboardSummary(farmLocation);

  const getSeverityBadgeVariant = (severity: 'High' | 'Medium' | 'Low') => {
    switch (severity) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      default:
        return 'outline';
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Farm Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's a snapshot of your farm's health in {farmLocation}.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crop Health</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.cropHealth}%</div>
            <p className="text-xs text-muted-foreground">{summary.cropHealthTrend} from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.soilMoisture}%</div>
            <p className="text-xs text-muted-foreground">Optimal range: {summary.soilMoistureRange}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pest Risk</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.pestRisk}</div>
            <p className="text-xs text-muted-foreground">{summary.pestRiskDetails}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yield Forecast</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.yieldForecast}</div>
            <p className="text-xs text-muted-foreground">{summary.yieldForecastDetails}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Field Heatmap</CardTitle>
            <CardDescription>Visual overview of field conditions and potential problem areas.</CardDescription>
          </CardHeader>
          <CardContent>
            {farmMap && (
              <div className="relative aspect-video overflow-hidden rounded-lg border">
                <Image
                  src={farmMap.imageUrl}
                  alt={farmMap.description}
                  fill
                  className="object-cover"
                  data-ai-hint={farmMap.imageHint}
                />
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Critical issues requiring your immediate attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Area</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div className="font-medium">{alert.area}</div>
                      <Badge variant={getSeverityBadgeVariant(alert.severity)}>{alert.severity}</Badge>
                    </TableCell>
                    <TableCell>{alert.issue}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{alert.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
