import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Deepak Kumar - Technical Architect',
  description:
    'Technical Architect with 15+ years of experience in fullstack development, cloud (AWS), GenAI adoption, and enterprise integration architecture.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head><meta name="google-site-verification" content="AEquRibLW5YQ8fUg9pSkpUVap138s-jJtTg7h0pEsAA" /></head>
      <body className={inter.className}>
        <main className='min-h-screen bg-white'>{children}</main>
      </body>
    </html>
  );
}
