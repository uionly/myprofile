'use client';
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface Blog {
  title: string;
  description: string;
  date: string;
  link: string;
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  highlights: string[];
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    location: string;
    summary: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
  experience: Experience[];
  certifications: {
    name: string;
    date: string;
  }[];
  projects: Project[];
  blogs: Blog[];
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    name: 'Deepak Kumar',
    title: 'Technical Architect',
    email: 'kumar_deepak@outlook.com',
    location: 'Noida, Uttar Pradesh, India',
    summary:
      'Results-driven Technical Architect with 15 years of experience in full-stack development, cloud architecture, and scalable enterprise solutions. Expert in Node.js, React, Python, and microservices. Adept at leading cross-functional teams, integrating Cloud, AI/ML technologies, and optimizing digital platforms for performance and user engagement.',
    linkedin: 'https://www.linkedin.com/in/depak/',
    github: 'https://github.com/uionly',
    twitter: 'https://x.com/dpukjha',
  },
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Python', 'Express', 'Django', 'REST APIs'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    },
    {
      category: 'Databases',
      items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    },
  ],
  experience: [
    {
      company: 'Current Company',
      role: 'Technical Architect',
      duration: '2020 - Present',
      location: 'Noida, India',
      highlights: [
        'Led the architecture and development of multiple enterprise applications',
        'Implemented cloud-native solutions using AWS services',
        'Mentored and guided development teams',
      ],
    },
    {
      company: 'Previous Company',
      role: 'Senior Software Engineer',
      duration: '2015 - 2020',
      location: 'Noida, India',
      highlights: [
        'Developed and maintained large-scale web applications',
        'Implemented microservices architecture',
        'Optimized application performance and scalability',
      ],
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      date: 'September 2024',
    },
  ],
  projects: [
    {
      title: 'E-commerce Platform',
      description:
        'Built a scalable e-commerce platform with microservices architecture',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      link: 'https://github.com/example/ecommerce',
    },
    {
      title: 'AI-Powered Chatbot',
      description:
        'Developed a conversational AI chatbot using NLP and machine learning',
      technologies: ['Python', 'TensorFlow', 'React', 'AWS Lambda'],
      link: 'https://github.com/example/chatbot',
    },
  ],
  blogs: [
    {
      title: 'Building Scalable Microservices',
      description:
        'A comprehensive guide to building and deploying microservices',
      date: 'March 2024',
      link: 'https://example.com/microservices',
    },
    {
      title: 'AI in Software Development',
      description:
        'Exploring the impact of AI on modern software development practices',
      date: 'February 2024',
      link: 'https://example.com/ai-development',
    },
  ],
};

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    section: keyof ResumeData,
    field: string,
    value: string,
    index?: number,
    subIndex?: number
  ) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      if (index !== undefined) {
        if (subIndex !== undefined) {
          // For nested arrays like highlights in experience
          (newData[section] as any)[index][field][subIndex] = value;
        } else {
          // For direct fields in arrays
          (newData[section] as any)[index][field] = value;
        }
      } else {
        // For direct fields in objects
        (newData[section] as any)[field] = value;
      }
      return newData;
    });
  };

  const addItem = (section: keyof ResumeData) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      const newItem = {
        ...(section === 'skills'
          ? { category: '', items: [''] }
          : section === 'experience'
          ? {
              company: '',
              role: '',
              duration: '',
              location: '',
              highlights: [''],
            }
          : section === 'certifications'
          ? { name: '', date: '' }
          : section === 'projects'
          ? { title: '', description: '', technologies: [''] }
          : { title: '', description: '', date: '', link: '' }),
      };
      (newData[section] as any[]).push(newItem);
      return newData;
    });
  };

  const removeItem = (section: keyof ResumeData, index: number) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      (newData[section] as any[]).splice(index, 1);
      return newData;
    });
  };

  const addHighlight = (experienceIndex: number) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      newData.experience[experienceIndex].highlights.push('');
      return newData;
    });
  };

  const removeHighlight = (experienceIndex: number, highlightIndex: number) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      newData.experience[experienceIndex].highlights.splice(highlightIndex, 1);
      return newData;
    });
  };

  const addTechnology = (projectIndex: number) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      newData.projects[projectIndex].technologies.push('');
      return newData;
    });
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      newData.projects[projectIndex].technologies.splice(techIndex, 1);
      return newData;
    });
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-content');
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('resume.pdf');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900'>Resume Builder</h1>
            <p className='mt-2 text-lg text-gray-600'>
              Create and customize your professional resume
            </p>
          </div>
          <div className='flex gap-4'>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                {isEditing ? (
                  <path
                    fillRule='evenodd'
                    d='M10 12a2 2 0 100-4 2 2 0 000 4zm-8.458-2C2.832 5.943 6.122 3 10 3s7.168 2.943 8.458 7c-1.29 4.057-4.58 7-8.458 7s-7.168-2.943-8.458-7zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                    clipRule='evenodd'
                  />
                ) : (
                  <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                )}
              </svg>
              {isEditing ? 'Preview' : 'Edit'}
            </button>
            <button
              onClick={handleDownloadPDF}
              className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
              Download PDF
            </button>
          </div>
        </div>

        <div
          id='resume-content'
          className='bg-white rounded-2xl shadow-xl overflow-hidden'
        >
          {/* Personal Information */}
          <div className='p-8 border-b border-gray-200'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Personal Information
            </h2>
            {isEditing ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Name
                  </label>
                  <input
                    type='text'
                    value={resumeData.personalInfo.name}
                    onChange={(e) =>
                      handleInputChange('personalInfo', 'name', e.target.value)
                    }
                    className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Title
                  </label>
                  <input
                    type='text'
                    value={resumeData.personalInfo.title}
                    onChange={(e) =>
                      handleInputChange('personalInfo', 'title', e.target.value)
                    }
                    className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Email
                  </label>
                  <input
                    type='email'
                    value={resumeData.personalInfo.email}
                    onChange={(e) =>
                      handleInputChange('personalInfo', 'email', e.target.value)
                    }
                    className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Location
                  </label>
                  <input
                    type='text'
                    value={resumeData.personalInfo.location}
                    onChange={(e) =>
                      handleInputChange(
                        'personalInfo',
                        'location',
                        e.target.value
                      )
                    }
                    className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Summary
                  </label>
                  <textarea
                    value={resumeData.personalInfo.summary}
                    onChange={(e) =>
                      handleInputChange(
                        'personalInfo',
                        'summary',
                        e.target.value
                      )
                    }
                    rows={4}
                    className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    LinkedIn
                  </label>
                  <input
                    type='url'
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) =>
                      handleInputChange(
                        'personalInfo',
                        'linkedin',
                        e.target.value
                      )
                    }
                    className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    GitHub
                  </label>
                  <input
                    type='url'
                    value={resumeData.personalInfo.github}
                    onChange={(e) =>
                      handleInputChange(
                        'personalInfo',
                        'github',
                        e.target.value
                      )
                    }
                    className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Twitter
                  </label>
                  <input
                    type='url'
                    value={resumeData.personalInfo.twitter}
                    onChange={(e) =>
                      handleInputChange(
                        'personalInfo',
                        'twitter',
                        e.target.value
                      )
                    }
                    className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                  />
                </div>
              </div>
            ) : (
              <div className='space-y-4'>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-4xl font-bold text-gray-900'>
                    {resumeData.personalInfo.name}
                  </h1>
                  <p className='text-xl text-blue-600 mt-2'>
                    {resumeData.personalInfo.title}
                  </p>
                  <div className='mt-4 flex flex-wrap justify-center gap-4'>
                    <p className='text-gray-600'>
                      {resumeData.personalInfo.email}
                    </p>
                    <p className='text-gray-600'>
                      {resumeData.personalInfo.location}
                    </p>
                  </div>
                  <div className='mt-4 flex gap-4'>
                    {resumeData.personalInfo.linkedin && (
                      <a
                        href={resumeData.personalInfo.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 transition-colors'
                      >
                        LinkedIn
                      </a>
                    )}
                    {resumeData.personalInfo.github && (
                      <a
                        href={resumeData.personalInfo.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 transition-colors'
                      >
                        GitHub
                      </a>
                    )}
                    {resumeData.personalInfo.twitter && (
                      <a
                        href={resumeData.personalInfo.twitter}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 transition-colors'
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                  <p className='mt-6 text-gray-700 max-w-2xl'>
                    {resumeData.personalInfo.summary}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className='p-8 border-b border-gray-200'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-900'>Skills</h2>
              {isEditing && (
                <button
                  onClick={() => addItem('skills')}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Add Category
                </button>
              )}
            </div>
            {isEditing ? (
              <div className='space-y-6'>
                {resumeData.skills.map((category, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 rounded-xl p-6 shadow-sm'
                  >
                    <div className='flex justify-between items-center mb-4'>
                      <input
                        type='text'
                        value={category.category}
                        onChange={(e) =>
                          handleInputChange(
                            'skills',
                            'category',
                            e.target.value,
                            index
                          )
                        }
                        placeholder='Category Name'
                        className='text-lg font-semibold w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                      />
                      <button
                        onClick={() => removeItem('skills', index)}
                        className='text-red-600 hover:text-red-800 transition-colors'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </div>
                    <div className='space-y-3'>
                      {category.items.map((skill, skillIndex) => (
                        <div key={skillIndex} className='flex gap-3'>
                          <input
                            type='text'
                            value={skill}
                            onChange={(e) =>
                              handleInputChange(
                                'skills',
                                'items',
                                e.target.value,
                                index,
                                skillIndex
                              )
                            }
                            placeholder='Skill'
                            className='flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                          />
                          <button
                            onClick={() => {
                              const newSkills = [...category.items];
                              newSkills.splice(skillIndex, 1);
                              handleInputChange(
                                'skills',
                                'items',
                                newSkills.join(','),
                                index
                              );
                            }}
                            className='text-red-600 hover:text-red-800 transition-colors'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newSkills = [...category.items, ''];
                          handleInputChange(
                            'skills',
                            'items',
                            newSkills.join(','),
                            index
                          );
                        }}
                        className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                            clipRule='evenodd'
                          />
                        </svg>
                        Add Skill
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {resumeData.skills.map((category, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 rounded-xl p-6 shadow-sm'
                  >
                    <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                      {category.category}
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {category.items.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Experience */}
          <div className='p-8 border-b border-gray-200'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-900'>Experience</h2>
              {isEditing && (
                <button
                  onClick={() => addItem('experience')}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Add Experience
                </button>
              )}
            </div>
            {isEditing ? (
              <div className='space-y-6'>
                {resumeData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 rounded-xl p-6 shadow-sm'
                  >
                    <div className='flex justify-between items-center mb-4'>
                      <input
                        type='text'
                        value={exp.company}
                        onChange={(e) =>
                          handleInputChange(
                            'experience',
                            'company',
                            e.target.value,
                            index
                          )
                        }
                        placeholder='Company Name'
                        className='text-xl font-semibold w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                      />
                      <button
                        onClick={() => removeItem('experience', index)}
                        className='text-red-600 hover:text-red-800 transition-colors'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </div>
                    <div className='space-y-4'>
                      <input
                        type='text'
                        value={exp.role}
                        onChange={(e) =>
                          handleInputChange(
                            'experience',
                            'role',
                            e.target.value,
                            index
                          )
                        }
                        placeholder='Role'
                        className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                      />
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <input
                          type='text'
                          value={exp.duration}
                          onChange={(e) =>
                            handleInputChange(
                              'experience',
                              'duration',
                              e.target.value,
                              index
                            )
                          }
                          placeholder='Duration'
                          className='rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        />
                        <input
                          type='text'
                          value={exp.location}
                          onChange={(e) =>
                            handleInputChange(
                              'experience',
                              'location',
                              e.target.value,
                              index
                            )
                          }
                          placeholder='Location'
                          className='rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                        />
                      </div>
                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-700'>
                          Highlights
                        </h4>
                        {exp.highlights.map((highlight, highlightIndex) => (
                          <div key={highlightIndex} className='flex gap-3'>
                            <input
                              type='text'
                              value={highlight}
                              onChange={(e) =>
                                handleInputChange(
                                  'experience',
                                  'highlights',
                                  e.target.value,
                                  index,
                                  highlightIndex
                                )
                              }
                              placeholder='Highlight'
                              className='flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            />
                            <button
                              onClick={() =>
                                removeHighlight(index, highlightIndex)
                              }
                              className='text-red-600 hover:text-red-800 transition-colors'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M6 18L18 6M6 6l12 12'
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addHighlight(index)}
                          className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                              clipRule='evenodd'
                            />
                          </svg>
                          Add Highlight
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='space-y-8'>
                {resumeData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 rounded-xl p-6 shadow-sm'
                  >
                    <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-4'>
                      <div>
                        <h3 className='text-xl font-semibold text-gray-900'>
                          {exp.company}
                        </h3>
                        <p className='text-blue-600 mt-1'>{exp.role}</p>
                      </div>
                      <div className='text-right'>
                        <p className='text-gray-600'>{exp.duration}</p>
                        <p className='text-gray-600'>{exp.location}</p>
                      </div>
                    </div>
                    <ul className='mt-4 space-y-2'>
                      {exp.highlights.map((highlight, highlightIndex) => (
                        <li
                          key={highlightIndex}
                          className='flex items-start gap-2'
                        >
                          <span className='text-blue-600 mt-1'>•</span>
                          <span className='text-gray-700'>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Projects */}
          <div className='p-8 border-b border-gray-200'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-900'>Projects</h2>
              {isEditing && (
                <button
                  onClick={() => addItem('projects')}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Add Project
                </button>
              )}
            </div>
            {isEditing ? (
              <div className='space-y-6'>
                {resumeData.projects.map((project, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 rounded-xl p-6 shadow-sm'
                  >
                    <div className='flex justify-between items-center mb-4'>
                      <input
                        type='text'
                        value={project.title}
                        onChange={(e) =>
                          handleInputChange(
                            'projects',
                            'title',
                            e.target.value,
                            index
                          )
                        }
                        placeholder='Project Title'
                        className='text-xl font-semibold w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                      />
                      <button
                        onClick={() => removeItem('projects', index)}
                        className='text-red-600 hover:text-red-800 transition-colors'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </div>
                    <div className='space-y-4'>
                      <textarea
                        value={project.description}
                        onChange={(e) =>
                          handleInputChange(
                            'projects',
                            'description',
                            e.target.value,
                            index
                          )
                        }
                        placeholder='Project Description'
                        rows={3}
                        className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                      />
                      <div className='space-y-3'>
                        <h4 className='font-medium text-gray-700'>
                          Technologies
                        </h4>
                        {project.technologies.map((tech, techIndex) => (
                          <div key={techIndex} className='flex gap-3'>
                            <input
                              type='text'
                              value={tech}
                              onChange={(e) =>
                                handleInputChange(
                                  'projects',
                                  'technologies',
                                  e.target.value,
                                  index,
                                  techIndex
                                )
                              }
                              placeholder='Technology'
                              className='flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                            />
                            <button
                              onClick={() => removeTechnology(index, techIndex)}
                              className='text-red-600 hover:text-red-800 transition-colors'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M6 18L18 6M6 6l12 12'
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addTechnology(index)}
                          className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                              clipRule='evenodd'
                            />
                          </svg>
                          Add Technology
                        </button>
                      </div>
                      <input
                        type='url'
                        value={project.link}
                        onChange={(e) =>
                          handleInputChange(
                            'projects',
                            'link',
                            e.target.value,
                            index
                          )
                        }
                        placeholder='Project Link'
                        className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {resumeData.projects.map((project, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 rounded-xl p-6 shadow-sm'
                  >
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                      {project.title}
                    </h3>
                    <p className='text-gray-700 mb-4'>{project.description}</p>
                    <div className='flex flex-wrap gap-2 mb-4'>
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0L1 8l2.586-2.586a2 2 0 012.828 0l.293.293 1.414-1.414.293-.293zM3 7l3-3 3 3-3 3-3-3z'
                            clipRule='evenodd'
                          />
                        </svg>
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Blogs */}
          <div className='p-8 border-b border-gray-200'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-900'>Blogs</h2>
              {isEditing && (
                <button
                  onClick={() => addItem('blogs')}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Add Blog
                </button>
              )}
            </div>
            {isEditing ? (
              <div className='space-y-6'>
                {resumeData.blogs.map((blog, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 rounded-xl p-6 shadow-sm'
                  >
                    <div className='flex justify-between items-center mb-4'>
                      <input
                        type='text'
                        value={blog.title}
                        onChange={(e) =>
                          handleInputChange(
                            'blogs',
                            'title',
                            e.target.value,
                            index
                          )
                        }
                        placeholder='Blog Title'
                        className='text-xl font-semibold w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                      />
                      <button
                        onClick={() => removeItem('blogs', index)}
                        className='text-red-600 hover:text-red-800 transition-colors'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </div>
                    <div className='space-y-4'>
                      <textarea
                        value={blog.description}
                        onChange={(e) =>
                          handleInputChange(
                            'blogs',
                            'description',
                            e.target.value,
                            index
                          )
                        }
                        placeholder='Blog Description'
                        rows={3}
                        className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                      />
                      <input
                        type='text'
                        value={blog.date}
                        onChange={(e) =>
                          handleInputChange(
                            'blogs',
                            'date',
                            e.target.value,
                            index
                          )
                        }
                        placeholder='Publication Date'
                        className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                      />
                      <input
                        type='url'
                        value={blog.link}
                        onChange={(e) =>
                          handleInputChange(
                            'blogs',
                            'link',
                            e.target.value,
                            index
                          )
                        }
                        placeholder='Blog Link'
                        className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {resumeData.blogs.map((blog, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 rounded-xl p-6 shadow-sm'
                  >
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                      {blog.title}
                    </h3>
                    <p className='text-gray-700 mb-4'>{blog.description}</p>
                    <div className='flex justify-between items-center'>
                      <p className='text-gray-600'>{blog.date}</p>
                      <a
                        href={blog.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0L1 8l2.586-2.586a2 2 0 012.828 0l.293.293 1.414-1.414.293-.293zM3 7l3-3 3 3-3 3-3-3z'
                            clipRule='evenodd'
                          />
                        </svg>
                        Read More
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className='p-8'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-900'>
                Certifications
              </h2>
              {isEditing && (
                <button
                  onClick={() => addItem('certifications')}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Add Certification
                </button>
              )}
            </div>
            {isEditing ? (
              <div className='space-y-6'>
                {resumeData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 rounded-xl p-6 shadow-sm'
                  >
                    <div className='flex justify-between items-center mb-4'>
                      <input
                        type='text'
                        value={cert.name}
                        onChange={(e) =>
                          handleInputChange(
                            'certifications',
                            'name',
                            e.target.value,
                            index
                          )
                        }
                        placeholder='Certification Name'
                        className='text-xl font-semibold w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                      />
                      <button
                        onClick={() => removeItem('certifications', index)}
                        className='text-red-600 hover:text-red-800 transition-colors'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </div>
                    <input
                      type='text'
                      value={cert.date}
                      onChange={(e) =>
                        handleInputChange(
                          'certifications',
                          'date',
                          e.target.value,
                          index
                        )
                      }
                      placeholder='Date'
                      className='w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {resumeData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 rounded-xl p-6 shadow-sm'
                  >
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                      {cert.name}
                    </h3>
                    <p className='text-gray-600'>{cert.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
