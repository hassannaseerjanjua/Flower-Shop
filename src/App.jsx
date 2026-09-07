import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import IntroExperience from './components/IntroExperience';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import ProductGrid from './components/ProductGrid';
import AboutSection from './components/AboutSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introKey, setIntroKey] = useState(0);

  // Cart & Wishlist State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('bloom_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('bloom_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filter State
  const [selectedCategory, setSelectedCategory] = useState('all');

  const lenisRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bloom_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn("Storage error:", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('bloom_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Storage error:", e);
    }
  }, [wishlist]);

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  // Cart Actions
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      const qtyToAdd = product.quantity || 1;
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qtyToAdd } : item
        );
      }
      return [...prevCart, { ...product, quantity: qtyToAdd }];
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Actions
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleMoveWishlistToCart = (product) => {
    handleAddToCart(product);
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
  };

  // Replay Intro
  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIntroKey((prev) => prev + 1);
    setShowIntro(true);
  };

  // Category Selection & Scroll
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    const target = document.querySelector('#shop-products');
    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -60 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToSection = (selector) => {
    const target = document.querySelector(selector);
    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -60 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-botanical selection:bg-gold-light selection:text-botanical-dark font-sans relative">
      
      {/* 1. Cinematic Video-to-Sky Intro Journey */}
      {showIntro && (
        <IntroExperience
          key={introKey}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* 2. Top Navigation Bar */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onReplayIntro={handleReplayIntro}
      />

      {/* 3. Main Storefront Pages & Sections */}
      <main className="relative">
        <Hero
          onShopClick={() => scrollToSection('#shop-products')}
          onExploreClick={() => scrollToSection('#shop-categories')}
        />

        <CategorySection
          onSelectCategory={handleSelectCategory}
        />

        <ProductGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        <AboutSection />

        <Newsletter />
      </main>

      {/* 4. Luxury Footer */}
      <Footer onReplayIntro={handleReplayIntro} />

      {/* 5. Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={wishlist.some((i) => i.id === quickViewProduct?.id)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

    </div>
  );
}
