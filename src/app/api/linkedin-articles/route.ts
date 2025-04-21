import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const articles = [
      {
        id: '1',
        title: 'Generative Coding Tools (Cursor AI and Others)',
        url: 'https://www.linkedin.com/pulse/generative-coding-tools-cursor-ai-others-deepak-kumar-vha7c',
        publishedAt: '2024-04-15',
        summary:
          'AI-powered code assistants are rapidly reshaping the way we build applications. Tools like GitHub Copilot, Tabnine, Codeium, Amazon Code Whisperer, and Cursor AI are transforming the development landscape.',
      },
      {
        id: '2',
        title: 'Breaking Down Bugs, One Meme at a Time',
        url: 'https://www.linkedin.com/pulse/breaking-down-bugs-one-meme-time-deepak-kumar-2tycc',
        publishedAt: '2024-04-10',
        summary:
          'The "Ultimate" Guide to Debugging. A humorous yet practical look at debugging techniques and best practices in software development.',
      },
      {
        id: '4',
        title: 'AI is the Future, But Stay Focused on Your Skills!',
        url: 'https://www.linkedin.com/pulse/ai-future-stay-focused-your-skills-deepak-kumar-rscsc',
        publishedAt: '2024-03-30',
        summary:
          'A balanced perspective on AI in software development and the importance of maintaining core technical skills.',
      },
      {
        id: '5',
        title: 'Quality vs. Quantity: Real Experiment with API',
        url: 'https://www.linkedin.com/pulse/quality-vs-quantity-real-experiment-api-deepak-kumar-eckmc',
        publishedAt: '2024-03-25',
        summary:
          'As a Developer Advocate, exploring the balance between quality and speed in software development through practical experimentation.',
      },
      {
        id: '6',
        title: "Work-Life Balance: It's a Two-Way Street!",
        url: 'https://www.linkedin.com/pulse/work-life-balance-its-two-way-street-deepak-kumar-ssdrc',
        publishedAt: '2024-03-20',
        summary:
          "A perspective on work-life balance in the tech industry, particularly focusing on Gen Z's approach to professional life.",
      },
    ];

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error in LinkedIn articles API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
