import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    navigateTo,
    addToast
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  if (!isCartOpen) return null;

  const FREE_DELIVERY_THRESHOLD = 2499;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : 199;
  const total = subtotal - discount + deliveryFee;

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const amountNeededForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'BLOOM10' || couponCode.trim().toUpperCase() === 'WELCOME10') {
      setCouponApplied(true);
      addToast('Coupon code applied! 10% privilege discount activated.', 'gold');
    } else {
      addToast('Invalid coupon. Try code "BLOOM10"', 'info');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5ED] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#A8BFA8]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#12372A]" />
              <h2 className="font-serif text-xl font-bold text-[#12372A]">
                Your Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-500 hover:text-gray-900 rounded-full"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-[#12372A] text-[#F8F5ED] text-xs">
            <div className="flex justify-between items-center mb-1.5 font-medium">
              <span>
                {amountNeededForFree === 0
                  ? '🎉 Complimentary Chilled Delivery Unlocked!'
                  : `Add ₹${amountNeededForFree.toLocaleString('en-IN')} more for Free Delivery`}
              </span>
              <span className="tabular-nums font-bold">{freeDeliveryProgress}%</span>
            </div>
            <div className="w-full bg-[#2F6B4F] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C6A15B] h-full transition-all duration-300"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3.5 rounded-xs border border-[#A8BFA8]/30 flex gap-3 shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-xs shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-bold text-[#12372A] truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-rose-600 p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                        <span>Scale: {item.size}</span>
                        {item.deliveryDate && (
                          <>
                            <span>·</span>
                            <span>{item.deliveryDate}</span>
                          </>
                        )}
                      </div>

                      {item.isCustom && item.customDetails && (
                        <p className="text-[10px] text-[#2F6B4F] mt-1 line-clamp-1">
                          {item.customDetails.palette} · {item.customDetails.wrapping}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="inline-flex items-center border border-gray-200 rounded-xs bg-[#F8F5ED]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-gray-700 hover:bg-gray-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#12372A] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-gray-700 hover:bg-gray-200"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-[#12372A] tabular-nums">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-gray-500 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#A8BFA8] mx-auto stroke-[1.2]" />
                <p className="font-serif text-lg text-[#12372A]">Your bag is currently empty</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our handcrafted collection to send fresh morning blooms.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-2 px-5 py-2.5 bg-[#12372A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-[#2F6B4F]"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#A8BFA8]/20 space-y-3">
              
              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. BLOOM10)"
                    disabled={couponApplied}
                    className="w-full pl-8 pr-2 py-1.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs text-xs uppercase text-[#12372A] focus:outline-none focus:border-[#2F6B4F]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponApplied}
                  className="px-3 py-1.5 bg-[#12372A] text-white text-xs font-semibold uppercase rounded-xs hover:bg-[#2F6B4F] disabled:opacity-50 cursor-pointer"
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="tabular-nums font-medium text-gray-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Privilege Discount (10%):</span>
                    <span className="tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Chilled Transit Delivery:</span>
                  <span className="tabular-nums font-medium text-gray-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#12372A] pt-2 border-t border-gray-100">
                  <span>Estimated Total:</span>
                  <span className="font-serif text-lg tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#12372A] hover:bg-[#2F6B4F] text-[#F8F5ED] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2F6B4F]" />
                <span>100% Freshness Guarantee · Bank-Grade Encryption</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
