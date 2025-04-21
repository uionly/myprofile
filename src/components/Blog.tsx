'use client';
import { useEffect, useState } from 'react';

interface Article {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Using LinkedIn profile URL to fetch articles
        const response = await fetch('/api/linkedin-articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (err) {
        console.error('Error fetching articles:', err);
        // Fallback to manual articles if API fails
        setArticles([
          {
            id: '1',
            title: 'Generative Coding Tools (Cursor AI and Others)',
            url: 'https://www.linkedin.com/pulse/generative-coding-tools-cursor-ai-others-deepak-kumar-vha7c',
            publishedAt: '2024-04-15',
            summary:
              'AI-powered code assistants are rapidly reshaping the way we build applications. Tools like GitHub Copilot, Tabnine, Codeium, Amazon Code Whisperer, and Cursor AI are transforming the development landscape.',
          },
          {
            id: '3',
            title: 'System Design – What’s the Big Deal',
            url: 'https://www.tothenew.com/blog/system-design-whats-the-big-deal/',
            publishedAt: '2025-01-16',
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section id='blog' className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8'>Blog Articles</h2>

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target='_blank'
                rel='noopener noreferrer'
                className='block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6'
              >
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  {article.title}
                </h3>
                <p className='text-gray-600 mb-4 line-clamp-3'>
                  {article.summary}
                </p>
                <div className='flex items-center justify-between text-sm text-gray-500'>
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  <span className='text-blue-600'>Read on LinkedIn →</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
