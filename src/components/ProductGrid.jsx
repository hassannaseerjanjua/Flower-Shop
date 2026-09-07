import React, { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { SlidersHorizontal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProductGrid({
  selectedCategory,
  onSelectCategory,
  wishlist = [],
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) {
  const [sortBy, setSortBy] = useState('featured');
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const filterTabs = [
    { id: 'all', label: 'All Botanicals' },
    { id: 'bouquets', label: 'Bouquets' },
    { id: 'arrangements', label: 'Arrangements' },
    { id: 'wedding', label: 'Wedding Flowers' },
    { id: 'gift-sets', label: 'Gift Sets' },
    { id: 'plants', label: 'Living Plants' },
  ];

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...result].sort((a, b) => b.rating - a.rating);
      case 'featured':
      default:
        return result;
    }
  }, [selectedCategory, sortBy]);

  // GSAP Entrance animation
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.children;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory, sortBy]);

  return (
    <section 
      id="shop-products" 
      ref={sectionRef} 
      className="py-24 sm:py-32 bg-ivory-100 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Description */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-gold font-semibold">
            Seasonal Releases
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-botanical-dark font-light mt-3 tracking-tight">
            Featured Floral Sculptures
          </h2>
          <div className="w-16 h-[1.5px] bg-gold mx-auto my-4" />
          <p className="text-sm sm:text-base text-botanical/70 font-sans leading-relaxed">
            Freshly conditioned in floral botanical waters, harvested each morning and composed with poetic restraint.
          </p>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-botanical/10 mb-12">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            {filterTabs.map((tab) => {
              const isActive = (selectedCategory || 'all') === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-botanical text-champagne shadow-sm'
                      : 'bg-white/60 text-botanical/80 hover:bg-white hover:text-botanical-dark border border-botanical/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-botanical-muted" />
            <span className="text-xs uppercase tracking-wider text-botanical-muted font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/80 border border-botanical/10 rounded-full text-xs text-botanical-dark px-3 py-1.5 focus:outline-none focus:border-gold cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-botanical text-champagne flex flex-col md:flex-row items-center justify-between gap-8 shadow-luxury">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
              Bespoke Stem Sourcing
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-light text-white mt-1">
              Desiring something uncommonly rare?
            </h3>
            <p className="text-xs sm:text-sm text-champagne/75 mt-2 font-sans">
              Our botanical curators liaise directly with private gardens across Hampshire, Grasse, and Kyoto for one-of-a-kind commissions.
            </p>
          </div>

          <a
            href="#footer-section"
            className="px-8 py-3.5 rounded-full bg-gold text-botanical-dark hover:bg-gold-light transition-colors text-xs uppercase tracking-[0.2em] font-semibold whitespace-nowrap"
          >
            Commission Arrangement
          </a>
        </div>

      </div>
    </section>
  );
}
