import React from 'react';
import { Sparkles, ArrowRight, Palette, Scissors, CalendarCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { customBannerImg } from '../../data/products';

export const CustomBouquetPromo: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="relative py-24 bg-[#12372A] text-[#F8F5ED] overflow-hidden">
      {/* Background Floral Flatlay with Deep Forest Overlay */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src={customBannerImg}
          alt="Artisanal flatlay of fresh cut blooms, satin ribbons and craft wrapping paper"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12372A] via-[#12372A]/90 to-[#12372A]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & CTA Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2F6B4F]/40 border border-[#C6A15B]/30 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-[#C6A15B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Floral Studio</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
              Make It Truly Yours.
            </h2>

            <p className="text-base sm:text-lg text-[#A8BFA8] max-w-xl leading-relaxed font-light">
              Choose your flowers, colors and style. We'll turn your idea into a bouquet made just for them.
            </p>

            {/* Micro Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-2 pb-2 border-y border-[#2F6B4F]/50 text-xs">
              <div className="flex flex-col gap-1">
                <Palette className="w-4 h-4 text-[#C6A15B]" />
                <span className="font-semibold text-white">Pick Palette</span>
                <span className="text-[#A8BFA8]">5 bespoke color stories</span>
              </div>
              <div className="flex flex-col gap-1">
                <Scissors className="w-4 h-4 text-[#C6A15B]" />
                <span className="font-semibold text-white">Select Stems</span>
                <span className="text-[#A8BFA8]">Grade-A live varieties</span>
              </div>
              <div className="flex flex-col gap-1">
                <CalendarCheck className="w-4 h-4 text-[#C6A15B]" />
                <span className="font-semibold text-white">Choose Date</span>
                <span className="text-[#A8BFA8]">Scheduled or same-day</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('custom-bouquet')}
                className="px-8 py-4 bg-[#C6A15B] hover:bg-[#d8b56f] text-[#12372A] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xs transition-all shadow-lg hover:shadow-xl cursor-pointer inline-flex items-center gap-2.5 group"
              >
                <span>Create Your Bouquet</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Visual Frame (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative p-2 bg-[#2F6B4F]/30 border border-[#C6A15B]/40 rounded-xs shadow-2xl backdrop-blur-xs">
              <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded-xs relative">
                <img
                  src={customBannerImg}
                  alt="Custom bouquet stems on atelier green workbench"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#12372A]/90 backdrop-blur-md border border-[#A8BFA8]/20 rounded-xs text-xs">
                  <p className="font-serif text-sm font-semibold text-white">
                    Live Bouquet Configurator
                  </p>
                  <p className="text-[#A8BFA8] mt-0.5">
                    Customize stem counts, luxury wrap parchment & calligraphy note in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
