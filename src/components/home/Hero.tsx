import React from 'react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { heroFloral } from '../../data/products';

export const Hero: React.FC = () => {
  const { navigateTo } = useShop();

  const handleScrollDown = () => {
    const el = document.getElementById('featured-collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('shop');
    }
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#12372A] text-[#F8F5ED]">
      {/* Background Image with Scrim and Subtle Zoom */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroFloral}
          alt="Fresh luxury English garden roses and ranunculus bouquet with eucalyptus"
          className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.05] scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        {/* Subtle Botanical Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12372A]/90 via-[#12372A]/60 to-black/35 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#12372A]/80" />
      </div>

      {/* Floating Botanical Leaf SVG Accents */}
      <div className="absolute top-12 left-8 w-24 h-24 opacity-15 pointer-events-none text-[#A8BFA8] hidden md:block">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C60 30, 90 40, 100 50 C70 60, 60 90, 50 100 C40 70, 10 60, 0 50 C30 40, 40 10, 50 0 Z" />
        </svg>
      </div>
      <div className="absolute bottom-16 right-10 w-32 h-32 opacity-10 pointer-events-none text-[#C6A15B] hidden md:block">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 8" />
        </svg>
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Subtle Pre-title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#C6A15B] border border-[#C6A15B]/30 rounded-full bg-[#12372A]/60 backdrop-blur-xs mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier Floral & Chilled Delivery</span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.08] max-w-4xl text-balance">
          Flowers That Speak <br />
          <span className="italic font-light text-[#F8F5ED]">Without Words.</span>
        </h1>

        {/* Supporting Editorial Paragraph */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#F8F5ED]/90 max-w-2xl font-light leading-relaxed text-balance">
          Thoughtfully crafted bouquets for birthdays, celebrations, anniversaries, love and every beautiful moment.
        </p>

        {/* Dual CTA Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary CTA */}
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-8 py-4 bg-[#C6A15B] hover:bg-[#d8b56f] text-[#12372A] font-semibold text-sm tracking-wider uppercase rounded-xs transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Shop Bouquets</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => navigateTo('custom-bouquet')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-[#F8F5ED] hover:text-white border border-[#F8F5ED]/40 hover:border-white font-medium text-sm tracking-wider uppercase rounded-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Create Your Bouquet</span>
          </button>
        </div>

        {/* Quiet Delivery Micro-Note */}
        <div className="mt-8 flex items-center gap-2 text-xs text-[#A8BFA8]">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Same-day hand delivery available today in major metro cities</span>
        </div>

        {/* Smooth Scroll Down Indicator */}
        <button
          onClick={handleScrollDown}
          className="mt-14 p-2 text-[#A8BFA8] hover:text-white transition-colors cursor-pointer flex flex-col items-center gap-1 group"
          aria-label="Scroll to featured collection"
        >
          <span className="text-[11px] tracking-widest uppercase font-light text-[#A8BFA8] group-hover:text-white">
            Explore
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#C6A15B]" />
        </button>
      </div>
    </section>
  );
};
