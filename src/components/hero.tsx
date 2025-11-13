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
          className="object-cover opacity-30"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to Cyberia
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
            Your Gateway to the Digital Underground.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#about">Read the Manifesto</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#osint">Access Tools</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
