import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight, Flower2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { aboutCraftImg, heroFloral, customBannerImg } from '../../data/products';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#F8F5ED] min-h-screen pb-24">
      
      {/* Editorial Hero Header */}
      <div className="relative py-20 bg-[#12372A] text-[#F8F5ED] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={aboutCraftImg}
            alt="Artisan florist workshop"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C6A15B] block mb-3">
            Our Atelier & Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Flowers That Speak <br />
            <span className="italic font-light text-[#A8BFA8]">A Universal Language of Love</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#F8F5ED]/80 max-w-2xl mx-auto leading-relaxed">
            Founded with a conviction that floral gifting should feel personal, enduring, and meticulously crafted.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        
        {/* Story Section: Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-4 text-[#18231D]/85 text-sm sm:text-base leading-relaxed">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C6A15B]">
              The Genesis
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#12372A]">
              Born in an Atelier, Not an Industrial Warehouse
            </h2>
            <p>
              Daisy Dreams was established to counter mass-produced, chemically-forced blooms. We believe flowers are living poetry. They commemorate weddings, soothe grief, celebrate milestones, and say what voices cannot.
            </p>
            <p>
              Every morning at 5:00 AM, our botanical curators inspect newly arrived harvests from high-altitude estates in Ecuador, the Nilgiris, and Holland. Only stems meeting our strict standards for stem thickness, petal hydration, and fragrance make it into our arrangements.
            </p>
          </div>

          <div className="md:col-span-6">
            <div className="relative aspect-[4/3] rounded-xs overflow-hidden shadow-xl border border-[#A8BFA8]/40">
              <img
                src={aboutCraftImg}
                alt="Florist hands wrapping delicate stems"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div className="bg-white p-6 border border-[#A8BFA8]/30 rounded-xs">
            <Flower2 className="w-6 h-6 text-[#2F6B4F] mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#12372A] mb-1">
              Ethical & Sustainable Stems
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We collaborate exclusively with Rainforest Alliance and MPS-certified growers who uphold fair wages and regenerative soil practices.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#A8BFA8]/30 rounded-xs">
            <ShieldCheck className="w-6 h-6 text-[#2F6B4F] mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#12372A] mb-1">
              Zero Floral Foam Promise
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Traditional green foam takes 500 years to break down. We use compostable hydration pouches, wood wool, and Japanese spiraling techniques.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#A8BFA8]/30 rounded-xs">
            <Heart className="w-6 h-6 text-[#2F6B4F] mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#12372A] mb-1">
              Calligraphy & Touch
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Never a generic printed barcode label. Every greeting note is hand-penned by our in-house calligrapher on 300 GSM cotton rag paper.
            </p>
          </div>
        </div>

        {/* Full-width quote block */}
        <div className="p-8 sm:p-12 bg-white border border-[#A8BFA8]/40 rounded-xs text-center">
          <p className="font-serif text-xl sm:text-2xl italic text-[#12372A] max-w-2xl mx-auto leading-relaxed">
            "To send flowers is to send a quiet piece of your own heart. We treat every arrangement with the reverence that moment deserves."
          </p>
          <span className="text-xs uppercase font-bold tracking-widest text-[#C6A15B] block mt-4">
            Master Florist & Creative Director · Daisy Dreams
          </span>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-4 bg-[#12372A] hover:bg-[#2F6B4F] text-[#F8F5ED] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
          </button>
        </div>

      </div>
    </div>
  );
};
