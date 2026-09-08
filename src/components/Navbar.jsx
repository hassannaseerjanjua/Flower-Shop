import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Play } from 'lucide-react';

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onReplayIntro,
  isVisible = false,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If intro has not ended, do NOT render navbar at all
  if (!isVisible) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Shop', href: '#shop-products' },
    { name: 'Collections', href: '#shop-categories' },
    { name: 'About', href: '#about-section' },
    { name: 'Contact', href: '#footer-section' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-ivory-100/95 backdrop-blur-md shadow-sm border-b border-botanical/5 py-3.5 transition-all duration-500 animate-in fade-in slide-in-from-top-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Monogram & Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-botanical/20 group-hover:border-gold transition-colors flex items-center justify-center bg-ivory-50/80">
              <img src="/bloom-logo.svg" alt="Bloom & Co." className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl sm:text-2xl font-light tracking-tight text-botanical-dark group-hover:text-gold transition-colors leading-none">
                Bloom <span className="italic font-serif text-gold">&amp;</span> Co.
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-botanical-sage font-medium mt-0.5 hidden sm:inline">
                Haute Floristerie
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs lg:text-sm uppercase tracking-[0.2em] font-medium text-botanical/80 hover:text-botanical-dark relative py-1 group transition-colors"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Replay Cinematic Intro Button */}
            <button
              onClick={onReplayIntro}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium text-botanical-muted hover:text-botanical-dark hover:bg-gold/10 border border-transparent hover:border-gold/30 transition-all"
              title="Replay Cinematic Journey"
            >
              <Play className="w-3 h-3 text-gold fill-gold" />
              <span>Replay Flight</span>
            </button>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-botanical hover:text-gold hover:bg-botanical/5 transition-colors"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="p-2 rounded-full text-botanical hover:text-gold hover:bg-botanical/5 transition-colors relative"
              aria-label="View Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-terracotta text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-botanical text-champagne hover:bg-botanical-dark transition-all duration-300 shadow-sm group"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold tracking-wider">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-botanical hover:text-gold"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-ivory-100/98 backdrop-blur-xl flex flex-col pt-24 px-8 pb-10 transition-all">
          <nav className="flex flex-col gap-6 items-center text-center my-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-serif-luxury text-3xl text-botanical-dark hover:text-gold transition-colors tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/40 text-xs uppercase tracking-widest text-botanical font-medium"
            >
              <Play className="w-3.5 h-3.5 text-gold fill-gold" />
              <span>Replay Intro Journey</span>
            </button>
          </nav>

          <div className="text-center text-xs text-botanical-muted tracking-widest uppercase pt-6 border-t border-botanical/10">
            Bloom &amp; Co. Glasshouse Ateliers
          </div>
        </div>
      )}
    </>
  );
}
