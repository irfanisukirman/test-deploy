'use server';

import {
  generateFlavorfulDescription as generateFlavorfulDescriptionFlow,
  type GenerateFlavorfulDescriptionInput,
} from '@/ai/flows/generate-flavorful-descriptions';

export async function generateFlavorfulDescription(
  input: GenerateFlavorfulDescriptionInput
) {
  const result = await generateFlavorfulDescriptionFlow(input);
  return result;
}
