"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { estimateCropYieldAndProvideRecommendations, EstimateCropYieldOutput } from "@/ai/flows/estimate-crop-yield";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  cropType: z.string().min(3, "Crop type is required."),
  farmSize: z.coerce.number().positive("Farm size must be positive."),
  soilConditions: z.string().min(10, "Soil conditions are required."),
  environmentalData: z.string().min(10, "Environmental data is required."),
  growthPatterns: z.string().min(10, "Growth patterns are required."),
});

type FormValues = z.infer<typeof formSchema>;

export function YieldEstimationForm() {
  const [result, setResult] = useState<EstimateCropYieldOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: "Soybean",
      farmSize: 500,
      soilConditions: "Silty clay loam, pH 6.8, good moisture retention, medium nitrogen levels.",
      environmentalData: "Consistent rainfall over the last month, temperatures slightly above average.",
      growthPatterns: "Vigorous growth observed, canopy closure is ahead of schedule.",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const estimation = await estimateCropYieldAndProvideRecommendations(values);
      setResult(estimation);
    } catch (e) {
      setError("An error occurred during estimation. Please try again.");
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
            <FormField control={form.control} name="cropType" render={({ field }) => <FormItem><FormLabel>Crop Type</FormLabel><FormControl><Input placeholder="e.g., Soybean" {...field} /></FormControl><FormMessage /></FormItem>} />
            <FormField control={form.control} name="farmSize" render={({ field }) => <FormItem><FormLabel>Farm Size (acres)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
          </div>
          <FormField control={form.control} name="soilConditions" render={({ field }) => <FormItem><FormLabel>Soil Conditions</FormLabel><FormControl><Textarea placeholder="Moisture, temp, pH, nutrient levels..." {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="environmentalData" render={({ field }) => <FormItem><FormLabel>Environmental Data</FormLabel><FormControl><Textarea placeholder="Weather patterns, rainfall, temp data..." {...field} /></FormControl><FormMessage /></FormItem>} />
          <FormField control={form.control} name="growthPatterns" render={({ field }) => <FormItem><FormLabel>Observed Growth Patterns</FormLabel><FormControl><Textarea placeholder="e.g., Vigorous growth, canopy status..." {...field} /></FormControl><FormMessage /></FormItem>} />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Estimating...</> : "Estimate Yield"}
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
                AI Yield Advisory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-background/80 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Estimated Yield</p>
                <p className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                    <TrendingUp className="size-7" />
                    {result.estimatedYield}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Productivity Recommendations</h3>
                <p className="text-sm text-foreground/80 whitespace-pre-wrap">{result.recommendations}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
