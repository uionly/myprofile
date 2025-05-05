'use client';

export interface SkillCategory {
  name: string;
  skills: string[];
  icon: string;
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['Node.js', 'JavaScript', 'TypeScript', 'Python', 'Java'],
    icon: '💻',
  },
  {
    name: 'Frontend',
    skills: ['React', 'Angular', 'HTML', 'CSS', 'Redux'],
    icon: '🎨',
  },
  {
    name: 'Backend',
    skills: ['Express', 'Restify', 'J2EE'],
    icon: '⚙️',
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Aurora', 'RDS'],
    icon: '🗄️',
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      'AWS (EC2, Lambda, S3, RDS, DynamoDB)',
      'Docker',
      'Jenkins',
      'OpenShift',
      'CloudWatch',
      'SQS',
      'SNS',
      'Redis',
    ],
    icon: '☁️',
  },
  {
    name: 'AI/ML Tools',
    skills: [
      'GPT',
      'BERT',
      'scikit-learn',
      'TensorFlow',
      'PyTorch',
      'Matplotlib',
      'Seaborn',
    ],
    icon: '🤖',
  },
  {
    name: 'Monitoring',
    skills: ['NewRelic', 'Sentry', 'Vanta', 'Snyk'],
    icon: '📊',
  },
  {
    name: 'CMS',
    skills: ['Contentful'],
    icon: '📝',
  },
];

const Skills = () => {
  return (
    <section id='skills' className='py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8'>
          Technical Expertise
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100'
            >
              <div className='flex items-center mb-4'>
                <span className='text-2xl mr-3'>{category.icon}</span>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {category.name}
                </h3>
              </div>
              <div className='flex flex-wrap gap-2'>
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certification Section */}
        <div className='mt-12 bg-blue-50 p-8 rounded-xl'>
          <h3 className='text-2xl font-bold text-gray-900 mb-6'>
            Certification
          </h3>
          <div className='flex items-center space-x-4'>
            <div className='bg-white p-4 rounded-lg shadow-sm flex items-center'>
              <span className='text-3xl mr-4'>🏆</span>
              <div>
                <h4 className='font-semibold text-gray-900'>
                  AWS Certified Solutions Architect
                </h4>
                <p className='text-gray-600'>
                  Associate Level – September 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
