import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { MobileNav } from './mobile-nav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline text-primary">
              Cyberia
            </span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link className="transition-colors hover:text-primary" href="/#about">
              Manifesto
            </Link>
            <Link className="transition-colors hover:text-primary" href="/#news">
              Threat Feed
            </Link>
            <Link className="transition-colors hover:text-primary" href="/#osint">
              OSINT
            </Link>
             <Link className="transition-colors hover:text-primary" href="/aadhaar-osint">
              Aadhaar
            </Link>
            <Link className="transition-colors hover:text-primary" href="/#contact">
              Contact
            </Link>
          </nav>
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
