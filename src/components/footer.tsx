import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/20 bg-secondary">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Cyberia. All rights reversed.
          </p>
          <div className="mt-4 flex space-x-4 sm:mt-0">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              OpSec Guide
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Disengagement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
