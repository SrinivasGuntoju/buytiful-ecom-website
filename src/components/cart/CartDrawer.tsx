import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SHIPPING_RULES } from '../../data/storeConfig';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    subtotal,
    discount,
    shippingFee,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isFreeShippingEligible,
    remainingForFreeShipping,
    navigateTo,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponError(null);
    const res = applyCoupon(couponInput.trim());
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5F0] shadow-2xl flex flex-col h-full border-l border-[#E8DED2] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-white border-b border-[#E8DED2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8D2337]" />
              <h2 className="text-base font-bold text-[#191919]">Shopping Bag</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F8F5F0] text-zinc-700 tabular-nums">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-400 hover:text-[#191919] hover:bg-[#F8F5F0] rounded-full transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-3 bg-white/70 border-b border-[#E8DED2] px-6">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#8D2337]" />
                {isFreeShippingEligible ? (
                  <span className="font-bold text-emerald-700">
                    You've unlocked FREE Express Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#8D2337]">₹{remainingForFreeShipping}</strong> more for Free Shipping
                  </span>
                )}
              </div>
            </div>
            <div className="w-full h-1.5 bg-[#E8DED2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8D2337] transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    (subtotal / SHIPPING_RULES.freeShippingThreshold) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded-2xl border border-[#E8DED2] shadow-2xs"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('product', { slug: item.product.slug });
                    }}
                    className="w-20 aspect-[3/4] rounded-xl overflow-hidden bg-[#F8F5F0] shrink-0 cursor-pointer"
                  >
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fallbackCategory={item.product.category}
                      fallbackName={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigateTo('product', { slug: item.product.slug });
                          }}
                          className="text-xs sm:text-sm font-semibold text-[#191919] hover:text-[#8D2337] truncate cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant Specs */}
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        Size: <strong className="text-zinc-800">{item.selectedSize}</strong> · Color: <strong className="text-zinc-800">{item.selectedColor}</strong>
                      </p>
                    </div>

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E8DED2] rounded-lg bg-[#F8F5F0]">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="px-2.5 py-1 text-xs text-zinc-600 hover:text-black hover:bg-[#E8DED2] transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="px-2.5 py-1 text-xs text-zinc-600 hover:text-black hover:bg-[#E8DED2] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-[#191919] tabular-nums">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white border border-[#E8DED2] text-zinc-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#191919]">Your bag is empty</h3>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                    Explore our latest linen sets, heavyweight tees, and architectural denim.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('catalog');
                  }}
                  className="px-5 py-2.5 bg-[#191919] text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-[#E8DED2] space-y-4">
              
              {/* Coupon Engine */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Tag className="w-3.5 h-3.5" />
                      <span className="font-bold">{appliedCoupon.code}</span>
                      <span className="text-[11px] text-emerald-700">applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-900 hover:underline text-[11px] font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Voucher code (e.g. WELCOME10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337] uppercase placeholder:normal-case"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#191919] text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-rose-600 pl-1">{couponError}</p>
                    )}
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600 pt-2 border-t border-[#E8DED2]/60">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#191919] tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="font-semibold tabular-nums">
                      -₹{discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-[#191919] tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">
                        FREE
                      </span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#191919] pt-2 border-t border-[#E8DED2]">
                  <span>Total Payable</span>
                  <span className="text-base text-[#8D2337] tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#8D2337] hover:bg-[#a62b42] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
