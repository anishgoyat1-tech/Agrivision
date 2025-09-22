'use server';
/**
 * @fileOverview Generates a dynamic summary for the main dashboard.
 *
 * - getDashboardSummary - A function that returns a summary of farm conditions.
 * - DashboardSummaryOutput - The return type for the getDashboardSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DashboardSummaryInputSchema = z.object({
  location: z.string().describe('The location of the farm, which is a state in India.'),
  language: z.string().describe('The language for the summary (e.g., "en", "hi", "pa" for English, Hindi, Punjabi).'),
});

const DashboardSummaryOutputSchema = z.object({
  cropHealth: z
    .number()
    .describe('The overall crop health as a percentage (0-100).'),
  cropHealthTrend: z
    .string()
    .describe('The percentage change in crop health from the last week.'),
  soilMoisture: z
    .number()
    .describe('The average soil moisture as a percentage.'),
  soilMoistureRange: z
    .string()
    .describe('The optimal range for soil moisture.'),
  pestRisk: z.string().describe('The current pest risk level (e.g., Low, Medium, High).'),
  pestRiskDetails: z.string().describe('Brief details about pest risks.'),
  yieldForecast: z.string().describe('The yield forecast compared to the previous season (e.g., +5%).'),
  yieldForecastDetails: z.string().describe('Brief details about the yield forecast.'),
  alerts: z.array(
    z.object({
      id: z.number(),
      area: z.string().describe('The district or region within the state with the alert.'),
      issue: z.string().describe('The issue detected based on current news or events.'),
      severity: z.enum(['High', 'Medium', 'Low']),
      time: z.string().describe('How long ago the alert was reported (e.g., "1 day ago").'),
    })
  ).describe('A list of critical, state-wide agricultural alerts based on recent news and events for the specified state.'),
});

export type DashboardSummaryOutput = z.infer<
  typeof DashboardSummaryOutputSchema
>;

export async function getDashboardSummary(location: string, language: string): Promise<DashboardSummaryOutput> {
  return dashboardSummaryFlow({ location, language });
}

const prompt = ai.definePrompt({
  name: 'dashboardSummaryPrompt',
  input: { schema: DashboardSummaryInputSchema },
  output: { schema: DashboardSummaryOutputSchema },
  prompt: `You are an expert agricultural AI. Generate a realistic and dynamic summary for a smart farm dashboard for the state of {{{location}}}, India. The summary should be in the language requested: {{{language}}}.
  
  Provide the following information:
  - Overall crop health percentage and its trend from last week for a typical farm in the region.
  - Average soil moisture and the optimal range for a typical farm in the region.
  - Current pest risk level with a brief description, tailored to the location.
  - A yield forecast compared to the previous season with brief details, tailored to the location.
  - A list of 3-5 critical, STATE-WIDE agricultural alerts for {{{location}}} based on recent news, events, or weather reports. The 'area' for each alert should be a district or region within the state. Make the times for alerts recent (e.g., "hours ago", "days ago").
  
  Ensure the data is varied and reflects typical conditions and recent events in {{{location}}}.`,
});

const dashboardSummaryFlow = ai.defineFlow(
  {
    name: 'dashboardSummaryFlow',
    inputSchema: DashboardSummaryInputSchema,
    outputSchema: DashboardSummaryOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
