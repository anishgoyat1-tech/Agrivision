"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { YieldEstimationForm } from "./_components/yield-estimation-form";
import { LineChart } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function YieldPredictionPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <LineChart className="size-6"/>
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">{t.yieldPrediction.title}</h1>
            <p className="text-muted-foreground">{t.yieldPrediction.description}</p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t.yieldPrediction.formTitle}</CardTitle>
          <CardDescription>{t.yieldPrediction.formDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <YieldEstimationForm />
        </CardContent>
      </Card>
    </div>
  );
}
