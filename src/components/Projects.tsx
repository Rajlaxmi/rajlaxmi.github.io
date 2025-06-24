import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'Mindful Task Manager',
      description: 'A minimalist productivity app built with React and TypeScript. Features clean design, smooth animations, and focus on essential functionality.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Local Storage'],
      liveUrl: '#',
      githubUrl: '#',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Portfolio Architecture',
      description: 'A clean, responsive portfolio template focusing on typography and white space. Built with performance and accessibility in mind.',
      tags: ['React', 'Vite', 'Responsive Design', 'SEO'],
      liveUrl: '#',
      githubUrl: '#',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Data Visualization Suite',
      description: 'Interactive dashboard for complex data sets. Emphasizes clarity and user experience over flashy graphics.',
      tags: ['D3.js', 'React', 'API Integration', 'Charts'],
      liveUrl: '#',
      githubUrl: '#',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-stone-800 mb-6">
            Featured Work
          </h2>
          <div className="h-px w-16 bg-stone-400 mx-auto mb-6"></div>
          <p className="text-lg text-stone-600 font-light max-w-2xl mx-auto">
            Selected projects that demonstrate the intersection of thoughtful design and technical excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group">
              <div className="bg-stone-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-stone-200 to-stone-300 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/0 transition-colors"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-light text-stone-800 mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-stone-600 font-light text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-stone-200 text-stone-600 text-xs font-light rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="inline-flex items-center space-x-1 text-stone-600 hover:text-stone-800 transition-colors text-sm"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="inline-flex items-center space-x-1 text-stone-600 hover:text-stone-800 transition-colors text-sm"
                      >
                        <Github size={14} />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;