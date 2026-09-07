import React from 'react';

export default function SkyTransition({ opacity = 1, showSunBloom = true }) {
  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ease-out select-none pointer-events-none"
      style={{ opacity }}
    >
      {/* Sky atmospheric gradient matching the end frame of the video */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#4b91d1] via-[#85bfe8] to-[#d6ecfa]" />

      {/* Sun glow & radiant atmospheric haze */}
      {showSunBloom && (
        <>
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,252,240,0.6) 35%, rgba(214,236,250,0) 75%)',
              filter: 'blur(30px)',
            }}
          />
          {/* Subtle light shafts / bloom */}
          <div 
            className="absolute inset-0 bg-radial-at-c from-white/30 via-white/10 to-transparent pointer-events-none" 
            style={{ mixBlendMode: 'overlay' }}
          />
        </>
      )}

      {/* Warm horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-ivory-100/90 via-ivory-100/40 to-transparent" />
    </div>
  );
}
