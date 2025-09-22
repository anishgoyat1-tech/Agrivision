"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NdviAnalysisForm } from "./_components/ndvi-analysis-form";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function CropHealthPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Leaf className="size-6"/>
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">{t.cropHealth.title}</h1>
            <p className="text-muted-foreground">{t.cropHealth.description}</p>
        </div>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>{t.cropHealth.analysisTitle}</CardTitle>
          <CardDescription>{t.cropHealth.analysisDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <NdviAnalysisForm />
        </CardContent>
      </Card>
    </div>
  );
}
