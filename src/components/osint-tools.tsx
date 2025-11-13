import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, UserSearch, Wifi } from 'lucide-react';

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
          <Tabs defaultValue="number-lookup" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="number-lookup">
                <Phone className="mr-2 h-4 w-4" />
                Number Lookup
              </TabsTrigger>
              <TabsTrigger value="profile-checkup">
                <UserSearch className="mr-2 h-4 w-4" />
                Profile Scraper
              </TabsTrigger>
               <TabsTrigger value="network-scanner">
                <Wifi className="mr-2 h-4 w-4" />
                Network Scanner
              </TabsTrigger>
            </TabsList>
            <TabsContent value="number-lookup">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Number Lookup</CardTitle>
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
            <TabsContent value="profile-checkup">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Profile Scraper</CardTitle>
                  <CardDescription>
                    Enter a social media username or profile URL to aggregate public data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input id="profile" placeholder="e.g., @username or full URL" className="bg-background"/>
                  </div>
                  <Button>Scrape Data</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="network-scanner">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Network Scanner</CardTitle>
                  <CardDescription>
                    Enter an IP address or domain to scan for open ports and vulnerabilities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input id="network-target" placeholder="e.g., 192.168.1.1 or example.com" className="bg-background"/>
                  </div>
                  <Button>Begin Port Scan</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
