import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Plus,
  Minus,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Info,
  Gift
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { customBannerImg, heroFloral } from '../../data/products';
import { BouquetSize, CartItem } from '../../types';

interface FlowerOption {
  id: string;
  name: string;
  pricePerStem: number;
  description: string;
  color: string;
}

const AVAILABLE_FLOWERS: FlowerOption[] = [
  { id: 'roses', name: 'Ecuadorian Velvet Roses', pricePerStem: 120, description: 'Velvety, long-lasting romantic crimson blooms', color: 'bg-rose-700' },
  { id: 'peonies', name: 'Blush Sarah Bernhardt Peonies', pricePerStem: 220, description: 'Lush fragrant ruffled petals', color: 'bg-pink-300' },
  { id: 'ranunculus', name: 'Paper White Ranunculus', pricePerStem: 140, description: 'Delicate layers of pure botanical texture', color: 'bg-amber-100' },
  { id: 'lilies', name: 'Casablanca Scented Lilies', pricePerStem: 180, description: 'Star-shaped majestic fragrant blooms', color: 'bg-stone-200' },
  { id: 'hydrangeas', name: 'Dutch Cloud Hydrangeas', pricePerStem: 280, description: 'Voluminous spherical statement blossoms', color: 'bg-sky-200' },
  { id: 'eucalyptus', name: 'Silver Dollar Eucalyptus', pricePerStem: 60, description: 'Crisp aromatic silver-blue foliage', color: 'bg-emerald-700' },
];

const PALETTES = [
  { id: 'classic-crimson', name: 'Classic Crimson & Sage', desc: 'Deep reds, burgundy accents & silver eucalyptus', shades: ['#800020', '#C6A15B', '#2F6B4F'] },
  { id: 'blush-pastel', name: 'Blush & Champagne Pastels', desc: 'Soft ballet pink, peach blossoms & ivory', shades: ['#FAD2E1', '#FBF8CC', '#B5E2FA'] },
  { id: 'pure-white', name: 'Pure White & Botanical Emerald', desc: 'Immaculate white lilies, ranunculus & forest foliage', shades: ['#FFFFFF', '#A8BFA8', '#12372A'] },
  { id: 'radiant-sunset', name: 'Radiant Amber Sunset', desc: 'Warm marigolds, peach garden roses & honey thistle', shades: ['#F4A261', '#E76F51', '#2A9D8F'] },
];

const WRAPPINGS = [
  { id: 'botanical-forest', name: 'Botanical Forest Linen Wrap', desc: 'Heavyweight matte dark green paper with gold foil seal' },
  { id: 'parchment-cream', name: 'Artisan Cream Parchment', desc: 'Handmade deckle-edge warm ivory parchment' },
  { id: 'sage-kraft', name: 'Raw Sage Eco-Kraft', desc: '100% recyclable textured botanical sage paper' },
];

const RIBBONS = [
  { id: 'gold-silk', name: 'Antique Gold Pure Silk', color: '#C6A15B' },
  { id: 'forest-satin', name: 'Forest Green Double Satin', color: '#12372A' },
  { id: 'champagne-velvet', name: 'Champagne French Velvet', color: '#E8D8C8' },
];

export const CustomBouquetBuilder: React.FC = () => {
  const { addCustomBouquetToCart, navigateTo } = useShop();

  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Flowers & Stems
  const [selectedStems, setSelectedStems] = useState<Record<string, number>>({
    roses: 8,
    peonies: 4,
    ranunculus: 4,
    eucalyptus: 4,
  });

  // Step 2: Palette
  const [selectedPalette, setSelectedPalette] = useState(PALETTES[0].id);

  // Step 3: Size
  const [selectedSize, setSelectedSize] = useState<BouquetSize>('Deluxe');

  // Step 4: Wrap, Ribbon, Message
  const [selectedWrapping, setSelectedWrapping] = useState(WRAPPINGS[0].id);
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBONS[0].id);
  const [giftMessage, setGiftMessage] = useState('');
  const [senderName, setSenderName] = useState('');

  // Step 5: Delivery Date & Slot
  const [deliveryDate, setDeliveryDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [deliverySlot, setDeliverySlot] = useState('Morning (9 AM – 1 PM)');

  // Calculations
  const totalStemsCount = Object.values(selectedStems).reduce((sum, n) => sum + n, 0);

  const flowersBaseCost = AVAILABLE_FLOWERS.reduce((total, flower) => {
    const count = selectedStems[flower.id] || 0;
    return total + count * flower.pricePerStem;
  }, 0);

  let sizeMarkup = 400; // base crafting & packaging
  if (selectedSize === 'Deluxe') sizeMarkup = 650;
  if (selectedSize === 'Grande') sizeMarkup = 950;

  const totalCalculatedPrice = Math.max(1699, flowersBaseCost + sizeMarkup);

  const handleStemChange = (flowerId: string, delta: number) => {
    setSelectedStems((prev) => {
      const current = prev[flowerId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [flowerId]: next };
    });
  };

  const handleCompleteAndAdd = () => {
    const selectedFlowerNames = AVAILABLE_FLOWERS.filter((f) => (selectedStems[f.id] || 0) > 0).map(
      (f) => `${selectedStems[f.id]}× ${f.name}`
    );

    const customItem: CartItem = {
      id: `custom-bouquet-${Date.now()}`,
      productId: 'custom-artisan-bouquet',
      name: `Bespoke Floral Creation (${selectedSize})`,
      image: customBannerImg,
      size: selectedSize,
      price: totalCalculatedPrice,
      quantity: 1,
      deliveryDate,
      deliveryTimeSlot: deliverySlot,
      giftMessage: giftMessage ? `${giftMessage} — From: ${senderName || 'Anonymous'}` : undefined,
      isCustom: true,
      customDetails: {
        flowers: selectedFlowerNames,
        palette: PALETTES.find((p) => p.id === selectedPalette)?.name || 'Custom',
        wrapping: WRAPPINGS.find((w) => w.id === selectedWrapping)?.name || 'Custom Wrap',
        ribbon: RIBBONS.find((r) => r.id === selectedRibbon)?.name || 'Custom Ribbon',
      },
    };

    addCustomBouquetToCart(customItem);
    navigateTo('cart');
  };

  return (
    <div className="bg-[#F8F5ED] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2F6B4F]/15 text-[#12372A] rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Interactive Atelier</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12372A] tracking-tight">
            Custom Bouquet Builder
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#18231D]/80">
            Handpick your favorite stems, colors and personal touches. We will hand-tie your vision into reality.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-6 gap-1 sm:gap-2 text-center text-xs">
            {[
              { num: 1, label: 'Flowers' },
              { num: 2, label: 'Palette' },
              { num: 3, label: 'Size' },
              { num: 4, label: 'Personalize' },
              { num: 5, label: 'Delivery' },
              { num: 6, label: 'Review' },
            ].map((step) => {
              const isCurrent = currentStep === step.num;
              const isDone = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex flex-col items-center py-2 border-b-2 transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-[#12372A] text-[#12372A] font-bold'
                      : isDone
                      ? 'border-[#2F6B4F] text-[#2F6B4F]'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  <span className="text-[10px] font-mono tabular-nums">0{step.num}</span>
                  <span className="hidden sm:inline text-xs mt-0.5">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Builder Layout: Wizard Left, Live Summary Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* STEP CONTROLS (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#A8BFA8]/30 rounded-xs p-6 sm:p-8 shadow-xs">
            
            {/* STEP 1: CHOOSE FLOWERS */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Step 1: Choose Your Botanical Stems
                  </h2>
                  <p className="text-xs sm:text-sm text-[#18231D]/75 mt-1">
                    Select how many stems of each flower variety you'd like our florists to bundle.
                  </p>
                </div>

                <div className="space-y-3">
                  {AVAILABLE_FLOWERS.map((flower) => {
                    const count = selectedStems[flower.id] || 0;
                    return (
                      <div
                        key={flower.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#F8F5ED] rounded-xs border border-[#A8BFA8]/20 gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 rounded-full ${flower.color}`}></span>
                            <h3 className="font-semibold text-sm text-[#12372A]">{flower.name}</h3>
                          </div>
                          <p className="text-xs text-gray-600 mt-0.5">{flower.description}</p>
                          <span className="text-xs text-[#2F6B4F] font-medium tabular-nums">
                            ₹{flower.pricePerStem} / stem
                          </span>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <span className="text-xs text-gray-500 tabular-nums">
                            ₹{count * flower.pricePerStem}
                          </span>
                          <div className="inline-flex items-center border border-[#A8BFA8]/40 rounded-xs bg-white">
                            <button
                              onClick={() => handleStemChange(flower.id, -1)}
                              className="p-1.5 text-gray-700 hover:bg-gray-100"
                              aria-label="Decrease stems"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-[#12372A] tabular-nums">
                              {count}
                            </span>
                            <button
                              onClick={() => handleStemChange(flower.id, 1)}
                              className="p-1.5 text-gray-700 hover:bg-gray-100"
                              aria-label="Increase stems"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE COLOR PALETTE */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Step 2: Choose Color Palette
                  </h2>
                  <p className="text-xs sm:text-sm text-[#18231D]/75 mt-1">
                    Our florists will harmonize shades according to your mood aesthetic.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PALETTES.map((pal) => {
                    const isSelected = selectedPalette === pal.id;
                    return (
                      <div
                        key={pal.id}
                        onClick={() => setSelectedPalette(pal.id)}
                        className={`p-5 rounded-xs border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#12372A] bg-[#12372A]/5 shadow-xs'
                            : 'border-[#A8BFA8]/30 hover:border-[#2F6B4F]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-serif text-base font-bold text-[#12372A]">
                              {pal.name}
                            </h3>
                            {isSelected && <Check className="w-4 h-4 text-[#2F6B4F]" />}
                          </div>
                          <p className="text-xs text-gray-600 mb-4">{pal.desc}</p>
                        </div>

                        {/* Swatches */}
                        <div className="flex items-center gap-2">
                          {pal.shades.map((shade, i) => (
                            <span
                              key={i}
                              className="w-6 h-6 rounded-full border border-gray-300 shadow-xs"
                              style={{ backgroundColor: shade }}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: BOUQUET SIZE */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Step 3: Select Bouquet Scale
                  </h2>
                  <p className="text-xs sm:text-sm text-[#18231D]/75 mt-1">
                    Choose the visual impact and fullness of the arrangement.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'Standard' as BouquetSize, name: 'Boutique Scale', stems: '~16-18 Stems', desc: 'Intimate table centerpiece, delightful everyday gesture.' },
                    { id: 'Deluxe' as BouquetSize, name: 'Opulent Volume', stems: '~22-26 Stems', desc: 'Our most popular proportion, lavish and full.' },
                    { id: 'Grande' as BouquetSize, name: 'Grand Luxe Scale', stems: '~32+ Stems', desc: 'Show-stopping statement bouquet with dramatic presence.' },
                  ].map((sz) => {
                    const isSelected = selectedSize === sz.id;
                    return (
                      <div
                        key={sz.id}
                        onClick={() => setSelectedSize(sz.id)}
                        className={`p-5 rounded-xs border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#12372A] bg-[#12372A]/5'
                            : 'border-[#A8BFA8]/30 hover:border-[#2F6B4F]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase text-[#C6A15B]">
                              {sz.id}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-[#2F6B4F]" />}
                          </div>
                          <h3 className="font-serif text-lg font-bold text-[#12372A] mb-1">
                            {sz.name}
                          </h3>
                          <span className="text-xs font-semibold text-[#2F6B4F] block mb-2">
                            {sz.stems}
                          </span>
                          <p className="text-xs text-gray-600">{sz.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: WRAP, RIBBON, MESSAGE */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Step 4: Wrapping & Handwritten Note
                  </h2>
                  <p className="text-xs sm:text-sm text-[#18231D]/75 mt-1">
                    Select artisanal presentation finishes and compose your card sentiment.
                  </p>
                </div>

                {/* Wrapping Styles */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#12372A] block mb-2">
                    Artisanal Wrap Paper
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {WRAPPINGS.map((w) => {
                      const isSel = selectedWrapping === w.id;
                      return (
                        <div
                          key={w.id}
                          onClick={() => setSelectedWrapping(w.id)}
                          className={`p-3 rounded-xs border cursor-pointer text-xs ${
                            isSel ? 'border-[#12372A] bg-[#12372A]/5 font-semibold' : 'border-gray-200'
                          }`}
                        >
                          <p className="text-[#12372A]">{w.name}</p>
                          <p className="text-gray-500 text-[11px] mt-1">{w.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ribbon Colors */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#12372A] block mb-2">
                    Hand-Tied Ribbon
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {RIBBONS.map((r) => {
                      const isSel = selectedRibbon === r.id;
                      return (
                        <div
                          key={r.id}
                          onClick={() => setSelectedRibbon(r.id)}
                          className={`p-3 rounded-xs border cursor-pointer text-xs flex items-center gap-2 ${
                            isSel ? 'border-[#12372A] bg-[#12372A]/5 font-semibold' : 'border-gray-200'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border shrink-0"
                            style={{ backgroundColor: r.color }}
                          />
                          <span>{r.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Message */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#12372A] block mb-1">
                      Calligraphy Card Message
                    </label>
                    <textarea
                      rows={3}
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="Write your heartfelt note here. Our calligrapher will handwrite this on embossed gold-foil cotton cardstock..."
                      className="w-full p-3 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs text-xs text-[#18231D] focus:outline-none focus:border-[#2F6B4F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#12372A] block mb-1">
                      Sign-off Name (From)
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. With love, Anya"
                      className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs text-xs text-[#18231D] focus:outline-none focus:border-[#2F6B4F]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: DELIVERY DATE & SLOT */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Step 5: Delivery Timing
                  </h2>
                  <p className="text-xs sm:text-sm text-[#18231D]/75 mt-1">
                    Choose when your custom creation should arrive at the recipient's door.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#12372A] block mb-1.5">
                      Delivery Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <input
                        type="date"
                        value={deliveryDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs text-xs text-[#18231D] focus:outline-none focus:border-[#2F6B4F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#12372A] block mb-1.5">
                      Delivery Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <select
                        value={deliverySlot}
                        onChange={(e) => setDeliverySlot(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs text-xs text-[#18231D] focus:outline-none focus:border-[#2F6B4F] cursor-pointer"
                      >
                        <option value="Morning (9 AM – 1 PM)">Morning (9 AM – 1 PM)</option>
                        <option value="Afternoon (1 PM – 5 PM)">Afternoon (1 PM – 5 PM)</option>
                        <option value="Evening (5 PM – 9 PM)">Evening (5 PM – 9 PM)</option>
                        <option value="Midnight Surprise (11:30 PM)">Midnight Surprise (11:30 PM - 12:15 AM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#F8F5ED] rounded-xs border border-[#A8BFA8]/20 flex items-start gap-3">
                  <Info className="w-4 h-4 text-[#2F6B4F] shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Custom bouquets are prepared by our senior florist on the morning of delivery to ensure optimal bloom opening and stem vigor.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW & CONFIRM */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Step 6: Review Your Bespoke Creation
                  </h2>
                  <p className="text-xs sm:text-sm text-[#18231D]/75 mt-1">
                    Everything looks ready. Confirm your custom recipe below.
                  </p>
                </div>

                <div className="p-5 bg-[#F8F5ED] rounded-xs border border-[#A8BFA8]/30 space-y-4 text-xs">
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="font-bold text-[#12372A]">Bouquet Scale:</span>
                    <span>{selectedSize} (Total ~{totalStemsCount} Stems)</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="font-bold text-[#12372A]">Color Palette:</span>
                    <span>{PALETTES.find((p) => p.id === selectedPalette)?.name}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="font-bold text-[#12372A]">Packaging & Ribbon:</span>
                    <span>
                      {WRAPPINGS.find((w) => w.id === selectedWrapping)?.name} with{' '}
                      {RIBBONS.find((r) => r.id === selectedRibbon)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-200">
                    <span className="font-bold text-[#12372A]">Scheduled Arrival:</span>
                    <span>{deliveryDate} ({deliverySlot})</span>
                  </div>
                  {giftMessage && (
                    <div className="pt-1">
                      <span className="font-bold text-[#12372A] block mb-1">Handwritten Note:</span>
                      <p className="italic text-gray-700 bg-white p-3 rounded-xs border border-gray-200">
                        "{giftMessage}" — {senderName || 'Anonymous'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons for Wizard */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="px-4 py-2.5 border border-[#12372A]/30 text-xs font-semibold uppercase tracking-wider text-[#12372A] rounded-xs hover:bg-gray-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {currentStep < 6 ? (
                <button
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="px-6 py-2.5 bg-[#12372A] hover:bg-[#2F6B4F] text-white text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleCompleteAndAdd}
                  className="px-8 py-3 bg-[#C6A15B] hover:bg-[#d8b56f] text-[#12372A] text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Create My Bouquet & Add to Bag</span>
                </button>
              )}
            </div>

          </div>

          {/* LIVE ORDER SUMMARY ON THE RIGHT (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#A8BFA8]/30 rounded-xs p-6 shadow-xs sticky top-24 space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#A8BFA8]/20 pb-4">
                <h3 className="font-serif text-lg font-bold text-[#12372A]">
                  Live Bouquet Summary
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#C6A15B]/20 text-[#12372A] rounded-xs">
                  {selectedSize}
                </span>
              </div>

              {/* Stems Breakdown List */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-[#12372A] block uppercase tracking-wider text-[10px]">
                  Selected Stems ({totalStemsCount} Total)
                </span>
                {AVAILABLE_FLOWERS.map((flower) => {
                  const count = selectedStems[flower.id] || 0;
                  if (count === 0) return null;
                  return (
                    <div key={flower.id} className="flex justify-between text-gray-700">
                      <span>{count}× {flower.name}</span>
                      <span className="tabular-nums font-medium">₹{count * flower.pricePerStem}</span>
                    </div>
                  );
                })}
                {totalStemsCount === 0 && (
                  <p className="text-gray-400 italic">No stems selected yet</p>
                )}
              </div>

              {/* Packaging & Finishing details */}
              <div className="pt-3 border-t border-[#A8BFA8]/20 text-xs space-y-1 text-gray-600">
                <p><strong>Scale Crafting:</strong> ₹{sizeMarkup}</p>
                <p><strong>Color Story:</strong> {PALETTES.find((p) => p.id === selectedPalette)?.name}</p>
                <p><strong>Wrapping:</strong> {WRAPPINGS.find((w) => w.id === selectedWrapping)?.name}</p>
              </div>

              {/* Price Calculation */}
              <div className="pt-4 border-t border-[#12372A]/20">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs uppercase font-bold text-[#18231D]/70">Estimated Total:</span>
                  <span className="font-serif text-2xl font-bold text-[#12372A] tabular-nums">
                    ₹{totalCalculatedPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  Includes signature box, water wrap & card
                </p>
              </div>

              {/* Fast Direct Action */}
              <button
                onClick={handleCompleteAndAdd}
                className="w-full py-3.5 bg-[#12372A] hover:bg-[#2F6B4F] text-[#F8F5ED] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Add Custom Bouquet to Bag</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
