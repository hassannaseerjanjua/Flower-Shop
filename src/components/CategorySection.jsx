import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CategorySection({ onSelectCategory }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for category cards
      gsap.fromTo(
        cardsRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="shop-categories" 
      ref={sectionRef} 
      className="py-24 sm:py-32 bg-ivory-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-gold font-semibold">
              Curated Flora Portfolios
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-botanical-dark font-light mt-3 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm sm:text-base text-botanical/70 font-sans max-w-md">
            Explore our curated arrangements, thoughtfully sculpted for intimacy, grandeur, and enduring memories.
          </p>
        </div>

        {/* 5 Category Cards Grid: 2 columns on top, 3 columns below, or dynamic bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, index) => {
            // Give the first two categories slightly larger editorial prominence
            const isWide = index === 0 || index === 1;

            return (
              <div
                key={cat.id}
                ref={(el) => (cardsRef.current[index] = el)}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative rounded-3xl sm:rounded-[2rem] overflow-hidden cursor-pointer shadow-luxury hover:shadow-luxury-hover transition-all duration-700 ${
                  isWide ? 'md:col-span-1 lg:col-span-1 min-h-[380px] sm:min-h-[440px]' : 'min-h-[380px] sm:min-h-[440px]'
                }`}
              >
                {/* Background Image with subtle hover zoom */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />

                {/* Gradient scrim for readable text overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-botanical-dark/85 via-botanical-dark/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                {/* Category Tag (Top Right) */}
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1.5 rounded-full glass-panel-dark text-white/90 text-[10px] tracking-[0.2em] uppercase font-medium">
                    {cat.tag}
                  </span>
                </div>

                {/* Category Details & Overlay Text (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end">
                  <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-gold-light mb-1">
                    {cat.count}
                  </span>

                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-white group-hover:text-gold-light transition-colors">
                      {cat.name}
                    </h3>
                    <div className="w-10 h-10 rounded-full glass-panel-dark flex items-center justify-center text-white group-hover:bg-gold group-hover:text-botanical-dark transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-white/75 font-sans mt-2 line-clamp-2 max-w-xs transition-opacity duration-300">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
