
'use server';

import {
  generateInspirationalImages,
  type GenerateInspirationalImagesInput,
} from '@/ai/flows/generate-inspirational-images';
import { z } from 'zod';

const imageGenSchema = z.object({
  imageSubject: z
    .string()
    .min(3, 'Please enter a subject with at least 3 characters.'),
});

export type ImageGeneratorState = {
  message?: string | null;
  imageUrl?: string | null;
  errors?: {
    imageSubject?: string[];
  };
};

export async function generateImageAction(
  prevState: ImageGeneratorState,
  formData: FormData
): Promise<ImageGeneratorState> {
  const validatedFields = imageGenSchema.safeParse({
    imageSubject: formData.get('imageSubject'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input.',
    };
  }

  const input: GenerateInspirationalImagesInput = {
    schoolName: 'Sulekha Devi Mission School',
    imageSubject: validatedFields.data.imageSubject,
  };

  try {
    const result = await generateInspirationalImages(input);
    return {
      message: 'Image generated successfully!',
      imageUrl: result.imageUrl,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Failed to generate image. Please try again.',
    };
  }
}
