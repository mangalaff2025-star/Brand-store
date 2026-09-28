import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { aboutCraftImg } from '../../data/products';

export const AboutBrand: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-24 bg-white border-b border-[#A8BFA8]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Large Editorial Image Frame (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/3] rounded-xs overflow-hidden shadow-xl border border-[#A8BFA8]/30">
              <img
                src={aboutCraftImg}
                alt="Florist hands carefully arranging blush peonies and scented foliage in atelier"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Subtle Editorial Accent Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 p-5 bg-[#12372A] text-[#F8F5ED] rounded-xs max-w-xs shadow-2xl border border-[#2F6B4F]">
              <div className="flex items-center gap-1.5 text-[#C6A15B] text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Atelier Philosophy</span>
              </div>
              <p className="font-serif text-sm leading-snug">
                "Zero plastic floral foam. Only organic botanicals, wet cotton wraps, and recyclable paper."
              </p>
            </div>
          </div>

          {/* Right: Editorial Content (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-[0.2em] text-[#C6A15B]">
              <span>About Our Brand</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12372A] tracking-tight leading-tight">
              Flowers, Thoughtfully Crafted.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#18231D]/80 leading-relaxed font-normal">
              <p>
                We believe flowers are more than just gifts. They carry emotions, memories and moments that deserve to be remembered.
              </p>
              <p>
                Every bouquet is thoughtfully arranged using fresh flowers, beautiful textures and carefully selected colors to create something truly special.
              </p>
            </div>

            {/* Core Values Bullets */}
            <div className="pt-2 space-y-2.5 text-sm text-[#12372A]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2F6B4F]" />
                <span className="font-medium">Direct relationships with certified sustainable growers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2F6B4F]" />
                <span className="font-medium">Curated French wrapping paper & pure silk ribbons</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2F6B4F]" />
                <span className="font-medium">Temperature-calibrated delivery across metropolitan hubs</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('about')}
                className="px-6 py-3.5 bg-[#12372A] hover:bg-[#2F6B4F] text-[#F8F5ED] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer inline-flex items-center gap-2 group"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C6A15B]" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
