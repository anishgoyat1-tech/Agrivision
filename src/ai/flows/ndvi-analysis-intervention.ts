// A Genkit Flow that analyzes NDVI data and suggests interventions for plant stress.

'use server';

/**
 * @fileOverview Analyzes NDVI data to suggest interventions for plant stress.
 *
 * - analyzeNdviAndSuggestIntervention - Function to analyze NDVI data and suggest interventions.
 * - AnalyzeNdviAndSuggestInterventionInput - The input type for the analyzeNdviAndSuggestIntervention function.
 * - AnalyzeNdviAndSuggestInterventionOutput - The return type for the analyzeNdviAndSuggestIntervention function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeNdviAndSuggestInterventionInputSchema = z.object({
  ndviData: z
    .string()
    .describe(
      'NDVI data as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  fieldDescription: z.string().describe('Description of the field including crop type, soil type, and any known issues.'),
  historicalWeatherData: z.string().describe('Historical weather data for the field.'),
});
export type AnalyzeNdviAndSuggestInterventionInput = z.infer<
  typeof AnalyzeNdviAndSuggestInterventionInputSchema
>;

const AnalyzeNdviAndSuggestInterventionOutputSchema = z.object({
  analysisSummary: z.string().describe('A summary of the NDVI analysis.'),
  suggestedInterventions: z.array(z.string()).describe('Specific interventions suggested to address plant stress.'),
});
export type AnalyzeNdviAndSuggestInterventionOutput = z.infer<
  typeof AnalyzeNdviAndSuggestInterventionOutputSchema
>;

export async function analyzeNdviAndSuggestIntervention(
  input: AnalyzeNdviAndSuggestInterventionInput
): Promise<AnalyzeNdviAndSuggestInterventionOutput> {
  return analyzeNdviAndSuggestInterventionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeNdviAndSuggestInterventionPrompt',
  input: {schema: AnalyzeNdviAndSuggestInterventionInputSchema},
  output: {schema: AnalyzeNdviAndSuggestInterventionOutputSchema},
  prompt: `You are an expert agricultural advisor. Analyze the NDVI data provided, taking into account the field description and historical weather data, and suggest specific interventions to address any plant stress identified.

NDVI Data: {{media url=ndviData}}
Field Description: {{{fieldDescription}}}
Historical Weather Data: {{{historicalWeatherData}}}

Analysis Summary:
Suggested Interventions:`, 
});

const analyzeNdviAndSuggestInterventionFlow = ai.defineFlow(
  {
    name: 'analyzeNdviAndSuggestInterventionFlow',
    inputSchema: AnalyzeNdviAndSuggestInterventionInputSchema,
    outputSchema: AnalyzeNdviAndSuggestInterventionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
