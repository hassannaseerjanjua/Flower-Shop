import React from 'react';
import { Play, Instagram, PinIcon as Pinterest, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onReplayIntro }) {
  const ateliers = [
    { city: 'London', address: '14 Mount Street, Mayfair', phone: '+44 20 7946 0912' },
    { city: 'Paris', address: '28 Rue de Grenelle, 7e', phone: '+33 1 42 68 55 00' },
    { city: 'New York', address: '822 Madison Avenue, UES', phone: '+1 212 555 0198' },
  ];

  return (
    <footer id="footer-section" className="bg-botanical-dark text-champagne pt-20 pb-12 border-t border-botanical-light/20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier: Brand Statement & Cinematic Replay */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-16 border-b border-white/10 gap-8">
          <div className="flex items-center gap-4">
            <img src="/bloom-logo.svg" alt="Bloom & Co." className="w-12 h-12 filter invert brightness-200" />
            <div>
              <span className="font-serif-luxury text-3xl font-light text-white tracking-wide block">
                Bloom <span className="italic font-serif text-gold">&amp;</span> Co.
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-light/80 font-medium">
                Haute Floristerie &bull; Ateliers &amp; Glasshouse
              </span>
            </div>
          </div>

          <button
            onClick={onReplayIntro}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-gold/40 text-gold-light hover:text-white hover:border-gold hover:bg-gold/10 transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium"
          >
            <Play className="w-3.5 h-3.5 text-gold fill-gold" />
            <span>Replay Cinematic Experience</span>
          </button>
        </div>

        {/* Middle Tier: Atelier Addresses and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-white/10">
          
          {/* Column 1: Physical Glasshouse Ateliers */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-6">
              Our Flagship Ateliers
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {ateliers.map((atelier) => (
                <div key={atelier.city} className="flex flex-col">
                  <span className="font-serif-luxury text-xl text-white font-light">
                    {atelier.city}
                  </span>
                  <span className="text-xs text-champagne/70 font-sans mt-1">
                    {atelier.address}
                  </span>
                  <span className="text-[11px] text-gold/80 font-mono mt-2">
                    {atelier.phone}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Curation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-6">
              Collections
            </h4>
            <ul className="space-y-3 text-xs text-champagne/70 font-sans">
              <li><a href="#shop-products" className="hover:text-gold transition-colors">Seasonal Signature Bouquets</a></li>
              <li><a href="#shop-products" className="hover:text-gold transition-colors">Sculptural Table Vessels</a></li>
              <li><a href="#shop-categories" className="hover:text-gold transition-colors">Private Bridal Floristry</a></li>
              <li><a href="#shop-categories" className="hover:text-gold transition-colors">Aromatherapeutic Gift Sets</a></li>
              <li><a href="#shop-categories" className="hover:text-gold transition-colors">Aged Terracotta Botanicals</a></li>
            </ul>
          </div>

          {/* Column 3: Concierge */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-6">
              Concierge &bull; Care
            </h4>
            <ul className="space-y-3 text-xs text-champagne/70 font-sans">
              <li><span className="text-champagne/60">Mon &ndash; Sat: 8:00 &ndash; 19:00</span></li>
              <li><span className="text-champagne/60">Sun: 10:00 &ndash; 16:00</span></li>
              <li><a href="mailto:concierge@bloomandco.com" className="hover:text-gold transition-colors flex items-center gap-2 mt-3"><Mail className="w-3.5 h-3.5" /> concierge@bloomandco.com</a></li>
              <li><a href="tel:+442079460912" className="hover:text-gold transition-colors flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +44 (0) 20 7946 0912</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Tier: Copyright and Legal */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-xs text-champagne/50 gap-4">
          <p>&copy; {new Date().getFullYear()} Bloom &amp; Co. Haute Floristerie. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-champagne transition-colors">Stem Care Charter</a>
            <a href="#" className="hover:text-champagne transition-colors">Ethical Harvest</a>
            <a href="#" className="hover:text-champagne transition-colors">Privacy Sanctuary</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
