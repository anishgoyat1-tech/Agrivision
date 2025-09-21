"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tractor } from "lucide-react";
import { FarmSettingsForm } from "./_components/farm-settings-form";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function FarmSettingsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
          <Tractor className="size-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            {t.farmSettings.title}
          </h1>
          <p className="text-muted-foreground">
            {t.farmSettings.description}
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t.farmSettings.formTitle}</CardTitle>
          <CardDescription>{t.farmSettings.formDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <FarmSettingsForm />
        </CardContent>
      </Card>
    </div>
  );
}
