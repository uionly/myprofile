'use client';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className='fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          <Link href='/' className='text-xl font-bold text-gray-800'>
            Deepak Kumar
          </Link>

          <div className='hidden md:flex space-x-8'>
            <Link href='/#skills' className='text-gray-600 hover:text-gray-900'>
              Technical Expertise
            </Link>
            <Link
              href='/#experience'
              className='text-gray-600 hover:text-gray-900'
            >
              Professional Journey
            </Link>
            <Link
              href='/#projects'
              className='text-gray-600 hover:text-gray-900'
            >
              Projects
            </Link>
            <Link href='/#blog' className='text-gray-600 hover:text-gray-900'>
              Blog
            </Link>
            <Link
              href='/#contact'
              className='text-gray-600 hover:text-gray-900'
            >
              Contact
            </Link>
          </div>

          <div className='flex items-center space-x-4'>
            <Link
              href='/resume'
              className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
            >
              Resume
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
