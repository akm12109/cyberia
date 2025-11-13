import Header from '@/components/header';
import OsintTools from '@/components/osint-tools';
import ContactForm from '@/components/contact-form';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <OsintTools />
        <div id="contact" className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-center sm:text-4xl md:text-5xl text-primary">
            Request Trial Access
          </h2>
          <p className="mt-4 text-center text-lg text-muted-foreground">
            Contact the admin to get a free trial for a limited time.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
