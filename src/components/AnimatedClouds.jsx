import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedClouds({ isParting = false, onPartingComplete }) {
  const leftCloudsRef = useRef(null);
  const rightCloudsRef = useRef(null);
  const containerRef = useRef(null);

  // When parting becomes true, GSAP animates clouds towards edges
  useEffect(() => {
    if (!isParting) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onPartingComplete) onPartingComplete();
        },
      });

      tl.to(leftCloudsRef.current, {
        x: -300,
        opacity: 0,
        duration: 2.2,
        ease: 'power2.inOut',
      }, 0);

      tl.to(rightCloudsRef.current, {
        x: 300,
        opacity: 0,
        duration: 2.2,
        ease: 'power2.inOut',
      }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, [isParting, onPartingComplete]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-10"
    >
      {/* ================= 1. DISTANT CLOUD LAYER (Slow, high altitude, soft haze) ================= */}
      <div className="absolute inset-0 opacity-60">
        {/* Distant Cloud A (Left drifting) */}
        <div className="absolute top-[8%] left-[-10%] w-[120%] animate-drift-slow opacity-75">
          <svg viewBox="0 0 1200 350" fill="none" className="w-full h-auto filter blur-[20px]">
            <path
              d="M 100 200 Q 200 120, 380 160 Q 520 80, 700 130 Q 860 70, 1000 150 Q 1100 130, 1150 220 Q 950 260, 600 250 Q 300 270, 100 200 Z"
              fill="url(#distantCloudGrad)"
            />
            <defs>
              <linearGradient id="distantCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#f5f9fd" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#dcebf8" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Distant Cloud B (Right side drift) */}
        <div className="absolute top-[18%] right-[-15%] w-[110%] animate-drift-medium opacity-65">
          <svg viewBox="0 0 1000 280" fill="none" className="w-full h-auto filter blur-[24px]">
            <path
              d="M 80 180 Q 220 100, 420 120 Q 580 70, 760 110 Q 880 90, 960 170 Q 750 220, 500 210 Q 250 230, 80 180 Z"
              fill="url(#distantCloudGrad2)"
            />
            <defs>
              <linearGradient id="distantCloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#cbe1f4" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* ================= 2. MIDDLE CLOUD LAYER (Parting group) ================= */}
      {/* Left Clouds Cluster */}
      <div ref={leftCloudsRef} className="absolute inset-0 w-full h-full">
        {/* Mid-Left Cloud */}
        <div className="absolute top-[22%] -left-[15%] w-[75vw] max-w-[950px] animate-float-gentle">
          <svg viewBox="0 0 800 380" fill="none" className="w-full h-auto filter blur-[14px]">
            <g opacity="0.92">
              <ellipse cx="280" cy="220" rx="200" ry="90" fill="#ffffff" />
              <ellipse cx="420" cy="180" rx="170" ry="100" fill="#ffffff" />
              <ellipse cx="560" cy="210" rx="150" ry="85" fill="#f6faff" />
              <ellipse cx="360" cy="150" rx="130" ry="75" fill="#ffffff" />
              <ellipse cx="210" cy="240" rx="140" ry="70" fill="#eef6fd" />
            </g>
          </svg>
        </div>

        {/* Lower Left Fluffy Cloud */}
        <div className="absolute bottom-[5%] -left-[10%] w-[80vw] max-w-[1050px]">
          <svg viewBox="0 0 900 420" fill="none" className="w-full h-auto filter blur-[16px]">
            <g opacity="0.88">
              <ellipse cx="350" cy="260" rx="240" ry="110" fill="#ffffff" />
              <ellipse cx="550" cy="230" rx="200" ry="115" fill="#ffffff" />
              <ellipse cx="440" cy="180" rx="160" ry="90" fill="#ffffff" />
              <ellipse cx="200" cy="280" rx="170" ry="80" fill="#e8f3fc" />
            </g>
          </svg>
        </div>
      </div>

      {/* Right Clouds Cluster */}
      <div ref={rightCloudsRef} className="absolute inset-0 w-full h-full">
        {/* Mid-Right Cloud */}
        <div className="absolute top-[15%] -right-[15%] w-[80vw] max-w-[1000px] animate-float-gentle" style={{ animationDelay: '-3s' }}>
          <svg viewBox="0 0 850 400" fill="none" className="w-full h-auto filter blur-[14px]">
            <g opacity="0.94">
              <ellipse cx="500" cy="210" rx="220" ry="105" fill="#ffffff" />
              <ellipse cx="320" cy="190" rx="180" ry="100" fill="#ffffff" />
              <ellipse cx="400" cy="140" rx="140" ry="80" fill="#ffffff" />
              <ellipse cx="640" cy="230" rx="160" ry="90" fill="#f4f9fe" />
            </g>
          </svg>
        </div>

        {/* Lower Right Cloud */}
        <div className="absolute bottom-[2%] -right-[12%] w-[85vw] max-w-[1100px]">
          <svg viewBox="0 0 950 450" fill="none" className="w-full h-auto filter blur-[18px]">
            <g opacity="0.90">
              <ellipse cx="550" cy="270" rx="260" ry="120" fill="#ffffff" />
              <ellipse cx="350" cy="240" rx="210" ry="110" fill="#ffffff" />
              <ellipse cx="460" cy="190" rx="170" ry="95" fill="#ffffff" />
              <ellipse cx="720" cy="280" rx="180" ry="90" fill="#eaf4fc" />
            </g>
          </svg>
        </div>
      </div>

      {/* ================= 3. FOREGROUND WISPS (Ultra soft, atmospheric depth) ================= */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none opacity-50 filter blur-[35px]">
        <div className="w-full h-full bg-gradient-to-t from-white via-white/70 to-transparent" />
      </div>
    </div>
  );
}
