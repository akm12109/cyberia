
'use server';
/**
 * @fileOverview Generates inspirational images of the school using generative AI for the 'About Us' page.
 *
 * - generateInspirationalImages - A function that generates inspirational images of the school.
 * - GenerateInspirationalImagesInput - The input type for the generateInspirationalImages function.
 * - GenerateInspirationalImagesOutput - The return type for the generateInspirationalImages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInspirationalImagesInputSchema = z.object({
  schoolName: z.string().describe('The name of the organization.'),
  imageSubject: z.string().describe('The subject of the image to generate.'),
});
export type GenerateInspirationalImagesInput = z.infer<typeof GenerateInspirationalImagesInputSchema>;

const GenerateInspirationalImagesOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated image.'),
});
export type GenerateInspirationalImagesOutput = z.infer<typeof GenerateInspirationalImagesOutputSchema>;

export async function generateInspirationalImages(input: GenerateInspirationalImagesInput): Promise<GenerateInspirationalImagesOutput> {
  return generateInspirationalImagesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInspirationalImagesPrompt',
  input: {schema: GenerateInspirationalImagesInputSchema},
  output: {schema: GenerateInspirationalImagesOutputSchema},
  prompt: `Generate a dark, cyberpunk, hacker-themed image about {{imageSubject}}. The organization is called {{schoolName}}. The image should evoke themes of digital espionage, information warfare, and counter-culture.`,
});

const generateInspirationalImagesFlow = ai.defineFlow(
  {
    name: 'generateInspirationalImagesFlow',
    inputSchema: GenerateInspirationalImagesInputSchema,
    outputSchema: GenerateInspirationalImagesOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      prompt: prompt(input).prompt,
      model: 'googleai/imagen-4.0-fast-generate-001',
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
