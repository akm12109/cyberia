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
  const username = searchParams.get('username');

  if (!username) {
    return new Response(JSON.stringify({ error: 'Instagram username is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const apiResponse = await fetch(`https://anmolinstainfo.worldgreeker.workers.dev/user?username=${username}`);
    
    if (!apiResponse.ok) {
       const errorData = await apiResponse.json().catch(() => ({ error: 'The external service returned an invalid response.' }));
      return new Response(JSON.stringify({ error: errorData.error || 'The external service failed to process the request.' }), {
        status: apiResponse.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const data = await apiResponse.json();

    if (data.profile_pic) {
        const dataUri = await imageToDataUri(data.profile_pic);
        if (dataUri) {
            data.profile_pic = dataUri;
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
