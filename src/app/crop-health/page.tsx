import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import { NdviAnalysisForm } from "./_components/ndvi-analysis-form";
import { Leaf } from "lucide-react";

export default function CropHealthPage() {
  const cropHealthMap = getPlaceholderImage("crop-health-map");

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Leaf className="size-6"/>
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Crop Health Monitoring</h1>
            <p className="text-muted-foreground">Analyze NDVI data to detect plant stress and receive intervention suggestions.</p>
        </div>
      </header>
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Crop Health Map</CardTitle>
            <CardDescription>Color-coded NDVI map indicating plant health and stress levels.</CardDescription>
          </CardHeader>
          <CardContent>
            {cropHealthMap && (
              <div className="relative aspect-video overflow-hidden rounded-lg border">
                <Image
                  src={cropHealthMap.imageUrl}
                  alt={cropHealthMap.description}
                  fill
                  className="object-cover"
                  data-ai-hint={cropHealthMap.imageHint}
                />
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Analysis & Intervention</CardTitle>
            <CardDescription>Upload an NDVI image to get AI-powered suggestions.</CardDescription>
          </CardHeader>
          <CardContent>
            <NdviAnalysisForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
