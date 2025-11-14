'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { CreditCard, Landmark, Loader2, Code, Banknote, Calendar, Globe, Building, Phone, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BinResult {
    Scheme: string;
    Type: string;
    Issuer: string;
    Country: {
      Name: string;
      A2: string;
    };
    Luhn: boolean;
}

interface IfscResult {
    BANK: string;
    IFSC: string;
    BRANCH: string;
    CENTRE: string;
    DISTRICT: string;
    STATE: string;
    ADDRESS: string;
    CONTACT: string;
    UPI: boolean;
    RTGS: boolean;
    CITY: string;
    NEFT: boolean;
    IMPS: boolean;
    MICR: string;
}

export default function BankOsintPage() {
    const [binInput, setBinInput] = useState('');
    const [binResult, setBinResult] = useState<BinResult | null>(null);
    const [rawBinResult, setRawBinResult] = useState<any | null>(null);
    const [binLoading, setBinLoading] = useState(false);
    const [binError, setBinError] = useState<string | null>(null);
    
    const [ifscInput, setIfscInput] = useState('');
    const [ifscResult, setIfscResult] = useState<IfscResult | null>(null);
    const [rawIfscResult, setRawIfscResult] = useState<any | null>(null);
    const [ifscLoading, setIfscLoading] = useState(false);
    const [ifscError, setIfscError] = useState<string | null>(null);


    const handleBinScan = async () => {
        setBinLoading(true);
        setBinError(null);
        setBinResult(null);
        setRawBinResult(null);

        if (!/^\d{6,8}$/.test(binInput)) {
            setBinError('Please enter a valid 6 to 8-digit BIN.');
            setBinLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/bin-osint?bin=${binInput}`);
            const data = await response.json();
            setRawBinResult(data);

            if (!response.ok || data.error) {
                throw new Error(data.error || 'Failed to fetch BIN data.');
            }
            setBinResult(data);
        } catch (error: any) {
            setBinError(error.message || 'An unexpected error occurred.');
        } finally {
            setBinLoading(false);
        }
    };
    
    const handleIfscScan = async () => {
        setIfscLoading(true);
        setIfscError(null);
        setIfscResult(null);
        setRawIfscResult(null);

        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscInput.toUpperCase())) {
            setIfscError('Please enter a valid 11-character IFSC code.');
            setIfscLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/ifsc-osint?ifsc=${ifscInput}`);
            const data = await response.json();
            setRawIfscResult(data);

            if (!response.ok || data.error) {
                throw new Error(data.error || 'Failed to fetch IFSC data.');
            }
            setIfscResult(data);
        } catch (error: any) {
            setIfscError(error.message || 'An unexpected error occurred.');
        } finally {
            setIfscLoading(false);
        }
    };


  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full bg-secondary py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <Tabs defaultValue="bin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bin"><CreditCard className="mr-2 h-4 w-4" /> BIN Checker</TabsTrigger>
                  <TabsTrigger value="ifsc"><Landmark className="mr-2 h-4 w-4"/> IFSC Finder</TabsTrigger>
                </TabsList>
                <TabsContent value="bin">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle>BIN Checker</CardTitle>
                      <CardDescription>
                        Enter a Bank Identification Number (the first 6-8 digits of a credit/debit card) to get details about the card.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <Input 
                          id="bin" 
                          placeholder="e.g., 457173" 
                          className="bg-background flex-grow"
                          value={binInput}
                          onChange={(e) => setBinInput(e.target.value)}
                          maxLength={8}
                        />
                        <Button onClick={handleBinScan} disabled={binLoading} className="w-full sm:w-auto">
                          {binLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <CreditCard className="mr-2 h-4 w-4" />
                          )}
                          Check BIN
                        </Button>
                      </div>
                      {binError && (
                        <Alert variant="destructive">
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{binError}</AlertDescription>
                        </Alert>
                      )}
                      {binResult && (
                        <div className="space-y-4">
                            <div className='flex justify-end items-center -mb-2'>
                                <Dialog>
                                    <DialogTrigger asChild>
                                    <Button variant="outline" size="sm"><Code className="mr-2 h-4 w-4" /> View JSON</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                    <DialogHeader>
                                        <DialogTitle>Raw JSON Response (BIN)</DialogTitle>
                                    </DialogHeader>
                                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-x-auto">
                                        <code className="text-white">{JSON.stringify(rawBinResult, null, 2)}</code>
                                    </pre>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <Card className="bg-background/50 border-primary/20">
                                <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full"><Banknote className="h-5 w-5 text-primary"/></div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Scheme</p>
                                            <p className="font-semibold">{binResult.Scheme}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full"><CreditCard className="h-5 w-5 text-primary"/></div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Type</p>
                                            <p className="font-semibold">{binResult.Type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full"><Building className="h-5 w-5 text-primary"/></div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Issuer</p>
                                            <p className="font-semibold">{binResult.Issuer}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full"><Globe className="h-5 w-5 text-primary"/></div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Country</p>
                                            <p className="font-semibold">{binResult.Country.Name} ({binResult.Country.A2})</p>
                                        </div>
                                    </div>
                                    <div className="col-span-1 sm:col-span-2">
                                        <Badge variant={binResult.Luhn ? "default" : "destructive"}>
                                            Luhn Algorithm: {binResult.Luhn ? 'Valid' : 'Invalid'}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="ifsc">
                <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle>IFSC Finder</CardTitle>
                      <CardDescription>
                        Enter an Indian Financial System Code (IFSC) to get bank branch details.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <Input 
                          id="ifsc" 
                          placeholder="e.g., SBIN0000691" 
                          className="bg-background flex-grow"
                          value={ifscInput}
                          onChange={(e) => setIfscInput(e.target.value)}
                          maxLength={11}
                        />
                        <Button onClick={handleIfscScan} disabled={ifscLoading} className="w-full sm:w-auto">
                          {ifscLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Landmark className="mr-2 h-4 w-4" />
                          )}
                          Find Branch
                        </Button>
                      </div>
                      {ifscError && (
                        <Alert variant="destructive">
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{ifscError}</AlertDescription>
                        </Alert>
                      )}
                      {ifscResult && (
                        <div className="space-y-4">
                            <div className='flex justify-end items-center -mb-2'>
                                <Dialog>
                                    <DialogTrigger asChild>
                                    <Button variant="outline" size="sm"><Code className="mr-2 h-4 w-4" /> View JSON</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                    <DialogHeader>
                                        <DialogTitle>Raw JSON Response (IFSC)</DialogTitle>
                                    </DialogHeader>
                                    <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-x-auto">
                                        <code className="text-white">{JSON.stringify(rawIfscResult, null, 2)}</code>
                                    </pre>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <Card className="bg-background/50 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-primary"><Landmark className="mr-3"/> {ifscResult.BANK}</CardTitle>
                                    <CardDescription>{ifscResult.BRANCH} Branch</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-4 w-4 mt-1 text-primary"/>
                                        <p className="font-semibold">{ifscResult.ADDRESS}, {ifscResult.CITY}, {ifscResult.STATE} - {ifscResult.DISTRICT}</p>
                                    </div>
                                    {ifscResult.CONTACT && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-primary"/>
                                        <p className="font-semibold">{ifscResult.CONTACT}</p>
                                    </div>
                                    )}
                                    <Separator/>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            {ifscResult.UPI ? <CheckCircle className="h-6 w-6 text-green-500"/> : <XCircle className="h-6 w-6 text-red-500"/>}
                                            <span className="text-xs font-medium">UPI</span>
                                        </div>
                                         <div className="flex flex-col items-center gap-1">
                                            {ifscResult.IMPS ? <CheckCircle className="h-6 w-6 text-green-500"/> : <XCircle className="h-6 w-6 text-red-500"/>}
                                            <span className="text-xs font-medium">IMPS</span>
                                        </div>
                                         <div className="flex flex-col items-center gap-1">
                                            {ifscResult.NEFT ? <CheckCircle className="h-6 w-6 text-green-500"/> : <XCircle className="h-6 w-6 text-red-500"/>}
                                            <span className="text-xs font-medium">NEFT</span>
                                        </div>
                                         <div className="flex flex-col items-center gap-1">
                                            {ifscResult.RTGS ? <CheckCircle className="h-6 w-6 text-green-500"/> : <XCircle className="h-6 w-6 text-red-500"/>}
                                            <span className="text-xs font-medium">RTGS</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
