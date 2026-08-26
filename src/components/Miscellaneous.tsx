import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
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
    <ol className="mt-10 space-y-10 sm:space-y-14">
      {miscItems.map((item, index) => (
        <li
          key={item.name}
          className={`group grid items-center gap-6 md:gap-10 ${
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
            <p className="eyebrow mb-2">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="text-[0.969431rem] leading-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-[1.090608rem]">
              {item.name}
            </h3>
            <p className="mt-2 max-w-measure text-muted">{item.description}</p>

            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              <li className="eyebrow text-muted">{item.category}</li>
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-6">
              {item.links.map((linkItem) => (
                <a
                  key={linkItem.label}
                  href={linkItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-accent inline-flex items-center gap-1.5 text-[0.646287rem]"
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

    <p className="mt-8" data-reveal>
      <Link
        to="/misc"
        className="group inline-flex items-center gap-3 text-muted transition-colors duration-300 hover:text-ink"
      >
        <span className="eyebrow">all misc</span>
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform duration-500 ease-editorial group-hover:translate-x-1"
        />
      </Link>
    </p>
  </Section>
);

export default Miscellaneous;
