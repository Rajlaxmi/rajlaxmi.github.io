import React from 'react';
import LoopingVideo from './LoopingVideo';

const FADE = 'linear-gradient(to bottom, transparent, black 26%, black 64%, transparent)';

/**
 * A full-bleed interlude between the hero and the writing. The clip is masked
 * into the page at top and bottom so it reads as part of the paper rather than
 * a banner dropped on top of it.
 */
const BackgroundVideo: React.FC = () => (
  <section aria-hidden="true" className="overflow-hidden">
    <div
      className="h-[52vh] min-h-[280px] w-full sm:h-[64vh]"
      style={{ maskImage: FADE, WebkitMaskImage: FADE }}
    >
      <LoopingVideo
        src="/intelligence.mp4"
        className="h-full w-full object-cover opacity-80 contrast-[1.05] saturate-[0.55] dark:opacity-60"
      />
    </div>
  </section>
);

export default BackgroundVideo;
