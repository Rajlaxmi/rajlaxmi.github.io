import React from 'react';
import { Link, useLocation, type LinkProps } from 'react-router-dom';

interface SectionLinkProps extends Omit<LinkProps, 'to'> {
  /** id of the home-page section this link should land on. */
  sectionId: string;
}

/**
 * Links to a section of the home page without HashRouter's doubled `#`
 * (`Link to="/#about"` renders as `/#/#about`). From the home page it
 * scrolls directly with no URL change; from anywhere else it navigates home
 * and Portfolio scrolls to the section once mounted, via router state.
 */
const SectionLink: React.FC<SectionLinkProps> = ({ sectionId, onClick, children, ...rest }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (isHome) {
      event.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Link to="/" state={{ scrollTo: sectionId }} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

export default SectionLink;
