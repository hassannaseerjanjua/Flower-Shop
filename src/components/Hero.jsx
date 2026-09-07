import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Hero({ onExploreClick, onShopClick }) {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const floatingCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.2 }
      );

      tl.fromTo(
        subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.8'
      );

      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.6'
      );

      tl.fromTo(
        imageRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'power2.out' },
        0.1
      );

      tl.fromTo(
        floatingCardRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        '-=0.8'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef} 
      className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-24 sm:pt-28 pb-16 overflow-hidden bg-ivory-100"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-gold-light/20 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-botanical-sage/10 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Editorial Typography & CTAs */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col z-10">
            {/* Curated Moniker Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ivory-200/80 border border-botanical/10 w-fit mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-botanical-dark">
                Haute Floristerie Atelier
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl font-light text-botanical-dark leading-[1.08] tracking-tight mb-6"
            >
              Nature&apos;s Beauty, <br />
              <span className="italic font-serif text-gold font-normal">Delivered</span> to You
            </h1>

            {/* Supporting Subtext */}
            <p
              ref={subtextRef}
              className="text-base sm:text-lg text-botanical/80 font-sans font-normal leading-relaxed max-w-lg mb-8"
            >
              Fresh flowers, thoughtfully arranged for life&apos;s most beautiful moments. From sunlit glasshouses to your sanctuary.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <button
                onClick={onShopClick}
                className="px-8 py-4 rounded-full bg-botanical text-champagne hover:bg-botanical-dark transition-all duration-300 shadow-luxury hover:shadow-luxury-hover flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-8 py-4 rounded-full bg-transparent border border-botanical/30 text-botanical hover:border-botanical hover:bg-botanical/5 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium"
              >
                <span>Explore Flowers</span>
                <Compass className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* Pillar badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-botanical/10">
              <div>
                <p className="font-serif-luxury text-2xl font-light text-botanical-dark">100%</p>
                <p className="text-[11px] uppercase tracking-wider text-botanical-muted font-medium mt-0.5">Farm Fresh Cut</p>
              </div>
              <div>
                <p className="font-serif-luxury text-2xl font-light text-botanical-dark">24h</p>
                <p className="text-[11px] uppercase tracking-wider text-botanical-muted font-medium mt-0.5">Glasshouse Delivery</p>
              </div>
              <div>
                <p className="font-serif-luxury text-2xl font-light text-botanical-dark">Bespoke</p>
                <p className="text-[11px] uppercase tracking-wider text-botanical-muted font-medium mt-0.5">Hand-Tied Stems</p>
              </div>
            </div>
          </div>

          {/* Right: Sunlit Cabin Masterpiece */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-botanical/10 aspect-[4/3] sm:aspect-[16/11] group">
              <img
                ref={imageRef}
                src="/images/hero_cabin.jpg"
                alt="Sunlit Flower Cabin Conservatory"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Gentle interior sun gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-botanical-dark/40 via-transparent to-transparent pointer-events-none" />

              {/* Tag inside image */}
              <div className="absolute bottom-6 left-6 z-10">
                <span className="px-3.5 py-1.5 rounded-full glass-panel-dark text-white text-[10px] tracking-[0.25em] uppercase font-medium">
                  The Bloom Glasshouse &bull; Cotswolds
                </span>
              </div>
            </div>

            {/* Floating Luxury Editorial Card */}
            <div
              ref={floatingCardRef}
              className="absolute -bottom-6 -left-4 sm:-left-8 sm:-bottom-8 glass-panel p-5 rounded-2xl max-w-[280px] sm:max-w-xs shadow-luxury hidden sm:block"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold tracking-wider text-botanical-dark uppercase">Artisanal Floristry</h4>
                  <p className="text-[10px] text-botanical-muted">Hand-arranged by master botanists</p>
                </div>
              </div>
              <p className="text-xs text-botanical/80 italic font-serif leading-relaxed">
                &ldquo;Every bloom carries the scent of dawn in the conservatory.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
