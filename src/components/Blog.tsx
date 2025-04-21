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
            title: 'Building Scalable Microservices with Node.js',
            url: 'https://www.linkedin.com/pulse/building-scalable-microservices-nodejs-deepak-kumar',
            publishedAt: '2024-03-15',
            summary:
              'Learn how to design and implement scalable microservices using Node.js and best practices for enterprise applications.',
          },
          {
            id: '2',
            title: 'AWS Cloud Architecture Best Practices',
            url: 'https://www.linkedin.com/pulse/aws-cloud-architecture-best-practices-deepak-kumar',
            publishedAt: '2024-02-20',
            summary:
              'Explore the best practices for designing and implementing robust cloud architectures on AWS.',
          },
          {
            id: '3',
            title: 'Modern Web Development with React and TypeScript',
            url: 'https://www.linkedin.com/pulse/modern-web-development-react-typescript-deepak-kumar',
            publishedAt: '2024-01-10',
            summary:
              'A comprehensive guide to building modern web applications using React and TypeScript.',
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
