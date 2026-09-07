import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';

export default function ProductCard({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) {
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-botanical/5 hover:border-gold/30 shadow-luxury hover:shadow-luxury-hover transition-all duration-500 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-ivory-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Scrim on hover */}
        <div className="absolute inset-0 bg-botanical-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-full bg-botanical text-champagne text-[10px] uppercase tracking-[0.2em] font-medium shadow-sm">
              Iconic
            </span>
          )}
          {product.tag && (
            <span className="px-2.5 py-1 rounded-full glass-panel text-botanical-dark text-[9px] uppercase tracking-[0.2em] font-medium shadow-sm">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full transition-all duration-300 shadow-sm ${
            isWishlisted
              ? 'bg-terracotta text-white scale-110'
              : 'bg-white/80 backdrop-blur-md text-botanical hover:text-terracotta hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Pill Button (Hover on Desktop) */}
        <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2.5 rounded-xl glass-panel text-botanical-dark text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-white hover:text-botanical transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-gold" />
            <span>Botanical Details</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-botanical-muted mb-2">
            <span className="uppercase tracking-[0.2em] text-[10px] font-medium">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-botanical">
              <Star className="w-3 h-3 text-gold fill-gold" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif-luxury text-xl sm:text-2xl text-botanical-dark font-light tracking-tight group-hover:text-gold transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-botanical/70 font-sans mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Add To Cart Button */}
        <div className="pt-5 mt-4 border-t border-botanical/5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif-luxury text-xl sm:text-2xl font-light text-botanical-dark">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-botanical-muted line-through font-sans">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 ${
              addedAnimation
                ? 'bg-botanical-sage text-white'
                : 'bg-ivory-200 hover:bg-botanical hover:text-champagne text-botanical'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
