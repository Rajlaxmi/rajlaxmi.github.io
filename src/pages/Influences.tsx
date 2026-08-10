import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useReveal from '../hooks/useReveal';

interface Organization {
  name: string;
  url: string;
  description: string;
  impact: string;
  category: string;
}

const organizations: Organization[] = [
  {
    name: 'Long Now Foundation',
    url: 'https://longnow.org/',
    description: 'Encouraging long-term thinking in the framework of the next 10,000 years.',
    impact:
      'Shaped my understanding of designing for longevity and thinking beyond immediate solutions.',
    category: 'Philosophy',
  },
  {
    name: 'Standard Ebooks',
    url: 'https://standardebooks.org/',
    description: 'Lovingly formatted, open source public domain ebooks.',
    impact:
      'Demonstrated how meticulous attention to typography and craft can transform content.',
    category: 'Books',
  },
  {
    name: 'Internet Archive',
    url: 'https://archive.org/',
    description: 'Universal access to all knowledge and digital preservation.',
    impact: 'Inspired my belief in democratizing information and preserving digital culture.',
    category: 'Preservation',
  },
  {
    name: 'Creative Commons',
    url: 'https://creativecommons.org/',
    description: 'Overcoming legal obstacles to sharing knowledge and creativity.',
    impact: 'Influenced my approach to open collaboration and sharing knowledge freely.',
    category: 'Collaboration',
  },
  {
    name: 'Computer History Museum',
    url: 'https://computerhistory.org/',
    description:
      'Preserving and celebrating computing history to decode the past, understand the present, and innovate for the future.',
    impact:
      'Provides a deep appreciation for the shoulders of giants on which all modern technology stands. Understanding the evolution of computing is essential for building its future.',
    category: 'Technology',
  },
  {
    name: 'Richard Hamming: Art of Science',
    url: 'https://www.amazon.com/Art-Doing-Science-Engineering-Learning/dp/1732265178',
    description:
      'What inspires and spurs on a great idea? Can we train ourselves to think in a way that will enable world-changing understandings and insights to emerge?',
    impact:
      'Provides a deep appreciation for the shoulders of giants on which all modern technology stands. Understanding the evolution of computing is essential for building its future.',
    category: 'Books',
  },
  {
    name: 'Leonardo da Vinci',
    url: 'https://www.amazon.com/Art-Doing-Science-Engineering-Learning/dp/1732265178',
    description:
      'Leonardo da Vinci was a polymath who excelled in various fields, including art, science, and engineering. His work and ideas continue to inspire and influence modern thinking.',
    impact:
      'Leonardo da Vinci was a polymath who excelled in various fields, including art, science, and engineering. His work and ideas continue to inspire and influence modern thinking.',
    category: 'Books',
  },
  {
    name: 'CRISPR and Jennifer Doudna',
    url: 'https://www.amazon.com/Art-Doing-Science-Engineering-Learning/dp/1732265178',
    description:
      'CRISPR and Jennifer Doudna are two of the most influential scientists of our time. Their work has revolutionized the field of genetics and has the potential to change the world.',
    impact:
      'CRISPR and Jennifer Doudna are two of the most influential scientists of our time. Their work has revolutionized the field of genetics and has the potential to change the world.',
    category: 'Research',
  },
];

const InfluencesPage: React.FC = () => {
  useReveal();
  useDocumentTitle(
    'Influences — Raila',
    'Organizations and sources that have shaped my approach to design, development, and life.',
  );

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        <div className="mx-auto max-w-page px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
          <p className="eyebrow">index</p>
          <h1 className="mt-5 text-title text-ink">Influences</h1>
          <p className="mt-6 max-w-[38rem] text-[1.141663rem] leading-[1.55] text-muted">
            These organizations and sources have profoundly influenced my approach to design,
            development, and life. Each represents thoughtful, intentional work that transcends
            immediate trends. I financially support some of these organizations.
          </p>
        </div>

        <div className="mx-auto max-w-page px-6 pb-24 sm:px-10">
          <ol className="grid border-t border-rule lg:grid-cols-2 lg:gap-x-14">
            {organizations.map((org, index) => (
              <li key={org.name} className="border-b border-rule py-8" data-reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <a
                    href={org.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-2"
                  >
                    <span className="eyebrow text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[1.141663rem] text-ink transition-colors duration-300 group-hover:text-accent">
                      {org.name}
                    </span>
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                      className="text-faint transition-all duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                  <span className="eyebrow">{org.category}</span>
                </div>

                <p className="mt-3 max-w-measure text-muted">{org.description}</p>
                <p className="mt-3 max-w-measure border-l border-rule pl-4 text-[0.91333rem] italic text-faint">
                  {org.impact}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-10">
            <Link
              to="/#influences"
              className="group inline-flex items-center gap-3 text-muted transition-colors duration-300 hover:text-accent"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-editorial group-hover:-translate-x-1"
              />
              <span className="eyebrow">back to portfolio</span>
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InfluencesPage;
