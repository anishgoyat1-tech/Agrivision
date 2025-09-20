import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IrrigationForm } from "./_components/irrigation-form";
import { SoilCharts } from "./_components/soil-charts";
import { Droplets } from "lucide-react";

export default function SoilWaterPage() {
  return (
    <div className="space-y-6">
       <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Droplets className="size-6"/>
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Soil & Water Management</h1>
            <p className="text-muted-foreground">Monitor real-time soil conditions and get AI-powered irrigation predictions.</p>
        </div>
      </header>

      <SoilCharts />

      <Card>
        <CardHeader>
          <CardTitle>AI Irrigation Prediction</CardTitle>
          <CardDescription>Fill in the details below to get a personalized irrigation recommendation from our AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <IrrigationForm />
        </CardContent>
      </Card>
    </div>
  );
}
