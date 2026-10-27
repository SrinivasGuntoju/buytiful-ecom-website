import { Announcement, Coupon, ProductReview } from '../types';

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    text: 'WELCOME TO BUYTIFUL — FRESH STYLES, EVERY SEASON',
    linkText: 'Explore Collection',
    active: true,
  },
  {
    id: 'ann-2',
    text: 'EXTRA 10% OFF YOUR FIRST ORDER — USE CODE WELCOME10',
    code: 'WELCOME10',
    linkText: 'Apply Code',
    active: true,
  },
  {
    id: 'ann-3',
    text: 'FREE EXPRESS SHIPPING ON ALL ORDERS ABOVE ₹999 ACROSS INDIA',
    linkText: 'Shop Now',
    active: true,
  },
  {
    id: 'ann-4',
    text: 'NEW SEASON CO-ORDS & LINEN DROPS — DISCOVER YOUR FIT',
    linkText: 'View Drops',
    active: true,
  },
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    minOrderValue: 799,
    maxDiscount: 500,
    description: '10% off on your order (Min order ₹799, Max discount ₹500)',
    active: true,
  },
  {
    code: 'BUYTIFUL15',
    discountType: 'percentage',
    value: 15,
    minOrderValue: 1999,
    maxDiscount: 800,
    description: '15% off on orders above ₹1,999 (Max discount ₹800)',
    active: true,
  },
  {
    code: 'FREESHIP',
    discountType: 'fixed',
    value: 99,
    minOrderValue: 499,
    description: 'Free standard shipping on orders above ₹499',
    active: true,
  },
  {
    code: 'FESTIVE20',
    discountType: 'percentage',
    value: 20,
    minOrderValue: 2999,
    maxDiscount: 1200,
    description: 'Special 20% off for festive purchases over ₹2,999',
    active: true,
  },
];

export const SHIPPING_RULES = {
  freeShippingThreshold: 999,
  standardShippingFee: 99,
  expressShippingFee: 149,
  codConvenienceFee: 49,
};

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi NCR',
  'Chandigarh',
  'Jammu & Kashmir',
  'Ladakh',
  'Puducherry',
];

export interface PinCodeEstimate {
  valid: boolean;
  city?: string;
  state?: string;
  standardDays?: string;
  expressDays?: string;
  codAvailable: boolean;
  message: string;
}

export function checkPinCodeDelivery(pin: string): PinCodeEstimate {
  const cleaned = pin.trim();
  if (!/^\d{6}$/.test(cleaned)) {
    return {
      valid: false,
      codAvailable: false,
      message: 'Please enter a valid 6-digit Indian PIN code',
    };
  }

  const firstTwo = cleaned.substring(0, 2);
  const metroPrefixes = ['11', '12', '20', '40', '56', '50', '60', '70']; // Delhi, Gurgaon, Noida, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata

  if (metroPrefixes.includes(firstTwo)) {
    return {
      valid: true,
      city: firstTwo === '11' ? 'New Delhi' : firstTwo === '40' ? 'Mumbai' : firstTwo === '56' ? 'Bengaluru' : firstTwo === '50' ? 'Hyderabad' : 'Metro Hub',
      state: 'Metro Zone',
      standardDays: '2 - 3 business days',
      expressDays: 'Next business day',
      codAvailable: true,
      message: 'Fast express delivery available in your zone!',
    };
  }

  // General serviceability
  return {
    valid: true,
    city: 'Direct Service Region',
    state: 'India',
    standardDays: '4 - 5 business days',
    expressDays: '2 - 3 business days',
    codAvailable: true,
    message: 'Standard and Express delivery available to this PIN code.',
  };
}

export interface LookOutfit {
  id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  productIds: string[];
}

export const SHOP_THE_LOOKS: LookOutfit[] = [
  {
    id: 'look-1',
    title: 'The Contemporary Minimalist',
    tagline: 'Effortless linen tailoring for modern weekdays',
    description: 'Pairing our pure French linen resort shirt with high-rise wide-leg denim and artisan handcrafted leather accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    productIds: ['buy-w-002', 'buy-w-004', 'buy-w-015'],
  },
  {
    id: 'look-2',
    title: 'Modern Architecture in Streetwear',
    tagline: 'Heavyweight textures and relaxed proportions',
    description: 'Combining our 260 GSM overdyed heavyweight tee with heavy ripstop tactical cargo trousers and structured overshirt layering.',
    imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=900&q=80',
    productIds: ['buy-m-001', 'buy-m-007', 'buy-m-010'],
  },
];

export const DEMO_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    productId: 'buy-w-001',
    userName: 'Ananya S.',
    userCity: 'Bengaluru',
    rating: 5,
    title: 'Incredible fabric thickness and drape',
    comment: 'The 240 GSM weight is real—it doesn’t stick to the body and holds its shape through 4 washes already. Love the understated typography on the chest!',
    date: '14 Oct 2026',
    verifiedPurchase: true,
    sizePurchased: 'M',
  },
  {
    id: 'rev-2',
    productId: 'buy-m-001',
    userName: 'Rohan M.',
    userCity: 'Mumbai',
    rating: 5,
    title: 'Best oversized tee in India right now',
    comment: 'Comparing this to international brands that charge 3x more, Buytiful nailed the neckline ribbing and dropped shoulder fit. Delivery took just 2 days.',
    date: '02 Oct 2026',
    verifiedPurchase: true,
    sizePurchased: 'L',
  },
  {
    id: 'rev-3',
    productId: 'buy-w-004',
    userName: 'Kavita R.',
    userCity: 'New Delhi',
    rating: 5,
    title: 'Finally true rigid 100% cotton denim!',
    comment: 'No cheap elastane stretch that sags by 4 PM. These wide legs make legs look endless and the ecru wash is sublime with linen shirts.',
    date: '28 Sep 2026',
    verifiedPurchase: true,
    sizePurchased: '28',
  },
];
