'use client';

interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  highlights: string[];
}

const experiences: Experience[] = [
  {
    company: 'TO THE NEW',
    role: 'Technical Architect',
    duration: 'Aug 2021 – Present',
    location: 'Noida, India',
    highlights: [
      'Architected scalable mobile and web solutions for enterprise clients like Tabcorp, Tata, and Golconda, leading cross-functional teams across frontend, backend, and infrastructure.',
      'Led GenAI adoption initiatives, including automation of insurance workflows and integration of AI tools like Cursor, Copilot, and Amazon Q to accelerate development.',
      'Designed robust backend systems with PostgreSQL and APIs to power real-time gaming and communication platforms.',
    ],
  },
  {
    company: 'Oracle',
    role: 'Principal Engineer',
    duration: 'Apr 2021 – Aug 2021',
    location: 'India',
    highlights: [
      'Led design and development initiatives on enterprise-grade applications with focus on performance and modularity.',
    ],
  },
  {
    company: 'TELUS International',
    role: 'Technology Architect',
    duration: 'Aug 2016 – Apr 2021',
    location: 'India',
    highlights: [
      'Headed frontend architecture for TELUS Home Services, ensuring consistent omni-channel experiences.',
      'Upgraded design systems, implemented automation in order processing, and enhanced CMS-based content delivery.',
    ],
  },
  {
    company: 'Moonraft',
    role: 'Engineering Lead',
    duration: 'Feb 2015 – Jul 2016',
    location: 'India',
    highlights: [
      'Delivered interactive Customer Experience Centres integrating touchscreen solutions.',
      'Drove UI/UX alignment between design, tech, and client teams.',
    ],
  },
  {
    company: 'Infosys',
    role: 'Technical Analyst',
    duration: 'Jan 2010 – Feb 2015',
    location: 'India',
    highlights: [
      'Developed and customized Finacle Retail Banking modules (Demat, PFM) for global clients like ICICI and Standard Bank.',
      'Pioneered the first omni-channel experience for retail banking product suite.',
    ],
  },
];

const Experience = () => {
  return (
    <section
      id='experience'
      className='py-20 bg-gradient-to-b from-gray-50 to-white'
    >
      <div className='w-full px-4 sm:px-6 lg:px-8'>
        <h2 className='text-4xl font-bold text-gray-900 mb-16 text-center'>
          Professional Journey
        </h2>
        <div className='relative'>
          {/* Main timeline line */}
          <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600'></div>

          <div className='space-y-8'>
            {experiences.map((exp, index) => (
              <div key={index} className='relative'>
                {/* Timeline dot */}
                <div className='absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg'></div>

                {/* Content */}
                <div className='w-full max-w-4xl mx-auto'>
                  <div className='bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500'>
                    <div className='flex flex-col space-y-2 mb-6'>
                      <h3 className='text-2xl font-bold text-gray-900'>
                        {exp.company}
                      </h3>
                      <div className='flex flex-wrap items-center gap-4 text-sm text-gray-500'>
                        <span className='flex items-center'>
                          <svg
                            className='w-4 h-4 mr-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                            />
                          </svg>
                          {exp.role}
                        </span>
                        <span className='flex items-center'>
                          <svg
                            className='w-4 h-4 mr-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                            />
                          </svg>
                          {exp.duration}
                        </span>
                        <span className='flex items-center'>
                          <svg
                            className='w-4 h-4 mr-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                          </svg>
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <ul className='space-y-3'>
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className='flex items-start group'>
                          <span className='flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500 group-hover:bg-blue-600 transition-colors'></span>
                          <span className='ml-3 text-gray-600 group-hover:text-gray-900 transition-colors'>
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Connecting line between dots */}
                {index < experiences.length - 1 && (
                  <div className='absolute left-1/2 transform -translate-x-1/2 h-8 w-1 bg-gradient-to-b from-blue-400 to-blue-600'></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
