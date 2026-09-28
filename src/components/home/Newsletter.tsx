import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Newsletter: React.FC = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'info');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to the Bloom Club! A 10% welcome privilege code has been sent.', 'gold');
  };

  return (
    <section className="bg-[#12372A] text-[#F8F5ED] py-20 border-b border-[#2F6B4F]/40 relative overflow-hidden">
      {/* Decorative Botanical Leaf Outline SVG */}
      <div className="absolute -right-16 -top-16 w-64 h-64 text-[#2F6B4F]/30 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 0 C120 60, 180 80, 200 100 C140 120, 120 180, 100 200 C80 140, 20 120, 0 100 C60 80, 80 20, 100 0 Z" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C6A15B] block mb-3">
          Florist Dispatch
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white mb-4">
          Stay In Bloom.
        </h2>

        <p className="text-sm sm:text-base text-[#A8BFA8] max-w-lg mx-auto leading-relaxed mb-8">
          Be the first to discover new bouquets, seasonal collections and special offers.
        </p>

        {!subscribed ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <div className="w-full relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-3.5 bg-white/10 border border-[#A8BFA8]/30 focus:border-[#C6A15B] focus:bg-white/15 text-white placeholder-[#A8BFA8] text-sm rounded-xs outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#C6A15B] hover:bg-[#d8b56f] text-[#12372A] font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-2"
            >
              <span>Join Us</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#2F6B4F]/40 border border-[#C6A15B]/40 rounded-xs text-[#F8F5ED]">
            <CheckCircle2 className="w-5 h-5 text-[#C6A15B]" />
            <span className="text-sm font-medium">Thank you for joining our circle of flower lovers.</span>
          </div>
        )}

        <p className="mt-4 text-[11px] text-[#A8BFA8]/80">
          Unsubscribe anytime with a single click. We never send spam.
        </p>
      </div>
    </section>
  );
};
