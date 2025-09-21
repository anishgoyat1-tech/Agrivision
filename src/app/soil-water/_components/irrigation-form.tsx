"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { predictIrrigationNeeds, PredictIrrigationNeedsOutput } from "@/ai/flows/predict-irrigation-needs";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, Droplets, Thermometer, Wind, Milestone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  cropType: z.string().min(1, "Crop type is required."),
  soilMoisture: z.coerce.number().min(0).max(100, "Must be between 0 and 100."),
  temperature: z.coerce.number(),
  humidity: z.coerce.number().min(0).max(100, "Must be between 0 and 100."),
  weatherForecast: z.string().min(1, "Weather forecast is required."),
  growthStage: z.string().min(1, "Growth stage is required."),
  location: z.string().min(1, "Location is required."),
});

type FormValues = z.infer<typeof formSchema>;

export function IrrigationForm() {
  const [result, setResult] = useState<PredictIrrigationNeedsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: "Corn",
      soilMoisture: 65,
      temperature: 25,
      humidity: 70,
      weatherForecast: "Sunny with light clouds for the next 3 days, potential rain on the 4th day.",
      growthStage: "Vegetative",
      location: "Punjab, India",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const prediction = await predictIrrigationNeeds(values);
      setResult(prediction);
    } catch (e) {
      setError("An error occurred while making a prediction. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="cropType" render={({ field }) => <FormItem><FormLabel>Crop Type</FormLabel><FormControl><Input placeholder="e.g., Corn" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField control={form.control} name="growthStage" render={({ field }) => <FormItem><FormLabel>Growth Stage</FormLabel><FormControl><Input placeholder="e.g., Seedling" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField control={form.control} name="soilMoisture" render={({ field }) => <FormItem><FormLabel>Soil Moisture (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField control={form.control} name="temperature" render={({ field }) => <FormItem><FormLabel>Temperature (°C)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField control={form.control} name="humidity" render={({ field }) => <FormItem><FormLabel>Humidity (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField control={form.control} name="location" render={({ field }) => <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="e.g., Punjab, India" {...field} /></FormControl><FormMessage /></FormItem>} />
          </div>
          <FormField control={form.control} name="weatherForecast" render={({ field }) => <FormItem><FormLabel>7-Day Weather Forecast</FormLabel><FormControl><Input placeholder="e.g., Sunny with clouds..." {...field} /></FormControl><FormMessage /></FormItem>} />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Predicting...</> : "Predict Irrigation Needs"}
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
                AI Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant={result.irrigationNeeded ? "destructive" : "default"} className={result.irrigationNeeded ? 'bg-accent/20 border-accent text-accent-foreground' : 'bg-primary/10 border-primary/20'}>
                <Droplets className="h-4 w-4" />
                <AlertTitle>{result.irrigationNeeded ? "Irrigation Recommended" : "No Immediate Irrigation Needed"}</AlertTitle>
              </Alert>
              <div>
                <h3 className="font-semibold">Recommendation Details</h3>
                <p className="text-sm text-foreground/80">{result.recommendation}</p>
              </div>
              <div>
                <h3 className="font-semibold">Confidence Level</h3>
                <div className="flex items-center gap-2">
                    <Progress value={(result.confidenceLevel || 0) * 100} className="w-full" />
                    <span className="text-sm font-bold">{((result.confidenceLevel || 0) * 100).toFixed(0)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
