'use client';

interface DownloadButtonProps {
  className?: string;
}

const DownloadButton = ({ className = '' }: DownloadButtonProps) => {
  const handleDownload = () => {
    // You can add analytics tracking here if needed
    console.log('Resume download initiated');
  };

  return (
    <a
      href='/resume.pdf'
      download='Deepak_Kumar_Resume.pdf'
      onClick={handleDownload}
      className={`inline-flex items-center ${className}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <span className='mr-2'>📄</span>
      Download Resume
    </a>
  );
};

export default DownloadButton;
