import React from 'react';
import Section from './Section';

interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Reasoning',
    description: 'Building robust, scalable applications',
    skills: ['LLMs', 'Alignment', 'Multimodality'],
  },
  {
    title: 'Engineering',
    description: 'Building robust, scalable applications',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'PyTorch CUDA', 'Keras'],
  },
  {
    title: 'Mathematics',
    description: 'Optimizing for speed and efficiency',
    skills: ['Mathematics', 'Linear Algebra', 'Calculus', 'Probability', 'Statistics'],
  },
  {
    title: 'Complex Systems',
    description: 'Bringing projects to life online',
    skills: [
      'Large Scale Systems',
      'Distributed Systems',
      'Cloud Computing',
      'Containerization',
      'CI/CD',
    ],
  },
];

const Skills: React.FC = () => (
  <Section
    id="skills"
    index="04"
    label="skills"
    lead="A curated collection of tools and techniques refined through years of creative problem-solving."
  >
    <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {skillCategories.map((category) => (
        <div key={category.title} className="border-t border-rule pt-5" data-reveal>
          <h3 className="text-[1.078872rem] text-ink">{category.title}</h3>
          <p className="mt-1 text-[0.863097rem] italic text-muted">{category.description}</p>

          <ul className="mt-5 space-y-1.5">
            {category.skills.map((skill) => (
              <li key={skill} className="text-[0.863097rem] text-muted">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

export default Skills;
