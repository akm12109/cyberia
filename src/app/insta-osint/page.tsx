'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserSearch, Loader2, CheckCircle, UnlockKeyhole, Heart, MessageCircle, Lock, Code } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/header';
import Footer from '@/components/footer';

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

export default function InstaOsintPage() {
  const [instaInput, setInstaInput] = useState('');
  const [instaResult, setInstaResult] = useState<InstaResult | null>(null);
  const [instaPostsResult, setInstaPostsResult] = useState<InstaPostsResult | null>(null);
  const [rawInstaResult, setRawInstaResult] = useState<any | null>(null);
  const [rawInstaPostsResult, setRawInstaPostsResult] = useState<any | null>(null);
  const [instaLoading, setInstaLoading] = useState(false);
  const [instaError, setInstaError] = useState<string | null>(null);

  const handleInstaScan = async () => {
    setInstaLoading(true);
    setInstaError(null);
    setInstaResult(null);
    setInstaPostsResult(null);
    setRawInstaResult(null);
    setRawInstaPostsResult(null);
    
    const username = instaInput.startsWith('@') ? instaInput.substring(1) : instaInput;

    if (!username) {
      setInstaError('Please enter an Instagram username.');
      setInstaLoading(false);
      return;
    }

    try {
      const profileResponse = await fetch(`/api/insta-osint?username=${username}`);
      const profileData = await profileResponse.json();
      setRawInstaResult(profileData);
      if (!profileResponse.ok || profileData.error) {
        throw new Error(profileData.error || 'Failed to fetch profile data.');
      }
      setInstaResult(profileData);

      const postsResponse = await fetch(`/api/insta-posts?username=${username}`);
      const postsData = await postsResponse.json();
      setRawInstaPostsResult(postsData);
      if (!postsResponse.ok || postsData.error) {
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

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full bg-secondary py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Instagram Profile Scraper</CardTitle>
                  <CardDescription>
                    Enter an Instagram username to aggregate public data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <Input 
                      id="insta-profile" 
                      placeholder="username (without @)" 
                      className="bg-background flex-grow"
                      value={instaInput}
                      onChange={(e) => setInstaInput(e.target.value)}
                    />
                     <Button onClick={handleInstaScan} disabled={instaLoading} className="w-full sm:w-auto">
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
                      <div className='flex justify-end items-center -mb-4'>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm"><Code className="mr-2 h-4 w-4" /> View JSON</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Raw JSON Response (Profile & Posts)</DialogTitle>
                              </DialogHeader>
                              <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-x-auto">
                                <code className="text-white">{JSON.stringify({profile: rawInstaResult, posts: rawInstaPostsResult}, null, 2)}</code>
                              </pre>
                            </DialogContent>
                          </Dialog>
                      </div>

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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
