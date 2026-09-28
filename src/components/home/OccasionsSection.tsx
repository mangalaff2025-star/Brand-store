import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { OCCASIONS_DATA } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { OccasionType } from '../../types';

export const OccasionsSection: React.FC = () => {
  const { navigateToShopWithOccasion, navigateTo } = useShop();

  return (
    <section className="py-20 bg-white border-y border-[#A8BFA8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#C6A15B] block mb-2">
            Every Feeling Celebrated
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12372A] tracking-tight">
            Shop By Occasion
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#18231D]/80">
            Find the perfect blossoms to mark milestones, heartfelt gratitude, and spontaneous expressions.
          </p>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {OCCASIONS_DATA.map((item) => (
            <div
              key={item.name}
              onClick={() => navigateToShopWithOccasion(item.name as OccasionType)}
              className="group relative aspect-[3/4] rounded-xs overflow-hidden cursor-pointer shadow-sm"
            >
              {/* Category Floral Image with Zoom */}
              <img
                src={item.image}
                alt={`${item.name} floral bouquet delivery`}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Natural Base Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-300" />

              {/* Dark Green Botanical Overlay on Hover */}
              <div className="absolute inset-0 bg-[#12372A]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5" />

              {/* Normal State Bottom Title */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 transition-transform duration-300 group-hover:translate-y-[-8px]">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                  {item.name}
                </h3>
                <span className="text-[11px] text-[#A8BFA8] block sm:hidden font-medium">
                  Tap to view &rarr;
                </span>
              </div>

              {/* Hover Detailed Content Reveal */}
              <div className="absolute inset-0 p-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end text-left pointer-events-none">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C6A15B] mb-1">
                  Collection
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-[#F8F5ED]/90 line-clamp-2 leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C6A15B]">
                  <span>Explore Blooms</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for Occasions page */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('occasions')}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#12372A]/30 hover:border-[#12372A] text-xs font-semibold uppercase tracking-wider text-[#12372A] rounded-xs transition-colors cursor-pointer"
          >
            <span>Browse Full Occasions Guide</span>
            <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
          </button>
        </div>
      </div>
    </section>
  );
};
