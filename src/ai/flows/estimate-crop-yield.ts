// estimate-crop-yield.ts
'use server';

/**
 * @fileOverview Estimates crop yield based on current conditions and provides personalized recommendations.
 *
 * - estimateCropYieldAndProvideRecommendations - A function that estimates crop yield and provides recommendations.
 * - EstimateCropYieldInput - The input type for the estimateCropYieldAndProvideRecommendations function.
 * - EstimateCropYieldOutput - The return type for the estimateCropYieldAndProvideRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateCropYieldInputSchema = z.object({
  cropType: z.string().describe('The type of crop being grown.'),
  farmSize: z.number().describe('The size of the farm in acres.'),
  soilConditions: z.string().describe('A description of the soil conditions, including moisture, temperature, pH, and nutrient levels.'),
  environmentalData: z.string().describe('Environmental data, including weather patterns, historical rainfall, and temperature data.'),
  growthPatterns: z.string().describe('Observed growth patterns of the crops.'),
});
export type EstimateCropYieldInput = z.infer<typeof EstimateCropYieldInputSchema>;

const EstimateCropYieldOutputSchema = z.object({
  estimatedYield: z.string().describe('The estimated crop yield.'),
  recommendations: z.string().describe('Personalized recommendations for improving productivity, including irrigation schedules, fertilizer requirements, and pest control measures.'),
});
export type EstimateCropYieldOutput = z.infer<typeof EstimateCropYieldOutputSchema>;

export async function estimateCropYieldAndProvideRecommendations(
  input: EstimateCropYieldInput
): Promise<EstimateCropYieldOutput> {
  return estimateCropYieldFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateCropYieldPrompt',
  input: {schema: EstimateCropYieldInputSchema},
  output: {schema: EstimateCropYieldOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the provided information, estimate the crop yield and provide personalized recommendations for improving productivity.

Crop Type: {{{cropType}}}
Farm Size: {{{farmSize}}} acres
Soil Conditions: {{{soilConditions}}}
Environmental Data: {{{environmentalData}}}
Growth Patterns: {{{growthPatterns}}}

Estimate the crop yield and provide detailed, actionable recommendations for the farmer to maximize their harvest and profits.  Consider irrigation, fertilization and pest control measures. Format your response for easy understanding.
`,
});

const estimateCropYieldFlow = ai.defineFlow(
  {
    name: 'estimateCropYieldFlow',
    inputSchema: EstimateCropYieldInputSchema,
    outputSchema: EstimateCropYieldOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
