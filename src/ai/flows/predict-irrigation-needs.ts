// src/ai/flows/predict-irrigation-needs.ts
'use server';

/**
 * @fileOverview Predicts crop irrigation needs based on sensor data and environmental factors.
 *
 * - predictIrrigationNeeds - A function that predicts irrigation needs for crops.
 * - PredictIrrigationNeedsInput - The input type for the predictIrrigationNeeds function.
 * - PredictIrrigationNeedsOutput - The return type for the predictIrrigationNeeds function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictIrrigationNeedsInputSchema = z.object({
  cropType: z.string().describe('The type of crop.'),
  soilMoisture: z.number().describe('The current soil moisture level (percentage).'),
  temperature: z.number().describe('The current temperature in Celsius.'),
  humidity: z.number().describe('The current humidity level (percentage).'),
  weatherForecast: z.string().describe('A short weather forecast for the next 7 days.'),
  growthStage: z.string().describe('The current growth stage of the crop (e.g., seedling, vegetative, flowering).'),
  location: z.string().describe('The location of the farm.'),
});

export type PredictIrrigationNeedsInput = z.infer<typeof PredictIrrigationNeedsInputSchema>;

const PredictIrrigationNeedsOutputSchema = z.object({
  irrigationNeeded: z.boolean().describe('Whether irrigation is needed.'),
  recommendation: z.string().describe('A recommendation for irrigation, including the amount of water and frequency.'),
  confidenceLevel: z.number().describe('The confidence level of the prediction (0-1).'),
});

export type PredictIrrigationNeedsOutput = z.infer<typeof PredictIrrigationNeedsOutputSchema>;

export async function predictIrrigationNeeds(input: PredictIrrigationNeedsInput): Promise<PredictIrrigationNeedsOutput> {
  return predictIrrigationNeedsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictIrrigationNeedsPrompt',
  input: {schema: PredictIrrigationNeedsInputSchema},
  output: {schema: PredictIrrigationNeedsOutputSchema},
  prompt: `You are an expert in agricultural irrigation.

  Based on the following information, determine if irrigation is needed for the crops and provide a recommendation.

  Crop Type: {{{cropType}}}
  Soil Moisture: {{{soilMoisture}}}%
  Temperature: {{{temperature}}}°C
  Humidity: {{{humidity}}}%
  Weather Forecast: {{{weatherForecast}}}
  Growth Stage: {{{growthStage}}}
  Location: {{{location}}}

  Respond with whether irrigation is needed (true/false), a recommendation for irrigation (amount of water and frequency), and a confidence level (0-1).
`,
});

const predictIrrigationNeedsFlow = ai.defineFlow(
  {
    name: 'predictIrrigationNeedsFlow',
    inputSchema: PredictIrrigationNeedsInputSchema,
    outputSchema: PredictIrrigationNeedsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
