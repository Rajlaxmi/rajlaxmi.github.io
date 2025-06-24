import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-stone-50 relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-stone-200 rounded-full opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 border border-stone-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 border border-stone-200 rounded-full opacity-25"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-light tracking-widest text-stone-800 mb-4">
            RAILA
          </h1>
          <div className="h-px w-24 bg-stone-400 mx-auto mb-6"></div>
          <h2 className="text-xl md:text-2xl font-light italic text-stone-600 mb-8">
            Driven, Curious and Creative.
          </h2>
        </div>

        {/* Centered Geometric Element */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative">
            <div className="w-24 h-24 border-2 border-stone-400 rounded-full"></div>
            <div className="absolute top-4 left-4 w-16 h-16 border border-stone-300 rounded-full"></div>
            <div className="absolute top-8 left-8 w-8 h-8 bg-stone-300 rounded-full opacity-50"></div>
          </div>
        </div>

        <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-2">
        Once a computer achieves a human level, it will necessarily soar past it.
        </p>

        <p className="text-sm text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-4 italic">
        Ray Kurzweil, The Singularity Is Near (2005)
        </p>

        <button
          onClick={scrollToAbout}
          className="inline-flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors group"
        >
          <span className="text-sm font-light tracking-wide">Explore Work</span>
          <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Hero;