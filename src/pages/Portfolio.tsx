import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BackgroundVideo from '../components/BackgroundVideo';
import About from '../components/About';
import Miscellaneous from '../components/Miscellaneous';
import Influences from '../components/Influences';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import useActiveSection from '../hooks/useActiveSection';
import useReveal from '../hooks/useReveal';

// Module scope keeps the reference stable across renders for useActiveSection.
const SECTION_IDS = ['hero', 'about', 'blog', 'projects', 'influences', 'misc', 'contact'];

const Portfolio: React.FC = () => {
  const activeSection = useActiveSection(SECTION_IDS);
  useReveal();

  return (
    <div className="min-h-screen bg-paper">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <BackgroundVideo />
        <About />
        <Blog />
        <Projects />
        <Influences />
        <Miscellaneous />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
