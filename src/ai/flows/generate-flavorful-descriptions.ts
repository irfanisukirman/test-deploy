'use server';

/**
 * @fileOverview An AI tool that analyzes customer reviews and generates appealing item descriptions.
 *
 * - generateFlavorfulDescription - A function that handles the generation of flavorful descriptions.
 * - GenerateFlavorfulDescriptionInput - The input type for the generateFlavorfulDescription function.
 * - GenerateFlavorfulDescriptionOutput - The return type for the generateFlavorfulDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFlavorfulDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the baked good.'),
  customerReviews: z.string().describe('Customer reviews of the baked good.'),
});
export type GenerateFlavorfulDescriptionInput = z.infer<
  typeof GenerateFlavorfulDescriptionInputSchema
>;

const GenerateFlavorfulDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('Appealing item description highlighting praised flavors.'),
});
export type GenerateFlavorfulDescriptionOutput = z.infer<
  typeof GenerateFlavorfulDescriptionOutputSchema
>;

export async function generateFlavorfulDescription(
  input: GenerateFlavorfulDescriptionInput
): Promise<GenerateFlavorfulDescriptionOutput> {
  return generateFlavorfulDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlavorfulDescriptionPrompt',
  input: {schema: GenerateFlavorfulDescriptionInputSchema},
  output: {schema: GenerateFlavorfulDescriptionOutputSchema},
  prompt: `You are a marketing expert for a bakery. Analyze the following customer reviews for {{productName}} and generate an appealing item description that highlights the most praised flavors and characteristics:

Customer Reviews:
{{customerReviews}}

Description:`,
});

const generateFlavorfulDescriptionFlow = ai.defineFlow(
  {
    name: 'generateFlavorfulDescriptionFlow',
    inputSchema: GenerateFlavorfulDescriptionInputSchema,
    outputSchema: GenerateFlavorfulDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
