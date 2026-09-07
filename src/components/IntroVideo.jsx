import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, FastForward } from 'lucide-react';

export default function IntroVideo({ onVideoReachSky, onSkip, isMuted, setIsMuted }) {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const triggeredSkyRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      // Attempt autoplay
      video.play().catch((err) => {
        console.warn("Autoplay muted fallback:", err);
      });
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      // The video exits the roof around 80-85% of duration or when 1s remains
      const timeRemaining = video.duration - video.currentTime;
      if (timeRemaining <= 1.2 && !triggeredSkyRef.current) {
        triggeredSkyRef.current = true;
        onVideoReachSky();
      }
    };

    const handleEnded = () => {
      if (!triggeredSkyRef.current) {
        triggeredSkyRef.current = true;
        onVideoReachSky();
      }
    };

    const handleError = (e) => {
      console.warn("Video failed to load, gracefully falling back to sky transition", e);
      setHasError(true);
      // Fallback gracefully so the website isn't blocked
      setTimeout(() => {
        onVideoReachSky();
      }, 1500);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [onVideoReachSky]);

  // Update muted state if toggled
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-botanical-dark select-none pointer-events-auto">
      {/* Background / Poster until video is ready */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ backgroundImage: `url('/images/hero_cabin.jpg')` }}
      />

      {/* Main Intro Video */}
      <video
        ref={videoRef}
        src="/scene.mp4"
        poster="/images/hero_cabin.jpg"
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Subtle vignette for luxury cinematic contrast */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/30" />

      {/* Intro Experience Controls */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
        {/* Mute/Unmute Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="px-3.5 py-2 rounded-full glass-panel-dark text-champagne/90 hover:text-white hover:border-gold transition-all duration-300 flex items-center gap-2 text-xs tracking-wider uppercase font-medium shadow-luxury"
          title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          aria-label={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isMuted ? "Sound Off" : "Sound On"}</span>
        </button>

        {/* Skip Intro Button */}
        <button
          onClick={onSkip}
          className="px-4 py-2 rounded-full glass-panel-dark text-champagne/90 hover:text-white hover:border-gold transition-all duration-300 flex items-center gap-2 text-xs tracking-widest uppercase font-medium shadow-luxury group"
          title="Enter Bloom & Co. Storefront"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Brand Watermark during flight */}
      <div className="absolute top-8 left-8 z-30 pointer-events-none">
        <div className="flex items-center gap-3">
          <img src="/bloom-logo.svg" alt="Bloom & Co." className="w-8 h-8 opacity-80 filter invert brightness-200" />
          <span className="text-white/80 font-serif-luxury tracking-[0.25em] text-sm uppercase">
            Bloom &amp; Co.
          </span>
        </div>
      </div>
    </div>
  );
}
