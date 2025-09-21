"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Sparkles } from "lucide-react";
import { getPlaceholderImage, PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const avatarOptions = PlaceHolderImages.filter(img => img.id.startsWith("user-avatar-"));

export function AvatarGenerator() {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(avatarOptions[0]?.imageUrl || "/avatar-placeholder.png");
  const { toast } = useToast();

  const handleSetAsProfilePicture = () => {
    // In a real app, you would save the avatar to the user's profile
    toast({
        title: "Avatar Set!",
        description: "Your new avatar has been set as your profile picture."
    });
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full max-w-[250px] mx-auto rounded-full overflow-hidden border-4 border-primary/20 bg-muted">
        {selectedAvatar && (
            <Image
            src={selectedAvatar}
            alt="Selected Avatar"
            fill
            className="object-cover"
            />
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Choose an Avatar</label>
        <div className="grid grid-cols-4 gap-2">
          {avatarOptions.map((avatar) => (
            <button
              key={avatar.id}
              className="relative aspect-square rounded-full overflow-hidden border-2 hover:border-primary transition-all"
              onClick={() => setSelectedAvatar(avatar.imageUrl)}
            >
              <Image
                src={avatar.imageUrl}
                alt={avatar.description}
                fill
                className="object-cover"
                data-ai-hint={avatar.imageHint}
              />
              {selectedAvatar === avatar.imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <CheckCircle className="h-6 w-6 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <Button onClick={handleSetAsProfilePicture} className="w-full">
        <Sparkles className="mr-2 h-4 w-4" />
        Set as Profile Picture
      </Button>
    </div>
  );
}
