"use client";

import { User } from "lucide-react";
import { ProfileForm } from "./_components/profile-form";
import { AvatarGenerator } from "./_components/avatar-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function ProfilePage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
          <User className="size-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            {t.profile.title}
          </h1>
          <p className="text-muted-foreground">
            {t.profile.description}
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t.profile.formTitle}</CardTitle>
            <CardDescription>{t.profile.formDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>
        <Card>
           <CardHeader>
            <CardTitle>{t.profile.avatarTitle}</CardTitle>
            <CardDescription>{t.profile.avatarDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <AvatarGenerator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
