"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { askCropsQuestion } from "@/ai/flows/voice-based-assistant";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Send, User, Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters long."),
});

type FormValues = z.infer<typeof formSchema>;

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function VoiceAssistantClient() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I help you with your crops today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  // Voice recognition setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          form.setValue("question", transcript);
          setIsListening(false);
        };
        recognitionRef.current.onerror = (event: any) => {
          setRecognitionError(event.error || "Speech recognition error");
          setIsListening(false);
        };
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, [form]);

  const handleMicClick = () => {
    setRecognitionError(null);
    if (recognitionRef.current) {
      if (!isListening) {
        setIsListening(true);
        recognitionRef.current.start();
      } else {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const userMessage: Message = { role: "user", content: values.question };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

    try {
      const result = await askCropsQuestion({ question: values.question });
      const assistantMessage: Message = { role: "assistant", content: result.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      const errorMessage: Message = { role: "assistant", content: "I'm sorry, I couldn't process that request. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <Sparkles className="text-primary h-5 w-5"/>
        <h2 className="font-semibold">AI Assistant</h2>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100vh-22rem)] md:h-[calc(100vh-20rem)]" ref={scrollAreaRef}>
          <div className="p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border"
                  )}
                >
                  {message.content}
                </div>
                 {message.role === "user" && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
                </Avatar>
                <div className="bg-card border p-3 rounded-lg">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center gap-2">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Ask a question, e.g., 'How much water do my crops need today?'"
                        {...field}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant={isListening ? "secondary" : "outline"}
                        onClick={handleMicClick}
                        aria-label={isListening ? "Stop listening" : "Start voice input"}
                        disabled={isLoading}
                      >
                        {/* Simple mic icon using Lucide's Send as placeholder, replace with Mic icon if available */}
                        <svg xmlns="http://www.w3.org/2000/svg" className={isListening ? "animate-pulse h-4 w-4 text-primary" : "h-4 w-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v3m0 0h-3m3 0h3m-6-3a6 6 0 0012 0V9a6 6 0 00-12 0v6z" /></svg>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  {recognitionError && (
                    <div className="text-xs text-destructive mt-1">{recognitionError}</div>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
