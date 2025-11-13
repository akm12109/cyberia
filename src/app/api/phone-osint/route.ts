import { type NextRequest } from 'next/server';

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

  if (!/^\d{10}$/.test(number)) {
    return new Response(JSON.stringify({ error: 'Invalid phone number format. Please provide a 10-digit number.' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const apiResponse = await fetch(`https://innocent-lost.vercel.app/api/nex?number=${number}`);
    
    if (!apiResponse.ok) {
      const errorData = await apiResponse.text();
      // The external API might not return JSON on error, so we log the text.
      console.error('External API error:', errorData);
      return new Response(JSON.stringify({ error: 'The external service failed to process the request.' }), {
        status: apiResponse.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const data = await apiResponse.json();

    // Remove the credit and developer fields
    delete data.credit;
    delete data.developer;

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
