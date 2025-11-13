import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section className="relative h-[60dvh] w-full md:h-[75dvh]">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to Sulekha Devi Mission School
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-200 md:text-xl">
            Nurturing Minds, Building Futures.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="#about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
