import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CheckoutPage: React.FC = () => {
  const { cart, placeOrder, navigateTo, addToast } = useShop();

  const [formData, setFormData] = useState({
    fullName: 'Ananya Sharma',
    phone: '9876543210',
    email: 'ananya.sharma@example.com',
    address: 'B-402, Lotus Grand Residences, Sector 45',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122001',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliverySlot: 'Morning (9 AM – 1 PM)',
    giftMessage: 'Happy Anniversary to my favorite person in the world!',
    senderName: 'With all my love, Rohan',
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const FREE_DELIVERY_THRESHOLD = 2499;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : 199;
  const discount = 0; // standard checkout
  const total = subtotal - discount + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="bg-[#F8F5ED] min-h-screen py-20 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xs border border-[#A8BFA8]/30">
          <h2 className="font-serif text-2xl font-bold text-[#12372A] mb-3">Your Bag is Empty</h2>
          <p className="text-xs text-gray-600 mb-6">Please add items to your cart before proceeding to checkout.</p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 bg-[#12372A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-[#2F6B4F]"
          >
            Explore Bouquets
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      addToast('Please complete all mandatory delivery fields', 'info');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder({
        items: cart,
        subtotal,
        deliveryFee,
        discount,
        total,
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        deliveryDate: formData.deliveryDate,
        deliverySlot: formData.deliverySlot,
        giftMessage: `${formData.giftMessage} — ${formData.senderName}`,
        paymentMethod,
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-[#F8F5ED] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#A8BFA8]/20 mb-8">
          <div>
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C6A15B] block mb-1">
              Secure Transaction
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A]">
              Checkout & Delivery Details
            </h1>
          </div>
          <button
            onClick={() => navigateTo('cart')}
            className="text-xs font-semibold text-[#2F6B4F] hover:text-[#12372A] flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Bag</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Forms (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Customer & Recipient Details */}
              <div className="bg-white border border-[#A8BFA8]/30 rounded-xs p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-[#12372A] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#12372A]">
                    Recipient & Delivery Address
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-[#12372A] block mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Receiver name"
                      className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#12372A] block mb-1">
                      Recipient Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="font-bold text-[#12372A] block mb-1">
                    Your Email (for receipt & order tracking updates) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com"
                    className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                  />
                </div>

                <div className="text-xs">
                  <label className="font-bold text-[#12372A] block mb-1">
                    Street Address & Apartment / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House/Flat No., Building Name, Street"
                    className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-[#12372A] block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#12372A] block mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#12372A] block mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                      maxLength={6}
                      className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Scheduling & Card Sentiment */}
              <div className="bg-white border border-[#A8BFA8]/30 rounded-xs p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-[#12372A] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#12372A]">
                    Delivery Slot & Gift Sentiment
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-[#12372A] block mb-1">
                      Delivery Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <input
                        type="date"
                        value={formData.deliveryDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        className="w-full pl-9 pr-2 py-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#12372A] block mb-1">
                      Preferred Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <select
                        value={formData.deliverySlot}
                        onChange={(e) => setFormData({ ...formData, deliverySlot: e.target.value })}
                        className="w-full pl-9 pr-2 py-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F] cursor-pointer"
                      >
                        <option value="Morning (9 AM – 1 PM)">Morning (9 AM – 1 PM)</option>
                        <option value="Afternoon (1 PM – 5 PM)">Afternoon (1 PM – 5 PM)</option>
                        <option value="Evening (5 PM – 9 PM)">Evening (5 PM – 9 PM)</option>
                        <option value="Midnight Surprise (11:30 PM)">Midnight Surprise (11:30 PM - 12:15 AM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="text-xs space-y-2">
                  <label className="font-bold text-[#12372A] block">
                    Handwritten Calligraphy Card Note (Included)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.giftMessage}
                    onChange={(e) => setFormData({ ...formData, giftMessage: e.target.value })}
                    placeholder="Enter your heartfelt message..."
                    className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F] resize-none"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.senderName}
                      onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                      placeholder="Sign-off (e.g. From: Anya & Rohan)"
                      className="w-full p-2 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white border border-[#A8BFA8]/30 rounded-xs p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-[#12372A] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#12372A]">
                    Payment Method
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  {[
                    { id: 'UPI' as const, name: 'UPI', desc: 'GPay, PhonePe, Paytm', icon: QrCode },
                    { id: 'Card' as const, name: 'Credit/Debit', desc: 'Visa, Master, RuPay', icon: CreditCard },
                    { id: 'NetBanking' as const, name: 'Net Banking', desc: 'All Indian Banks', icon: Building2 },
                    { id: 'COD' as const, name: 'Cash On Delivery', desc: 'Pay at Doorstep', icon: Banknote },
                  ].map((method) => {
                    const isSelected = paymentMethod === method.id;
                    const Icon = method.icon;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-3 rounded-xs border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#12372A] bg-[#12372A]/5 font-semibold text-[#12372A]'
                            : 'border-gray-200 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <Icon className="w-4 h-4 text-[#2F6B4F]" />
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6B4F]" />}
                        </div>
                        <div>
                          <p className="font-bold text-xs">{method.name}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{method.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Sub-inputs based on payment method */}
                {paymentMethod === 'UPI' && (
                  <div className="p-3 bg-[#F8F5ED] rounded-xs text-xs space-y-2 border border-[#A8BFA8]/20">
                    <label className="font-bold text-[#12372A] block">
                      Enter UPI VPA / ID
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi or name@okaxis"
                      className="w-full p-2 bg-white border border-gray-300 rounded-xs focus:outline-none focus:border-[#2F6B4F]"
                    />
                    <p className="text-[11px] text-gray-500">
                      Collect request will be triggered instantly upon placing order.
                    </p>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="p-3 bg-[#F8F5ED] rounded-xs text-xs space-y-2 border border-[#A8BFA8]/20">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Card Number"
                        defaultValue="4111 2222 3333 4444"
                        className="col-span-2 p-2 bg-white border border-gray-300 rounded-xs text-xs"
                      />
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="p-2 bg-white border border-gray-300 rounded-xs text-xs"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        defaultValue="123"
                        maxLength={4}
                        className="p-2 bg-white border border-gray-300 rounded-xs text-xs"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xs text-xs text-amber-900">
                    <p className="font-semibold">Cash On Delivery Available</p>
                    <p className="text-[11px] mt-0.5">Please ensure exact cash or UPI payment is available upon courier arrival.</p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                  <Lock className="w-3.5 h-3.5 text-[#2F6B4F]" />
                  <span>256-Bit SSL Encrypted & RBI Compliant Gifting Gateway</span>
                </div>
              </div>

            </div>

            {/* Right Order Summary (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#A8BFA8]/30 rounded-xs p-6 shadow-xs sticky top-24 space-y-6">
                
                <h3 className="font-serif text-xl font-bold text-[#12372A] pb-3 border-b border-[#A8BFA8]/20">
                  Your Order ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>

                {/* Items Mini List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xs object-cover"
                        />
                        <div>
                          <p className="font-serif font-bold text-[#12372A]">{item.name}</p>
                          <p className="text-gray-500">Qty: {item.quantity} · {item.size}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#12372A] tabular-nums">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span>Bouquet Subtotal:</span>
                    <span className="tabular-nums font-medium text-gray-900">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

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

                  <div className="flex justify-between text-base font-bold text-[#12372A] pt-3 border-t border-gray-200">
                    <span>Final Payable Amount:</span>
                    <span className="font-serif text-xl tabular-nums">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Submit Place Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#12372A] hover:bg-[#2F6B4F] text-[#F8F5ED] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Securing Your Blooms...</span>
                  ) : (
                    <>
                      <span>Place Order · ₹{total.toLocaleString('en-IN')}</span>
                      <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
                    </>
                  )}
                </button>

                <div className="space-y-2 pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2F6B4F]" />
                    <span>Morning Freshness Promise (100% Replacement)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#2F6B4F]" />
                    <span>Real-time courier tracking via SMS & WhatsApp</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
