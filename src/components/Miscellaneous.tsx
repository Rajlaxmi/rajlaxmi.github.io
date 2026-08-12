import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section';

interface MiscLink {
  label: string;
  href: string;
}

interface MiscItem {
  name: string;
  description: string;
  category: string;
  links: MiscLink[];
  image: string;
}

const miscItems: MiscItem[] = [
  {
    name: 'Women in Frontier AI',
    description: 'A community supporting women working in frontier AI research and engineering.',
    category: 'Founder',
    links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/women-in-frontier-ai/' }],
    image: '/women-in-frontier-ai-agi-house.jpg',
  },
  {
    name: 'Photography',
    description: 'Nature and geography aficionado, capturing the best landscapes and light.',
    category: 'Hobby',
    links: [
      { label: 'Gallery', href: 'https://raila83.mypixieset.com/' },
      { label: 'Instagram', href: 'https://www.instagram.com/raila.snapshots/' },
    ],
    image: '/photography-rainbow.jpg',
  },
];

const Miscellaneous: React.FC = () => (
  <Section
    id="misc"
    index="05"
    label="miscellaneous"
    lead="Pursuits that live alongside the work."
  >
    <ol className="mt-14 space-y-16 sm:space-y-24">
      {miscItems.map((item, index) => (
        <li
          key={item.name}
          className={`grid items-center gap-8 md:gap-12 ${
            index % 2 === 1 ? 'md:grid-cols-[2fr_3fr]' : 'md:grid-cols-[3fr_2fr]'
          }`}
          data-reveal
        >
          <div
            className={`overflow-hidden border border-rule bg-surface ${
              index % 2 === 1 ? 'md:order-2' : ''
            }`}
          >
            <div className="aspect-[4/3]">
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
            <h3 className="text-[1.165181rem] leading-tight text-ink sm:text-[1.310828rem]">
              {item.name}
            </h3>
            <p className="mt-3 max-w-measure text-muted">{item.description}</p>

            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              <li className="eyebrow text-muted">{item.category}</li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-6">
              {item.links.map((linkItem) => (
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
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

export default Miscellaneous;
