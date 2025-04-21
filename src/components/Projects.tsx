'use client';

import React from 'react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  duration: string;
  role?: string;
  company?: string;
}

const projects: Project[] = [
  {
    title: 'TabCorp Digital App',
    description:
      'Built a mobile app to collect gaming interest data with microservices architecture for scalable performance. Implemented robust data collection and processing systems.',
    technologies: ['Node.js', 'AWS', 'PostgreSQL', 'TypeScript', 'Cursor'],
    duration: 'Jul 2024 – Present',
    company: 'TO THE NEW',
  },
  {
    title: 'LPM Portal – Golconda Partners',
    description:
      'Integrated advanced AI/ML capabilities to automate insurance form completion with high precision. Developed intelligent data processing systems for improved efficiency.',
    technologies: ['React', 'Node.js', 'Python', 'AWS', 'GenAI'],
    duration: 'May 2022 – Mar 2024',
    company: 'TO THE NEW',
  },
  {
    title: 'Tata Consumer Purchase Portal',
    description:
      'Developed a comprehensive order and invoice management platform with seamless SAP integration. Streamlined business processes and improved operational efficiency.',
    technologies: ['React', 'Node.js', 'SAP Integration', 'AWS'],
    duration: 'Oct 2021 – May 2022',
    role: 'Full Stack Lead',
    company: 'TO THE NEW',
  },
  {
    title: 'TELUS Home Services',
    description:
      'Spearheaded front-end strategy and design system upgrade, ensuring consistent omni-channel experiences. Enhanced CMS-based content delivery and automated order processing.',
    technologies: ['React', 'Node.js', 'Contentful', 'OpenShift'],
    duration: 'Oct 2018 – Apr 2021',
    company: 'TELUS International',
  },
  {
    title: 'Retail Kiosk – I&I',
    description:
      'Designed and implemented digital kiosk systems offering cash-based digital products. Created intuitive user interfaces for seamless customer interactions.',
    technologies: ['React', 'Express', 'PostgreSQL'],
    duration: 'Aug 2017 – Aug 2018',
    company: 'TELUS International',
  },
  {
    title: 'OMS Analytics Dashboard ',
    description:
      'Developed a responsive web interface integrating Tableau dashboards, enhancing UX for order management analytics using Angular and Bootstrap.',
    technologies: ['Angular, Bootstrap, Tableau'],
    duration: 'Aug 2016 – July 2017',
    company: 'TELUS International',
  },
  {
    title: 'Experience Centres',
    description:
      'Led web application development for creating immersive audiovisual experiences in client showrooms. Integrated touchscreen solutions and interactive displays.',
    technologies: ['Web Technologies', 'Interactive UI', 'AV Integration'],
    duration: 'Feb 2015 – Jul 2016',
    company: 'Moonraft',
  },
  {
    title: 'Finacle Ebanking',
    description:
      'Led development of Finacle e-Banking modules for top global banks; built secure, scalable digital banking features',
    technologies: ['Web Technologies', 'J2EE', 'Finacle'],
    duration: 'Jan 2010 – Feb 2015',
    company: 'Infosys',
  },
];

const Projects = () => {
  return (
    <section id='projects' className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8'>
          Featured Projects
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {projects.map((project, index) => (
            <div
              key={index}
              className='bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300'
            >
              <div className='flex justify-between items-start mb-4'>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {project.title}
                </h3>
                <span className='text-sm text-blue-600 font-medium px-3 py-1 bg-blue-50 rounded-full'>
                  {project.duration}
                </span>
              </div>
              {project.company && (
                <p className='text-sm text-gray-600 mb-3'>{project.company}</p>
              )}
              <p className='text-gray-600 mb-4'>{project.description}</p>
              <div className='mb-4'>
                {project.role && (
                  <span className='text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full mr-2'>
                    {project.role}
                  </span>
                )}
              </div>
              <div className='flex flex-wrap gap-2'>
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
