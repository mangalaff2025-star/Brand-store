import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
  Truck,
  Sparkles
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, navigateTo, addToast } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

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

  return (
    <div className="bg-[#F8F5ED] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#A8BFA8]/20 mb-8">
          <div>
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C6A15B] block mb-1">
              Your Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A]">
              Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h1>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="mt-3 sm:mt-0 text-xs font-semibold text-[#2F6B4F] hover:text-[#12372A] flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Choosing Blooms</span>
          </button>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Cart Items Table (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Alert Strip */}
              <div className="p-4 bg-white border border-[#A8BFA8]/30 rounded-xs shadow-xs">
                <div className="flex justify-between items-center text-xs mb-1.5 font-medium text-[#12372A]">
                  <span>
                    {amountNeededForFree === 0
                      ? 'Complimentary Chilled Same-Day Delivery Qualified!'
                      : `Add ₹${amountNeededForFree.toLocaleString('en-IN')} more to unlock Free Express Delivery`}
                  </span>
                  <span className="font-bold tabular-nums">{freeDeliveryProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2F6B4F] h-full transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white border border-[#A8BFA8]/30 rounded-xs divide-y divide-gray-100 shadow-xs">
                {cart.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 object-cover rounded-xs shrink-0 bg-[#F8F5ED]"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#12372A]">
                        {item.name}
                      </h3>
                      
                      <div className="text-xs text-gray-500 mt-0.5 space-y-0.5">
                        <p>Scale: <strong>{item.size}</strong></p>
                        {item.deliveryDate && <p>Delivery: {item.deliveryDate} ({item.deliveryTimeSlot})</p>}
                        {item.giftMessage && <p className="italic text-gray-600 line-clamp-1">"{item.giftMessage}"</p>}
                      </div>

                      {item.isCustom && item.customDetails && (
                        <div className="text-[11px] text-[#2F6B4F] mt-1 font-medium">
                          {item.customDetails.palette} · {item.customDetails.wrapping}
                        </div>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center border border-gray-200 rounded-xs bg-[#F8F5ED]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-gray-700 hover:bg-gray-200 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#12372A] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-gray-700 hover:bg-gray-200 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[90px]">
                        <span className="font-serif text-base font-bold text-[#12372A] tabular-nums">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Remove bouquet"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Order Summary Sidebar (4 cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#A8BFA8]/30 rounded-xs p-6 shadow-xs sticky top-24 space-y-6">
                
                <h3 className="font-serif text-xl font-bold text-[#12372A] pb-3 border-b border-[#A8BFA8]/20">
                  Order Summary
                </h3>

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
                      className="w-full pl-8 pr-2 py-2 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs text-xs uppercase text-[#12372A] focus:outline-none focus:border-[#2F6B4F]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={couponApplied}
                    className="px-4 py-2 bg-[#12372A] text-white text-xs font-semibold uppercase rounded-xs hover:bg-[#2F6B4F] disabled:opacity-50 cursor-pointer"
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </form>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Bouquets Subtotal:</span>
                    <span className="tabular-nums font-semibold text-gray-900">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Privilege Discount (10%):</span>
                      <span className="tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Chilled Transit Delivery:</span>
                    <span className="tabular-nums font-semibold text-gray-900">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-700">COMPLIMENTARY</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#12372A] pt-3 border-t border-gray-100">
                    <span>Estimated Total:</span>
                    <span className="font-serif text-xl tabular-nums">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => navigateTo('checkout')}
                  className="w-full py-4 bg-[#12372A] hover:bg-[#2F6B4F] text-[#F8F5ED] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
                </button>

                <div className="space-y-2 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2F6B4F]" />
                    <span>7-Day Freshness Guarantee on all stems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#2F6B4F]" />
                    <span>Hand-delivered with temperature control</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white border border-[#A8BFA8]/30 rounded-xs p-16 text-center max-w-lg mx-auto space-y-4">
            <ShoppingBag className="w-16 h-16 text-[#A8BFA8] mx-auto stroke-[1.2]" />
            <h2 className="font-serif text-2xl font-bold text-[#12372A]">
              Your Shopping Bag is Empty
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              You have not added any bouquets yet. Explore our handcrafted collections or create your own custom bouquet.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-3 bg-[#12372A] hover:bg-[#2F6B4F] text-white text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer"
              >
                Explore Bouquets
              </button>
              <button
                onClick={() => navigateTo('custom-bouquet')}
                className="px-6 py-3 border border-[#C6A15B] text-[#12372A] text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-[#C6A15B]/15"
              >
                Custom Builder
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
