import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, MapPin, ChevronRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Navbar: React.FC = () => {
  const {
    activePage,
    navigateTo,
    cart,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsTrackOrderOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Home', page: 'home' as const },
    { label: 'Shop', page: 'shop' as const },
    { label: 'Occasions', page: 'occasions' as const },
    { label: 'Custom Bouquet', page: 'custom-bouquet' as const },
    { label: 'About Us', page: 'about' as const },
    { label: 'Contact', page: 'contact' as const },
  ];

  return (
    <>
      {/* Top Trust Banner */}
      <div className="bg-[#12372A] text-[#F8F5ED] text-xs py-2 px-4 border-b border-[#2F6B4F]/30 tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B] animate-pulse"></span>
            <span className="text-[#A8BFA8]">Hand-tied luxury floral delivery across India</span>
          </div>
          <div className="w-full sm:w-auto text-center font-medium">
            <span>Complimentary Same-Day Chilled Delivery on Orders Above ₹2,499</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsTrackOrderOpen(true)}
              className="text-[#A8BFA8] hover:text-[#C6A15B] transition-colors cursor-pointer"
            >
              Track Order
            </button>
            <span className="text-[#2F6B4F]">|</span>
            <span className="text-[#A8BFA8]">Concierge: +91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F5ED]/95 backdrop-blur-md shadow-sm border-b border-[#A8BFA8]/20 py-3.5'
            : 'bg-[#F8F5ED] border-b border-[#A8BFA8]/15 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Zone 1: Mobile Hamburger + Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[#12372A] hover:text-[#2F6B4F] transition-colors focus:outline-none focus:ring-1 focus:ring-[#2F6B4F]"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[1.75]" />
              </button>

              <button
                onClick={() => navigateTo('home')}
                className="text-left group cursor-pointer focus:outline-none"
              >
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#12372A] group-hover:text-[#2F6B4F] transition-colors">
                  Daisy Dreams
                </span>
              </button>
            </div>

            {/* Zone 2: Desktop Navigation Links (Clean single-line prose, no capsules) */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#18231D]">
              {navLinks.map((link) => {
                const isActive = activePage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => navigateTo(link.page)}
                    className={`relative py-1 transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-[#12372A] font-semibold'
                        : 'text-[#18231D]/80 hover:text-[#2F6B4F]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6A15B] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Interactive Affordances (Search, Wishlist, Cart) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#18231D] hover:text-[#2F6B4F] hover:bg-[#A8BFA8]/15 rounded-full transition-colors cursor-pointer"
                title="Search bouquets"
                aria-label="Search bouquets"
              >
                <Search className="w-5 h-5 stroke-[1.75]" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-[#18231D] hover:text-[#2F6B4F] hover:bg-[#A8BFA8]/15 rounded-full transition-colors cursor-pointer"
                title="Saved Bouquets"
                aria-label="Saved Bouquets"
              >
                <Heart className="w-5 h-5 stroke-[1.75]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#C6A15B] text-white text-[10px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#12372A] hover:text-[#2F6B4F] hover:bg-[#A8BFA8]/15 rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                {totalCartCount > 0 ? (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#12372A] text-[#F8F5ED] text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums ring-1 ring-white">
                    {totalCartCount}
                  </span>
                ) : null}
              </button>

              {/* Primary Header Action on Desktop */}
              <button
                onClick={() => navigateTo('custom-bouquet')}
                className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#12372A] bg-[#C6A15B]/20 hover:bg-[#C6A15B]/30 border border-[#C6A15B]/40 rounded-sm transition-colors cursor-pointer ml-1 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
                Custom Bloom
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-[#F8F5ED] h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-5 border-b border-[#A8BFA8]/30">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#12372A]">
                  Daisy Dreams
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#18231D] hover:text-[#2F6B4F] rounded-full"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 stroke-[1.75]" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="mt-6 flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const isActive = activePage === link.page;
                  return (
                    <button
                      key={link.page}
                      onClick={() => {
                        navigateTo(link.page);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between text-left py-2 text-base font-medium transition-colors ${
                        isActive
                          ? 'text-[#12372A] font-semibold pl-2 border-l-2 border-[#C6A15B]'
                          : 'text-[#18231D] hover:text-[#2F6B4F]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-[#A8BFA8]" />
                    </button>
                  );
                })}
              </nav>

              {/* Extra Utility Links */}
              <div className="mt-8 pt-6 border-t border-[#A8BFA8]/20 space-y-3 text-sm">
                <button
                  onClick={() => {
                    setIsTrackOrderOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-[#2F6B4F] hover:text-[#12372A]"
                >
                  <MapPin className="w-4 h-4 text-[#C6A15B]" />
                  <span>Track Your Delivery</span>
                </button>
                <div className="text-xs text-[#18231D]/70 pt-2">
                  <span>Customer Support: </span>
                  <a href="tel:+919876543210" className="text-[#12372A] font-semibold underline">
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Custom Bouquet CTA in drawer */}
            <div className="pt-6 border-t border-[#A8BFA8]/20">
              <button
                onClick={() => {
                  navigateTo('custom-bouquet');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 bg-[#12372A] text-[#F8F5ED] text-sm font-semibold rounded-sm shadow hover:bg-[#2F6B4F] transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                Design Bespoke Bouquet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
