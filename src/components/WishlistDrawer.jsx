import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist = [],
  onRemoveFromWishlist,
  onMoveToCart,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-botanical-dark/60 backdrop-blur-sm transition-opacity duration-500"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory-100 shadow-2xl flex flex-col justify-between border-l border-botanical/10">
          
          {/* Header */}
          <div className="p-6 border-b border-botanical/10 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-terracotta fill-terracotta" />
              <h2 className="font-serif-luxury text-2xl text-botanical-dark font-light">
                Saved Favorites
              </h2>
              <span className="text-xs bg-ivory-200 px-2 py-0.5 rounded-full text-botanical-muted font-medium">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-ivory-200 text-botanical transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-botanical/5">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-ivory-200 flex items-center justify-center mb-4 text-botanical/40">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-light text-botanical-dark">
                  No saved floral arrangements
                </h3>
                <p className="text-xs text-botanical/60 font-sans mt-1">
                  Heart items as you explore to save your preferred blooms.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full border border-botanical/20 text-botanical hover:bg-botanical hover:text-champagne text-xs uppercase tracking-wider transition-all"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl border border-botanical/10 bg-ivory-50"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-luxury text-lg font-light text-botanical-dark truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-botanical-muted font-sans font-medium">${item.price}</p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => onMoveToCart(item)}
                        className="px-3.5 py-1.5 rounded-full bg-botanical hover:bg-botanical-dark text-champagne text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3 text-gold" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(item)}
                        className="text-botanical/40 hover:text-terracotta transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 bg-white border-t border-botanical/10 text-center">
            <p className="text-[11px] text-botanical-muted font-sans">
              Seasonal bloom availability is reserved once added to cart.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
