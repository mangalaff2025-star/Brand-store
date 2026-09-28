export type OccasionType = 
  | 'Birthday'
  | 'Anniversary'
  | 'Love & Romance'
  | 'Congratulations'
  | 'Thank You'
  | 'Get Well Soon'
  | 'Friendship'
  | 'Just Because';

export type FlowerType = 
  | 'Roses'
  | 'Peonies'
  | 'Ranunculus'
  | 'Lilies'
  | 'Hydrangeas'
  | 'Carnations'
  | 'Orchids'
  | 'Mixed Garden';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  occasion: OccasionType[];
  flowerTypes: FlowerType[];
  badge?: 'BESTSELLER' | 'NEW' | 'LIMITED' | 'POPULAR';
  stemCount: number;
  inStock: boolean;
  flowersIncluded: string[];
  careInstructions: string[];
  dimensions: string;
  colorPalette: string;
  scent: string;
}

export type BouquetSize = 'Standard' | 'Deluxe' | 'Grande';

export interface CartItem {
  id: string; // unique item entry id
  productId: string;
  name: string;
  image: string;
  size: BouquetSize;
  price: number;
  quantity: number;
  selectedColor?: string;
  deliveryDate?: string;
  deliveryTimeSlot?: string;
  giftMessage?: string;
  isCustom?: boolean;
  customDetails?: {
    flowers: string[];
    palette: string;
    wrapping: string;
    ribbon: string;
  };
}

export interface CustomBouquetConfig {
  flowers: { id: string; name: string; pricePerStem: number; stems: number }[];
  palette: string;
  size: BouquetSize;
  wrappingStyle: string;
  ribbonColor: string;
  giftMessage: string;
  deliveryDate: string;
  deliverySlot: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  occasion: string;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryDate: string;
  deliverySlot: string;
  giftMessage: string;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  status: 'Confirmed' | 'Floral Design In Progress' | 'Quality Hand-Tied' | 'Out For Delivery' | 'Delivered';
  createdAt: string;
}

export type ActivePage = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'custom-bouquet' 
  | 'about' 
  | 'occasions' 
  | 'contact' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation';
