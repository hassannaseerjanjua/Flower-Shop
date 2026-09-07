import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Droplets, Feather, Flower2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Sun,
      title: 'Solar Glasshouse Cultivation',
      description: 'Grown under natural sunlit skylights with zero chemical forced blooms, honoring biological rhythms.',
    },
    {
      icon: Droplets,
      title: 'Dewpoint Morning Harvest',
      description: 'Cut before dawn while stems are saturated with nocturnal sugars and cool forest moisture.',
    },
    {
      icon: Feather,
      title: 'Artisanal Hand-Tied Craft',
      description: 'Every stem placed with mindful intention, wrapped in untreated linen and botanical paper.',
    },
    {
      icon: Flower2,
      title: 'Zero Single-Use Plastics',
      description: 'Preserved with water-sponge bio-gels and recycled brass pins that nourish the soil when retired.',
    },
  ];

  return (
    <section 
      id="about-section" 
      ref={sectionRef} 
      className="py-24 sm:py-36 bg-ivory-200/50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with layered styling */}
          <div ref={imageRef} className="lg:col-span-6 relative">
            <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-botanical/10 aspect-[4/5]">
              <img
                src="/images/cat_arrangements.jpg"
                alt="Artisanal arrangement inside glasshouse"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-botanical-dark/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-serif italic text-xl sm:text-2xl text-white font-light leading-snug">
                  &ldquo;We don&apos;t just sell flowers; we capture the transient poetry of morning light through glass.&rdquo;
                </p>
                <p className="text-xs uppercase tracking-[0.25em] text-gold font-medium mt-3">
                  Aura Vance &bull; Master Florist
                </p>
              </div>
            </div>

            {/* Subtle decorative stamp */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-gold/40 flex items-center justify-center p-2 hidden sm:flex bg-ivory-100/90 backdrop-blur-md shadow-md animate-spin" style={{ animationDuration: '30s' }}>
              <span className="text-[8px] font-sans uppercase tracking-[0.2em] text-botanical-dark text-center font-bold">
                Bloom &bull; Glasshouse &bull; Certified &bull;
              </span>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div ref={textRef} className="lg:col-span-6 flex flex-col">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-gold font-semibold">
              The Bloom Philosophy
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-botanical-dark font-light mt-3 tracking-tight leading-[1.12]">
              A Sanctuary of <br />
              <span className="italic font-serif text-gold">Sensorial</span> Botanicals
            </h2>

            <p className="text-sm sm:text-base text-botanical/80 font-sans mt-6 leading-relaxed">
              Founded within an 18th-century timber conservatory nestled in the rolling Cotswolds, Bloom &amp; Co. was conceived as an antidote to disposable floristry. We celebrate the organic geometry, unruly tendrils, and intoxicating natural perfumes that only slow glasshouse cultivation can foster.
            </p>

            <p className="text-sm sm:text-base text-botanical/80 font-sans mt-4 leading-relaxed">
              When our camera glides through the flower cabin and ascends towards the open sky, it embodies our creed: elevating humble earth into boundless celestial beauty.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 pt-8 border-t border-botanical/10">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="flex flex-col">
                    <div className="w-9 h-9 rounded-full bg-botanical/5 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <h4 className="font-serif-luxury text-lg text-botanical-dark font-medium">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-botanical/70 font-sans mt-1 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
