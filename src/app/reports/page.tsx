"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function ReportsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
       <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <FileText className="size-6"/>
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">{t.reports.title}</h1>
            <p className="text-muted-foreground">{t.reports.description}</p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t.reports.generationTitle}</CardTitle>
          <CardDescription>{t.reports.generationDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{t.reports.comingSoon}</p>
        </CardContent>
      </Card>
    </div>
  );
}
