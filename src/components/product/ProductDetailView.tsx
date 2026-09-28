import React, { useState } from 'react';
import {
  Star,
  Heart,
  Truck,
  ShieldCheck,
  Flower2,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Share2
} from 'lucide-react';
import { Product, BouquetSize } from '../../types';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    checkPincode,
    pincodeResult,
    navigateTo,
    addToast
  } = useShop();

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState<BouquetSize>('Standard');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colorPalette);
  const [deliveryDate, setDeliveryDate] = useState(() => {
    // Default to today or tomorrow
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [deliverySlot, setDeliverySlot] = useState('Morning (9 AM – 1 PM)');
  const [giftMessage, setGiftMessage] = useState('');
  const [pincodeInput, setPincodeInput] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'delivery' | 'reviews'>('details');

  const isFavorited = isInWishlist(product.id);

  // Compute price with size multiplier
  let sizeMultiplier = 1;
  let sizeStemBonus = 0;
  if (selectedSize === 'Deluxe') {
    sizeMultiplier = 1.25;
    sizeStemBonus = 6;
  }
  if (selectedSize === 'Grande') {
    sizeMultiplier = 1.55;
    sizeStemBonus = 12;
  }
  const currentPrice = Math.round(product.price * sizeMultiplier);
  const totalStems = product.stemCount + sizeStemBonus;

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeInput.trim()) return;
    checkPincode(pincodeInput);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity, {
      deliveryDate,
      deliveryTimeSlot: deliverySlot,
      giftMessage,
      selectedColor,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity, {
      deliveryDate,
      deliveryTimeSlot: deliverySlot,
      giftMessage,
      selectedColor,
    });
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Bouquet link copied to clipboard', 'gold');
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.occasion.some((occ) => product.occasion.includes(occ))
  ).slice(0, 4);

  return (
    <div className="bg-[#F8F5ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#18231D]/70 mb-8" aria-label="Breadcrumb">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-[#12372A] cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#A8BFA8]" />
          <button
            onClick={() => navigateTo('shop')}
            className="hover:text-[#12372A] cursor-pointer"
          >
            Bouquets
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#A8BFA8]" />
          <span className="text-[#12372A] font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Main Grid: Gallery Left, Contiguous Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* LEFT: Large Product Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Main Image Frame */}
            <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full bg-white border border-[#A8BFA8]/30 rounded-xs overflow-hidden shadow-sm">
              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 z-10 text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-[#12372A]/90 text-white rounded-xs">
                  {product.badge}
                </span>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist toggle"
                className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md shadow-sm transition-colors ${
                  isFavorited
                    ? 'bg-[#C6A15B] text-white'
                    : 'bg-white/80 text-[#18231D] hover:bg-white hover:text-[#C6A15B]'
                }`}
              >
                <Heart className="w-5 h-5" fill={isFavorited ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 shrink-0 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-[#2F6B4F] ring-2 ring-[#C6A15B]/40'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white border border-[#A8BFA8]/25 rounded-xs text-xs text-[#18231D]/80 mt-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2F6B4F] shrink-0" />
                <span>7-Day Freshness</span>
              </div>
              <div className="flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-[#2F6B4F] shrink-0" />
                <span>Hand-Tied Stems</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#2F6B4F] shrink-0" />
                <span>Chilled Courier</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Contiguous Purchase Module (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#A8BFA8]/30 rounded-xs p-6 sm:p-8 shadow-xs flex flex-col space-y-6">
            
            {/* Header: Title, Rating, Price */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase font-bold tracking-widest text-[#C6A15B]">
                  Handcrafted Bouquet
                </span>
                <button
                  onClick={handleShare}
                  className="text-xs text-[#18231D]/60 hover:text-[#12372A] flex items-center gap-1 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#12372A] leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-2 text-xs text-[#18231D]/70">
                <div className="flex items-center text-[#C6A15B]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-current"
                    />
                  ))}
                </div>
                <span className="font-semibold text-[#18231D] tabular-nums">{product.rating}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{product.reviewCount} customer ratings</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-[#12372A] tabular-nums">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#18231D]/50 line-through tabular-nums">
                    ₹{Math.round(product.originalPrice * sizeMultiplier).toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-medium">
                  Inclusive of all taxes
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#18231D]/75 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="pt-4 border-t border-[#A8BFA8]/20">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#12372A]">
                  Bouquet Size
                </label>
                <span className="text-xs text-[#2F6B4F] font-semibold tabular-nums">
                  Approx. {totalStems} stems
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['Standard', 'Deluxe', 'Grande'] as BouquetSize[]).map((sz) => {
                  const isSelected = selectedSize === sz;
                  const priceDiff =
                    sz === 'Deluxe' ? '+₹600' : sz === 'Grande' ? '+₹1,200' : 'Included';

                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`p-2.5 text-center rounded-xs border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#12372A] bg-[#12372A] text-white shadow-xs'
                          : 'border-[#A8BFA8]/40 hover:border-[#12372A] text-[#18231D]'
                      }`}
                    >
                      <span className="block text-xs font-bold">{sz}</span>
                      <span className={`block text-[10px] mt-0.5 ${isSelected ? 'text-[#C6A15B]' : 'text-gray-500'}`}>
                        {priceDiff}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="pt-4 border-t border-[#A8BFA8]/20">
              <label className="text-xs font-bold uppercase tracking-wider text-[#12372A] block mb-1.5">
                Check Delivery Availability
              </label>
              <form onSubmit={handlePincodeSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit PIN code (e.g. 110001)"
                    maxLength={6}
                    className="w-full pl-9 pr-3 py-2 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs text-xs text-[#18231D] focus:outline-none focus:border-[#2F6B4F]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#12372A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#2F6B4F] cursor-pointer shrink-0"
                >
                  Verify
                </button>
              </form>

              {pincodeResult && pincodeResult.checked && (
                <div
                  className={`mt-2.5 p-2.5 rounded-xs text-xs flex items-start gap-2 ${
                    pincodeResult.available
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border border-rose-200'
                  }`}
                >
                  {pincodeResult.available ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-semibold">{pincodeResult.city || 'PIN Check'}:</span>{' '}
                    {pincodeResult.estimatedTime}
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Date & Time Slot */}
            <div className="pt-4 border-t border-[#A8BFA8]/20 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Date Picker */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#12372A] block mb-1">
                    Delivery Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      value={deliveryDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full pl-8 pr-2 py-2 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs text-xs text-[#18231D] focus:outline-none focus:border-[#2F6B4F]"
                    />
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#12372A] block mb-1">
                    Delivery Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select
                      value={deliverySlot}
                      onChange={(e) => setDeliverySlot(e.target.value)}
                      className="w-full pl-8 pr-2 py-2 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs text-xs text-[#18231D] focus:outline-none focus:border-[#2F6B4F] cursor-pointer"
                    >
                      <option value="Morning (9 AM – 1 PM)">Morning (9 AM – 1 PM)</option>
                      <option value="Afternoon (1 PM – 5 PM)">Afternoon (1 PM – 5 PM)</option>
                      <option value="Evening (5 PM – 9 PM)">Evening (5 PM – 9 PM)</option>
                      <option value="Midnight Surprise (11:30 PM)">Midnight Surprise (11:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Personal Gift Message Card */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#12372A] block mb-1">
                  Complimentary Calligraphy Message Card
                </label>
                <textarea
                  rows={2}
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Add your personal message to be handwritten on premium gold foil cardstock..."
                  className="w-full p-2.5 bg-[#F8F5ED] border border-[#A8BFA8]/30 rounded-xs text-xs text-[#18231D] placeholder-gray-400 focus:outline-none focus:border-[#2F6B4F] resize-none"
                />
              </div>
            </div>

            {/* Quantity Selector & Dual Buy CTAs */}
            <div className="pt-4 border-t border-[#A8BFA8]/20 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#12372A]">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-[#A8BFA8]/40 rounded-xs bg-[#F8F5ED]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-[#18231D] hover:bg-gray-200 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-[#12372A] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-[#18231D] hover:bg-gray-200 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-4 bg-[#12372A] hover:bg-[#2F6B4F] text-[#F8F5ED] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-sm cursor-pointer"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-4 bg-[#C6A15B] hover:bg-[#d8b56f] text-[#12372A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-sm cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Extended Product Tabs: Description, Flower Details, Care, Reviews */}
        <div className="mt-16 bg-white border border-[#A8BFA8]/30 rounded-xs overflow-hidden">
          {/* Tabs Navigation */}
          <div className="flex border-b border-[#A8BFA8]/20 bg-[#F8F5ED]/50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-3.5 px-6 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'details'
                  ? 'border-b-2 border-[#12372A] text-[#12372A] bg-white'
                  : 'text-[#18231D]/60 hover:text-[#12372A]'
              }`}
            >
              Flower Details & Ingredients
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`py-3.5 px-6 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'care'
                  ? 'border-b-2 border-[#12372A] text-[#12372A] bg-white'
                  : 'text-[#18231D]/60 hover:text-[#12372A]'
              }`}
            >
              Florist Care Instructions
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`py-3.5 px-6 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'delivery'
                  ? 'border-b-2 border-[#12372A] text-[#12372A] bg-white'
                  : 'text-[#18231D]/60 hover:text-[#12372A]'
              }`}
            >
              Chilled Delivery Information
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3.5 px-6 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-[#12372A] text-[#12372A] bg-white'
                  : 'text-[#18231D]/60 hover:text-[#12372A]'
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="p-6 sm:p-8 text-sm text-[#18231D]/80 leading-relaxed">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#12372A]">
                  Stems Included In This Arrangement
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {product.flowersIncluded.map((stem, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]"></span>
                      <span>{stem}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-[#A8BFA8]/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-[#12372A] block">Approx Dimensions:</span>
                    <span>{product.dimensions}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#12372A] block">Aroma Profile:</span>
                    <span>{product.scent}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#12372A] block">Packaging:</span>
                    <span>Matte botanical paper & silk ribbon</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#12372A]">
                  How to Maximize Bloom Longevity (7-10 Days)
                </h3>
                <ol className="space-y-3 pt-2 list-decimal pl-5">
                  {product.careInstructions.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {tip}
                    </li>
                  ))}
                  <li>
                    Every order includes a sachet of premium flower food to nourish blooms and prevent bacterial growth in the vase.
                  </li>
                </ol>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#12372A]">
                  Temperature-Controlled Safe Delivery
                </h3>
                <p>
                  To preserve the morning dew and peak vitality of fresh petals, our arrangements are prepared 
                  shortly before courier dispatch and secured in custom insulated floral totes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-xs">
                  <div className="p-3 bg-[#F8F5ED] rounded-xs">
                    <p className="font-bold text-[#12372A]">Same-Day Express</p>
                    <p className="text-gray-600 mt-1">Available for orders placed before 4:00 PM IST across 12 major metro hubs.</p>
                  </div>
                  <div className="p-3 bg-[#F8F5ED] rounded-xs">
                    <p className="font-bold text-[#12372A]">Free Shipping Threshold</p>
                    <p className="text-gray-600 mt-1">Orders above ₹2,499 qualify for complimentary zero-charge express delivery.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#A8BFA8]/20">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#C6A15B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="font-bold text-[#12372A] ml-2 text-base tabular-nums">
                        {product.rating} / 5.0
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Based on {product.reviewCount} verified customer deliveries
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-[#F8F5ED] rounded-xs">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span className="font-bold text-[#12372A]">Rohan K. · Verified Buyer</span>
                      <span>Delivered 3 days ago</span>
                    </div>
                    <div className="flex items-center text-[#C6A15B] text-xs mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#18231D]">
                      "Ordered this for my mother's birthday. The packaging was beyond stunning—like something straight out of a Parisian floral boutique. Stems were crisp and lasted well over a week."
                    </p>
                  </div>

                  <div className="p-4 bg-[#F8F5ED] rounded-xs">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span className="font-bold text-[#12372A]">Devika P. · Verified Buyer</span>
                      <span>Delivered 1 week ago</span>
                    </div>
                    <div className="flex items-center text-[#C6A15B] text-xs mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#18231D]">
                      "Hands down the best flower delivery service in Bangalore. The card was genuinely handwritten with real ink, not printed. Will be my go-to for all occasions now."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Bouquets Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#12372A] mb-8">
              You May Also Adore
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
