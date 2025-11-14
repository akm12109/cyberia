import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, UserSearch, MapPin, Lock, PhoneForwarded, Fingerprint, Landmark } from 'lucide-react';

const tools = [
  {
    name: 'Phone OSINT',
    description: 'Gather info from a phone number.',
    href: '/phone-osint',
    icon: <Phone className="h-8 w-8 text-primary" />,
  },
  {
    name: 'Insta OSINT',
    description: 'Scrape data from an Instagram profile.',
    href: '/insta-osint',
    icon: <UserSearch className="h-8 w-8 text-primary" />,
  },
    {
    name: 'Truecaller OSINT',
    description: 'Search the Truecaller database.',
    href: '/truecaller-osint',
    icon: <PhoneForwarded className="h-8 w-8 text-primary" />,
  },
  {
    name: 'Aadhaar OSINT',
    description: 'Find family details from an Aadhaar number.',
    href: '/aadhaar-osint',
    icon: <Fingerprint className="h-8 w-8 text-primary" />,
  },
  {
    name: 'Bank OSINT',
    description: 'Check BIN/IFSC codes for bank details.',
    href: '/bank-osint',
    icon: <Landmark className="h-8 w-8 text-primary" />,
  },
  {
    name: 'Postal OSINT',
    description: 'Location intelligence from a postal code.',
    href: '/postal-osint',
    icon: <MapPin className="h-8 w-8 text-primary" />,
  },
  {
    name: 'Cipher Tool',
    description: 'Encode and decode secret messages.',
    href: '/cipher',
    icon: <Lock className="h-8 w-8 text-primary" />,
  },
];

export default function ToolsOverview() {
  return (
    <section id="osint" className="w-full bg-background py-16 md:py-24 lg:py-32">
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
        <div className="mx-auto mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.name} href={tool.href} className="group">
              <Card className="h-full border-primary/20 bg-secondary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
                <CardHeader className="flex flex-col items-center text-center">
                  {tool.icon}
                  <CardTitle className="font-headline text-2xl pt-4">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
