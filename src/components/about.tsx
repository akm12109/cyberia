import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShieldCheck, Eye, Terminal } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ImageGenerator from './image-generator';

export default function About() {
  const missionImage = PlaceHolderImages.find(
    (img) => img.id === 'mission-image'
  );

  return (
    <section id="about" className="w-full bg-secondary py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-headline text-primary">
              Who We Are
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Shadows in the Digital Realm
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Cyberia is a collective of digital phantoms, information brokers, and security researchers operating in the deep web. We are dedicated to uncovering hidden truths and testing the limits of digital security.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Our Tenets</CardTitle>
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Information must be free.</li>
                    <li>Question everything.</li>
                    <li>Leave no trace.</li>
                  </ul>
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Specialties</CardTitle>
                  <Eye className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Open-Source Intelligence</li>
                    <li>Network Infiltration</li>
                    <li>Social Engineering</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {missionImage && (
               <div className="overflow-hidden rounded-lg">
                <Image
                  src={missionImage.imageUrl}
                  alt={missionImage.description}
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={missionImage.imageHint}
                />
              </div>
            )}
             <Card className="flex-grow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-primary">
                  <Terminal className="h-5 w-5" /> AI Propaganda Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Generate disinformation and counter-narratives. Type a subject like "corporate data breach" or "political scandal" and see the web of lies unfold.
                </p>
                <ImageGenerator />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
