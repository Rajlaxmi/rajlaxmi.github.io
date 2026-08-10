import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section from './Section';

interface Organization {
  name: string;
  description: string;
  category: string;
}

const featuredOrganizations: Organization[] = [
  {
    name: 'Long Now Foundation',
    description: 'Encouraging long-term thinking in the framework of the next 10,000 years.',
    category: 'Philosophy',
  },
  {
    name: 'Standard Ebooks',
    description: 'Lovingly formatted, open source public domain ebooks.',
    category: 'Books',
  },
  {
    name: 'Internet Archive',
    description: 'Universal access to all knowledge and digital preservation.',
    category: 'Preservation',
  },
  {
    name: 'Creative Commons',
    description: 'Overcoming legal obstacles to sharing knowledge and creativity.',
    category: 'Collaboration',
  },
];

const Influences: React.FC = () => (
  <Section
    id="influences"
    index="02"
    label="influences"
    lead="Organizations that have shaped my thinking and approach to creating meaningful, lasting work."
  >
    <ul className="mt-12 border-t border-rule">
      {featuredOrganizations.map((org) => (
        <li key={org.name} className="border-b border-rule py-6" data-reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-[1.265rem] text-ink">{org.name}</h3>
            <span className="eyebrow">{org.category}</span>
          </div>
          <p className="mt-2 max-w-measure text-muted">{org.description}</p>
        </li>
      ))}
    </ul>

    <p className="mt-10" data-reveal>
      <Link
        to="/influences"
        className="group inline-flex items-center gap-3 text-muted transition-colors duration-300 hover:text-accent"
      >
        <span className="eyebrow">all influences</span>
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
        />
      </Link>
    </p>
  </Section>
);

export default Influences;
