import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restores scroll position on navigation. A route with a hash (`/#about`)
 * scrolls that section into view instead of jumping to the top, which is what
 * makes the header nav work from the article and influences pages too.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    // The target section may not have mounted yet on a cross-page navigation.
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
