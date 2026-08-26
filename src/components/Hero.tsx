import React from 'react';
import { ArrowDown } from 'lucide-react';
import SectionLink from './SectionLink';

const Hero: React.FC = () => (
  <section id="hero" className="mx-auto max-w-page px-6 sm:px-10">
    <div className="flex min-h-[88vh] flex-col justify-center pb-20 pt-32 sm:pt-40">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
        <div>
          <h1 className="font-serif text-display" data-reveal>
            raila
          </h1>

          <p
            className="mt-6 max-w-measure text-[0.848251rem] italic text-muted sm:text-[0.969431rem]"
            data-reveal
            style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
          >
            Driven, Curious and Creative.
          </p>

          <div
            className="mt-14"
            data-reveal
            style={{ '--reveal-delay': '360ms' } as React.CSSProperties}
          >
            <SectionLink
              sectionId="about"
              className="group inline-flex items-center gap-3 text-muted transition-colors duration-300 hover:text-ink"
            >
              <span className="eyebrow">explore work</span>
              <ArrowDown
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-editorial group-hover:translate-y-1"
              />
            </SectionLink>
          </div>
        </div>

        {/* Set as a marginal note: the quote frames the work without competing
            with the name for attention. */}
        <figure
          className="border-t border-rule pt-6 lg:mt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          data-reveal
          style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
        >
          <blockquote className="text-[0.844213rem] leading-relaxed text-ink">
            “Once a computer achieves a human level, it will necessarily soar past it.”
          </blockquote>
          <figcaption className="mt-4 text-[0.646287rem] italic text-muted">
            Ray Kurzweil, <cite className="not-italic">The Singularity Is Near</cite> (2005)
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
);

export default Hero;
