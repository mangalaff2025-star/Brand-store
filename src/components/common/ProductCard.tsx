import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
  badge?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, badge }) => {
  const { navigateTo, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const effectiveBadge = badge || product.badge;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'Standard', 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => navigateTo('product-detail', product)}
      className="group relative flex flex-col bg-white border border-[#A8BFA8]/25 rounded-xs overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      {/* Image Container with Zoom & Ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8F5ED]">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#12372A]/10 to-[#A8BFA8]/20 p-6 text-center">
            <span className="font-serif text-xl font-bold text-[#12372A]">{product.name}</span>
            <span className="text-xs text-[#2F6B4F] mt-1">{product.subtitle}</span>
          </div>
        )}

        {/* Minimal Unboxed Text Badge (Allowed minimal styling) */}
        {effectiveBadge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-[#12372A]/90 backdrop-blur-xs text-[#F8F5ED] rounded-xs shadow-xs">
              {effectiveBadge}
            </span>
          </div>
        )}

        {/* Wishlist Button (Always accessible) */}
        <button
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFavorited
              ? 'bg-[#C6A15B] text-white'
              : 'bg-white/80 text-[#18231D] hover:bg-white hover:text-[#C6A15B]'
          } shadow-xs`}
        >
          <Heart
            className="w-4 h-4 stroke-[2]"
            fill={isFavorited ? 'currentColor' : 'none'}
          />
        </button>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 bg-[#12372A] hover:bg-[#2F6B4F] text-[#F8F5ED] text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('product-detail', product);
            }}
            title="Inspect Details"
            className="p-2 bg-white/90 hover:bg-white text-[#12372A] rounded-xs transition-colors shadow-md"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Metadata & Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        
        {/* Rating and Reviews (Clean unboxed typography) */}
        <div className="flex items-center gap-1.5 text-xs text-[#18231D]/70 mb-1.5">
          <div className="flex items-center text-[#C6A15B]">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-semibold text-[#18231D] tabular-nums">{product.rating}</span>
          <span aria-hidden="true" className="text-[#A8BFA8]">·</span>
          <span className="tabular-nums">({product.reviewCount} reviews)</span>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#12372A] group-hover:text-[#2F6B4F] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Short Editorial Description */}
        <p className="text-xs text-[#18231D]/75 line-clamp-2 mt-1 mb-3 leading-relaxed">
          {product.subtitle || product.description}
        </p>

        {/* Price & Primary CTA Footer */}
        <div className="mt-auto pt-3 border-t border-[#A8BFA8]/20 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold text-[#12372A] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#18231D]/45 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <span className="text-xs font-semibold text-[#2F6B4F] group-hover:text-[#12372A] group-hover:underline transition-colors flex items-center gap-1">
            Details &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
