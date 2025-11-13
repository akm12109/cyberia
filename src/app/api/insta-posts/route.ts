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
    const apiResponse = await fetch(`https://anmolinstainfo.worldgreeker.workers.dev/posts?username=${username}`);
    
    if (!apiResponse.ok) {
       const errorData = await apiResponse.json().catch(() => ({ error: 'The external posts service returned an invalid response.' }));
        return new Response(JSON.stringify({ error: errorData.message || errorData.error || 'The external posts service failed.' }), {
            status: apiResponse.status,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const data = await apiResponse.json();

    if (data.posts && Array.isArray(data.posts)) {
        const processedPosts = await Promise.all(data.posts.map(async (post: any) => {
            if (post.thumbnail_url) {
                const dataUri = await imageToDataUri(post.thumbnail_url);
                if (dataUri) {
                    post.thumbnail_url = dataUri;
                }
            }
            // The main image_url can be very large, so we only convert the thumbnail
            // and leave the main one as a direct link for now.
            return post;
        }));
        data.posts = processedPosts;
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy API error for posts:', error);
    return new Response(JSON.stringify({ error: 'An internal server error occurred while fetching posts.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
