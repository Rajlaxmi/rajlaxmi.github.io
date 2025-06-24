import React from 'react';
import { Code, Brain, Server, BrainCircuit } from 'lucide-react';

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: string[];
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      icon: <Brain size={24} />,
      title: 'Reasoning',
      description: 'Building robust, scalable applications',
      skills: ['LLMs', 'Reasoning', 'Alignment', 'Multimodality', 'Reasoning']
    },
    {
      icon: <Code size={24} />,
      title: 'Software Engineering',
      description: 'Building robust, scalable applications',
      skills: ['Python', 'PyTorch', 'TensorFlow', 'PyTorch CUDA', 'Keras']
    },
    {
      icon: <BrainCircuit size={24} />,
      title: 'Mathematics',
      description: 'Optimizing for speed and efficiency',
      skills: ['Mathematics', 'Linear Algebra', 'Calculus', 'Probability', 'Statistics']
    },
    {
      icon: <Server size={24} />,
      title: 'Large Scale Systems',
      description: 'Bringing projects to life online',
      skills: ['Large Scale Systems', 'Distributed Systems', 'Cloud Computing', 'Containerization', 'CI/CD']
    }
  ];

  return (
    <section id="skills" className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-stone-800 mb-6">
            Skills
          </h2>
          <div className="h-px w-16 bg-stone-400 mx-auto mb-6"></div>
          <p className="text-lg text-stone-600 font-light max-w-2xl mx-auto">
            A curated collection of tools and techniques refined through years of creative problem-solving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-100 rounded-full mb-6 text-stone-600 group-hover:bg-stone-200 transition-colors">
                {category.icon}
              </div>
              
              <h3 className="text-xl font-light text-stone-800 mb-3">
                {category.title}
              </h3>
              
              <p className="text-sm text-stone-600 mb-6 font-light">
                {category.description}
              </p>
              
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="text-xs text-stone-500 font-light tracking-wide">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;