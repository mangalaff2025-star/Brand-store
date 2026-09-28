import React, { useMemo } from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useShop } from '../../context/ShopContext';
import { OccasionType, FlowerType } from '../../types';

export const ShopPage: React.FC = () => {
  const {
    selectedOccasionFilter,
    setSelectedOccasionFilter,
    selectedFlowerFilter,
    setSelectedFlowerFilter,
    selectedPriceFilter,
    setSelectedPriceFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    navigateTo
  } = useShop();

  const OCCASIONS: (OccasionType | 'All')[] = [
    'All',
    'Birthday',
    'Anniversary',
    'Love & Romance',
    'Congratulations',
    'Thank You',
    'Get Well Soon',
    'Friendship',
    'Just Because',
  ];

  const FLOWER_TYPES: (FlowerType | 'All')[] = [
    'All',
    'Roses',
    'Peonies',
    'Ranunculus',
    'Lilies',
    'Hydrangeas',
    'Carnations',
    'Orchids',
    'Mixed Garden',
  ];

  const PRICE_RANGES = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹2,000', value: 'under-2000' },
    { label: '₹2,000 – ₹3,000', value: '2000-3000' },
    { label: '₹3,000 – ₹4,000', value: '3000-4000' },
    { label: 'Above ₹4,000', value: 'above-4000' },
  ];

  // Filtering and sorting
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSub = product.subtitle.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesFlowers = product.flowersIncluded.some((f) => f.toLowerCase().includes(q));
        if (!matchesName && !matchesSub && !matchesDesc && !matchesFlowers) {
          return false;
        }
      }

      // Occasion filter
      if (selectedOccasionFilter !== 'All') {
        if (!product.occasion.includes(selectedOccasionFilter)) {
          return false;
        }
      }

      // Flower type filter
      if (selectedFlowerFilter !== 'All') {
        if (!product.flowerTypes.includes(selectedFlowerFilter)) {
          return false;
        }
      }

      // Price filter
      if (selectedPriceFilter !== 'All') {
        if (selectedPriceFilter === 'under-2000' && product.price >= 2000) return false;
        if (selectedPriceFilter === '2000-3000' && (product.price < 2000 || product.price > 3000)) return false;
        if (selectedPriceFilter === '3000-4000' && (product.price < 3000 || product.price > 4000)) return false;
        if (selectedPriceFilter === 'above-4000' && product.price <= 4000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return 0; // featured default
    });
  }, [searchQuery, selectedOccasionFilter, selectedFlowerFilter, selectedPriceFilter, sortBy]);

  const activeFiltersCount =
    (selectedOccasionFilter !== 'All' ? 1 : 0) +
    (selectedFlowerFilter !== 'All' ? 1 : 0) +
    (selectedPriceFilter !== 'All' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedOccasionFilter('All');
    setSelectedFlowerFilter('All');
    setSelectedPriceFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="bg-[#F8F5ED] min-h-screen pb-24">
      
      {/* Editorial Page Header */}
      <div className="bg-white border-b border-[#A8BFA8]/20 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C6A15B] block mb-2">
            The Atelier Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#12372A] tracking-tight">
            Shop Our Bouquets
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#18231D]/80">
            Find the perfect flowers for every feeling and every occasion. Handcrafted daily with morning-cut blooms.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Search Bar + Sort Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#18231D]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roses, lilies, peonies, birthday..."
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#A8BFA8]/30 focus:border-[#2F6B4F] focus:outline-none rounded-xs text-sm text-[#18231D] placeholder-[#18231D]/45"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector & Active Filters Clear */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#2F6B4F] hover:text-[#12372A] underline cursor-pointer"
              >
                Clear all filters ({activeFiltersCount})
              </button>
            )}

            <div className="flex items-center gap-2 bg-white border border-[#A8BFA8]/30 px-3 py-2 rounded-xs text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#2F6B4F]" />
              <span className="text-[#18231D]/70 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#12372A] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Atelier Picks</option>
                <option value="popular">Most Loved & Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filters Filter-Bar (Clean segmented controls, functional button tabs) */}
        <div className="bg-white border border-[#A8BFA8]/25 p-4 rounded-xs mb-8 space-y-4 shadow-xs">
          
          {/* Occasion Filter Tabs */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#12372A] block mb-2">
              Occasion
            </span>
            <div className="flex flex-wrap gap-1.5">
              {OCCASIONS.map((occ) => {
                const isActive = selectedOccasionFilter === occ;
                return (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasionFilter(occ)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#12372A] text-white shadow-xs'
                        : 'bg-[#F8F5ED] text-[#18231D]/80 hover:bg-[#A8BFA8]/20 hover:text-[#12372A]'
                    }`}
                  >
                    {occ}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Filters Grid: Flower Type & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#A8BFA8]/20">
            {/* Flower Type */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#12372A] block mb-2">
                Flower Variety
              </span>
              <div className="flex flex-wrap gap-1.5">
                {FLOWER_TYPES.map((flower) => {
                  const isActive = selectedFlowerFilter === flower;
                  return (
                    <button
                      key={flower}
                      onClick={() => setSelectedFlowerFilter(flower)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#2F6B4F] text-white'
                          : 'bg-[#F8F5ED] text-[#18231D]/80 hover:bg-[#A8BFA8]/20'
                      }`}
                    >
                      {flower}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#12372A] block mb-2">
                Price Budget
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRICE_RANGES.map((pr) => {
                  const isActive = selectedPriceFilter === pr.value;
                  return (
                    <button
                      key={pr.value}
                      onClick={() => setSelectedPriceFilter(pr.value)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#2F6B4F] text-white'
                          : 'bg-[#F8F5ED] text-[#18231D]/80 hover:bg-[#A8BFA8]/20'
                      }`}
                    >
                      {pr.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter & Active Criteria */}
        <div className="flex items-center justify-between text-xs text-[#18231D]/70 mb-6 px-1">
          <span>
            Showing <strong className="text-[#12372A] tabular-nums">{filteredProducts.length}</strong> handcrafted arrangements
          </span>
          <span className="hidden sm:inline text-[#A8BFA8]">
            All bouquets include complimentary greeting card & flower food sachet
          </span>
        </div>

        {/* Product Grid: 4 columns desktop, 2 columns tablet, 1-2 columns mobile */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#A8BFA8]/30 rounded-xs p-8 max-w-lg mx-auto">
            <span className="font-serif text-2xl font-bold text-[#12372A] block mb-2">
              No matching bouquets found
            </span>
            <p className="text-sm text-[#18231D]/70 mb-6">
              We couldn't find any bouquets matching your current filters. Try resetting the filters or create a custom bouquet.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-[#12372A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-[#2F6B4F]"
              >
                Reset Filters
              </button>
              <button
                onClick={() => navigateTo('custom-bouquet')}
                className="px-5 py-2.5 border border-[#C6A15B] text-[#12372A] text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-[#C6A15B]/15"
              >
                Build Custom Bouquet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
