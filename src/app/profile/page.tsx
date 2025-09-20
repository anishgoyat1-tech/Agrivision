import { User } from "lucide-react";
import { ProfileForm } from "./_components/profile-form";
import { AvatarGenerator } from "./_components/avatar-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
          <User className="size-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            User Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Update your personal and farm information.</CardDescription>
          </Header>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>
        <Card>
           <CardHeader>
            <CardTitle>AI Avatar Studio</CardTitle>
            <CardDescription>Generate a unique profile picture.</CardDescription>
          </Header>
          <CardContent>
            <AvatarGenerator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
