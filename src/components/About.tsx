import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section';

const About: React.FC = () => (
  <Section
    id="about"
    index="01"
    label="about"
    lead="I am an ML engineer on the applied machine learning teams at Google. My research interests include applying LLMs to reasoning and mathematics, alignment, and multimodality."
  >
    <p className="mt-8 max-w-measure text-muted" data-reveal>
      I am driven by my curiosity and learning from the collective stream of consciousness of past
      and present intellectuals. My other interests include Botany, Medical sciences, Human body,
      History art and architecture, Political and governance structures around the world.
    </p>

    <blockquote
      className="mt-12 max-w-measure border-l border-accent/50 pl-6 text-[1.045rem] italic text-ink"
      data-reveal
    >
      Lux mentis, Lux orbis. Light of the mind, light of the world.
    </blockquote>

    <p className="mt-12" data-reveal>
      <a
        href="/RajlaxmiResume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-accent"
      >
        <span className="eyebrow">résumé</span>
        <ArrowUpRight
          size={13}
          strokeWidth={1.5}
          className="transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </p>
  </Section>
);

export default About;
