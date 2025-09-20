"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { analyzeNdviAndSuggestIntervention, AnalyzeNdviAndSuggestInterventionOutput } from "@/ai/flows/ndvi-analysis-intervention";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, Upload } from "lucide-react";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/placeholder-images";

const formSchema = z.object({
  ndviData: z.string().refine((data) => data.startsWith("data:image/"), {
    message: "Please upload a valid image file.",
  }),
  fieldDescription: z.string().min(10, "Please describe the field, crop type, and any known issues."),
  historicalWeatherData: z.string().min(10, "Please provide a summary of recent weather conditions."),
});

type FormValues = z.infer<typeof formSchema>;

export function NdviAnalysisForm() {
  const [result, setResult] = useState<AnalyzeNdviAndSuggestInterventionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const placeholderImage = getPlaceholderImage('ndvi-upload-placeholder');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ndviData: "",
      fieldDescription: "",
      historicalWeatherData: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        form.setValue("ndviData", dataUrl);
        setImagePreview(dataUrl);
        form.clearErrors("ndviData");
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeNdviAndSuggestIntervention(values);
      setResult(analysisResult);
    } catch (e) {
      setError("An error occurred during analysis. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="ndviData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NDVI Image</FormLabel>
                <FormControl>
                  <div className="relative flex justify-center items-center border-2 border-dashed rounded-lg p-4 h-48 cursor-pointer hover:border-primary transition-colors">
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    {imagePreview ? (
                      <Image src={imagePreview} alt="NDVI preview" layout="fill" objectFit="contain" className="rounded-md" />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Upload className="mx-auto h-8 w-8 mb-2" />
                        <p>Click or drag to upload</p>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fieldDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Corn field, sandy loam soil, showing signs of yellowing in the northwest corner." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="historicalWeatherData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recent Weather Data</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Past 7 days: avg temp 25°C, 10mm rainfall, high humidity." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Get Suggestions"
            )}
          </Button>
        </form>
      </Form>

      {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

      {result && (
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              AI Analysis Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Analysis Summary</h3>
              <p className="text-sm text-foreground/80">{result.analysisSummary}</p>
            </div>
            <div>
              <h3 className="font-semibold">Suggested Interventions</h3>
              <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1 mt-1">
                {result.suggestedInterventions.map((intervention, index) => (
                  <li key={index}>{intervention}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
