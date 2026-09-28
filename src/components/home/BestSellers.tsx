import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useShop } from '../../context/ShopContext';

export const BestSellers: React.FC = () => {
  const { navigateTo } = useShop();

  // Pick top loved bouquets with badges
  const bestSellers = PRODUCTS.filter((p) => p.badge !== undefined).slice(0, 4);

  return (
    <section className="py-20 bg-[#F8F5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-semibold tracking-[0.2em] text-[#C6A15B] mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12372A] tracking-tight">
              Most Loved Bouquets
            </h2>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#12372A] hover:text-[#2F6B4F] group cursor-pointer"
          >
            <span>See All Favorites</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C6A15B]" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
