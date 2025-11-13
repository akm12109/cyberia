import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Landmark } from 'lucide-react';
import ImageGenerator from './image-generator';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function About() {
  const schoolBuildingImage = PlaceHolderImages.find(
    (img) => img.id === 'school-building'
  );

  return (
    <section id="about" className="w-full bg-secondary py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              About Us
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Our Legacy and Vision
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sulekha Devi Mission School has been a cornerstone of the community
              for over 20 years, dedicated to providing quality education and
              fostering an environment of intellectual growth and character
              development.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Address</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">123 Education Lane</div>
                  <p className="text-xs text-muted-foreground">
                    Knowledge City, 12345
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Contact</CardTitle>
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">(123) 456-7890</div>
                  <p className="text-xs text-muted-foreground">
                    info@sulekhadevi.edu
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Card className="flex-grow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <Landmark className="h-5 w-5" /> AI-Powered Vistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Generate inspirational images of our school with AI. Type a
                  subject like "a vibrant classroom" or "the school playground
                  at dawn" and see our campus in a new light.
                </p>
                <ImageGenerator />
              </CardContent>
            </Card>
            {schoolBuildingImage && (
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={schoolBuildingImage.imageUrl}
                  alt={schoolBuildingImage.description}
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={schoolBuildingImage.imageHint}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
