import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const newsItems = [
  {
    id: 1,
    title: 'Zero-Day Exploit Rocks FinCorp',
    date: 'October 26, 2023',
    category: 'Exploit',
    imageId: 'zero-day-exploit',
  },
  {
    id: 2,
    title: 'Data Breach Leaks 10M User Records',
    date: 'October 22, 2023',
    category: 'Breach',
    imageId: 'data-breach',
  },
  {
    id: 3,
    title: 'Darknet Market Takedown Analysis',
    date: 'October 18, 2023',
    category: 'Intel',
    imageId: 'darknet-market',
  },
];

export default function News() {
  return (
    <section id="news" className="w-full bg-background py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-headline text-primary">
              Threat Feed
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-5xl">
              Latest Intelligence
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay ahead of the curve with real-time updates on vulnerabilities, breaches, and major cyber events.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === item.imageId
            );
            return (
              <Card
                key={item.id}
                className="overflow-hidden border-primary/20 bg-secondary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
              >
                {image && (
                  <CardHeader className="p-0">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={600}
                      height={400}
                      className="h-48 w-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                      data-ai-hint={image.imageHint}
                    />
                  </CardHeader>
                )}
                <CardContent className="p-6">
                  <Badge variant="destructive" className="mb-2 bg-primary text-primary-foreground">
                    {item.category}
                  </Badge>
                  <CardTitle className="font-headline text-xl">
                    {item.title}
                  </CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.date}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
