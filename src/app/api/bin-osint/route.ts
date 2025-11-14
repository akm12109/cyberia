import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const bin = searchParams.get('bin');

  if (!bin) {
    return new Response(JSON.stringify({ error: 'BIN is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!/^\d{6,8}$/.test(bin)) {
    return new Response(JSON.stringify({ error: 'Invalid BIN format. Please provide a 6 to 8-digit number.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const apiResponse = await fetch(`https://data.handyapi.com/bin/${bin}`);
    
    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({ message: 'The external service returned an invalid response.' }));
      return new Response(JSON.stringify({ error: errorData.message || 'The external service failed to process the request.' }), {
        status: apiResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await apiResponse.json();

    if (!data.Scheme) {
         return new Response(JSON.stringify({ error: 'No data found for this BIN.' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Proxy API error:', error);
    return new Response(JSON.stringify({ error: 'An internal server error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
