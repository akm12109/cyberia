import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, UserSearch } from 'lucide-react';

export default function OsintTools() {
  return (
    <section id="osint" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Utilities
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-5xl">
              OSINT Tools
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Integrated tools for information gathering. For authorized use
              only.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-xl">
          <Tabs defaultValue="number-lookup" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="number-lookup">
                <Phone className="mr-2 h-4 w-4" />
                Number Lookup
              </TabsTrigger>
              <TabsTrigger value="profile-checkup">
                <UserSearch className="mr-2 h-4 w-4" />
                Profile Checkup
              </TabsTrigger>
            </TabsList>
            <TabsContent value="number-lookup">
              <Card>
                <CardHeader>
                  <CardTitle>Number Lookup</CardTitle>
                  <CardDescription>
                    Enter a phone number to gather available information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input id="phone" placeholder="e.g., +15551234567" />
                  </div>
                  <Button>Search</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="profile-checkup">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Checkup</CardTitle>
                  <CardDescription>
                    Enter a social media username or profile URL.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input id="profile" placeholder="e.g., @username" />
                  </div>
                  <Button>Investigate</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
