"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { generateAvatar } from "@/ai/flows/generate-avatar";
import { useToast } from "@/hooks/use-toast";

export function AvatarGenerator() {
  const [prompt, setPrompt] = useState("a farmer in a field, pixel art style");
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(
    "/avatar-placeholder.png"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateAvatar(prompt);
      if (result.avatarDataUri) {
        setGeneratedAvatar(result.avatarDataUri);
      } else {
        throw new Error("AI did not return an image.");
      }
    } catch (e) {
      console.error(e);
      setError("Failed to generate avatar. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSetAsProfilePicture = () => {
    // In a real app, you would save the avatar to the user's profile
    toast({
        title: "Avatar Set!",
        description: "Your new AI-generated avatar has been set as your profile picture."
    });
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full max-w-[250px] mx-auto rounded-full overflow-hidden border-4 border-primary/20 bg-muted">
        {generatedAvatar && (
            <Image
            src={generatedAvatar}
            alt="Generated Avatar"
            fill
            className="object-cover"
            />
        )}
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="h-12 w-12 animate-spin text-primary-foreground" />
            </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="avatar-prompt" className="text-sm font-medium">Prompt</label>
        <div className="flex gap-2">
          <Input
            id="avatar-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., a scarecrow in a cornfield, watercolor"
            disabled={isLoading}
          />
          <Button onClick={handleGenerate} disabled={isLoading} variant="secondary" className="shrink-0">
            <Wand2 className="mr-2 h-4 w-4" />
            Generate
          </Button>
        </div>
      </div>
      
      {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

      <Button onClick={handleSetAsProfilePicture} disabled={!generatedAvatar || isLoading || generatedAvatar === "/avatar-placeholder.png"} className="w-full">
        <Sparkles className="mr-2 h-4 w-4" />
        Set as Profile Picture
      </Button>
    </div>
  );
}
