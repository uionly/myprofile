import Navigation from '@/components/Navigation';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Blog from '@/components/Blog';

export default function Home() {
  return (
    <>
      <Navigation />
      <div className='min-h-screen'>
        {/* Hero Section */}
        <Hero />

        {/* Skills Section */}
        <Skills />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Blog Section */}
        <Blog />

        {/* Contact Section */}
        <Contact />
      </div>
    </>
  );
}
