import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import IntroVideo from './IntroVideo';
import SkyTransition from './SkyTransition';
import LogoReveal from './LogoReveal';

export default function IntroExperience({ onComplete, isReplay = false }) {
  // Intro Phases: 'video' -> 'sky' -> 'logo' -> 'revealing' -> 'done'
  const [phase, setPhase] = useState('video');
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef(null);

  // Transition from video into sky
  const handleVideoReachSky = useCallback(() => {
    if (phase !== 'video') return;
    setPhase('sky');

    // 1. Crossfade video out smoothly
    setVideoOpacity(0);

    // 2. Introduce the logo reveal shortly after sky fills the screen
    setTimeout(() => {
      setPhase('logo');
    }, 500);
  }, [phase]);

  // When Logo entrance finishes, hold briefly then seamlessly reveal the website
  const handleLogoEntranceComplete = useCallback(() => {
    // Hold the logo in center for 1.2s, then gracefully crossfade into the website
    setTimeout(() => {
      setPhase('revealing');
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.4,
          ease: 'power2.inOut',
          onComplete: () => {
            setPhase('done');
            if (onComplete) onComplete();
          },
        });
      } else {
        setPhase('done');
        if (onComplete) onComplete();
      }
    }, 1200);
  }, [onComplete]);

  // Skip Intro directly
  const handleSkip = useCallback(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          setPhase('done');
          if (onComplete) onComplete();
        },
      });
    } else {
      setPhase('done');
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  if (phase === 'done') {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 w-full h-full overflow-hidden select-none bg-botanical-dark"
    >
      {/* 1. Underlying Sky Transition (always rendered underneath, emerges as video fades) */}
      <SkyTransition opacity={phase === 'video' ? (1 - videoOpacity) : 1} />

      {/* 2. Fullscreen Intro Video */}
      <div
        className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out"
        style={{ opacity: videoOpacity, pointerEvents: phase === 'video' ? 'auto' : 'none' }}
      >
        <IntroVideo
          onVideoReachSky={handleVideoReachSky}
          onSkip={handleSkip}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
      </div>

      {/* 3. Centered Logo Reveal */}
      {(phase === 'logo' || phase === 'revealing') && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <LogoReveal
            isVisible={phase === 'logo' || phase === 'revealing'}
            onAnimationComplete={handleLogoEntranceComplete}
          />
        </div>
      )}
    </div>
  );
}
