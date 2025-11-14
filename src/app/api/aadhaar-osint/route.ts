import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const aadhaar = searchParams.get('aadhaar');

  if (!aadhaar) {
    return new Response(JSON.stringify({ error: 'Aadhaar number is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!/^\d{12}$/.test(aadhaar)) {
    return new Response(JSON.stringify({ error: 'Invalid Aadhaar number format. Please provide a 12-digit number.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const apiResponse = await fetch(`https://addartofamily.vercel.app/fetch?aadhaar=${aadhaar}&key=fxt`);
    
    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({ message: 'The external service returned an invalid response.' }));
      return new Response(JSON.stringify({ error: errorData.message || 'The external service failed to process the request.' }), {
        status: apiResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await apiResponse.json();

    if (data.message) {
         return new Response(JSON.stringify({ error: data.message }), {
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
