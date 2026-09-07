import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const difference = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1500);
  };

  const handleFinishOrder = () => {
    setOrderComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-botanical-dark/60 backdrop-blur-sm transition-opacity duration-500"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory-100 shadow-2xl flex flex-col justify-between border-l border-botanical/10">
          
          {/* Header */}
          <div className="p-6 border-b border-botanical/10 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h2 className="font-serif-luxury text-2xl text-botanical-dark font-light">
                Your Botanical Bag
              </h2>
              <span className="text-xs bg-ivory-200 px-2 py-0.5 rounded-full text-botanical-muted font-medium">
                {cart.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-ivory-200 text-botanical transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Delivery Indicator */}
          <div className="px-6 py-3.5 bg-ivory-50 border-b border-botanical/5">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center gap-2 text-xs text-botanical font-medium">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Complimentary white-glove hand delivery unlocked!</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <p className="text-xs text-botanical/80">
                  Add <span className="font-semibold text-botanical-dark font-serif-luxury text-sm">${difference}</span> more for complimentary hand delivery.
                </p>
                <div className="w-full h-1.5 bg-ivory-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-botanical/5">
            {orderComplete ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-botanical/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-botanical" />
                </div>
                <h3 className="font-serif-luxury text-3xl font-light text-botanical-dark">
                  Order Confirmed
                </h3>
                <p className="text-xs sm:text-sm text-botanical/70 font-sans mt-2 max-w-xs leading-relaxed">
                  Your floral arrangement will be harvested and conditioned at dawn for courier delivery.
                </p>
                <button
                  onClick={handleFinishOrder}
                  className="mt-8 px-6 py-3 rounded-full bg-botanical text-champagne text-xs uppercase tracking-widest font-semibold hover:bg-botanical-dark transition-colors"
                >
                  Return to Atelier
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-ivory-200 flex items-center justify-center mb-4 text-botanical/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-light text-botanical-dark">
                  Your bag is empty
                </h3>
                <p className="text-xs text-botanical/60 font-sans mt-1">
                  Discover our morning harvests and hand-tied bouquets.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full border border-botanical/20 text-botanical hover:bg-botanical hover:text-champagne text-xs uppercase tracking-wider transition-all"
                >
                  Explore Creations
                </button>
              </div>
            ) : (
              cart.map((item) => (
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
                    <p className="text-xs text-botanical-muted font-sans">${item.price} each</p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-botanical/15 rounded-full bg-white px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-botanical hover:text-gold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-botanical hover:text-gold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-botanical/40 hover:text-terracotta transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-serif-luxury text-lg text-botanical-dark">
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {!orderComplete && cart.length > 0 && (
            <div className="p-6 bg-white border-t border-botanical/10 space-y-4">
              <div className="space-y-1.5 text-xs text-botanical/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif-luxury text-base text-botanical-dark">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Eco-Conscious Packaging</span>
                  <span className="text-botanical-muted uppercase text-[10px]">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-botanical-muted uppercase text-[10px]">
                    {subtotal >= freeShippingThreshold ? 'Complimentary' : '$15'}
                  </span>
                </div>
                <div className="pt-2 border-t border-botanical/10 flex justify-between font-serif-luxury text-xl text-botanical-dark">
                  <span>Total</span>
                  <span>${subtotal >= freeShippingThreshold ? subtotal : subtotal + 15}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 rounded-full bg-botanical text-champagne hover:bg-botanical-dark transition-all duration-300 text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-luxury"
              >
                {isCheckingOut ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-botanical-muted uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>Encrypted White-Glove Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
