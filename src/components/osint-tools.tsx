'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, UserSearch, MapPin, Lock, Loader2, Users, CheckCircle, XCircle } from 'lucide-react';
import CipherTool from './cipher-tool';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface PhoneResult {
  [key: string]: any;
}

interface InstaResult {
  username: string;
  full_name: string;
  biography: string;
  followers: number;
  following: number;
  posts: number;
  profile_pic: string;
  is_private: boolean;
  is_verified: boolean;
}


export default function OsintTools() {
  // Phone OSINT state
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneResult, setPhoneResult] = useState<PhoneResult | null>(null);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Insta OSINT state
  const [instaInput, setInstaInput] = useState('');
  const [instaResult, setInstaResult] = useState<InstaResult | null>(null);
  const [instaLoading, setInstaLoading] = useState(false);
  const [instaError, setInstaError] = useState<string | null>(null);

  const handlePhoneScan = async () => {
    setPhoneLoading(true);
    setPhoneError(null);
    setPhoneResult(null);

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
      setPhoneResult(data);
    } catch (error: any) {
      setPhoneError(error.message || 'An unexpected error occurred.');
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleInstaScan = async () => {
    setInstaLoading(true);
    setInstaError(null);
    setInstaResult(null);
    
    const username = instaInput.startsWith('@') ? instaInput.substring(1) : instaInput;

    if (!username) {
      setInstaError('Please enter an Instagram username.');
      setInstaLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/insta-osint?username=${username}`);
      const data = await response.json();
      if (!response.ok || data.error) {
        // The external API might return a 200 OK but with an error message in the body
        if (data.message) {
            throw new Error(data.message);
        }
        throw new Error(data.error || 'Failed to fetch data from the server.');
      }
      setInstaResult(data);
    } catch (error: any) {
      setInstaError(error.message || 'An unexpected error occurred.');
    } finally {
      setInstaLoading(false);
    }
  };


  return (
    <section id="osint" className="w-full bg-secondary py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-headline text-primary">
              Arsenal
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-5xl">
              OSINT Toolkit
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A curated collection of open-source intelligence tools. For educational and authorized purposes only.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <Tabs defaultValue="phone-osint" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="phone-osint">
                <Phone className="mr-2 h-4 w-4" />
                Phone OSINT
              </TabsTrigger>
              <TabsTrigger value="insta-osint">
                <UserSearch className="mr-2 h-4 w-4" />
                Insta OSINT
              </TabsTrigger>
              <TabsTrigger value="postal-osint">
                <MapPin className="mr-2 h-4 w-4" />
                Postal OSINT
              </TabsTrigger>
              <TabsTrigger value="truecaller-osint">
                <Phone className="mr-2 h-4 w-4" />
                Truecaller OSINT
              </TabsTrigger>
              <TabsTrigger value="cipher">
                <Lock className="mr-2 h-4 w-4" />
                Cipher
              </TabsTrigger>
            </TabsList>
            <TabsContent value="phone-osint">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Phone Number OSINT</CardTitle>
                  <CardDescription>
                    Enter a 10-digit phone number to gather available information from public records.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input 
                      id="phone" 
                      placeholder="e.g., 9876543210" 
                      className="bg-background"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      maxLength={10}
                    />
                    <Button onClick={handlePhoneScan} disabled={phoneLoading}>
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
                  {phoneResult && (
                     <Card className="mt-4 bg-background/50 border-primary/20">
                      <CardHeader>
                        <CardTitle>Scan Results</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <pre className="whitespace-pre-wrap break-words">
                          {JSON.stringify(phoneResult, null, 2)}
                        </pre>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="insta-osint">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Instagram Profile Scraper</CardTitle>
                  <CardDescription>
                    Enter an Instagram username to aggregate public data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input 
                      id="insta-profile" 
                      placeholder="username (without @)" 
                      className="bg-background"
                      value={instaInput}
                      onChange={(e) => setInstaInput(e.target.value)}
                    />
                     <Button onClick={handleInstaScan} disabled={instaLoading}>
                      {instaLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <UserSearch className="mr-2 h-4 w-4" />
                      )}
                      Scrape Data
                    </Button>
                  </div>
                  {instaError && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{instaError}</AlertDescription>
                    </Alert>
                  )}
                  {instaResult && (
                    <Card className="mt-4 bg-background/50 border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                           <Avatar className="h-24 w-24 border-2 border-primary">
                            <AvatarImage src={instaResult.profile_pic} alt={instaResult.username} />
                            <AvatarFallback>{instaResult.username.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2">
                              <h3 className="text-2xl font-bold font-headline">{instaResult.full_name}</h3>
                               {instaResult.is_verified && <CheckCircle className="h-5 w-5 text-blue-500" />}
                            </div>
                            <p className="text-muted-foreground">@{instaResult.username}</p>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                                <Badge variant={instaResult.is_private ? 'destructive' : 'secondary'}>
                                  {instaResult.is_private ? <Lock className="mr-1 h-3 w-3" /> : <UnlockKeyhole className="mr-1 h-3 w-3" />}
                                  {instaResult.is_private ? 'Private' : 'Public'}
                                </Badge>
                             </div>
                          </div>
                        </div>
                        <div className="mt-6 grid grid-cols-3 divide-x divide-border rounded-lg border bg-background text-center">
                          <div className="p-3">
                            <p className="font-bold text-lg">{instaResult.posts.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Posts</p>
                          </div>
                           <div className="p-3">
                            <p className="font-bold text-lg">{instaResult.followers.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Followers</p>
                          </div>
                           <div className="p-3">
                            <p className="font-bold text-lg">{instaResult.following.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Following</p>
                          </div>
                        </div>
                        {instaResult.biography && (
                          <div className="mt-6">
                             <h4 className="font-semibold mb-2 font-headline">Biography</h4>
                             <p className="text-sm text-muted-foreground whitespace-pre-wrap">{instaResult.biography}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="postal-osint">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Postal Code OSINT</CardTitle>
                  <CardDescription>
                    Enter a postal code to gather location-based intelligence.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input id="postal" placeholder="e.g., 90210" className="bg-background"/>
                  </div>
                  <Button>Geolocate</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="truecaller-osint">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Truecaller OSINT</CardTitle>
                  <CardDescription>
                    Enter a phone number to search the Truecaller database.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input id="truecaller-phone" placeholder="e.g., +15551234567" className="bg-background"/>
                  </div>
                  <Button>Search Truecaller</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cipher">
              <CipherTool />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
