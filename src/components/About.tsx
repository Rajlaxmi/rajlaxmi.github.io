import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-stone-800 mb-6">
            About
          </h2>
          <div className="h-px w-16 bg-stone-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-lg text-stone-600 font-light leading-relaxed">
            I am an ML engineer on the applied machine learning teams at Google. My research interests include applying LLMs to reasoning and mathematics, alignment, and multimodality.
            </p>
            
            <p className="text-lg text-stone-600 font-light leading-relaxed">
            I am driven by my curiosity and learning from the collective stream of consciousness of past and present intellectuals. My other interests include Botany, Medical sciences, Human body, History art and architecture, Political and governance structures around the world.
            </p>

          </div>

          <div className="relative">
            <div className="bg-stone-100 rounded-lg p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-stone-300 rounded-full mx-auto mb-4 opacity-60"></div>
                <div className="h-px w-12 bg-stone-400 mx-auto"></div>
              </div>
              <blockquote className="text-stone-700 font-light italic text-lg leading-relaxed">
                Lux mentis, Lux orbis. Light of the mind, light of the world.
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;