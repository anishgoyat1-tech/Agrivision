// src/ai/flows/pest-outbreak-forecast.ts
'use server';

/**
 * @fileOverview Predicts potential pest outbreaks and sends alerts to farmers.
 *
 * - pestOutbreakForecast - A function that forecasts pest outbreaks and sends alerts.
 * - PestOutbreakForecastInput - The input type for the pestOutbreakForecast function.
 * - PestOutbreakForecastOutput - The return type for the pestOutbreakForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PestOutbreakForecastInputSchema = z.object({
  historicalWeatherData: z
    .string()
    .describe('Historical weather data including temperature, rainfall, humidity.'),
  cropData: z.string().describe('Data about the crop including type and growth stage.'),
  pestData: z.string().describe('Historical pest data for the region.'),
  location: z.string().describe('Geographic location of the farm.'),
});
export type PestOutbreakForecastInput = z.infer<typeof PestOutbreakForecastInputSchema>;

const PestOutbreakForecastOutputSchema = z.object({
  riskAssessment: z.string().describe('The risk assessment of pest outbreak.'),
  recommendedActions: z.string().describe('Recommended actions to prevent pest outbreak.'),
  alert: z.boolean().describe('Whether to send an alert to the farmer.'),
});
export type PestOutbreakForecastOutput = z.infer<typeof PestOutbreakForecastOutputSchema>;

export async function pestOutbreakForecast(input: PestOutbreakForecastInput): Promise<PestOutbreakForecastOutput> {
  return pestOutbreakForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pestOutbreakForecastPrompt',
  input: {schema: PestOutbreakForecastInputSchema},
  output: {schema: PestOutbreakForecastOutputSchema},
  prompt: `You are an AI assistant that helps farmers forecast pest outbreaks and recommend preventive measures.

  Based on the following data, assess the risk of a pest outbreak and suggest actions.

  Historical Weather Data: {{{historicalWeatherData}}}
  Crop Data: {{{cropData}}}
  Pest Data: {{{pestData}}}
  Location: {{{location}}}

  Provide a risk assessment, recommended actions, and whether an alert should be sent to the farmer.
  Be concise and actionable.
  `,
});

const pestOutbreakForecastFlow = ai.defineFlow(
  {
    name: 'pestOutbreakForecastFlow',
    inputSchema: PestOutbreakForecastInputSchema,
    outputSchema: PestOutbreakForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
