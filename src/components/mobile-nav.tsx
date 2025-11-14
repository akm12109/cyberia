'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '/#about', label: 'Manifesto' },
  { href: '/#news', label: 'Threat Feed' },
  { href: '/#osint', label: 'OSINT' },
  { href: '/aadhaar-osint', label: 'Aadhaar OSINT' },
  { href: '/#contact', label: 'Contact' },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-primary">Cyberia</span>
          </Link>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href + label}
              href={href}
              className="text-lg font-medium text-foreground/70 transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
