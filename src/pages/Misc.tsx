import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionLink from '../components/SectionLink';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useReveal from '../hooks/useReveal';

interface MiscLink {
  label: string;
  href: string;
}

interface MiscEntry {
  name: string;
  description: string;
  category: string;
  links: MiscLink[];
}

const miscEntries: MiscEntry[] = [
  {
    name: 'Women in Frontier AI',
    description: 'A community supporting women working in frontier AI research and engineering.',
    category: 'Founder',
    links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/women-in-frontier-ai/' }],
  },
  {
    name: 'Photography',
    description: 'Nature and geography aficionado, capturing the best landscapes and light.',
    category: 'Hobby',
    links: [
      { label: 'Gallery', href: 'https://raila83.mypixieset.com/' },
      { label: 'Instagram', href: 'https://www.instagram.com/raila.snapshots/' },
    ],
  },
  {
    name: 'Little Shelf',
    description:
      'A curated library of book recommendations for children, organized by age group from early readers through 9–12, plus a parents’ section on reading instruction and child development.',
    category: 'Reading',
    links: [{ label: 'Visit', href: 'https://raila.io/little-shelf' }],
  },
];

const MiscPage: React.FC = () => {
  useReveal();
  useDocumentTitle(
    'Miscellaneous — Raila',
    'Pursuits that live alongside the work.',
  );

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        <div className="mx-auto max-w-page px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
          <p className="eyebrow">index</p>
          <h1 className="mt-5 text-title text-ink">Miscellaneous</h1>
          <p className="mt-6 max-w-[38rem] text-[0.970985rem] leading-[1.55] text-muted">
            Pursuits that live alongside the work.
          </p>
        </div>

        <div className="mx-auto max-w-page px-6 pb-24 sm:px-10">
          <ol className="grid border-t border-rule lg:grid-cols-2 lg:gap-x-14">
            {miscEntries.map((entry, index) => (
              <li key={entry.name} className="border-b border-rule py-8" data-reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <div className="inline-flex items-baseline gap-2">
                    <span className="eyebrow text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.970985rem] text-ink">{entry.name}</span>
                  </div>
                  <span className="eyebrow">{entry.category}</span>
                </div>

                <p className="mt-3 max-w-measure text-muted">{entry.description}</p>

                <div className="mt-3 flex flex-wrap items-center gap-6">
                  {entry.links.map((linkItem) => (
                    <a
                      key={linkItem.label}
                      href={linkItem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link inline-flex items-center gap-1.5 text-[0.776787rem]"
                    >
                      {linkItem.label}
                      <ArrowUpRight size={13} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10">
            <SectionLink
              sectionId="misc"
              className="group inline-flex items-center gap-3 text-muted transition-colors duration-300 hover:text-accent"
            >
              <ArrowLeft
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-editorial group-hover:-translate-x-1"
              />
              <span className="eyebrow">back to portfolio</span>
            </SectionLink>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MiscPage;
