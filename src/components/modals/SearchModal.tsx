import React, { useState } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useShop();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.flowerTypes.some((f) => f.toLowerCase().includes(q)) ||
          p.occasion.some((o) => o.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelectProduct = (product: any) => {
    setIsSearchOpen(false);
    navigateTo('product-detail', product);
  };

  const quickSearches = ['Roses', 'Peonies', 'Birthday', 'Anniversary', 'Lilies', 'Hydrangeas'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="bg-[#F8F5ED] w-full max-w-2xl rounded-xs shadow-2xl overflow-hidden border border-[#A8BFA8]/40">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#A8BFA8]/20 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#2F6B4F]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bouquets, flower types, occasions..."
            className="w-full text-base sm:text-lg bg-transparent focus:outline-none text-[#12372A] placeholder-gray-400 font-serif"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-gray-400 hover:text-gray-800"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick searches chips */}
        <div className="px-5 py-3 bg-[#F8F5ED] border-b border-[#A8BFA8]/20 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-gray-500 font-medium whitespace-nowrap">Suggested:</span>
          {quickSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 bg-white hover:bg-[#2F6B4F] hover:text-white border border-[#A8BFA8]/30 rounded-xs text-[#12372A] transition-colors cursor-pointer whitespace-nowrap"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() ? (
            results.length > 0 ? (
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  Matching Bouquets ({results.length})
                </span>
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="p-3 bg-white rounded-xs border border-[#A8BFA8]/30 hover:border-[#12372A] transition-colors flex items-center gap-3 cursor-pointer group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-xs shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base font-bold text-[#12372A] group-hover:text-[#2F6B4F]">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">{product.subtitle}</p>
                      <div className="flex items-center gap-1 text-xs text-[#C6A15B] mt-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-semibold text-gray-800">{product.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-serif font-bold text-[#12372A] text-sm tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[11px] text-[#2F6B4F] group-hover:underline">
                        View &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500 text-sm">
                No bouquets found for "{query}". Try searching for roses, lilies or birthdays.
              </div>
            )
          ) : (
            <div className="text-center py-8 text-xs text-gray-500">
              Type to instantly find curated hand-tied arrangements.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
