import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tractor } from "lucide-react";
import { FarmSettingsForm } from "./_components/farm-settings-form";

export default function FarmSettingsPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
          <Tractor className="size-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Farm Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your farm's settings and preferences.
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Farm Details</CardTitle>
          <CardDescription>Update your farm information.</CardDescription>
        </CardHeader>
        <CardContent>
          <FarmSettingsForm />
        </CardContent>
      </Card>
    </div>
  );
}
