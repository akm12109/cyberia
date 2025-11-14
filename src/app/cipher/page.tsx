'use client';

import CipherTool from '@/components/cipher-tool';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function CipherPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full bg-secondary py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
                <CipherTool />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
