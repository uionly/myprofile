'use client';
import { FormEvent, useState } from 'react';
import DownloadButton from './DownloadButton';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setStatus({ type: 'loading' });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus({ type: 'idle' });
      }, 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Failed to send message',
      });

      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus({ type: 'idle' });
      }, 5000);
    }
  };

  return (
    <section id='contact' className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
          Let's Connect
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div className='bg-white p-8 rounded-xl shadow-md'>
            <h3 className='text-xl font-semibold mb-6'>Send me a message</h3>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  required
                  disabled={status.type === 'loading'}
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  required
                  disabled={status.type === 'loading'}
                />
              </div>
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  required
                  disabled={status.type === 'loading'}
                />
              </div>

              {status.message && (
                <div
                  className={`p-3 rounded-md ${
                    status.type === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type='submit'
                disabled={status.type === 'loading'}
                className={`w-full flex items-center justify-center px-4 py-2 rounded-md transition-colors ${
                  status.type === 'loading'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {status.type === 'loading' ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className='flex flex-col justify-center space-y-8'>
            <div className='space-y-6'>
              <h3 className='text-xl font-semibold'>Contact Information</h3>
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <span className='text-2xl'>📍</span>
                  <p className='text-gray-600'>Noida, Uttar Pradesh, India</p>
                </div>
                <div className='flex items-center space-x-3'>
                  <span className='text-2xl'>📞</span>
                  <p className='text-gray-600'>+91 7760295006</p>
                </div>
                <div className='flex items-center space-x-3'>
                  <span className='text-2xl'>✉️</span>
                  <a
                    href='mailto:kumar_deepak@outlook.com'
                    className='text-blue-600 hover:text-blue-800'
                  >
                    kumar_deepak@outlook.com
                  </a>
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              <h3 className='text-xl font-semibold'>Professional Profiles</h3>
              <div className='flex flex-col space-y-4'>
                <a
                  href='https://www.linkedin.com/in/depak/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors'
                >
                  <svg
                    className='w-6 h-6 mr-2'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Connect on LinkedIn
                </a>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <span className='text-2xl mr-2'>🏆</span>
                    <p className='text-gray-600'>
                      AWS Certified Solutions Architect – Associate
                    </p>
                  </div>
                  <DownloadButton className='text-blue-600 hover:text-blue-800 font-medium' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
