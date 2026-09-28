import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ActivePage, OccasionType, FlowerType, BouquetSize } from '../types';
import { PRODUCTS } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'gold';
}

interface PincodeResult {
  checked: boolean;
  available: boolean;
  estimatedTime: string;
  city: string;
  pincode: string;
}

interface ShopContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isTrackOrderOpen: boolean;
  setIsTrackOrderOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedOccasionFilter: OccasionType | 'All';
  setSelectedOccasionFilter: (occasion: OccasionType | 'All') => void;
  selectedFlowerFilter: FlowerType | 'All';
  setSelectedFlowerFilter: (flower: FlowerType | 'All') => void;
  selectedPriceFilter: string;
  setSelectedPriceFilter: (range: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  pincodeResult: PincodeResult | null;
  checkPincode: (pin: string) => boolean;
  currentOrder: Order | null;
  ordersHistory: Order[];
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'gold') => void;
  removeToast: (id: string) => void;
  
  // Cart Actions
  addToCart: (
    product: Product,
    size?: BouquetSize,
    quantity?: number,
    options?: {
      deliveryDate?: string;
      deliveryTimeSlot?: string;
      giftMessage?: string;
      selectedColor?: string;
    }
  ) => void;
  addCustomBouquetToCart: (customItem: CartItem) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Navigation Helper
  navigateTo: (page: ActivePage, product?: Product) => void;
  navigateToShopWithOccasion: (occasion: OccasionType) => void;

  // Order Placement & Tracking
  placeOrder: (orderData: Omit<Order, 'orderId' | 'status' | 'createdAt'>) => Order;
  findOrder: (orderId: string) => Order | undefined;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const PINCODE_MAP: Record<string, { city: string; time: string }> = {
  '110001': { city: 'Central Delhi', time: 'Same-Day Delivery in 3 Hours' },
  '110020': { city: 'South Delhi', time: 'Same-Day Delivery in 2.5 Hours' },
  '400001': { city: 'South Mumbai', time: 'Same-Day Delivery in 3 Hours' },
  '400050': { city: 'Bandra, Mumbai', time: 'Same-Day Delivery in 2 Hours' },
  '560001': { city: 'Bengaluru Central', time: 'Same-Day Delivery in 3.5 Hours' },
  '560038': { city: 'Indiranagar, BLR', time: 'Same-Day Delivery in 2.5 Hours' },
  '500001': { city: 'Hyderabad', time: 'Same-Day Delivery in 4 Hours' },
  '600001': { city: 'Chennai', time: 'Same-Day Delivery in 4 Hours' },
  '700001': { city: 'Kolkata', time: 'Same-Day Delivery in 4 Hours' },
  '411001': { city: 'Pune', time: 'Same-Day Delivery in 3.5 Hours' },
  '380001': { city: 'Ahmedabad', time: 'Same-Day Delivery in 4 Hours' },
  '122001': { city: 'Gurugram', time: 'Same-Day Delivery in 2.5 Hours' },
  '201301': { city: 'Noida', time: 'Same-Day Delivery in 2.5 Hours' },
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('floral_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('floral_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Drawers and overlays
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);

  // Shop filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOccasionFilter, setSelectedOccasionFilter] = useState<OccasionType | 'All'>('All');
  const [selectedFlowerFilter, setSelectedFlowerFilter] = useState<FlowerType | 'All'>('All');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Pincode result
  const [pincodeResult, setPincodeResult] = useState<PincodeResult | null>(null);

  // Orders
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [ordersHistory, setOrdersHistory] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('floral_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('floral_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('floral_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('floral_orders', JSON.stringify(ordersHistory));
    } catch (e) {
      console.error(e);
    }
  }, [ordersHistory]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const addToast = (message: string, type: 'success' | 'info' | 'gold' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const checkPincode = (pin: string): boolean => {
    const clean = pin.trim();
    if (clean.length !== 6 || !/^\d+$/.test(clean)) {
      setPincodeResult({
        checked: true,
        available: false,
        estimatedTime: 'Please enter a valid 6-digit postal PIN code.',
        city: '',
        pincode: clean,
      });
      return false;
    }

    if (PINCODE_MAP[clean]) {
      const info = PINCODE_MAP[clean];
      setPincodeResult({
        checked: true,
        available: true,
        estimatedTime: info.time,
        city: info.city,
        pincode: clean,
      });
      addToast(`Delivery available for ${info.city}! ${info.time}`, 'gold');
      return true;
    } else {
      // General availability for other 6-digit Indian PIN codes
      setPincodeResult({
        checked: true,
        available: true,
        estimatedTime: 'Next-Day Express Courier Delivery Available',
        city: 'Verified Delivery Zone',
        pincode: clean,
      });
      addToast(`Standard Delivery available to PIN code ${clean}`, 'info');
      return true;
    }
  };

  const addToCart = (
    product: Product,
    size: BouquetSize = 'Standard',
    quantity: number = 1,
    options?: {
      deliveryDate?: string;
      deliveryTimeSlot?: string;
      giftMessage?: string;
      selectedColor?: string;
    }
  ) => {
    let sizeMultiplier = 1;
    if (size === 'Deluxe') sizeMultiplier = 1.25;
    if (size === 'Grande') sizeMultiplier = 1.55;

    const computedUnitPrice = Math.round(product.price * sizeMultiplier);
    const itemKey = `${product.id}-${size}-${options?.deliveryDate || 'standard'}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          name: product.name,
          image: product.image,
          size,
          price: computedUnitPrice,
          quantity,
          selectedColor: options?.selectedColor || product.colorPalette,
          deliveryDate: options?.deliveryDate,
          deliveryTimeSlot: options?.deliveryTimeSlot,
          giftMessage: options?.giftMessage,
        },
      ];
    });

    addToast(`Added ${quantity} × ${product.name} (${size}) to your bag`, 'success');
  };

  const addCustomBouquetToCart = (customItem: CartItem) => {
    setCart((prev) => [...prev, customItem]);
    addToast('Your bespoke handcrafted bouquet was added to the bag!', 'gold');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    addToast('Bouquet removed from your bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast('Removed from saved favorites', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        const prod = PRODUCTS.find((p) => p.id === productId);
        addToast(`Added ${prod?.name || 'bouquet'} to your wishlist`, 'gold');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const navigateTo = (page: ActivePage, product?: Product) => {
    if (product) {
      setSelectedProduct(product);
    }
    setActivePage(page);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsSearchOpen(false);
  };

  const navigateToShopWithOccasion = (occasion: OccasionType) => {
    setSelectedOccasionFilter(occasion);
    setActivePage('shop');
  };

  const placeOrder = (orderData: Omit<Order, 'orderId' | 'status' | 'createdAt'>): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `FLR-${randomNum}`;
    const newOrder: Order = {
      ...orderData,
      orderId,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    setCurrentOrder(newOrder);
    setOrdersHistory((prev) => [newOrder, ...prev]);
    clearCart();
    setActivePage('order-confirmation');
    addToast(`Order #${orderId} placed successfully!`, 'gold');
    return newOrder;
  };

  const findOrder = (orderId: string): Order | undefined => {
    const clean = orderId.trim().toUpperCase();
    return ordersHistory.find((o) => o.orderId.toUpperCase() === clean);
  };

  return (
    <ShopContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isTrackOrderOpen,
        setIsTrackOrderOpen,
        searchQuery,
        setSearchQuery,
        selectedOccasionFilter,
        setSelectedOccasionFilter,
        selectedFlowerFilter,
        setSelectedFlowerFilter,
        selectedPriceFilter,
        setSelectedPriceFilter,
        sortBy,
        setSortBy,
        pincodeResult,
        checkPincode,
        currentOrder,
        ordersHistory,
        toasts,
        addToast,
        removeToast,
        addToCart,
        addCustomBouquetToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        navigateTo,
        navigateToShopWithOccasion,
        placeOrder,
        findOrder,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
