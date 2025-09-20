'use server';
/**
 * @fileOverview Generates a user avatar based on a text prompt.
 *
 * - generateAvatar - A function that returns a data URI for a generated image.
 * - GenerateAvatarOutput - The return type for the generateAvatar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAvatarOutputSchema = z.object({
  avatarDataUri: z
    .string()
    .describe(
      "The generated avatar image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type GenerateAvatarOutput = z.infer<typeof GenerateAvatarOutputSchema>;

export async function generateAvatar(promptText: string): Promise<GenerateAvatarOutput> {
  return generateAvatarFlow(promptText);
}

const generateAvatarFlow = ai.defineFlow(
  {
    name: 'generateAvatarFlow',
    inputSchema: z.string(),
    outputSchema: GenerateAvatarOutputSchema,
  },
  async (prompt) => {
    const { media } = await ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `a square user avatar, ${prompt}`,
        config: {
            aspectRatio: "1:1",
        }
    });

    if (!media.url) {
        throw new Error('Image generation failed to produce an image.');
    }

    return { avatarDataUri: media.url };
  }
);
