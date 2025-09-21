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

  const form = useForm<FarmSettingsFormValues>({
    resolver: zodResolver(farmSettingsSchema),
    defaultValues: {
      farmName: "Sunny Meadows Farm",
      farmLocation: "Punjab, India",
      farmSize: 500,
      farmType: "arable",
      description: "A family-owned farm dedicated to sustainable and innovative farming practices, specializing in corn and soybean cultivation.",
    },
  });

  const { formState: { isSubmitting } } = form;

  async function onSubmit(values: FarmSettingsFormValues) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(values);
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
                <FormLabel>Farm Name</FormLabel>
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
                <FormLabel>Farm Location</FormLabel>
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
                <FormLabel>Farm Size (acres)</FormLabel>
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
                <FormLabel>Primary Farm Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a farm type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="arable">Arable (Crops)</SelectItem>
                    <SelectItem value="pastoral">Pastoral (Livestock)</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="horticulture">Horticulture</SelectItem>
                    <SelectItem value="forestry">Forestry</SelectItem>
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
              <FormLabel>Farm Description</FormLabel>
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
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
