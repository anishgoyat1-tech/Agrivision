"use client";

import { VoiceAssistantClient } from "./_components/voice-assistant-client";
import { Mic } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function VoiceAssistantPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Mic className="size-6"/>
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">{t.voiceAssistant.title}</h1>
            <p className="text-muted-foreground">{t.voiceAssistant.description}</p>
        </div>
      </header>
      
      <div className="flex-1 min-h-0">
        <VoiceAssistantClient />
      </div>
    </div>
  );
}
