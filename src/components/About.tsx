import React from 'react';
import Section from './Section';

const About: React.FC = () => (
  <Section
    id="about"
    index="01"
    label="about"
    lead="I am an ML engineer on the applied machine learning teams at Google. My research interests include applying LLMs to reasoning and mathematics, alignment, and multimodality."
  >
    <p className="mt-8 max-w-measure text-[1.019533rem] text-muted" data-reveal>
      I am driven by my curiosity and learning from the collective stream of consciousness of past
      and present intellectuals. My other interests include Botany, Medical sciences, Human body,
      History art and architecture, Political and governance structures around the world.
    </p>

    <blockquote
      className="mt-12 max-w-measure border-l border-accent/50 pl-6 text-[1.024928rem] italic text-ink"
      data-reveal
    >
      Lux mentis, Lux orbis. Light of the mind, light of the world.
    </blockquote>
  </Section>
);

export default About;
