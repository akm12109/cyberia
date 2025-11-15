'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PhoneOsintPage() {
  const [phoneInput, setPhoneInput] = useState('');
  const [rawPhoneResult, setRawPhoneResult] = useState<any | null>(null);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handlePhoneScan = async () => {
    setPhoneLoading(true);
    setPhoneError(null);
    setRawPhoneResult(null);

    if (!/^\d{10}$/.test(phoneInput)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      setPhoneLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/phone-osint?number=${phoneInput}`);
      const data = await response.json();
      
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to fetch data from the server.');
      }
      setRawPhoneResult(data);
    } catch (error: any) {
      setPhoneError(error.message || 'An unexpected error occurred.');
    } finally {
      setPhoneLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full bg-secondary py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Phone Number OSINT</CardTitle>
                  <CardDescription>
                    Enter a 10-digit phone number to gather available information from public records.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <Input 
                      id="phone" 
                      placeholder="e.g., 9876543210" 
                      className="bg-background flex-grow"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      maxLength={10}
                    />
                    <Button onClick={handlePhoneScan} disabled={phoneLoading} className="w-full sm:w-auto">
                      {phoneLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Phone className="mr-2 h-4 w-4" />
                      )}
                      Initiate Scan
                    </Button>
                  </div>
                  {phoneError && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{phoneError}</AlertDescription>
                    </Alert>
                  )}
                  {rawPhoneResult && (
                     <div className="space-y-4">
                      <h3 className="text-xl font-bold font-headline mt-4">Raw JSON Result</h3>
                      <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-x-auto">
                        <code className="text-white">{JSON.stringify(rawPhoneResult, null, 2)}</code>
                      </pre>
                     </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
