import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, UserSearch, MapPin } from 'lucide-react';

export default function OsintTools() {
  return (
    <section id="osint" className="w-full bg-secondary py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-headline text-primary">
              Arsenal
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-5xl">
              OSINT Toolkit
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A curated collection of open-source intelligence tools. For educational and authorized purposes only.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <Tabs defaultValue="phone-osint" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="phone-osint">
                <Phone className="mr-2 h-4 w-4" />
                Phone OSINT
              </TabsTrigger>
              <TabsTrigger value="insta-osint">
                <UserSearch className="mr-2 h-4 w-4" />
                Insta OSINT
              </TabsTrigger>
              <TabsTrigger value="postal-osint">
                <MapPin className="mr-2 h-4 w-4" />
                Postal OSINT
              </TabsTrigger>
            </TabsList>
            <TabsContent value="phone-osint">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Phone Number OSINT</CardTitle>
                  <CardDescription>
                    Enter a phone number to gather available information from public records.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input id="phone" placeholder="e.g., +15551234567" className="bg-background"/>
                  </div>
                  <Button>Initiate Scan</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="insta-osint">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Instagram Profile Scraper</CardTitle>
                  <CardDescription>
                    Enter an Instagram username to aggregate public data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input id="profile" placeholder="e.g., @username" className="bg-background"/>
                  </div>
                  <Button>Scrape Data</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="postal-osint">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Postal Code OSINT</CardTitle>
                  <CardDescription>
                    Enter a postal code to gather location-based intelligence.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input id="postal" placeholder="e.g., 90210" className="bg-background"/>
                  </div>
                  <Button>Geolocate</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
