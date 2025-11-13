import { type NextRequest } from 'next/server';

async function imageToDataUri(url: string): Promise<string | undefined> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to fetch image: ${response.statusText}`);
            return undefined;
        }
        const blob = await response.blob();
        const buffer = Buffer.from(await blob.arrayBuffer());
        return `data:${blob.type};base64,${buffer.toString('base64')}`;
    } catch (error) {
        console.error('Error converting image to data URI:', error);
        return undefined;
    }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const number = searchParams.get('number');

  if (!number) {
    return new Response(JSON.stringify({ error: 'Phone number is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // A simple regex to check for common international phone number formats.
  if (!/^\+?\d{10,15}$/.test(number)) {
    return new Response(JSON.stringify({ error: 'Invalid phone number format.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    // Using a public proxy for Truecaller lookup. The token is managed by the proxy service.
    const apiResponse = await fetch(`https://truecaller-api.onrender.com/search?phone=${number}`);
    
    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({'message': 'The external service returned an invalid response.'}));
      return new Response(JSON.stringify({ error: errorData.message || 'The external service failed to process the request.' }), {
        status: apiResponse.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const data = await apiResponse.json();

    if (data.data && data.data.image) {
        const dataUri = await imageToDataUri(data.data.image);
        if (dataUri) {
            data.data.image = dataUri;
        }
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy API error:', error);
    return new Response(JSON.stringify({ error: 'An internal server error occurred.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
