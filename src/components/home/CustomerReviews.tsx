import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/products';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-20 bg-[#F8F5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-1 text-[#C6A15B] mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#C6A15B] block mb-2">
            Real Stories & Reactions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12372A] tracking-tight">
            Loved By Our Customers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#18231D]/80">
            Over 12,000 heartfelt deliveries made across India with an average rating of 4.9 out of 5 stars.
          </p>
        </div>

        {/* 3-4 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="relative bg-white border border-[#A8BFA8]/30 rounded-xs p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
            >
              <div>
                {/* Subtle Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-[#C6A15B]">
                    {[...Array(item.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#A8BFA8]/40" />
                </div>

                {/* Review Body */}
                <p className="font-serif text-base sm:text-lg text-[#12372A] italic leading-relaxed mb-6">
                  "{item.content}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-[#A8BFA8]/20 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#12372A]">
                    {item.author}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#2F6B4F] mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2F6B4F]" />
                    <span>Verified Customer</span>
                  </div>
                </div>

                <span className="text-[11px] text-[#18231D]/60">
                  {item.city}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
