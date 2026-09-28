import { Product } from '../types';

// Generated visual assets
import heroFloral from '../assets/images/hero_floral_bouquet_1790587757387.jpg';
import featuredRose from '../assets/images/featured_rose_bouquet_1790587793733.jpg';
import birthdayBloomImg from '../assets/images/category_birthday_bloom_1790587805001.jpg';
import customBannerImg from '../assets/images/custom_bouquet_banner_1790587783390.jpg';
import aboutCraftImg from '../assets/images/about_florist_craft_1790587771172.jpg';

export { heroFloral, featuredRose, birthdayBloomImg, customBannerImg, aboutCraftImg };

export const PRODUCTS: Product[] = [
  {
    id: 'classic-rose-bouquet',
    name: 'Classic Rose Bouquet',
    subtitle: 'Timeless Ecuadorian Red Roses & Scented Eucalyptus',
    description: 'A classic masterwork of botanical romance. Hand-selected velvety crimson Ecuadorian roses paired with fresh silver dollar eucalyptus and delicate waxflowers, hand-tied in our signature botanical forest wrap.',
    price: 2499,
    originalPrice: 2899,
    rating: 4.9,
    reviewCount: 148,
    image: featuredRose,
    gallery: [
      featuredRose,
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85',
    ],
    occasion: ['Love & Romance', 'Anniversary', 'Birthday'],
    flowerTypes: ['Roses'],
    badge: 'BESTSELLER',
    stemCount: 20,
    inStock: true,
    flowersIncluded: ['16 Premium Ecuadorian Red Roses', 'Silver Dollar Eucalyptus', 'White Waxflower Sprigs', 'Florist Italian Greenery'],
    careInstructions: [
      'Trim stems at a 45-degree angle under lukewarm water.',
      'Place in clean vase with floral food included.',
      'Change water every 2 days and keep away from direct sunlight & heaters.'
    ],
    dimensions: 'H: 52cm · W: 38cm',
    colorPalette: 'Velvet Red & Botanical Sage',
    scent: 'Subtle Sweet Rose & Crisp Menthol Eucalyptus'
  },
  {
    id: 'forever-love',
    name: 'Forever Love',
    subtitle: 'Blushing Peonies, Garden Spray Roses & Dusty Miller',
    description: 'An ethereal expression of enduring affection. Featuring lush coral-blush peonies, spray garden roses, lisianthus blooms, and velvety dusty miller leaves tied with raw-edge champagne silk ribbon.',
    price: 3299,
    originalPrice: 3699,
    rating: 5.0,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1000&q=85',
      heroFloral
    ],
    occasion: ['Anniversary', 'Love & Romance', 'Congratulations'],
    flowerTypes: ['Peonies', 'Roses'],
    badge: 'POPULAR',
    stemCount: 24,
    inStock: true,
    flowersIncluded: ['6 Sarah Bernhardt Peonies', '10 Champagne Spray Roses', 'White Lisianthus', 'Dusty Miller foliage'],
    careInstructions: [
      'Fill clean vase with room-temperature filtered water.',
      'Remove any lower leaves that submerge below waterline.',
      'Mist petals lightly every morning for peak hydration.'
    ],
    dimensions: 'H: 48cm · W: 42cm',
    colorPalette: 'Blush, Ivory & Champagne Gold',
    scent: 'Delicate Floral Honey & Fresh Petals'
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    subtitle: 'Hydrangeas, Peach Ranunculus & Lilac Sweet Peas',
    description: 'Soft pastel poetry arranged for calm celebrations. Cloud-like blue and lavender Dutch hydrangeas harmonize with peach ranunculus, delicate sweet peas, and fresh olive twigs.',
    price: 2799,
    originalPrice: 3199,
    rating: 4.8,
    reviewCount: 114,
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1000&q=85',
      birthdayBloomImg,
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=85'
    ],
    occasion: ['Birthday', 'Thank You', 'Get Well Soon', 'Friendship'],
    flowerTypes: ['Hydrangeas', 'Ranunculus', 'Mixed Garden'],
    badge: 'NEW',
    stemCount: 22,
    inStock: true,
    flowersIncluded: ['2 Dutch Hydrangea Heads', '8 Peach Ranunculus', 'Lilac Sweet Peas', 'Silver Olive Leaves'],
    careInstructions: [
      'Hydrangeas drink from their petals—give them a generous water dip if limp.',
      'Snip 2cm off woody stems with sharp florist shears.',
      'Keep in a cool, shaded corner.'
    ],
    dimensions: 'H: 45cm · W: 40cm',
    colorPalette: 'Misty Blue, Peach & Lilac',
    scent: 'Powdery Meadow Bloom'
  },
  {
    id: 'elegant-white',
    name: 'Elegant White',
    subtitle: 'Oriental Casablanca Lilies & Snow Avalanche Roses',
    description: 'Pure architectural grace. Heavenly scented Casablanca oriental lilies paired with immaculate snow-white avalanche roses and emerald salal greenery in a crisp linen presentation.',
    price: 2999,
    originalPrice: 3499,
    rating: 4.9,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1000&q=85',
      heroFloral,
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85'
    ],
    occasion: ['Congratulations', 'Thank You', 'Anniversary', 'Just Because'],
    flowerTypes: ['Lilies', 'Roses'],
    badge: 'LIMITED',
    stemCount: 18,
    inStock: true,
    flowersIncluded: ['4 Casablanca Oriental Lily Stems (12+ Buds)', '10 Avalanche White Roses', 'Italian Ruscus', 'Seeded Eucalyptus'],
    careInstructions: [
      'Gently pluck pollen stamens from lilies to protect pure white petals.',
      'Provide deep water in a sturdy ceramic or glass vase.',
      'Staggered buds will open gracefully over 7-10 days.'
    ],
    dimensions: 'H: 58cm · W: 44cm',
    colorPalette: 'Pure Snow White & Botanical Deep Green',
    scent: 'Intense Heady Oriental Lily & Fresh Morning Dew'
  },
  {
    id: 'sunshine-bouquet',
    name: 'Sunshine Bouquet',
    subtitle: 'Golden Sunflowers, Marigold Spray & Chamomile Daisies',
    description: 'An uplifting burst of warm golden energy. Farm-fresh mini sunflowers intermingled with bright yellow spray roses, chamomile daisies, and fragrant rosemary sprigs.',
    price: 1899,
    originalPrice: 2199,
    rating: 4.8,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1000&q=85'
    ],
    occasion: ['Birthday', 'Congratulations', 'Get Well Soon', 'Friendship'],
    flowerTypes: ['Mixed Garden', 'Roses'],
    stemCount: 18,
    inStock: true,
    flowersIncluded: ['5 Golden Sunflowers', '6 Marigold Spray Roses', 'Matricaria Chamomile', 'Aromatic Rosemary'],
    careInstructions: [
      'Sunflowers are thirsty blooms—check water levels daily.',
      'Cut stems under running water at an angle.',
      'Thrives in bright indirect light.'
    ],
    dimensions: 'H: 46cm · W: 36cm',
    colorPalette: 'Sunflower Gold, Amber & Forest Olive',
    scent: 'Warm Sunlit Herbs & Honey'
  },
  {
    id: 'luxury-red-roses',
    name: 'Luxury Red Roses',
    subtitle: 'Grand 30-Stem Long-Stem Velvet Ecuadorian Roses',
    description: 'The pinnacle of dramatic luxury. Thirty velvet Ecuadorian long-stem roses meticulously hand-spiraled and presented in our bespoke botanical green embossed box with satin ribbons.',
    price: 4499,
    originalPrice: 4999,
    rating: 5.0,
    reviewCount: 210,
    image: featuredRose,
    gallery: [
      featuredRose,
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=85'
    ],
    occasion: ['Love & Romance', 'Anniversary'],
    flowerTypes: ['Roses'],
    badge: 'BESTSELLER',
    stemCount: 30,
    inStock: true,
    flowersIncluded: ['30 Grade-A Ecuadorian Red Velvet Roses', 'Parvifolia Eucalyptus', 'Preserved Fern Accents'],
    careInstructions: [
      'Keep stems hydrated with provided floral preservative pack.',
      'Trim 1 inch off bottom of each stem every 3 days.',
      'Display in tall heavyweight vase for balanced support.'
    ],
    dimensions: 'H: 60cm · W: 50cm',
    colorPalette: 'Deep Royal Crimson & Antique Gold',
    scent: 'Classic Seductive Damask Rose'
  },
  {
    id: 'birthday-bloom',
    name: 'Birthday Bloom',
    subtitle: 'Pastel Peonies, Champagne Carnations & Gypsophila',
    description: 'Designed exclusively for joyful milestone birthdays. A confection of pastel pink peonies, champagne ruffled carnations, baby’s breath clouds, and eucalyptus sprays with a complimentary gold gift tag.',
    price: 2699,
    originalPrice: 2999,
    rating: 4.9,
    reviewCount: 135,
    image: birthdayBloomImg,
    gallery: [
      birthdayBloomImg,
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85',
      heroFloral
    ],
    occasion: ['Birthday', 'Congratulations', 'Friendship'],
    flowerTypes: ['Peonies', 'Carnations', 'Mixed Garden'],
    badge: 'POPULAR',
    stemCount: 22,
    inStock: true,
    flowersIncluded: ['5 Pastel Peonies', '8 Champagne Carnations', 'Cloud Gypsophila', 'Eucalyptus Foliage'],
    careInstructions: [
      'Unwrap carefully and cut stems by 2-3 cm.',
      'Use lukewarm water to encourage buds to unfurl into full blooms.',
      'Keep away from ripening fruit (ethylene gas sensitive).'
    ],
    dimensions: 'H: 48cm · W: 38cm',
    colorPalette: 'Pastel Pink, Cream & Champagne',
    scent: 'Sweet Vanilla & Wild Blossom'
  },
  {
    id: 'sweet-romance',
    name: 'Sweet Romance',
    subtitle: 'Blush Garden Roses, White Ranunculus & Waxflower',
    description: 'A gentle whisper of love. Featuring fragrant blush garden roses, paper-thin white ranunculus petals, and delicate pink waxflowers, wrapped in layers of French sage paper.',
    price: 2899,
    originalPrice: 3299,
    rating: 4.9,
    reviewCount: 96,
    image: heroFloral,
    gallery: [
      heroFloral,
      'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=1000&q=85',
      featuredRose
    ],
    occasion: ['Love & Romance', 'Anniversary', 'Just Because'],
    flowerTypes: ['Roses', 'Ranunculus'],
    badge: 'POPULAR',
    stemCount: 20,
    inStock: true,
    flowersIncluded: ['12 Blush Garden Roses', '6 White Ranunculus', 'Pink Chamelaucium Waxflowers', 'Baby Blue Eucalyptus'],
    careInstructions: [
      'Re-cut stems at 45 degrees upon arrival.',
      'Replace water every 48 hours for maximum vase life (7-9 days).',
      'Keep in moderate room temperature.'
    ],
    dimensions: 'H: 50cm · W: 38cm',
    colorPalette: 'Blush Pink, Creamy White & Sage Green',
    scent: 'Subtle Rose Petal & Citrus Herb'
  },
  {
    id: 'lavender-twilight',
    name: 'Lavender Twilight',
    subtitle: 'Blue Orchids, Lavender Roses & Statice Mist',
    description: 'An enchanting moody palette inspired by twilight dusk. Rare lavender ocean spray roses paired with indigo dendrobium orchids, purple statice, and scented thistles.',
    price: 3499,
    originalPrice: 3899,
    rating: 4.8,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1000&q=85'
    ],
    occasion: ['Anniversary', 'Birthday', 'Just Because', 'Congratulations'],
    flowerTypes: ['Orchids', 'Roses'],
    badge: 'LIMITED',
    stemCount: 22,
    inStock: true,
    flowersIncluded: ['6 Dendrobium Purple Orchids', '10 Lavender Ocean Roses', 'Purple Statice Mist', 'Blue Eryngium Thistles'],
    careInstructions: [
      'Orchids enjoy high humidity—lightly spritz flowers every other day.',
      'Never place directly in air conditioner drafts.',
      'Expected vase life: up to 12 days.'
    ],
    dimensions: 'H: 54cm · W: 40cm',
    colorPalette: 'Twilight Lavender, Indigo & Sage',
    scent: 'Gentle Powdery Violet'
  },
  {
    id: 'emerald-botanical-whisper',
    name: 'Emerald Botanical Whisper',
    subtitle: 'White Ranunculus, Green Bells of Ireland & Wild Greens',
    description: 'An organic celebration of botanical textures. Crisp white ranunculus blooms, bells of Ireland, monstera foliage, and textured eucalyptus in an artistic loose hand-tied silhouette.',
    price: 3199,
    originalPrice: 3599,
    rating: 4.9,
    reviewCount: 44,
    image: customBannerImg,
    gallery: [
      customBannerImg,
      heroFloral,
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85'
    ],
    occasion: ['Thank You', 'Congratulations', 'Just Because', 'Friendship'],
    flowerTypes: ['Ranunculus', 'Mixed Garden'],
    badge: 'NEW',
    stemCount: 24,
    inStock: true,
    flowersIncluded: ['10 Paper White Ranunculus', 'Bells of Ireland', 'Eucalyptus Cinerea', 'Mini Monstera Leaves'],
    careInstructions: [
      'Keep foliage trimmed above the water line.',
      'Ranunculus hollow stems drink fast—keep vase topped with water.',
      'Ideal for modern minimalist interiors.'
    ],
    dimensions: 'H: 52cm · W: 45cm',
    colorPalette: 'Organic Emerald, Sage & Snow White',
    scent: 'Crisp Green Forest Rain & Herbaceous Earth'
  }
];

export const OCCASIONS_DATA = [
  {
    name: 'Birthday',
    description: 'Bright, joyous blossoms to mark another milestone of wonderful memories.',
    image: birthdayBloomImg,
    stemHighlight: 'Peonies, Sunflowers & Spray Roses'
  },
  {
    name: 'Anniversary',
    description: 'Enduring symbols of passion, commitment and unconditional tenderness.',
    image: featuredRose,
    stemHighlight: 'Ecuadorian Velvet Roses & Lilies'
  },
  {
    name: 'Love & Romance',
    description: 'Intimate poetic blooms to say everything your heart feels without a word.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85',
    stemHighlight: 'Garden Roses, Ranunculus & Peonies'
  },
  {
    name: 'Congratulations',
    description: 'Grand opulent bouquets to celebrate promotions, graduations and new chapters.',
    image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1000&q=85',
    stemHighlight: 'Casablanca Lilies & Champagne Blooms'
  },
  {
    name: 'Thank You',
    description: 'A heartfelt gesture of genuine gratitude wrapped in botanical elegance.',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1000&q=85',
    stemHighlight: 'Dutch Hydrangeas & Sweet Peas'
  },
  {
    name: 'Get Well Soon',
    description: 'Soothing natural colors and gentle fragrance to restore cheer and spirits.',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1000&q=85',
    stemHighlight: 'Chamomile, Marigold & Rosemary'
  },
  {
    name: 'Friendship',
    description: 'Warm, sunny bouquets honoring companionship, laughter and shared stories.',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85',
    stemHighlight: 'Pastel Garden Roses & Ranunculus'
  },
  {
    name: 'Just Because',
    description: 'No reason needed—spontaneous beauty to brighten someone’s ordinary Tuesday.',
    image: customBannerImg,
    stemHighlight: 'Loose Artisan Botanical Mix'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    author: 'Priya Sharma',
    city: 'New Delhi',
    rating: 5,
    date: 'Verified Buyer · Delivered Sept 2026',
    title: 'Breathtaking quality and fragrance',
    content: 'Absolutely beautiful bouquet. The Ecuadorian roses were extraordinarily fresh, elegant and looked even grander than the pictures. Arrived in a chilled insulated box with flower food and care card.',
    occasion: 'Anniversary'
  },
  {
    id: 't-2',
    author: 'Arjun Mehta',
    city: 'Mumbai',
    rating: 5,
    date: 'Verified Buyer · Delivered Sept 2026',
    title: 'The perfect anniversary surprise',
    content: 'The perfect surprise for my wife on our 5th anniversary. Beautifully arranged with real silk ribbons and delivered right on time during the morning slot. Lasted a full 9 days in our living room!',
    occasion: 'Love & Romance'
  },
  {
    id: 't-3',
    author: 'Ananya Deshmukh',
    city: 'Bengaluru',
    rating: 5,
    date: 'Verified Buyer · Delivered Sept 2026',
    title: 'Luxury D2C experience done right',
    content: 'Such a premium experience from ordering to delivery. The custom bouquet builder was intuitive and fun to use. The handwritten calligraphy card made it feel like a bespoke couture gift.',
    occasion: 'Birthday'
  },
  {
    id: 't-4',
    author: 'Vikramaditya Roy',
    city: 'Kolkata',
    rating: 5,
    date: 'Verified Buyer · Delivered Sept 2026',
    title: 'Flawless same-day delivery',
    content: 'Ordered at 10 AM for an urgent congratulatory gift, delivered by 2 PM in pristine condition with dewy fresh lilies. Customer support on WhatsApp was prompt and courteous.',
    occasion: 'Congratulations'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: heroFloral,
    likes: '1,420',
    caption: 'Morning studio harvest: English garden roses meeting fresh Italian ruscus foliage.'
  },
  {
    id: 'ig-2',
    image: featuredRose,
    likes: '2,150',
    caption: 'Deep Ecuadorian crimson wrapped in bespoke botanical kraft and antique gold ribbon.'
  },
  {
    id: 'ig-3',
    image: aboutCraftImg,
    likes: '1,890',
    caption: 'In the atelier: Every stem spiral-bound by hand with deliberate care.'
  },
  {
    id: 'ig-4',
    image: birthdayBloomImg,
    likes: '980',
    caption: 'Pastel poetry in full bloom. Ready for a milestone celebration in Delhi.'
  },
  {
    id: 'ig-5',
    image: customBannerImg,
    likes: '1,740',
    caption: 'Flatlay textures: Ranunculus, olive branch clippings, and pure raw silk.'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85',
    likes: '3,210',
    caption: 'Peony season magic. Soft petals, rich textures, and enduring love.'
  }
];
