import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles, ArrowDown } from 'lucide-react';
import SkyTransition from './SkyTransition';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 141;

// Helper to format frame path: /frames/frame_0001.webp
const getFrameUrl = (index) => {
  const padded = String(index + 1).padStart(4, '0');
  return `/frames/frame_${padded}.webp`;
};

// High-DPI object-fit: cover canvas rendering
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

export default function ScrollIntroExperience({ onExploreClick, onIntroEndChange }) {
  const containerRef = useRef(null);
  const pinWrapRef = useRef(null);
  const canvasRef = useRef(null);
  const logoWrapRef = useRef(null);
  const promptRef = useRef(null);
  const initialTitleRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Cached image array
  const imagesRef = useRef([]);
  // Target frame from scroll vs smoothly interpolated display frame (Lazy Lerping)
  const targetFrameRef = useRef(0);
  const smoothFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);

  // 1. Lazy Chunked Image Preloading
  useEffect(() => {
    const images = new Array(TOTAL_FRAMES);

    // Immediate Priority: Load first 15 frames right away
    for (let i = 0; i < Math.min(15, TOTAL_FRAMES); i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      if (i === 0) {
        img.onload = () => {
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawCoverImage(ctx, img, canvas.width, canvas.height);
            lastDrawnFrameRef.current = 0;
          }
        };
      }
      images[i] = img;
    }

    // Lazy load remaining frames in small batches so main thread remains 100% fluid
    let nextIndex = 15;
    const loadBatch = () => {
      if (nextIndex >= TOTAL_FRAMES) return;
      const batchEnd = Math.min(nextIndex + 15, TOTAL_FRAMES);
      for (let j = nextIndex; j < batchEnd; j++) {
        const img = new Image();
        img.src = getFrameUrl(j);
        images[j] = img;
      }
      nextIndex = batchEnd;
      if (nextIndex < TOTAL_FRAMES) {
        setTimeout(loadBatch, 60);
      }
    };

    const timer = setTimeout(loadBatch, 100);
    imagesRef.current = images;

    return () => {
      clearTimeout(timer);
      imagesRef.current = [];
    };
  }, []);

  // 2. Render helper with nearest-frame fallback
  const drawFrameIndex = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    const img = images[index];
    if (img && img.complete && img.naturalWidth > 0) {
      drawCoverImage(ctx, img, canvas.width, canvas.height);
      lastDrawnFrameRef.current = index;
    } else {
      // Look for nearest loaded neighbor frame to avoid any flicker
      for (let offset = 1; offset <= 15; offset++) {
        const prev = images[Math.max(0, index - offset)];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          drawCoverImage(ctx, prev, canvas.width, canvas.height);
          break;
        }
      }
    }
  }, []);

  // 3. Lazy Frame Interpolation Loop (rAF Lerp)
  // Glides smoothly towards target frame with luxurious inertia
  useEffect(() => {
    let animId;

    const lazyRenderLoop = () => {
      const diff = targetFrameRef.current - smoothFrameRef.current;
      
      // Lazy lerp coefficient (0.12 = smooth cinematic crane inertia)
      if (Math.abs(diff) > 0.05) {
        smoothFrameRef.current += diff * 0.12;
        const frameToDraw = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(smoothFrameRef.current))
        );

        if (frameToDraw !== lastDrawnFrameRef.current) {
          drawFrameIndex(frameToDraw);
        }
      }

      animId = requestAnimationFrame(lazyRenderLoop);
    };

    animId = requestAnimationFrame(lazyRenderLoop);
    return () => cancelAnimationFrame(animId);
  }, [drawFrameIndex]);

  // 4. Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrameIndex(Math.round(smoothFrameRef.current));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrameIndex]);

  // 5. GSAP ScrollTrigger with Lazy Momentum Scrubbing
  useEffect(() => {
    const container = containerRef.current;
    const pinWrap = pinWrapRef.current;
    if (!container || !pinWrap) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=3000', // Generous lazy travel distance
        pin: pinWrap,
        scrub: 1.2, // Lazy 1.2s smooth momentum damping
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Update target frame for lazy lerp loop
          targetFrameRef.current = p * (TOTAL_FRAMES - 1);

          // Initial Title & Scroll Prompt fade out gently (0% to 18% scroll)
          if (initialTitleRef.current) {
            const titleOpacity = Math.max(0, 1 - p * 5.5);
            initialTitleRef.current.style.opacity = titleOpacity;
            initialTitleRef.current.style.transform = `translateY(${p * -45}px)`;
          }

          if (promptRef.current) {
            const promptOpacity = Math.max(0, 1 - p * 7);
            promptRef.current.style.opacity = promptOpacity;
          }

          // Logo Reveal entrance on sky (66% to 88% scroll)
          // Exact required specs: opacity: 0 -> 1, scale: 0.85 -> 1, y: 40px -> 0
          if (logoWrapRef.current) {
            if (p < 0.66) {
              logoWrapRef.current.style.opacity = '0';
              logoWrapRef.current.style.transform = 'translateY(40px) scale(0.85)';
            } else if (p >= 0.66 && p <= 0.88) {
              const logoT = (p - 0.66) / 0.22; // 0 to 1
              // Cinematic power3.out lazy easing curve
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

          // Notify whether intro flight has concluded (at or beyond 88% scroll)
          if (onIntroEndChange) {
            onIntroEndChange(p >= 0.88);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, [onIntroEndChange]);

  // Sky overlay: emerges as camera tilts through roof into sky (approx 68% to 82% scroll)
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
      style={{ height: '4000px' }} // Ample room for lazy, weighted scroll
    >
      {/* Pinned Viewport Container */}
      <div 
        ref={pinWrapRef} 
        className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-botanical-dark"
      >
        {/* 1. High-Performance HTML5 Canvas with Lazy Frame Lerping */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block will-change-transform"
        />

        {/* Cinematic Atmospheric Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/30" />

        {/* 2. Seamless Sky Hand-off Overlay */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none will-change-opacity transition-opacity duration-300"
          style={{ opacity: skyOpacity }}
        >
          <SkyTransition opacity={1} showSunBloom={true} />
        </div>

        {/* 3. Initial Hero Title Overlay */}
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

        {/* 4. Centered Logo Reveal (emerges on sky) */}
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

          {/* Brand Typography */}
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

        {/* 7. Subtle Scroll Progress Bar (Top) */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 z-30">
          <div 
            className="h-full bg-gold transition-all duration-150"
            style={{ width: `${Math.min(100, scrollProgress * 100)}%` }}
          />
        </div>

      </div>
    </div>
  );
}
