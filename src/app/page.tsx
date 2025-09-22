"use client";

import { useEffect, useState } from "react";
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
import { Droplets, Leaf, Bug, TrendingUp, Loader2 } from "lucide-react";
import { getDashboardSummary, DashboardSummaryOutput } from "@/ai/flows/dashboard-summary";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { useFarmSettings } from "@/context/farm-settings-context";

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummaryOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const { farmSettings } = useFarmSettings();
  const t = translations[language].dashboard;

  useEffect(() => {
    async function loadSummary() {
      setLoading(true);
      try {
        const result = await getDashboardSummary(farmSettings.farmLocation, language);
        setSummary(result);
      } catch (error) {
        console.error("Failed to get dashboard summary:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSummary();
  }, [language, farmSettings.farmLocation]);


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

  if (loading || !summary) {
    return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }


  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t.title}</h1>
        <p className="text-muted-foreground">{`Welcome back! Here's a snapshot of ${farmSettings.farmLocation} Farms.`}</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.cropHealth}</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.cropHealth}%</div>
            <p className="text-xs text-muted-foreground">{summary.cropHealthTrend} from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.soilMoisture}</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.soilMoisture}%</div>
            <p className="text-xs text-muted-foreground">Optimal range: {summary.soilMoistureRange}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.pestRisk}</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.pestRisk}</div>
            <p className="text-xs text-muted-foreground">{summary.pestRiskDetails}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.yieldForecast}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.yieldForecast}</div>
            <p className="text-xs text-muted-foreground">{summary.yieldForecastDetails}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.alerts}</CardTitle>
            <CardDescription>{t.alertsDescription}</CardDescription>
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
