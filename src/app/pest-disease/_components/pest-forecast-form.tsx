"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { pestOutbreakForecast, PestOutbreakForecastOutput } from "@/ai/flows/pest-outbreak-forecast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, Siren } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  historicalWeatherData: z.string().min(10, "Weather data is required."),
  cropData: z.string().min(10, "Crop data is required."),
  pestData: z.string().min(10, "Pest data is required."),
  location: z.string().min(3, "Location is required."),
});

type FormValues = z.infer<typeof formSchema>;

export function PestForecastForm() {
  const [result, setResult] = useState<PestOutbreakForecastOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      historicalWeatherData: "Last 30 days: Temp avg 28°C, high humidity, intermittent heavy rainfall.",
      cropData: "Corn, late vegetative stage, dense canopy.",
      pestData: "History of corn borers and aphids in the region, especially after heavy rain.",
      location: "India",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const forecast = await pestOutbreakForecast(values);
      setResult(forecast);
    } catch (e) {
      setError("An error occurred during forecasting. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="historicalWeatherData" render={({ field }) => <FormItem><FormLabel>Historical Weather Data</FormLabel><FormControl><Textarea placeholder="e.g., Temp, rainfall, humidity for last 30 days..." {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="cropData" render={({ field }) => <FormItem><FormLabel>Crop Data</FormLabel><FormControl><Textarea placeholder="e.g., Crop type, growth stage..." {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="pestData" render={({ field }) => <FormItem><FormLabel>Historical Pest Data</FormLabel><FormControl><Textarea placeholder="e.g., Common pests in region, previous outbreaks..." {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="location" render={({ field }) => <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="e.g., Geographic location of the farm" {...field} /></FormControl><FormMessage /></FormItem>} />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Forecasting...</> : "Forecast Pest Risk"}
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        {isLoading && <Loader2 className="h-12 w-12 animate-spin text-primary" />}
        {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        {result && (
          <Card className="w-full bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                AI Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.alert && (
                <Alert variant="destructive">
                  <Siren className="h-4 w-4" />
                  <AlertTitle>High Risk Alert!</AlertTitle>
                  <AlertDescription>Conditions are favorable for a pest outbreak. Please review recommendations.</AlertDescription>
                </Alert>
              )}
              <div>
                <h3 className="font-semibold">Risk Assessment</h3>
                <p className="text-sm text-foreground/80">{result.riskAssessment}</p>
              </div>
              <div>
                <h3 className="font-semibold">Recommended Actions</h3>
                <p className="text-sm text-foreground/80 whitespace-pre-wrap">{result.recommendedActions}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
