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
    <section id='experience' className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-12'>
          Professional Journey
        </h2>
        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-0 md:left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200'></div>

          <div className='space-y-12'>
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className='absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white'></div>

                {/* Content */}
                <div
                  className={`ml-6 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <h3 className='text-xl font-bold text-gray-900'>
                          {exp.company}
                        </h3>
                        <p className='text-lg font-semibold text-blue-600'>
                          {exp.role}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm font-medium text-gray-600'>
                          {exp.duration}
                        </p>
                        <p className='text-sm text-gray-500'>{exp.location}</p>
                      </div>
                    </div>
                    <ul className='mt-4 space-y-2'>
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className='flex items-start'>
                          <span className='text-blue-500 mr-2'>•</span>
                          <span className='text-gray-600'>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
