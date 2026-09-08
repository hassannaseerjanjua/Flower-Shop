import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Volume2, VolumeX, Sparkles, ArrowDown } from 'lucide-react';
import SkyTransition from './SkyTransition';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 141;

// Helper to format frame path: /frames/frame_0001.webp
const getFrameUrl = (index) => {
  const padded = String(index + 1).padStart(4, '0');
  return `/frames/frame_${padded}.webp`;
};

// Helper for drawing image with object-fit: cover on high-DPI canvas
function drawCoverImage(ctx, img, canvasWidth, canvasHeight) {
  if (!img || !img.complete || img.naturalWidth === 0) return;
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  const ratio = Math.max(canvasWidth / imgW, canvasHeight / imgH);
  const newW = imgW * ratio;
  const newH = imgH * ratio;
  const offsetX = (canvasWidth - newW) / 2;
  const offsetY = (canvasHeight - newH) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, 0, 0, imgW, imgH, offsetX, offsetY, newW, newH);
}

export default function ScrollIntroExperience({ onExploreClick }) {
  const containerRef = useRef(null);
  const pinWrapRef = useRef(null);
  const canvasRef = useRef(null);
  const logoWrapRef = useRef(null);
  const promptRef = useRef(null);
  const initialTitleRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Cached image array
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);

  // 1. Preload image sequence into memory for instant, zero-lag canvas scrubbing
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    // Preload first frame immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      // Draw first frame right away so viewport is instantly populated
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawCoverImage(ctx, firstImg, canvas.width, canvas.height);
      }
    };
    images.push(firstImg);

    // Preload remaining frames in parallel
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= Math.min(20, TOTAL_FRAMES - 1)) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  // 2. Render function for drawing the active frame
  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];

    if (img && img.complete) {
      drawCoverImage(ctx, img, canvas.width, canvas.height);
      currentFrameRef.current = index;
    } else {
      // Fallback: draw nearest loaded frame to prevent black flash
      for (let offset = 1; offset <= 10; offset++) {
        const prev = imagesRef.current[Math.max(0, index - offset)];
        if (prev && prev.complete) {
          drawCoverImage(ctx, prev, canvas.width, canvas.height);
          break;
        }
      }
    }
  }, []);

  // 3. Handle window resize for canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // 4. GSAP ScrollTrigger Setup
  useEffect(() => {
    const container = containerRef.current;
    const pinWrap = pinWrapRef.current;
    if (!container || !pinWrap) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=2600', // 2600px of responsive, zero-lag scroll distance
        pin: pinWrap,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Calculate frame index based on scroll progress (0 to 140)
          const targetIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(p * (TOTAL_FRAMES - 1)))
          );

          if (targetIndex !== currentFrameRef.current) {
            renderFrame(targetIndex);
          }

          // Initial Title & Scroll Prompt fade out quickly (0% to 15% scroll)
          if (initialTitleRef.current) {
            const titleOpacity = Math.max(0, 1 - p * 6);
            initialTitleRef.current.style.opacity = titleOpacity;
            initialTitleRef.current.style.transform = `translateY(${p * -40}px)`;
          }

          if (promptRef.current) {
            const promptOpacity = Math.max(0, 1 - p * 8);
            promptRef.current.style.opacity = promptOpacity;
          }

          // Logo Reveal entrance on sky (65% to 88% scroll)
          // Exact required specs: opacity: 0 -> 1, scale: 0.85 -> 1, y: 40px -> 0
          if (logoWrapRef.current) {
            if (p < 0.65) {
              logoWrapRef.current.style.opacity = '0';
              logoWrapRef.current.style.transform = 'translateY(40px) scale(0.85)';
            } else if (p >= 0.65 && p <= 0.88) {
              const logoT = (p - 0.65) / 0.23; // 0 to 1
              // Cinematic power3.out easing curve
              const eased = 1 - Math.pow(1 - logoT, 3);
              const curScale = 0.85 + eased * 0.15;
              const curY = 40 * (1 - eased);

              logoWrapRef.current.style.opacity = eased.toString();
              logoWrapRef.current.style.transform = `translateY(${curY}px) scale(${curScale})`;
            } else {
              // Beyond 88%, hold logo crisp
              logoWrapRef.current.style.opacity = '1';
              logoWrapRef.current.style.transform = 'translateY(0px) scale(1)';
            }
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [renderFrame]);

  // Calculate sky overlay opacity:
  // Starts appearing around frame 95-105 (approx 68% scroll), fully luminous by 82%
  const skyOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.68) / 0.16));

  const handleSkipIntro = () => {
    const heroTarget = document.querySelector('#hero');
    if (heroTarget) {
      heroTarget.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-botanical-dark select-none"
      style={{ height: '3600px' }} // Provides the scroll space for the pin
    >
      {/* Pinned Viewport Container */}
      <div 
        ref={pinWrapRef} 
        className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-botanical-dark"
      >
        {/* 1. High-Performance HTML5 Canvas Scrubber (Zero-Lag Apple-style image sequence) */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block will-change-transform"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/30" />

        {/* 2. Seamless Sky Hand-off Overlay (fades in as camera exits roof) */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none will-change-opacity transition-opacity duration-300"
          style={{ opacity: skyOpacity }}
        >
          <SkyTransition opacity={1} showSunBloom={true} />
        </div>

        {/* 3. Initial Hero Title Overlay (visible at 0% scroll, fades as user starts scrolling) */}
        <div 
          ref={initialTitleRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-dark text-champagne/90 text-[10px] tracking-[0.25em] uppercase font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Interactive Floral Odyssey</span>
          </div>

          <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl text-white font-light tracking-tight drop-shadow-lg">
            Bloom <span className="font-serif italic text-gold">&amp;</span> Co.
          </h1>

          <p className="text-xs sm:text-sm font-sans tracking-[0.3em] uppercase text-champagne/80 font-medium mt-2">
            Haute Floristerie &bull; Cotswolds Glasshouse
          </p>
        </div>

        {/* 4. Centered Logo Reveal (animates into center when sky fills viewport) */}
        <div
          ref={logoWrapRef}
          style={{ opacity: 0, transform: 'translateY(40px) scale(0.85)' }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-30"
        >
          {/* Botanical Emblem */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mb-6 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-gold/40 animate-spin" style={{ animationDuration: '40s' }} />
            <div className="absolute inset-1 rounded-full border border-botanical/20" />
            <img 
              src="/bloom-logo.svg" 
              alt="Bloom & Co. Emblem" 
              className="w-14 h-14 sm:w-16 sm:h-16 filter drop-shadow-md" 
            />
          </div>

          {/* Typography */}
          <h2 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl tracking-tight text-botanical-dark font-light leading-none mb-3">
            Bloom <span className="font-serif italic font-normal text-gold">&amp;</span> Co.
          </h2>

          <div className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent my-3" />

          <p className="text-xs sm:text-sm font-sans tracking-[0.35em] uppercase text-botanical/80 font-medium">
            Haute Floristerie &bull; Est. 2024
          </p>

          <p className="text-xs sm:text-sm font-serif italic text-botanical-muted mt-3">
            Nature&apos;s Beauty, Delivered to You
          </p>
        </div>

        {/* 5. Scroll Cue Prompt at Bottom Center */}
        <div 
          ref={promptRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-champagne/90 font-medium mb-2 drop-shadow">
            Scroll to Enter Cabin
          </span>
          <div className="w-7 h-11 rounded-full border-2 border-champagne/60 flex items-start justify-center p-1.5 shadow-md">
            <div className="w-1.5 h-2.5 bg-gold rounded-full animate-bounce" />
          </div>
        </div>

        {/* 6. Discreet Quick Skip Button */}
        <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
          <button
            onClick={handleSkipIntro}
            className="px-4 py-2 rounded-full glass-panel-dark text-champagne/90 hover:text-white hover:border-gold transition-all duration-300 flex items-center gap-2 text-xs tracking-widest uppercase font-medium shadow-luxury group"
            title="Jump directly to boutique collection"
          >
            <span>Skip to Shop</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
