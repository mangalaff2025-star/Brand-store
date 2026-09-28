import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { OCCASIONS_DATA } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { OccasionType } from '../../types';

export const OccasionsPage: React.FC = () => {
  const { navigateToShopWithOccasion, navigateTo } = useShop();

  return (
    <div className="bg-[#F8F5ED] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-[#A8BFA8]/20 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C6A15B] block mb-2">
            Curated Gifting Guide
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#12372A] tracking-tight">
            Florals For Every Occasion
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#18231D]/80 leading-relaxed">
            Every sentiment deserves its own floral language. Browse our dedicated collections curated for life's most meaningful moments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {OCCASIONS_DATA.map((occ) => (
            <div
              key={occ.name}
              onClick={() => navigateToShopWithOccasion(occ.name as OccasionType)}
              className="group bg-white border border-[#A8BFA8]/30 rounded-xs overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F5ED]">
                  <img
                    src={occ.image}
                    alt={occ.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-[#F8F5ED] tracking-wide">
                    {occ.stemHighlight}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-[#12372A] group-hover:text-[#2F6B4F] transition-colors">
                    {occ.name}
                  </h3>
                  <p className="text-xs text-[#18231D]/75 mt-2 leading-relaxed">
                    {occ.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-[#A8BFA8]/20 flex items-center justify-between text-xs font-semibold text-[#2F6B4F] group-hover:text-[#12372A]">
                  <span>Explore {occ.name} Bouquets</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Builder Banner */}
        <div className="mt-16 p-8 sm:p-10 bg-[#12372A] text-[#F8F5ED] rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#C6A15B] block mb-1">
              Have a Unique Celebration?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Create a Bespoke Stem Combination
            </h3>
            <p className="text-xs sm:text-sm text-[#A8BFA8] mt-1 max-w-xl">
              From intimate engagements to grand galas, customize flower varieties and wrapping styles with our florists.
            </p>
          </div>
          <button
            onClick={() => navigateTo('custom-bouquet')}
            className="px-6 py-3.5 bg-[#C6A15B] hover:bg-[#d8b56f] text-[#12372A] text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer shrink-0"
          >
            Launch Builder
          </button>
        </div>
      </div>
    </div>
  );
};
