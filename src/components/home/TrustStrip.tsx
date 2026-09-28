import React from 'react';
import { Flower2, Scissors, Truck, HeartHandshake } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const benefits = [
    {
      icon: Flower2,
      title: 'Fresh Flowers',
      description: 'Morning hand-cut blooms with 7-day freshness promise',
    },
    {
      icon: Scissors,
      title: 'Handcrafted Bouquets',
      description: 'Artfully styled and spiraled by master florists',
    },
    {
      icon: Truck,
      title: 'Same-Day Delivery',
      description: 'Chilled transit in 3 hours across major cities',
    },
    {
      icon: HeartHandshake,
      title: 'Made With Love',
      description: 'Handwritten calligraphy card with every parcel',
    },
  ];

  return (
    <section className="bg-[#F8F5ED] border-b border-[#A8BFA8]/20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 sm:p-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#12372A]/5 flex items-center justify-center text-[#2F6B4F] group-hover:bg-[#12372A] group-hover:text-[#C6A15B] transition-all duration-300 mb-3">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#12372A] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#18231D]/70 max-w-[210px] leading-snug">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
