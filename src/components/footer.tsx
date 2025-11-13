import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Sulekha Devi Mission School. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-4 sm:mt-0">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
