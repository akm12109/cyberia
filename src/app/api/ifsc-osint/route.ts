import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ifsc = searchParams.get('ifsc');

  if (!ifsc) {
    return new Response(JSON.stringify({ error: 'IFSC code is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc.toUpperCase())) {
    return new Response(JSON.stringify({ error: 'Invalid IFSC code format.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const apiResponse = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
    
    if (!apiResponse.ok) {
        if (apiResponse.status === 404) {
             return new Response(JSON.stringify({ error: 'No data found for this IFSC code.' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
      const errorText = await apiResponse.text();
      return new Response(JSON.stringify({ error: errorText || 'The external service failed to process the request.' }), {
        status: apiResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await apiResponse.json();

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
