import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Book, Globe, Lightbulb } from 'lucide-react';

const Influences: React.FC = () => {
  const featuredOrganizations = [
    {
      name: 'Long Now Foundation',
      description: 'Encouraging long-term thinking in the framework of the next 10,000 years.',
      category: 'Philosophy',
      icon: <Clock size={20} />,
    },
    {
      name: 'Standard Ebooks',
      description: 'Lovingly formatted, open source public domain ebooks.',
      category: 'Books',
      icon: <Book size={20} />,
    },
    {
      name: 'Internet Archive',
      description: 'Universal access to all knowledge and digital preservation.',
      category: 'Preservation',
      icon: <Globe size={20} />,
    },
    {
      name: 'Creative Commons',
      description: 'Overcoming legal obstacles to sharing knowledge and creativity.',
      category: 'Collaboration',
      icon: <Lightbulb size={20} />,
    }
  ];

  return (
    <section id="influences" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-stone-800 mb-6">
            Influences
          </h2>
          <div className="h-px w-16 bg-stone-400 mx-auto mb-6"></div>
          <p className="text-lg text-stone-600 font-light max-w-2xl mx-auto">
            Organizations that have shaped my thinking and approach to creating meaningful, lasting work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredOrganizations.map((org, index) => (
            <div key={index} className="bg-stone-50 rounded-lg p-6 hover:shadow-md transition-shadow group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full text-stone-600 group-hover:bg-stone-100 transition-colors">
                    {org.icon}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-light text-stone-800">
                      {org.name}
                    </h3>
                    <span className="text-xs text-stone-500 font-light tracking-widest uppercase">
                      {org.category}
                    </span>
                  </div>
                  <p className="text-stone-600 font-light text-sm leading-relaxed">
                    {org.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/influences"
            className="inline-flex items-center space-x-2 bg-stone-800 text-white px-8 py-3 rounded-full hover:bg-stone-700 transition-colors group"
          >
            <span className="font-light">Explore All Influences</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Influences;