import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section';

interface ContactLink {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

const contactLinks: ContactLink[] = [
  { label: 'Email', value: 'railasan.001@gmail.com', href: 'mailto:railasan.001@gmail.com' },
  {
    label: 'LinkedIn',
    value: 'in/railasan',
    href: 'https://www.linkedin.com/in/railasan',
    external: true,
  },
  { label: 'Twitter', value: '@raila_san', href: 'https://x.com/raila_san', external: true },
];

const Contact: React.FC = () => (
  <Section
    id="contact"
    index="06"
    label="contact"
    lead="Whether you're looking to discuss ideas, collaborate on a project or simply say hello, I'd love to hear from you. Every great creation begins with a conversation."
  >
    <ul className="mt-12 border-t border-rule">
      {contactLinks.map((link) => (
        <li key={link.label} data-reveal>
          <a
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-5"
          >
            <span className="eyebrow">{link.label}</span>
            <span className="flex items-center gap-2 text-[0.922435rem] text-ink transition-colors duration-300 group-hover:text-accent">
              {link.value}
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  </Section>
);

export default Contact;
