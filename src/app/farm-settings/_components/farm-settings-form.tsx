
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFarmSettings } from "@/context/farm-settings-context";
import type { FarmSettings } from "@/context/farm-settings-context";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

const farmSettingsSchema = z.object({
  farmName: z.string().min(3, "Farm name must be at least 3 characters."),
  farmLocation: z.string().min(3, "Farm location is required."),
  farmSize: z.coerce.number().positive("Farm size must be a positive number."),
  farmType: z.string().min(3, "Please select a farm type."),
  description: z.string().max(250, "Description can be a maximum of 250 characters.").optional(),
});

type FarmSettingsFormValues = z.infer<typeof farmSettingsSchema>;

export function FarmSettingsForm() {
  const { toast } = useToast();
  const { farmSettings, setFarmSettings } = useFarmSettings();
  const { language } = useLanguage();
  const t = translations[language].farmSettings;

  const form = useForm<FarmSettingsFormValues>({
    resolver: zodResolver(farmSettingsSchema),
    defaultValues: farmSettings,
  });

  const { formState: { isSubmitting }, reset } = form;

  async function onSubmit(values: FarmSettingsFormValues) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFarmSettings(values as FarmSettings);
    reset(values);
    toast({
      title: "Farm Settings Updated",
      description: "Your farm information has been successfully saved.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="farmName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.farmName}</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Sunny Meadows Farm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="farmLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.farmLocation}</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Punjab, India" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="farmSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.farmSize}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="farmType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.farmType}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a farm type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="arable">{t.farmTypes.arable}</SelectItem>
                    <SelectItem value="pastoral">{t.farmTypes.pastoral}</SelectItem>
                    <SelectItem value="mixed">{t.farmTypes.mixed}</SelectItem>
                    <SelectItem value="horticulture">{t.farmTypes.horticulture}</SelectItem>
                    <SelectItem value="forestry">{t.farmTypes.forestry}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.farmDescriptionLabel}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little about your farm"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t.saveChanges}
        </Button>
      </form>
    </Form>
  );
}

    