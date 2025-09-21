"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IrrigationForm } from "./_components/irrigation-form";
import { SoilCharts } from "./_components/soil-charts";
import { Droplets } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function SoilWaterPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
       <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Droplets className="size-6"/>
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">{t.soilWater.title}</h1>
            <p className="text-muted-foreground">{t.soilWater.description}</p>
        </div>
      </header>

      <SoilCharts />

      <Card>
        <CardHeader>
          <CardTitle>{t.soilWater.predictionTitle}</CardTitle>
          <CardDescription>{t.soilWater.predictionDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <IrrigationForm />
        </CardContent>
      </Card>
    </div>
  );
}
