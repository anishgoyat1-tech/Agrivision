import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
       <header className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            <FileText className="size-6"/>
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Reports</h1>
            <p className="text-muted-foreground">Generate and view reports for your farm.</p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Report Generation</CardTitle>
          <CardDescription>Select a report type to generate.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Report generation options will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
