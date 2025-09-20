import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { YieldEstimationForm } from "./_components/yield-estimation-form";
import { LineChart } from "lucide-react";

export default function YieldPredictionPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <LineChart className="size-6"/>
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Yield Prediction & Advisory</h1>
            <p className="text-muted-foreground">Estimate crop yield and get personalized recommendations for improving productivity.</p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>AI Yield Estimation</CardTitle>
          <CardDescription>Provide your farm's data to generate a yield estimate and productivity recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <YieldEstimationForm />
        </CardContent>
      </Card>
    </div>
  );
}
