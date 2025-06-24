import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Clock, Globe, Book, Lightbulb, Users, Heart, Zap, Target, Shield, Compass, Star, Layers, Code, Palette, Music, Camera, Pen, Mountain } from 'lucide-react';

interface Organization {
  name: string;
  url: string;
  description: string;
  impact: string;
  category: string;
  icon: React.ReactNode;
}

const Influences: React.FC = () => {
  const organizations: Organization[] = [
    {
      name: 'Long Now Foundation',
      url: 'https://longnow.org/',
      description: 'Encouraging long-term thinking in the framework of the next 10,000 years.',
      impact: 'Shaped my understanding of designing for longevity and thinking beyond immediate solutions.',
      category: 'Philosophy',
      icon: <Clock size={20} />
    },
    {
      name: 'Standard Ebooks',
      url: 'https://standardebooks.org/',
      description: 'Lovingly formatted, open source public domain ebooks.',
      impact: 'Demonstrated how meticulous attention to typography and craft can transform content.',
      category: 'Books',
      icon: <Book size={20} />
    },
    {
      name: 'Internet Archive',
      url: 'https://archive.org/',
      description: 'Universal access to all knowledge and digital preservation.',
      impact: 'Inspired my belief in democratizing information and preserving digital culture.',
      category: 'Preservation',
      icon: <Globe size={20} />
    },
    {
      name: 'Creative Commons',
      url: 'https://creativecommons.org/',
      description: 'Overcoming legal obstacles to sharing knowledge and creativity.',
      impact: 'Influenced my approach to open collaboration and sharing knowledge freely.',
      category: 'Collaboration',
      icon: <Lightbulb size={20} />
    },
    {
        name: 'Computer History Museum',
        url: 'https://computerhistory.org/',
        description: 'Preserving and celebrating computing history to decode the past, understand the present, and innovate for the future.',
        impact: 'Provides a deep appreciation for the shoulders of giants on which all modern technology stands. Understanding the evolution of computing is essential for building its future.',
        category: 'Technology',
        icon: <Lightbulb size={20} />
    },
    {
        name: 'Richard Hamming: Art of Science',
        url: 'https://www.amazon.com/Art-Doing-Science-Engineering-Learning/dp/1732265178',
        description: 'What inspires and spurs on a great idea? Can we train ourselves to think in a way that will enable world-changing understandings and insights to emerge?',
        impact: 'Provides a deep appreciation for the shoulders of giants on which all modern technology stands. Understanding the evolution of computing is essential for building its future.',
        category: 'Books',
        icon: <Lightbulb size={20} />
    },
    {
        name: 'Leonardo da Vinci',
        url: 'https://www.amazon.com/Art-Doing-Science-Engineering-Learning/dp/1732265178',
        description: 'Leonardo da Vinci was a polymath who excelled in various fields, including art, science, and engineering. His work and ideas continue to inspire and influence modern thinking.',
        impact: 'Leonardo da Vinci was a polymath who excelled in various fields, including art, science, and engineering. His work and ideas continue to inspire and influence modern thinking.',
        category: 'Books',
        icon: <Lightbulb size={20} />
    },
    {
        name: 'CRISPR and Jennifer Doudna',
        url: 'https://www.amazon.com/Art-Doing-Science-Engineering-Learning/dp/1732265178',
        description: 'CRISPR and Jennifer Doudna are two of the most influential scientists of our time. Their work has revolutionized the field of genetics and has the potential to change the world.',
        impact: 'CRISPR and Jennifer Doudna are two of the most influential scientists of our time. Their work has revolutionized the field of genetics and has the potential to change the world.',
        category: 'Research',
        icon: <Lightbulb size={20} />
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Philosophy': 'text-blue-600',
      'Books': 'text-amber-600',
      'Craft': 'text-amber-600',
      'Preservation': 'text-green-600',
      'Collaboration': 'text-purple-600',
      'Technology': 'text-red-600',
      'Rights': 'text-indigo-600',
      'Business': 'text-emerald-600',
      'Design': 'text-pink-600',
      'Research': 'text-yellow-600',
      'Methodology': 'text-cyan-600',
      'Movement': 'text-orange-600',
      'Platform': 'text-gray-600',
      'Community': 'text-violet-600',
      'Communication': 'text-teal-600',
      'Photography': 'text-rose-600',
      'Publishing': 'text-lime-600',
      'Music': 'text-fuchsia-600',
      'Design Community': 'text-sky-600',
      'Video': 'text-slate-600',
      'Portfolio': 'text-stone-600'
    };
    return colors[category as keyof typeof colors] || 'text-stone-600';
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className="inline-flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-light">Back to Portfolio</span>
            </Link>
            
            <h1 className="text-lg font-light tracking-wide text-stone-800">
              Influences
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-wide text-stone-800 mb-6">
              Influences
            </h1>
            <div className="h-px w-24 bg-stone-400 mx-auto mb-6"></div>
            <p className="text-lg text-stone-600 font-light leading-relaxed max-w-3xl mx-auto">
              These organizations and sources have profoundly influenced my approach to design, development, and life. 
              Each represents thoughtful, intentional work that transcends immediate trends. I financially support some of these organizations.
            </p>
          </div>

          {/* Organizations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {organizations.map((org, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3 min-w-0 flex-1">
                      <div className="flex-shrink-0 w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-600 group-hover:bg-stone-200 transition-colors">
                        {org.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-light text-stone-800 leading-tight mb-1 break-words">
                          {org.name}
                        </h3>
                        <span className={`text-xs font-light tracking-widest uppercase ${getCategoryColor(org.category)}`}>
                          {org.category}
                        </span>
                      </div>
                    </div>
                    <a
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-1 text-stone-400 hover:text-stone-600 transition-colors ml-2"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-stone-600 font-light text-sm leading-relaxed mb-4 flex-grow">
                    {org.description}
                  </p>

                  {/* Impact */}
                  <div className="pt-3 border-t border-stone-100">
                    <p className="text-stone-700 font-light text-xs leading-relaxed italic">
                      {org.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t border-stone-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-sm">
              <div className="w-3 h-3 bg-stone-400 rounded-full"></div>
            </div>
            <p className="text-sm text-stone-500 font-light mb-4">
              These influences continue to shape my work and worldview
            </p>
            <Link 
              to="/"
              className="inline-flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
            >
              <ArrowLeft size={14} />
              <span className="text-sm font-light">Return to Portfolio</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Influences;