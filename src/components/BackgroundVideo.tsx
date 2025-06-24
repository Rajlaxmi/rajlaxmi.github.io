import React from 'react';

const BackgroundVideo: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/intelligence.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 text-center text-white p-4">
        {/* You can add any overlay content here if you want */}
      </div>
    </section>
  );
};

export default BackgroundVideo; 