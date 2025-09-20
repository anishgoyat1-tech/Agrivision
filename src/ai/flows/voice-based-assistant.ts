'use server';

/**
 * @fileOverview A voice-based assistant for farmers to ask questions about their crops.
 *
 * - askCropsQuestion - A function that handles the voice-based question and answer process.
 * - AskCropsQuestionInput - The input type for the askCropsQuestion function.
 * - AskCropsQuestionOutput - The return type for the askCropsQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskCropsQuestionInputSchema = z.object({
  question: z
    .string()
    .describe("The farmer's question about their crops, asked via voice command."),
});
export type AskCropsQuestionInput = z.infer<typeof AskCropsQuestionInputSchema>;

const AskCropsQuestionOutputSchema = z.object({
  answer: z.string().describe('The AI-driven answer to the farmer question.'),
});
export type AskCropsQuestionOutput = z.infer<typeof AskCropsQuestionOutputSchema>;

export async function askCropsQuestion(input: AskCropsQuestionInput): Promise<AskCropsQuestionOutput> {
  return askCropsQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askCropsQuestionPrompt',
  input: {schema: AskCropsQuestionInputSchema},
  output: {schema: AskCropsQuestionOutputSchema},
  prompt: `You are a helpful AI assistant for farmers. A farmer will ask you a question about their crops, and you should provide a concise and informative answer.

Question: {{{question}}}`,
});

const askCropsQuestionFlow = ai.defineFlow(
  {
    name: 'askCropsQuestionFlow',
    inputSchema: AskCropsQuestionInputSchema,
    outputSchema: AskCropsQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
