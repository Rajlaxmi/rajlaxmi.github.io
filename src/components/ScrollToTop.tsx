import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restores scroll position to the top on every route change. Cross-page
 * links that target a home-page section (see SectionLink) scroll past this
 * via router state instead of a URL hash, once Portfolio mounts.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
