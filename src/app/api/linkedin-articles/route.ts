import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // LinkedIn API credentials
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const profileId = process.env.LINKEDIN_PROFILE_ID;

    if (!clientId || !clientSecret || !accessToken || !profileId) {
      throw new Error('LinkedIn API credentials not configured');
    }

    // Fetch articles from LinkedIn API
    const response = await fetch(
      `https://api.linkedin.com/v2/articles?author=${profileId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch articles from LinkedIn');
    }

    const data = await response.json();

    // Transform the data into our format
    const articles = data.elements.map((article: any) => ({
      id: article.id,
      title: article.title,
      summary: article.summary,
      publishedAt: article.created.time,
      url: article.url,
      imageUrl: article.thumbnail?.url,
    }));

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching LinkedIn articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
