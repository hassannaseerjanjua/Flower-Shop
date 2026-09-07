import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, Check, Wind, Sparkles, Ruler, PackageCheck } from 'lucide-react';

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-botanical-dark/70 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 border border-botanical/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-botanical hover:text-botanical-dark transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-ivory-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full glass-panel text-[10px] tracking-widest uppercase font-medium text-botanical-dark">
                {product.categoryName}
              </span>
            </div>
          </div>

          {/* Product Specs */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-bold">
                  {product.tag || 'Haute Floristerie'}
                </span>
                <div className="flex items-center gap-1 text-xs text-botanical">
                  <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-botanical-muted">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-serif-luxury text-3xl text-botanical-dark font-light leading-snug">
                {product.name}
              </h2>

              <div className="font-serif-luxury text-2xl text-botanical-dark font-light mt-2 mb-4">
                ${product.price}
                {product.originalPrice && (
                  <span className="text-sm text-botanical-muted line-through ml-2 font-sans font-normal">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-botanical/80 font-sans leading-relaxed mb-6">
                {product.longDescription || product.shortDescription}
              </p>

              {/* Botanical Details List */}
              <div className="space-y-3 py-4 border-y border-botanical/10 text-xs">
                <div className="flex items-center gap-2.5 text-botanical/80">
                  <Wind className="w-4 h-4 text-gold flex-shrink-0" />
                  <span><strong className="text-botanical-dark">Fragrance:</strong> {product.fragranceNotes}</span>
                </div>
                <div className="flex items-center gap-2.5 text-botanical/80">
                  <Ruler className="w-4 h-4 text-gold flex-shrink-0" />
                  <span><strong className="text-botanical-dark">Arrangement Scale:</strong> {product.dimensions}</span>
                </div>
                <div className="flex items-center gap-2.5 text-botanical/80">
                  <PackageCheck className="w-4 h-4 text-gold flex-shrink-0" />
                  <span><strong className="text-botanical-dark">Stems:</strong> {product.stemsCount}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-botanical/20 rounded-full px-3 py-2 bg-ivory-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-1 text-botanical hover:text-gold text-sm font-semibold"
                >
                  -
                </button>
                <span className="px-3 text-xs font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-1 text-botanical hover:text-gold text-sm font-semibold"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-luxury ${
                  added ? 'bg-botanical-sage text-white' : 'bg-botanical text-champagne hover:bg-botanical-dark'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-gold" />
                    <span>Add to Bag &bull; ${product.price * quantity}</span>
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-full border transition-colors ${
                  isWishlisted
                    ? 'border-terracotta bg-terracotta text-white'
                    : 'border-botanical/20 text-botanical hover:text-terracotta hover:border-terracotta'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
