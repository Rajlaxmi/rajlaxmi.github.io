import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section';

interface MiscItem {
  name: string;
  description: string;
  category: string;
  href: string;
  linkLabel: string;
  image: string;
}

const miscItems: MiscItem[] = [
  {
    name: 'Women in Frontier AI',
    description: 'A community supporting women working in frontier AI research and engineering.',
    category: 'Founder',
    href: 'https://www.linkedin.com/company/the-curie-ai-society/',
    linkLabel: 'LinkedIn',
    image: '/women-in-frontier-ai-agi-house.jpg',
  },
  {
    name: 'Photography',
    description: 'A few frames from evenings spent watching the sky change.',
    category: 'Hobby',
    href: 'https://raila83.mypixieset.com/',
    linkLabel: 'Gallery',
    image: '/photography-rainbow.jpg',
  },
];

const Miscellaneous: React.FC = () => (
  <Section
    id="misc"
    index="06"
    label="miscellaneous"
    lead="Other things I've started or been part of, outside the usual work."
  >
    <ol className="mt-14 space-y-16 sm:space-y-24">
      {miscItems.map((item, index) => (
        <li
          key={item.name}
          className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
          data-reveal
        >
          <div
            className={`overflow-hidden border border-rule bg-surface ${
              index % 2 === 1 ? 'md:order-2' : ''
            }`}
          >
            <div className="aspect-video">
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-editorial hover:scale-[1.03]"
              />
            </div>
          </div>

          <div>
            <p className="eyebrow mb-3">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="text-[1.294646rem] leading-tight text-ink sm:text-[1.456476rem]">
              {item.name}
            </h3>
            <p className="mt-3 max-w-measure text-muted">{item.description}</p>

            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              <li className="eyebrow text-muted">{item.category}</li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-6">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1.5 text-[0.863097rem]"
              >
                {item.linkLabel}
                <ArrowUpRight size={13} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

export default Miscellaneous;
