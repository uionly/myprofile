'use client';
import { motion } from 'framer-motion';
import DownloadButton from './DownloadButton';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className='h-screen flex items-center bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='flex-1 flex justify-center'
          >
            <div className='relative group'>
              <div className='w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-blue-500 shadow-xl transition-transform duration-300 group-hover:scale-105'>
                <Image
                  src='/images/profilepic.jpg'
                  alt='Deepak Kumar'
                  width={320}
                  height={320}
                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                  priority
                  quality={100}
                />
              </div>
              <div className='absolute -bottom-2 -right-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-105'>
                <span className='text-sm font-semibold'>AWS Certified</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex-1 flex flex-col items-center md:items-start space-y-8'
          >
            <div className='text-center md:text-left max-w-2xl'>
              <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                Deepak Kumar
              </h1>
              <h2 className='text-2xl md:text-3xl font-semibold text-blue-600 mb-6'>
                Technical Architect | AWS Certified
              </h2>
              <div className='flex flex-col space-y-3 mb-6'>
                <div className='flex items-center justify-center md:justify-start'>
                  <span className='text-xl mr-2'>📍</span>
                  <p className='text-gray-600'>Noida, Uttar Pradesh, India</p>
                </div>
                <div className='flex items-center justify-center md:justify-start'>
                  <span className='text-xl mr-2'>📞</span>
                  <p className='text-gray-600'>+91 7760295006</p>
                </div>
                <div className='flex items-center justify-center md:justify-start'>
                  <span className='text-xl mr-2'>✉️</span>
                  <a
                    href='mailto:kumar_deepak@outlook.com'
                    className='text-blue-600 hover:text-blue-800'
                  >
                    kumar_deepak@outlook.com
                  </a>
                </div>
                <div className='flex items-center justify-center md:justify-start'>
                  <span className='text-xl mr-2'>🔗</span>
                  <a
                    href='https://www.linkedin.com/in/depak/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:text-blue-800'
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>
              <p className='text-lg text-gray-600 mb-8'>
                Results-driven Technical Architect with 15 years of experience
                in full-stack development, cloud architecture, and scalable
                enterprise solutions. Expert in Node.js, React, Python, and
                microservices. Adept at leading cross-functional teams,
                integrating Cloud, AI/ML technologies, and optimizing digital
                platforms for performance and user engagement.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
                <a
                  href='mailto:kumar_deepak@outlook.com'
                  className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors'
                >
                  Contact Me
                </a>
                <DownloadButton className='inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 hover:bg-blue-50 transition-colors' />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
