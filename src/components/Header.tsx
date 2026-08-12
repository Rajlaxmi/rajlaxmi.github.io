import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionLink from './SectionLink';

const NAV_ITEMS = [
  { id: 'about', label: 'about' },
  { id: 'blog', label: 'writing' },
  { id: 'projects', label: 'projects' },
  { id: 'influences', label: 'influences' },
  { id: 'misc', label: 'miscellaneous' },
  { id: 'contact', label: 'contact' },
];

interface HeaderProps {
  /** Section id currently in view; only meaningful on the portfolio page. */
  activeSection?: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile overlay, and let Escape dismiss it.
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          isScrolled || isMenuOpen
            ? 'border-b border-rule bg-paper/85 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-page items-center justify-between px-6 py-4 sm:px-10">
          <Link
            to="/"
            className="text-[0.907871rem] tracking-[0.02em] text-ink transition-colors duration-300 hover:text-accent"
          >
            raila
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:block" aria-label="Sections">
              <ul className="flex items-center gap-7">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <SectionLink
                        sectionId={item.id}
                        aria-current={isActive ? 'true' : undefined}
                        className={`text-[0.854466rem] transition-colors duration-300 hover:text-accent ${
                          isActive
                            ? 'text-ink underline decoration-accent decoration-1 underline-offset-[6px]'
                            : 'text-muted'
                        }`}
                      >
                        {item.label}
                      </SectionLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="eyebrow text-muted transition-colors duration-300 hover:text-accent md:hidden"
            >
              {isMenuOpen ? 'close' : 'menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="fixed inset-0 z-40 bg-paper px-6 pt-24 md:hidden"
      >
        <nav aria-label="Sections">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="border-b border-rule">
                <SectionLink
                  sectionId={item.id}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-4 text-[1.201594rem] text-ink transition-colors duration-300 hover:text-accent"
                >
                  {item.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
