'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, UserSearch, MapPin, Lock, Loader2, CheckCircle, UnlockKeyhole, Heart, MessageCircle, User, Map, Home, CircleUser, Wifi, Mail, Briefcase, Building } from 'lucide-react';
import CipherTool from './cipher-tool';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface PhoneResultData {
  mobile: string;
  name: string;
  fname: string;
  address: string;
  circle: string;
  id: string;
}

interface PhoneResult {
  data: PhoneResultData[];
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

interface Post {
  id: string;
  shortcode: string;
  caption: string;
  likes: number;
  comments: number;
  image_url: string;
  thumbnail_url: string;
  is_video: boolean;
  timestamp: number;
  url: string;
}

interface InstaPostsResult {
    username: string;
    posts: Post[];
}

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


export default function OsintTools() {
  // Phone OSINT state
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneResult, setPhoneResult] = useState<PhoneResult | null>(null);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Insta OSINT state
  const [instaInput, setInstaInput] = useState('');
  const [instaResult, setInstaResult] = useState<InstaResult | null>(null);
  const [instaPostsResult, setInstaPostsResult] = useState<InstaPostsResult | null>(null);
  const [instaLoading, setInstaLoading] = useState(false);
  const [instaError, setInstaError] = useState<string | null>(null);
  
  // Truecaller OSINT state
  const [truecallerInput, setTruecallerInput] = useState('');
  const [truecallerResult, setTruecallerResult] = useState<TruecallerResult | null>(null);
  const [truecallerLoading, setTruecallerLoading] = useState(false);
  const [truecallerError, setTruecallerError] = useState<string | null>(null);


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
    setInstaPostsResult(null);
    
    const username = instaInput.startsWith('@') ? instaInput.substring(1) : instaInput;

    if (!username) {
      setInstaError('Please enter an Instagram username.');
      setInstaLoading(false);
      return;
    }

    try {
      // Fetch profile data
      const profileResponse = await fetch(`/api/insta-osint?username=${username}`);
      const profileData = await profileResponse.json();
      if (!profileResponse.ok || profileData.error) {
        throw new Error(profileData.error || 'Failed to fetch profile data.');
      }
      setInstaResult(profileData);

      // Fetch posts data
      const postsResponse = await fetch(`/api/insta-posts?username=${username}`);
      const postsData = await postsResponse.json();
      if (!postsResponse.ok || postsData.error) {
        // Don't throw an error, just log it, as posts might not be available
        console.error(postsData.error || 'Failed to fetch posts data.');
      } else {
        setInstaPostsResult(postsData);
      }

    } catch (error: any) {
      setInstaError(error.message || 'An unexpected error occurred.');
    } finally {
      setInstaLoading(false);
    }
  };
  
  const handleTruecallerScan = async () => {
    setTruecallerLoading(true);
    setTruecallerError(null);
    setTruecallerResult(null);

    if (!truecallerInput) {
      setTruecallerError('Please enter a phone number.');
      setTruecallerLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/truecaller-osint?number=${truecallerInput}`);
      const data = await response.json();

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
        <div className="mx-auto mt-12 max-w-4xl">
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
                  {phoneResult && phoneResult.data && (
                     <div className="space-y-4">
                      <h3 className="text-xl font-bold font-headline mt-4">Scan Results</h3>
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
                            </CardContent>
                           </Card>
                        ))}
                     </div>
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
                    <div className="space-y-6">
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
                      
                      {instaPostsResult && instaPostsResult.posts.length > 0 && (
                        <div>
                          <h4 className="font-headline text-2xl font-bold mb-4 text-center">Recent Posts</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {instaPostsResult.posts.map(post => (
                              <Card key={post.id} className="overflow-hidden bg-background/50 border-primary/20">
                                <a href={post.url} target="_blank" rel="noopener noreferrer">
                                  <div className="aspect-square relative">
                                    <Image
                                      src={post.thumbnail_url}
                                      alt={post.caption.substring(0, 50)}
                                      fill
                                      className="object-cover"
                                    />
                                    {post.is_video && <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>}
                                  </div>
                                </a>
                                {post.caption && (
                                   <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground truncate">{post.caption}</p>
                                  </CardContent>
                                )}
                                <CardFooter className="p-4 pt-0 flex justify-end gap-4 text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Heart className="h-4 w-4" />
                                    <span className="text-sm">{post.likes.toLocaleString()}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MessageCircle className="h-4 w-4" />
                                     <span className="text-sm">{post.comments.toLocaleString()}</span>
                                  </div>
                                </CardFooter>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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
                    Enter a phone number with country code to search the Truecaller database.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input
                      id="truecaller-phone"
                      placeholder="e.g., +919876543210"
                      className="bg-background"
                      value={truecallerInput}
                      onChange={(e) => setTruecallerInput(e.target.value)}
                    />
                    <Button onClick={handleTruecallerScan} disabled={truecallerLoading}>
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
                  )}
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
