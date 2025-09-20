import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PestForecastForm } from "./_components/pest-forecast-form";
import { Bug } from "lucide-react";

export default function PestDiseasePage() {
  return (
    <div className="space-y-6">
       <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Bug className="size-6"/>
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Pest & Disease Prediction</h1>
            <p className="text-muted-foreground">Forecast potential pest outbreaks and get preventive recommendations.</p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>AI Pest Outbreak Forecast</CardTitle>
          <CardDescription>Provide historical data to generate a risk assessment and action plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <PestForecastForm />
        </CardContent>
      </Card>
    </div>
  );
}
