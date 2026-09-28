import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    navigateTo
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5ED] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#A8BFA8]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C6A15B]" fill="currentColor" />
              <h2 className="font-serif text-xl font-bold text-[#12372A]">
                Saved Bouquets ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-gray-500 hover:text-gray-900 rounded-full"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-3.5 rounded-xs border border-[#A8BFA8]/30 flex gap-3 shadow-xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-xs shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      navigateTo('product-detail', product);
                    }}
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            navigateTo('product-detail', product);
                          }}
                          className="font-serif text-sm font-bold text-[#12372A] truncate hover:text-[#2F6B4F] cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-gray-400 hover:text-rose-600 p-0.5"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate">{product.subtitle}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-serif text-sm font-bold text-[#12372A] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(product, 'Standard', 1);
                        }}
                        className="px-3 py-1 bg-[#12372A] hover:bg-[#2F6B4F] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-gray-500 space-y-3">
                <Heart className="w-12 h-12 text-[#A8BFA8] mx-auto stroke-[1.2]" />
                <p className="font-serif text-lg text-[#12372A]">No saved bouquets yet</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Click the heart icon on any bouquet to save it for your next special occasion.
                </p>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-5 bg-white border-t border-[#A8BFA8]/20">
            <button
              onClick={() => {
                setIsWishlistOpen(false);
                navigateTo('shop');
              }}
              className="w-full py-3 bg-[#12372A] hover:bg-[#2F6B4F] text-[#F8F5ED] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore All Bouquets</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B]" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
