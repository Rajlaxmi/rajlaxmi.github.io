import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BackgroundVideo from '../components/BackgroundVideo';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import useActiveSection from '../hooks/useActiveSection';

const Portfolio: React.FC = () => {
  const activeSection = useActiveSection();

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <BackgroundVideo />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>
    </div>
  );
};

export default Portfolio;