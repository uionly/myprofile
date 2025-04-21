'use client';
import { useEffect, useState } from 'react';

interface LinkedInArticle {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
}

const Blog = () => {
  const [articles, setArticles] = useState<LinkedInArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // TODO: Replace with actual LinkedIn API endpoint
        const response = await fetch('/api/linkedin-articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch articles'
        );
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
        ) : error ? (
          <div className='text-center text-red-600'>
            <p>{error}</p>
            <p className='mt-2'>Please try again later.</p>
          </div>
        ) : articles.length === 0 ? (
          <div className='text-center text-gray-600'>
            <p>No articles found.</p>
            <p className='mt-2'>Check back later for new content!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target='_blank'
                rel='noopener noreferrer'
                className='block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden'
              >
                {article.imageUrl && (
                  <div className='h-48 overflow-hidden'>
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                )}
                <div className='p-6'>
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
