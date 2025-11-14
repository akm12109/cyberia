'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PostalOsintPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full bg-secondary py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Postal Code OSINT</CardTitle>
                  <CardDescription>
                    Enter a postal code to gather location-based intelligence. (This feature is not yet implemented).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input id="postal" placeholder="e.g., 90210" className="bg-background" disabled/>
                  </div>
                  <Button disabled>Geolocate</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
