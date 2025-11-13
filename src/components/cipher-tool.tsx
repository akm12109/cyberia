'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft, LockKeyhole, UnlockKeyhole } from 'lucide-react';

export default function CipherTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleEncode = () => {
    try {
      // Using btoa for a simple, non-secure encoding that is reversible.
      const encoded = btoa(unescape(encodeURIComponent(inputText)));
      setOutputText(encoded);
    } catch (error) {
      setOutputText('Error encoding text. Make sure the input is valid.');
    }
  };

  const handleDecode = () => {
    try {
      // Using atob to decode the Base64 string.
      const decoded = decodeURIComponent(escape(atob(inputText)));
      setOutputText(decoded);
    } catch (error) {
      setOutputText('Error decoding text. Make sure the encoded message is correct and was generated here.');
    }
  };
  
  const handleSwap = () => {
    setInputText(outputText);
    setOutputText(inputText);
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle>Secure Cipher</CardTitle>
        <CardDescription>
          Encode your messages into a secret format or decode them back. The encoded message can only be decoded here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Textarea
            id="cipher-input"
            placeholder="Enter your message to encode or decode..."
            className="min-h-[120px] bg-background"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <Button onClick={handleEncode} className="w-full sm:w-auto">
            <LockKeyhole className="mr-2" />
            Encode
          </Button>
           <Button onClick={handleSwap} variant="ghost" size="icon" aria-label="Swap Text">
            <ArrowRightLeft />
          </Button>
          <Button onClick={handleDecode} className="w-full sm:w-auto">
             <UnlockKeyhole className="mr-2" />
            Decode
          </Button>
        </div>
        <div className="space-y-1">
           <Textarea
            id="cipher-output"
            placeholder="Result will appear here..."
            className="min-h-[120px] bg-background/50"
            value={outputText}
            readOnly
          />
        </div>
      </CardContent>
    </Card>
  );
}