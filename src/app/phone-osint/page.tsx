'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Loader2, Code, User, CircleUser, Home, Wifi, Mail } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface PhoneResultData {
  mobile: string;
  name: string;
  fname: string;
  address: string;
  circle: string;
  id: string;
  alt?: string;
  email?: string;
}

interface PhoneResult {
  data: PhoneResultData[];
  [key: string]: any;
}

export default function PhoneOsintPage() {
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneResult, setPhoneResult] = useState<PhoneResult | null>(null);
  const [rawPhoneResult, setRawPhoneResult] = useState<any | null>(null);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handlePhoneScan = async () => {
    setPhoneLoading(true);
    setPhoneError(null);
    setPhoneResult(null);
    setRawPhoneResult(null);

    if (!/^\d{10}$/.test(phoneInput)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      setPhoneLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/phone-osint?number=${phoneInput}`);
      const data = await response.json();
      setRawPhoneResult(data);
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to fetch data from the server.');
      }
       if (data.data && Array.isArray(data.data)) {
        const uniqueData = Array.from(new Set(data.data.map((item: PhoneResultData) => JSON.stringify(item)))).map(item => JSON.parse(item as string));
        setPhoneResult({ ...data, data: uniqueData });
      } else {
        setPhoneResult(data);
      }
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
                  {phoneResult && phoneResult.data && (
                     <div className="space-y-4">
                      <div className='flex justify-between items-center'>
                        <h3 className="text-xl font-bold font-headline mt-4">Scan Results</h3>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm"><Code className="mr-2 h-4 w-4" /> View JSON</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Raw JSON Response</DialogTitle>
                            </DialogHeader>
                            <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-x-auto">
                              <code className="text-white">{JSON.stringify(rawPhoneResult, null, 2)}</code>
                            </pre>
                          </DialogContent>
                        </Dialog>
                      </div>
                        {phoneResult.data.map((record, index) => (
                           <Card key={record.id || index} className="bg-background/50 border-primary/20">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                    <User className="h-5 w-5 text-primary"/>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p className="font-semibold">{record.name}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                      <CircleUser className="h-5 w-5 text-primary"/>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Father's Name</p>
                                    <p className="font-semibold">{record.fname}</p>
                                  </div>
                                </div>
                                 <div className="flex items-center gap-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                      <Home className="h-5 w-5 text-primary"/>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Address</p>
                                    <p className="font-semibold">{record.address.replace(/!/g, ', ')}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                      <Wifi className="h-5 w-5 text-primary"/>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Telecom Circle</p>
                                    <p className="font-semibold">{record.circle}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                      <Phone className="h-5 w-5 text-primary"/>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Mobile</p>
                                    <p className="font-semibold">{record.mobile}</p>
                                  </div>
                                </div>
                                {record.alt && (
                                <div className="flex items-center gap-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                      <Phone className="h-5 w-5 text-primary"/>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Alternate Number</p>
                                    <p className="font-semibold">{record.alt}</p>
                                  </div>
                                </div>
                                )}
                                {record.email && (
                                <div className="flex items-center gap-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                      <Mail className="h-5 w-5 text-primary"/>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-semibold">{record.email}</p>
                                  </div>
                                </div>
                                )}
                                {record.id && (
                                <div className="flex items-center gap-3">
                                  <div className="bg-primary/10 p-2 rounded-full">
                                      <CircleUser className="h-5 w-5 text-primary"/>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Aadhaar ID</p>
                                    <p className="font-semibold">{record.id}</p>
                                  </div>
                                </div>
                                )}
                            </CardContent>
                           </Card>
                        ))}
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
