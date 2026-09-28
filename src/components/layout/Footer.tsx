import React, { useState } from 'react';
import { ArrowUpRight, Heart, ShieldCheck, Truck, RefreshCw, MessageSquare } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo, setIsTrackOrderOpen, setSelectedOccasionFilter, addToast } = useShop();
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const handleShopLink = (filter?: string) => {
    if (filter) {
      setSelectedOccasionFilter(filter as any);
    }
    navigateTo('shop');
  };

  return (
    <footer className="bg-[#12372A] text-[#F8F5ED] pt-16 pb-12 border-t border-[#2F6B4F]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges / Guarantees Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#2F6B4F]/40 text-xs">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#C6A15B] shrink-0" />
            <div>
              <p className="font-semibold text-white">Chilled Courier Delivery</p>
              <p className="text-[#A8BFA8]">In custom protective boxes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C6A15B] shrink-0" />
            <div>
              <p className="font-semibold text-white">7-Day Freshness Promise</p>
              <p className="text-[#A8BFA8]">Hand-selected morning harvest</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-[#C6A15B] shrink-0" />
            <div>
              <p className="font-semibold text-white">Artisan Florist Hand-Tied</p>
              <p className="text-[#A8BFA8]">Each stem inspected</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-[#C6A15B] shrink-0" />
            <div>
              <p className="font-semibold text-white">Dedicated Florist Support</p>
              <p className="text-[#A8BFA8]">7 days a week concierge</p>
            </div>
          </div>
        </div>

        {/* Multi-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => navigateTo('home')}
              className="text-left cursor-pointer group"
            >
              <span className="font-serif text-3xl font-bold tracking-tight text-white group-hover:text-[#C6A15B] transition-colors">
                Daisy Dreams
              </span>
            </button>
            <p className="text-sm text-[#A8BFA8] leading-relaxed max-w-sm">
              An atelier dedicated to the poetic art of floral gifting. Handcrafting bespoke bouquets 
              with pristine garden blooms, wrapped in luxury linens and delivered with white-glove care.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-[#C6A15B] font-semibold block mb-1">
                Atelier Location
              </span>
              <p className="text-xs text-[#F8F5ED]/80">
                14 Botanica Boulevard, Design Quarter, New Delhi 110001
              </p>
            </div>
          </div>

          {/* Column 2: Shop (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-lg text-white font-medium tracking-wide">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8BFA8]">
              <li>
                <button
                  onClick={() => handleShopLink()}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Bouquets
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopLink('Anniversary')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleShopLink('Birthday')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('custom-bouquet')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[#C6A15B]"
                >
                  Custom Bouquet Builder
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('occasions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop By Occasion
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Service (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-lg text-white font-medium tracking-wide">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8BFA8]">
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Florist Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsTrackOrderOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-white"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]"></span>
                  Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyModal('delivery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Delivery Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs & Flower Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story & Craft
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow & Direct Contact (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-lg text-white font-medium tracking-wide">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A8BFA8]">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#C6A15B] transition-colors flex items-center gap-1"
                >
                  Instagram
                  <ArrowUpRight className="w-3 h-3 text-[#A8BFA8]" />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#C6A15B] transition-colors flex items-center gap-1"
                >
                  Facebook
                  <ArrowUpRight className="w-3 h-3 text-[#A8BFA8]" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    addToast('Opening florist WhatsApp chat on +91 98765 43210', 'gold');
                  }}
                  className="hover:text-[#C6A15B] transition-colors flex items-center gap-1 text-[#F8F5ED] cursor-pointer"
                >
                  WhatsApp Concierge
                  <ArrowUpRight className="w-3 h-3 text-[#A8BFA8]" />
                </button>
              </li>
            </ul>

            <div className="pt-3">
              <span className="text-xs text-[#A8BFA8] block">Hours</span>
              <span className="text-xs text-white">8:00 AM – 9:00 PM IST</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 mt-4 border-t border-[#2F6B4F]/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A8BFA8]">
          <p>© 2026 Daisy Dreams. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActivePolicyModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setActivePolicyModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => setActivePolicyModal('refund')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#F8F5ED] text-[#18231D] max-w-lg w-full p-6 sm:p-8 rounded-sm shadow-2xl relative">
            <h3 className="font-serif text-2xl font-bold text-[#12372A] mb-3">
              {activePolicyModal === 'privacy' && 'Privacy Policy'}
              {activePolicyModal === 'terms' && 'Terms & Conditions'}
              {activePolicyModal === 'refund' && 'Refund & Freshness Guarantee'}
              {activePolicyModal === 'delivery' && 'Delivery Information'}
            </h3>
            <div className="text-sm text-[#18231D]/80 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-2">
              {activePolicyModal === 'delivery' && (
                <>
                  <p><strong>Same-Day Delivery:</strong> Orders placed before 4:00 PM IST qualify for same-day hand-delivery across supported pin codes.</p>
                  <p><strong>Temperature Control:</strong> All arrangements travel in customized chilled floral carriers with wet floral hydration wraps at the stem base.</p>
                  <p><strong>Slots:</strong> Choose from Morning (9 AM - 1 PM), Afternoon (1 PM - 5 PM), Evening (5 PM - 9 PM) or Midnight (11:30 PM - 12:15 AM).</p>
                </>
              )}
              {activePolicyModal === 'refund' && (
                <>
                  <p><strong>7-Day Freshness Guarantee:</strong> If your blooms do not remain vibrant for at least 7 days with proper care instructions followed, our head florist will replace the bouquet free of charge.</p>
                  <p><strong>Damaged in Transit:</strong> Report any courier damage with a photograph within 12 hours of delivery for an instant replacement or 100% refund.</p>
                </>
              )}
              {activePolicyModal === 'privacy' && (
                <>
                  <p>We respect your privacy. Personal gift messages, recipient phone numbers, and delivery addresses are strictly used only for order fulfillment and never shared with third-party marketers.</p>
                  <p>All payments are processed through PCI-DSS Level 1 compliant secure gateways.</p>
                </>
              )}
              {activePolicyModal === 'terms' && (
                <>
                  <p>By placing an order on Daisy Dreams, you agree to our standard gifting terms. Seasonal flower stem availability may vary slightly; our florists reserve the right to substitute with blooms of equal or higher luxury value.</p>
                </>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-[#A8BFA8]/30 flex justify-end">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="px-5 py-2 bg-[#12372A] text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-[#2F6B4F]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
