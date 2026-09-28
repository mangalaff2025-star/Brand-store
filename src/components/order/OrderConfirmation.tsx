import React from 'react';
import {
  CheckCircle2,
  PackageCheck,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Flower2,
  HeartHandshake
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const OrderConfirmation: React.FC = () => {
  const { currentOrder, navigateTo, setIsTrackOrderOpen } = useShop();

  // Fallback demo order if visited directly
  const order = currentOrder || {
    orderId: 'FLR-89241',
    customerName: 'Ananya Sharma',
    phone: '9876543210',
    email: 'ananya.sharma@example.com',
    address: 'B-402, Lotus Grand Residences, Sector 45',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122001',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliverySlot: 'Morning (9 AM – 1 PM)',
    items: [],
    subtotal: 2499,
    deliveryFee: 0,
    discount: 0,
    total: 2499,
    giftMessage: 'Happy Anniversary to my favorite person in the world! — Rohan',
    paymentMethod: 'UPI' as const,
    status: 'Confirmed' as const,
    createdAt: new Date().toISOString(),
  };

  const steps = [
    { label: 'Order Confirmed', time: 'Just now', done: true },
    { label: 'Stems Selected & Hydrated', time: 'Next step', done: true },
    { label: 'Hand-Tied in Atelier', time: 'Tomorrow 7:00 AM', done: false },
    { label: 'Chilled Courier Transit', time: 'En route', done: false },
    { label: 'Doorstep Handover', time: order.deliverySlot, done: false },
  ];

  return (
    <div className="bg-[#F8F5ED] min-h-screen py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Main Celebration Card */}
        <div className="bg-white border border-[#A8BFA8]/40 rounded-xs p-6 sm:p-10 shadow-sm text-center relative overflow-hidden">
          
          {/* Subtle Golden Botanical Burst Indicator */}
          <div className="w-16 h-16 rounded-full bg-[#12372A]/10 text-[#2F6B4F] flex items-center justify-center mx-auto mb-4 relative">
            <CheckCircle2 className="w-10 h-10 text-[#2F6B4F]" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A15B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#C6A15B]"></span>
            </span>
          </div>

          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C6A15B] block mb-2">
            Order Successfully Placed
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12372A] tracking-tight mb-2">
            Your Flowers Are On Their Way.
          </h1>

          <p className="text-sm sm:text-base text-[#18231D]/80 max-w-lg mx-auto mb-6">
            A confirmation email has been dispatched to <strong>{order.email}</strong>. Our master florists have begun preparing your blooms.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F8F5ED] rounded-full border border-[#A8BFA8]/30 text-xs font-mono text-[#12372A] mb-8">
            <span>Order Reference:</span>
            <strong className="text-[#2F6B4F] tracking-wider text-sm">{order.orderId}</strong>
          </div>

          {/* Delivery Tracker Steps Timeline */}
          <div className="py-6 border-y border-[#A8BFA8]/20 my-6 text-left">
            <h3 className="font-serif text-base font-bold text-[#12372A] mb-4 text-center">
              Delivery Preparation Timeline
            </h3>

            <div className="space-y-4 max-w-md mx-auto">
              {steps.map((st, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0 ${
                    st.done
                      ? 'bg-[#12372A] text-white'
                      : 'border-2 border-gray-300 text-gray-400 bg-white'
                  }`}>
                    {st.done ? '✓' : i + 1}
                  </div>
                  <div className="flex-1 flex justify-between items-baseline text-xs">
                    <span className={st.done ? 'font-bold text-[#12372A]' : 'text-gray-500'}>
                      {st.label}
                    </span>
                    <span className="text-[11px] text-gray-400">{st.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Details Summary Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs bg-[#F8F5ED] p-5 rounded-xs border border-[#A8BFA8]/30 mb-8">
            <div className="space-y-1">
              <span className="font-bold text-[#12372A] block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2F6B4F]" />
                Delivery Address
              </span>
              <p className="text-gray-700">{order.customerName}</p>
              <p className="text-gray-600">{order.address}</p>
              <p className="text-gray-600">{order.city}, {order.state} - {order.pincode}</p>
              <p className="text-gray-600">Phone: {order.phone}</p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-[#12372A] block flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#2F6B4F]" />
                Scheduled Arrival
              </span>
              <p className="text-gray-700 font-semibold">{order.deliveryDate}</p>
              <p className="text-gray-600">{order.deliverySlot}</p>
              <p className="text-gray-600 mt-2">
                <strong>Payment:</strong> {order.paymentMethod} (₹{order.total.toLocaleString('en-IN')})
              </p>
            </div>

            {order.giftMessage && (
              <div className="col-span-1 sm:col-span-2 pt-2 border-t border-[#A8BFA8]/20">
                <span className="font-bold text-[#12372A] block flex items-center gap-1.5 mb-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#2F6B4F]" />
                  Calligraphy Gift Card
                </span>
                <p className="italic text-gray-700 bg-white p-3 rounded-xs border border-[#A8BFA8]/20">
                  "{order.giftMessage}"
                </p>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsTrackOrderOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#12372A] hover:bg-[#2F6B4F] text-[#F8F5ED] text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Track My Order</span>
              <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className="w-full sm:w-auto px-6 py-3.5 border border-[#12372A]/30 hover:border-[#12372A] text-[#12372A] text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
