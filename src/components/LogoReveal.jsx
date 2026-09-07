import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LogoReveal({ isVisible, onAnimationComplete }) {
  const containerRef = useRef(null);
  const emblemRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onAnimationComplete) onAnimationComplete();
        },
      });

      // Target the entire logo container with the exact requirements:
      // Start: opacity: 0, scale: 0.85, y: 40px
      // Animate to: opacity: 1, scale: 1, y: 0
      // Elegant cinematic easing curve
      tl.fromTo(
        containerRef.current,
        {
          opacity: 0,
          scale: 0.85,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.8,
          ease: 'power3.out',
        }
      );

      // Delicate stagger for internal typography elements
      tl.fromTo(
        emblemRef.current,
        { rotation: -15, filter: 'blur(8px)' },
        { rotation: 0, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out' },
        0.2
      );

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: 'power2.out' },
        0.6
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, letterSpacing: '0.1em' },
        { opacity: 1, letterSpacing: '0.35em', duration: 1.4, ease: 'power2.out' },
        0.8
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isVisible, onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      style={{ opacity: 0 }} // Initial hidden state before GSAP mounts
      className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-xl mx-auto select-none pointer-events-none"
    >
      {/* Botanical Luxury Emblem */}
      <div 
        ref={emblemRef}
        className="w-20 h-20 sm:w-24 sm:h-24 mb-6 relative flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full border border-gold/40 animate-spin" style={{ animationDuration: '40s' }} />
        <div className="absolute inset-1 rounded-full border border-botanical/20" />
        <img 
          src="/bloom-logo.svg" 
          alt="Bloom & Co. Emblem" 
          className="w-14 h-14 sm:w-16 sm:h-16 filter drop-shadow-md" 
        />
      </div>

      {/* Main Brand Name */}
      <h1 
        ref={titleRef}
        className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl tracking-tight text-botanical-dark font-light leading-none mb-3"
      >
        Bloom <span className="font-serif italic font-normal text-gold">&amp;</span> Co.
      </h1>

      {/* Gold Flourish Divider */}
      <div 
        ref={lineRef}
        className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent my-3 origin-center" 
      />

      {/* Brand Subtitle */}
      <p 
        ref={subtitleRef}
        className="text-xs sm:text-sm font-sans tracking-[0.35em] uppercase text-botanical/80 font-medium"
      >
        Haute Floristerie &bull; Est. 2024
      </p>
    </div>
  );
}
