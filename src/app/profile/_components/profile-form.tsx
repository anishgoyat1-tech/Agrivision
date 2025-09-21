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
import { useUser } from "@/context/user-context";
import { useFarmSettings } from "@/context/farm-settings-context";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  bio: z.string().max(250, "Bio can be a maximum of 250 characters.").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
    const { toast } = useToast();
    const { user, setUser } = useUser();
    const { farmSettings } = useFarmSettings();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      bio: user.bio,
    },
  });
  
  const {formState: {isSubmitting}} = form;

  async function onSubmit(values: ProfileFormValues) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUser({ ...user, ...values });
    toast({
        title: "Profile Updated",
        description: "Your information has been successfully saved.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormItem>
                <FormLabel>Farm Name</FormLabel>
                <Input value={farmSettings.farmName} disabled />
             </FormItem>
             <FormItem>
                <FormLabel>Farm Location</FormLabel>
                <Input value={farmSettings.farmLocation} disabled />
             </FormItem>
        </div>

        <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Short Bio</FormLabel>
                <FormControl>
                <Textarea
                    placeholder="Tell us a little about your farm or yourself"
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
