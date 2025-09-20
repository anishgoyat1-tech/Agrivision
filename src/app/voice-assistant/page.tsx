import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VoiceAssistantClient } from "./_components/voice-assistant-client";
import { Mic } from "lucide-react";

export default function VoiceAssistantPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <Mic className="size-6"/>
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Voice-based AI Assistant</h1>
            <p className="text-muted-foreground">Ask questions about your crops and get instant, AI-driven answers.</p>
        </div>
      </header>
      
      <div className="flex-1 min-h-0">
        <VoiceAssistantClient />
      </div>
    </div>
  );
}
