'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Loader2, Code, Mail, Building } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface TruecallerData {
    name: string;
    gender?: string;
    image?: string;
    phones?: {
        e164Format: string;
        numberType: string;
        nationalFormat: string;
        dialingCode: number;
        countryCode: string;
        carrier: string;
        type: string;
    }[];
    addresses?: {
        address: string;
        city: string;
        countryCode: string;
        timeZone: string;
        type: string;
    }[];
    internetAddresses?: {
        id: string;
        service: string;
        caption: string;
        type: string;
    }[];
}

interface TruecallerResult {
    data: TruecallerData | null;
}

export default function TruecallerOsintPage() {
  const [truecallerInput, setTruecallerInput] = useState('');
  const [truecallerResult, setTruecallerResult] = useState<TruecallerResult | null>(null);
  const [rawTruecallerResult, setRawTruecallerResult] = useState<any | null>(null);
  const [truecallerLoading, setTruecallerLoading] = useState(false);
  const [truecallerError, setTruecallerError] = useState<string | null>(null);

  const handleTruecallerScan = async () => {
    setTruecallerLoading(true);
    setTruecallerError(null);
    setTruecallerResult(null);
    setRawTruecallerResult(null);

    if (!truecallerInput) {
      setTruecallerError('Please enter a phone number.');
      setTruecallerLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/truecaller-osint?number=${truecallerInput}`);
      const data = await response.json();
      setRawTruecallerResult(data);
      
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to fetch data from Truecaller service.');
      }
      if (!data.data) {
        throw new Error('No data found for this number in Truecaller.');
      }
      setTruecallerResult(data);
    } catch (error: any) {
      setTruecallerError(error.message || 'An unexpected error occurred.');
    } finally {
      setTruecallerLoading(false);
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
                  <CardTitle>Truecaller OSINT</CardTitle>
                  <CardDescription>
                    Enter a phone number with country code to search the Truecaller database.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <Input
                      id="truecaller-phone"
                      placeholder="e.g., +919876543210"
                      className="bg-background flex-grow"
                      value={truecallerInput}
                      onChange={(e) => setTruecallerInput(e.target.value)}
                    />
                    <Button onClick={handleTruecallerScan} disabled={truecallerLoading} className="w-full sm:w-auto">
                      {truecallerLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Phone className="mr-2 h-4 w-4" />
                      )}
                      Search Truecaller
                    </Button>
                  </div>
                  {truecallerError && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{truecallerError}</AlertDescription>
                    </Alert>
                  )}
                  {truecallerResult && truecallerResult.data && (
                    <>
                      <div className='flex justify-end items-center -mb-2'>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm"><Code className="mr-2 h-4 w-4" /> View JSON</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Raw JSON Response</DialogTitle>
                              </DialogHeader>
                              <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-x-auto">
                                <code className="text-white">{JSON.stringify(rawTruecallerResult, null, 2)}</code>
                              </pre>
                            </DialogContent>
                          </Dialog>
                      </div>
                      <Card className="mt-4 bg-background/50 border-primary/20">
                          <CardContent className="p-6">
                              <div className="flex flex-col sm:flex-row items-center gap-6">
                                  <Avatar className="h-24 w-24 border-2 border-primary">
                                      {truecallerResult.data.image ? (
                                          <AvatarImage src={truecallerResult.data.image} alt={truecallerResult.data.name} />
                                      ) : null}
                                      <AvatarFallback>{truecallerResult.data.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 space-y-2 text-center sm:text-left">
                                      <h3 className="text-2xl font-bold font-headline">{truecallerResult.data.name}</h3>
                                      {truecallerResult.data.gender && <Badge variant="outline">{truecallerResult.data.gender}</Badge>}
                                  </div>
                              </div>
                              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                  {truecallerResult.data.phones?.map((phone, i) => (
                                      <div key={i} className="flex items-center gap-3">
                                          <div className="bg-primary/10 p-2 rounded-full"><Phone className="h-5 w-5 text-primary"/></div>
                                          <div>
                                              <p className="text-sm text-muted-foreground">{phone.carrier}</p>
                                              <p className="font-semibold">{phone.e164Format}</p>
                                          </div>
                                      </div>
                                  ))}
                                  {truecallerResult.data.internetAddresses?.map((email, i) => (
                                      <div key={i} className="flex items-center gap-3">
                                          <div className="bg-primary/10 p-2 rounded-full"><Mail className="h-5 w-5 text-primary"/></div>
                                          <div>
                                              <p className="text-sm text-muted-foreground">{email.service}</p>
                                              <p className="font-semibold">{email.id}</p>
                                          </div>
                                      </div>
                                  ))}
                                  {truecallerResult.data.addresses?.map((address, i) => (
                                      <div key={i} className="flex items-center gap-3 col-span-1 sm:col-span-2">
                                          <div className="bg-primary/10 p-2 rounded-full"><Building className="h-5 w-5 text-primary"/></div>
                                          <div>
                                              <p className="text-sm text-muted-foreground">Address</p>
                                              <p className="font-semibold">{address.city}, {address.countryCode}</p>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </CardContent>
                      </Card>
                    </>
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
