import React from 'react';

interface SectionProps {
  id: string;
  /** Rail label, e.g. "about". Doubles as the section's accessible heading. */
  label: string;
  /** Rail counter, e.g. "01". */
  index: string;
  /** Optional large opening line, set in the lead type size. */
  lead?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * The page's structural unit: a sticky counter/label rail on the left and the
 * content column on the right. Sections are separated by a single hairline —
 * no cards, no shadows — which is what gives the site its editorial feel.
 */
const Section: React.FC<SectionProps> = ({ id, label, index, lead, children, className = '' }) => (
  <section id={id} className={`border-t border-rule ${className}`}>
    <div className="mx-auto max-w-page px-6 sm:px-10">
      <div className="grid gap-8 py-20 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-14 md:py-28 lg:grid-cols-[11rem_minmax(0,1fr)]">
        <div className="md:sticky md:top-28 md:self-start" data-reveal>
          <h2 className="eyebrow flex items-baseline gap-3 md:flex-col md:gap-2">
            <span className="text-accent">{index}</span>
            <span>{label}</span>
          </h2>
        </div>

        <div className="min-w-0">
          {lead && (
            <p
              className="max-w-[38rem] text-[1.255829rem] leading-[1.5] text-ink sm:text-[1.369995rem]"
              data-reveal
            >
              {lead}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  </section>
);

export default Section;
