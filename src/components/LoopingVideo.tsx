import React, { useEffect, useRef } from 'react';

interface LoopingVideoProps {
  src: string;
  className?: string;
}

/**
 * A decorative looping video that only plays while it is on screen — offscreen
 * clips are paused so the page is not decoding several videos at once. Visitors
 * who prefer reduced motion get the still first frame instead.
 */
const LoopingVideo: React.FC<LoopingVideoProps> = ({ src, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (typeof IntersectionObserver === 'undefined') {
      void video.play().catch(() => undefined);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Autoplay can be rejected (Low Power Mode, data saver); the poster
        // frame is an acceptable fallback, so swallow the rejection.
        if (entry.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.15 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default LoopingVideo;
