import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useShop } from '../../context/ShopContext';

export const FeaturedCollection: React.FC = () => {
  const { navigateTo } = useShop();

  // Get the 8 specific bouquets requested
  const featuredIds = [
    'classic-rose-bouquet',
    'forever-love',
    'pastel-dream',
    'elegant-white',
    'sunshine-bouquet',
    'luxury-red-roses',
    'birthday-bloom',
    'sweet-romance',
  ];

  const featuredProducts = PRODUCTS.filter((p) => featuredIds.includes(p.id));

  return (
    <section id="featured-collection" className="py-20 bg-[#F8F5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#C6A15B] block mb-2">
              Curated Atelier Edits
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12372A] tracking-tight">
              Made For Beautiful Moments
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#18231D]/80 leading-relaxed">
              Handcrafted bouquets designed to make every occasion unforgettable.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#12372A] hover:text-[#2F6B4F] group cursor-pointer"
          >
            <span>View All Bouquets</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C6A15B]" />
          </button>
        </div>

        {/* 4-column desktop, 2-column tablet/mobile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
