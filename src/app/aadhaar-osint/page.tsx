'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Fingerprint, Loader2, Code, User, Home, Users, Hash } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface Member {
    memberId: string;
    memberName: string;
    relationship_code: string;
    releationship_name: string;
    uid: string;
}

interface AadhaarResult {
    address: string;
    rcId: string;
    schemeName: string;
    homeStateName: string;
    homeDistName: string;
    memberDetailsList: Member[];
}

export default function AadhaarOsintPage() {
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [aadhaarResult, setAadhaarResult] = useState<AadhaarResult | null>(null);
  const [rawAadhaarResult, setRawAadhaarResult] = useState<any | null>(null);
  const [aadhaarLoading, setAadhaarLoading] = useState(false);
  const [aadhaarError, setAadhaarError] = useState<string | null>(null);

  const handleAadhaarScan = async () => {
    setAadhaarLoading(true);
    setAadhaarError(null);
    setAadhaarResult(null);
    setRawAadhaarResult(null);

    if (!/^\d{12}$/.test(aadhaarInput)) {
      setAadhaarError('Please enter a valid 12-digit Aadhaar number.');
      setAadhaarLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/aadhaar-osint?aadhaar=${aadhaarInput}`);
      const data = await response.json();
      setRawAadhaarResult(data);

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to fetch data from the server.');
      }
      if (!data.memberDetailsList || data.memberDetailsList.length === 0) {
        throw new Error('No family details found for this Aadhaar number.');
      }
      setAadhaarResult(data);
    } catch (error: any) {
      setAadhaarError(error.message || 'An unexpected error occurred.');
    } finally {
      setAadhaarLoading(false);
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
                  <CardTitle>Aadhaar OSINT - Family Details</CardTitle>
                  <CardDescription>
                    Enter a 12-digit Aadhaar number to find associated family members from public records.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <Input 
                      id="aadhaar" 
                      placeholder="e.g., 123456789012" 
                      className="bg-background flex-grow"
                      value={aadhaarInput}
                      onChange={(e) => setAadhaarInput(e.target.value)}
                      maxLength={12}
                    />
                    <Button onClick={handleAadhaarScan} disabled={aadhaarLoading} className="w-full sm:w-auto">
                      {aadhaarLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Fingerprint className="mr-2 h-4 w-4" />
                      )}
                      Find Family
                    </Button>
                  </div>
                  {aadhaarError && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{aadhaarError}</AlertDescription>
                    </Alert>
                  )}
                  {aadhaarResult && (
                     <div className="space-y-4">
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
                                <code className="text-white">{JSON.stringify(rawAadhaarResult, null, 2)}</code>
                              </pre>
                            </DialogContent>
                          </Dialog>
                        </div>
                       <Card className="bg-background/50 border-primary/20">
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-full"><Home className="h-5 w-5 text-primary"/></div>
                                <div>
                                <p className="text-sm text-muted-foreground">Address</p>
                                <p className="font-semibold">{aadhaarResult.address.replace(/!/g, ', ')}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full"><Hash className="h-5 w-5 text-primary"/></div>
                                    <div>
                                    <p className="text-sm text-muted-foreground">Ration Card ID</p>
                                    <p className="font-semibold">{aadhaarResult.rcId}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-full"><Badge className="h-5 w-5 text-primary bg-transparent p-0"/></div>
                                    <div>
                                    <p className="text-sm text-muted-foreground">Scheme</p>
                                    <p className="font-semibold">{aadhaarResult.schemeName}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                       </Card>

                       <Card className="bg-background/50 border-primary/20">
                          <CardHeader>
                            <CardTitle className='flex items-center'><Users className="mr-2 h-6 w-6 text-primary"/> Family Members</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {aadhaarResult.memberDetailsList.map((member, index) => (
                                <div key={member.memberId}>
                                    <div className="flex items-center justify-between p-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-full"><User className="h-5 w-5 text-primary"/></div>
                                            <div>
                                                <p className="font-semibold">{member.memberName}</p>
                                            </div>
                                        </div>
                                        <Badge variant={member.releationship_name === 'SELF' ? 'default' : 'secondary'}>{member.releationship_name}</Badge>
                                    </div>
                                    {index < aadhaarResult.memberDetailsList.length - 1 && <Separator />}
                                </div>
                            ))}
                          </CardContent>
                       </Card>
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
