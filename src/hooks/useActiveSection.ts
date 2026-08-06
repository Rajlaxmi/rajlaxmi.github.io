import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently under the header, so the nav can mark it.
 * Reads are batched into a rAF callback to keep the scroll handler cheap.
 */
const useActiveSection = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollY = window.scrollY;

      // Bottom of the page always resolves to the last section, which is often
      // too short to ever reach the top of the viewport on its own.
      if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollY + 120) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }

      setActiveSection(sectionIds[0]);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds]);

  return activeSection;
};

export default useActiveSection;
