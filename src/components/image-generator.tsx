'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { generateImageAction, type ImageGeneratorState } from '@/app/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, Wand2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const initialState: ImageGeneratorState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" /> Generate
        </>
      )}
    </Button>
  );
}

export default function ImageGenerator() {
  const [state, formAction] = useFormState(generateImageAction, initialState);

  return (
    <div className="space-y-4">
      <form action={formAction} className="flex items-start gap-2">
        <div className="flex-grow">
          <Input
            name="imageSubject"
            placeholder="e.g., students in a library"
            aria-label="Image Subject"
            className="bg-background"
          />
          {state?.errors?.imageSubject && (
            <p className="mt-1 text-sm text-destructive">
              {state.errors.imageSubject[0]}
            </p>
          )}
        </div>
        <SubmitButton />
      </form>
      {state?.message && !state.imageUrl && (
        <Alert variant={state.imageUrl ? 'default' : 'destructive'}>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      {state?.imageUrl && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Image
              src={state.imageUrl}
              alt="Generated inspirational image"
              width={600}
              height={400}
              className="h-auto w-full object-cover"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
