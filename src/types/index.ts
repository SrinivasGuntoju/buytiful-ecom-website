export type Gender = 'women' | 'men' | 'unisex';

export type ProductCategory =
  | 'Oversized T-Shirts'
  | 'Oversized Graphic T-Shirts'
  | 'Premium Cotton T-Shirts'
  | 'Casual Shirts'
  | 'Linen Shirts'
  | 'Dresses'
  | 'Wide-Leg Jeans'
  | 'Straight-Fit Jeans'
  | 'Relaxed-Fit Jeans'
  | 'Co-ord Sets'
  | 'Ethnic Kurtas'
  | 'Tops'
  | 'Trousers & Chinos'
  | 'Casual Trousers'
  | 'Cargo Pants'
  | 'Jackets'
  | 'Lightweight Jackets'
  | 'Hoodies'
  | 'Polo T-Shirts'
  | 'Accessories';

export interface ColorVariant {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  gender: Gender;
  description: string;
  price: number; // in INR (₹)
  originalPrice?: number;
  discountPercent?: number;
  images: string[];
  sizes: string[]; // e.g. ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  colors: ColorVariant[];
  stockQuantity: number;
  sku: string;
  material: string;
  fit: 'Oversized' | 'Relaxed Fit' | 'Regular Fit' | 'Slim Fit' | 'Wide Leg' | 'Straight Fit';
  tags: string[]; // e.g. ['New Arrival', 'Best Seller', 'Trending', 'Sustainable', 'Pure Cotton']
  highlights: string[];
  careInstructions: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  id: string; // unique item id (productId + size + color)
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  unitPrice: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault?: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // percentage (e.g. 10) or fixed amount in INR (e.g. 200)
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  active: boolean;
}

export type OrderStatus =
  | 'Pending Payment'
  | 'Payment Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Return Requested'
  | 'Refunded';

export interface TrackingCheckpoint {
  status: string;
  timestamp: string;
  location: string;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  discount: number;
  appliedCoupon?: string;
  shippingFee: number;
  shippingMethod: 'standard' | 'express';
  total: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  paymentStatus: 'Success' | 'Pending' | 'Failed';
  paymentDetails: {
    transactionId?: string;
    upiId?: string;
    cardLast4?: string;
    bankName?: string;
    gateway: string;
    verifiedAt: string;
  };
  shippingAddress: Address;
  courier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  trackingHistory: TrackingCheckpoint[];
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  wishlist: string[]; // productIds
  isAdmin?: boolean;
}

export interface Announcement {
  id: string;
  text: string;
  code?: string;
  linkText?: string;
  active: boolean;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  userCity: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  sizePurchased?: string;
}

export interface FilterState {
  gender?: Gender | 'all';
  category?: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  fits: string[];
  materials: string[];
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'popularity' | 'discount';
  searchQuery: string;
  onlyInStock: boolean;
}
