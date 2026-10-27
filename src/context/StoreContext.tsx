import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Address,
  Coupon,
  Order,
  OrderStatus,
  UserProfile,
  Announcement,
  Gender,
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import {
  INITIAL_ANNOUNCEMENTS,
  AVAILABLE_COUPONS,
  SHIPPING_RULES,
} from '../data/storeConfig';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Pricing & Calculations
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isFreeShippingEligible: boolean;
  remainingForFreeShipping: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User & Auth
  currentUser: UserProfile | null;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, phone: string) => boolean;
  logout: () => void;
  loginAsDemoUser: () => void;
  loginAsAdmin: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (addressId: string) => void;

  // Orders & Fulfillment
  orders: Order[];
  createOrder: (checkoutData: {
    address: Address;
    shippingMethod: 'standard' | 'express';
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
    paymentDetails?: {
      transactionId?: string;
      upiId?: string;
      cardLast4?: string;
      bankName?: string;
    };
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;
  requestReturn: (orderId: string, reason: string) => void;
  getOrderById: (orderIdOrNumber: string) => Order | undefined;

  // Announcements
  announcements: Announcement[];
  updateAnnouncements: (items: Announcement[]) => void;

  // Routing & Views
  currentView: 'home' | 'catalog' | 'product' | 'cart' | 'checkout' | 'account' | 'tracking' | 'admin' | 'policies';
  selectedProductSlug: string | null;
  policyTab: string;
  catalogCategory: string | null;
  catalogGender: Gender | 'all' | null;
  searchQuery: string;
  navigateTo: (
    view: 'home' | 'catalog' | 'product' | 'cart' | 'checkout' | 'account' | 'tracking' | 'admin' | 'policies',
    params?: { slug?: string; category?: string; gender?: Gender | 'all'; policyTab?: string; query?: string }
  ) => void;

  // Notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-demo-01',
  name: 'Gra Cnu',
  email: 'gra.cnu96@gmail.com',
  phone: '+91 98765 43210',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Gra Cnu',
      phone: '+91 98765 43210',
      addressLine1: 'Flat 402, Lotus Residency, 12th Main',
      addressLine2: 'Indiranagar Stage 2',
      landmark: 'Near Metro Station',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038',
      isDefault: true,
    },
    {
      id: 'addr-2',
      fullName: 'Gra Cnu',
      phone: '+91 98765 43210',
      addressLine1: 'B-14, Green Park Extension',
      addressLine2: 'Near Uphaar Cinema',
      city: 'New Delhi',
      state: 'Delhi NCR',
      pinCode: '110016',
      isDefault: false,
    },
  ],
  wishlist: ['buy-w-001', 'buy-m-001', 'buy-w-006'],
  isAdmin: false,
};

const SEED_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'BUY-2026-84912',
    date: '2026-10-22T14:30:00Z',
    status: 'Delivered',
    items: [
      {
        id: 'buy-w-001-M-Ecru Ivory',
        productId: 'buy-w-001',
        product: INITIAL_PRODUCTS[0],
        selectedSize: 'M',
        selectedColor: 'Ecru Ivory',
        quantity: 1,
        unitPrice: 899,
      },
    ],
    subtotal: 899,
    discount: 90,
    appliedCoupon: 'WELCOME10',
    shippingFee: 99,
    shippingMethod: 'standard',
    total: 908,
    paymentMethod: 'UPI',
    paymentStatus: 'Success',
    paymentDetails: {
      transactionId: 'UPI-TXN-98421049281',
      upiId: 'cnu@okhdfcbank',
      gateway: 'Razorpay Sandbox (Simulated)',
      verifiedAt: '2026-10-22T14:31:12Z',
    },
    shippingAddress: DEFAULT_DEMO_USER.addresses[0],
    courier: 'Blue Dart Express',
    trackingNumber: 'BLUDART-IN-8491204',
    estimatedDelivery: '25 Oct 2026',
    trackingHistory: [
      {
        status: 'Order Placed & Verified',
        timestamp: '22 Oct 2026, 02:30 PM',
        location: 'Bengaluru Fulfillment Hub',
        description: 'Payment authorized and inventory reserved.',
      },
      {
        status: 'Package Packed',
        timestamp: '23 Oct 2026, 10:15 AM',
        location: 'Bengaluru Central Warehouse',
        description: 'Item inspected for craftsmanship and packed in eco-friendly cotton pouch.',
      },
      {
        status: 'Handed Over to Courier',
        timestamp: '23 Oct 2026, 05:40 PM',
        location: 'Blue Dart Hub, Bengaluru',
        description: 'Consignment in transit.',
      },
      {
        status: 'Out for Delivery',
        timestamp: '25 Oct 2026, 09:20 AM',
        location: 'Indiranagar Delivery Center',
        description: 'Delivery associate out on route.',
      },
      {
        status: 'Delivered',
        timestamp: '25 Oct 2026, 01:15 PM',
        location: 'Indiranagar, Bengaluru',
        description: 'Package delivered safely to recipient.',
      },
    ],
  },
  {
    id: 'ord-1002',
    orderNumber: 'BUY-2026-92831',
    date: '2026-10-25T11:20:00Z',
    status: 'Shipped',
    items: [
      {
        id: 'buy-m-001-L-Faded Washed Black',
        productId: 'buy-m-001',
        product: INITIAL_PRODUCTS[15],
        selectedSize: 'L',
        selectedColor: 'Faded Washed Black',
        quantity: 1,
        unitPrice: 999,
      },
      {
        id: 'buy-m-007-32-Olive Drab',
        productId: 'buy-m-007',
        product: INITIAL_PRODUCTS[21],
        selectedSize: '32',
        selectedColor: 'Olive Drab',
        quantity: 1,
        unitPrice: 2499,
      },
    ],
    subtotal: 3498,
    discount: 524,
    appliedCoupon: 'BUYTIFUL15',
    shippingFee: 0,
    shippingMethod: 'express',
    total: 2974,
    paymentMethod: 'Card',
    paymentStatus: 'Success',
    paymentDetails: {
      transactionId: 'CARD-AUTH-83921048',
      cardLast4: '4242',
      gateway: 'Razorpay Sandbox (Simulated)',
      verifiedAt: '2026-10-25T11:21:40Z',
    },
    shippingAddress: DEFAULT_DEMO_USER.addresses[0],
    courier: 'Delhivery Surface Plus',
    trackingNumber: 'DELHIVERY-928310',
    estimatedDelivery: '28 Oct 2026',
    trackingHistory: [
      {
        status: 'Order Placed & Verified',
        timestamp: '25 Oct 2026, 11:20 AM',
        location: 'Online Checkout',
        description: 'Order confirmed with simulated payment authorization.',
      },
      {
        status: 'Packed & Dispatched',
        timestamp: '26 Oct 2026, 03:30 PM',
        location: 'Warehouse Hub 3, Mumbai',
        description: 'Dispatched via express air cargo to destination hub.',
      },
      {
        status: 'In Transit',
        timestamp: '27 Oct 2026, 06:00 AM',
        location: 'Bengaluru Sort Facility',
        description: 'Arrived at destination sorting center.',
      },
    ],
  },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('buytiful_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('buytiful_products', JSON.stringify(products));
    } catch {
      // storage unavailable
    }
  }, [products]);

  // 2. Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('buytiful_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('buytiful_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  // 3. Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('buytiful_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['buy-w-001', 'buy-m-001', 'buy-w-006'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('buytiful_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist]);

  // 4. User profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('buytiful_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_DEMO_USER;
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('buytiful_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('buytiful_user');
      }
    } catch {
      // storage unavailable
    }
  }, [currentUser]);

  // 5. Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('buytiful_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SEED_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('buytiful_orders', JSON.stringify(orders));
    } catch {
      // storage unavailable
    }
  }, [orders]);

  // 6. Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem('buytiful_announcements');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  // 7. Coupons & Pricing
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    return AVAILABLE_COUPONS[0]; // Pre-apply WELCOME10 for delightful first experience
  });

  // 8. Navigation state
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'product' | 'cart' | 'checkout' | 'account' | 'tracking' | 'admin' | 'policies'>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [policyTab, setPolicyTab] = useState<string>('shipping');
  const [catalogCategory, setCatalogCategory] = useState<string | null>(null);
  const [catalogGender, setCatalogGender] = useState<Gender | 'all' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 9. Toast system
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Discount calculation
  let calculatedDiscount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      const disc = Math.round((subtotal * appliedCoupon.value) / 100);
      calculatedDiscount = appliedCoupon.maxDiscount ? Math.min(disc, appliedCoupon.maxDiscount) : disc;
    } else {
      calculatedDiscount = appliedCoupon.value;
    }
  }

  const isFreeShippingEligible = subtotal >= SHIPPING_RULES.freeShippingThreshold || appliedCoupon?.code === 'FREESHIP';
  const remainingForFreeShipping = Math.max(0, SHIPPING_RULES.freeShippingThreshold - subtotal);
  const shippingFee = cart.length === 0 ? 0 : isFreeShippingEligible ? 0 : SHIPPING_RULES.standardShippingFee;
  const total = Math.max(0, subtotal - calculatedDiscount + shippingFee);

  // Cart Actions
  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity,
          unitPrice: product.price,
        },
      ];
    });
    showToast(`Added "${product.name}" (${size}) to bag`);
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from your bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupon Actions
  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const found = AVAILABLE_COUPONS.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active
    );
    if (!found) {
      return { success: false, message: `Coupon "${code}" is invalid or expired` };
    }
    if (subtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Min. order of ₹${found.minOrderValue} required for ${found.code}`,
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`);
    return { success: true, message: `Applied ${found.code}!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Wishlist Actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // User Actions
  const login = (email: string) => {
    setCurrentUser({
      ...DEFAULT_DEMO_USER,
      email,
    });
    showToast(`Welcome back, ${email.split('@')[0]}!`);
    return true;
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      addresses: [],
      wishlist: [],
      isAdmin: false,
    };
    setCurrentUser(newUser);
    showToast(`Welcome to Buytiful.in, ${name}!`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out safely', 'info');
  };

  const loginAsDemoUser = () => {
    setCurrentUser(DEFAULT_DEMO_USER);
    showToast('Switched to Demo Customer Account');
  };

  const loginAsAdmin = () => {
    setCurrentUser({
      id: 'admin-01',
      name: 'Buytiful Store Admin',
      email: 'admin@buytiful.in',
      phone: '+91 99999 88888',
      addresses: DEFAULT_DEMO_USER.addresses,
      wishlist: [],
      isAdmin: true,
    });
    showToast('Admin Mode Enabled', 'info');
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    if (!currentUser) return;
    const newAddr: Address = {
      ...addr,
      id: `addr-${Date.now()}`,
      isDefault: currentUser.addresses.length === 0,
    };
    setCurrentUser({
      ...currentUser,
      addresses: [...currentUser.addresses, newAddr],
    });
    showToast('Delivery address saved');
  };

  const deleteAddress = (addressId: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      addresses: currentUser.addresses.filter((a) => a.id !== addressId),
    });
    showToast('Address removed', 'info');
  };

  // Order Actions
  const createOrder = ({
    address,
    shippingMethod,
    paymentMethod,
    paymentDetails = {},
  }: {
    address: Address;
    shippingMethod: 'standard' | 'express';
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
    paymentDetails?: {
      transactionId?: string;
      upiId?: string;
      cardLast4?: string;
      bankName?: string;
    };
  }): Order => {
    const orderNum = `BUY-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const finalShipFee =
      shippingMethod === 'express'
        ? SHIPPING_RULES.expressShippingFee
        : isFreeShippingEligible
        ? 0
        : SHIPPING_RULES.standardShippingFee;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toISOString(),
      status: paymentMethod === 'COD' ? 'Pending Payment' : 'Payment Confirmed',
      items: [...cart],
      subtotal,
      discount: calculatedDiscount,
      appliedCoupon: appliedCoupon?.code,
      shippingFee: finalShipFee,
      shippingMethod,
      total: subtotal - calculatedDiscount + finalShipFee,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Success',
      paymentDetails: {
        transactionId: paymentDetails.transactionId || `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        upiId: paymentDetails.upiId,
        cardLast4: paymentDetails.cardLast4,
        bankName: paymentDetails.bankName,
        gateway: 'Razorpay Sandbox (Simulated)',
        verifiedAt: new Date().toISOString(),
      },
      shippingAddress: address,
      courier: shippingMethod === 'express' ? 'Blue Dart Air Express' : 'Delhivery Ground Express',
      trackingNumber: `TRK-IN-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      trackingHistory: [
        {
          status: 'Order Created & Inventory Reserved',
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          location: 'Bengaluru Central Facility',
          description: paymentMethod === 'COD' ? 'COD Order placed. Awaiting dispatch confirmation.' : 'Simulated payment verified via Razorpay sandbox.',
        },
      ],
    };

    // Deduct stock safely
    setProducts((prev) =>
      prev.map((p) => {
        const matchingCartItem = cart.find((item) => item.productId === p.id);
        if (matchingCartItem) {
          return {
            ...p,
            stockQuantity: Math.max(0, p.stockQuantity - matchingCartItem.quantity),
          };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const newCheckpoint = {
            status: `Status changed to ${status}`,
            timestamp: new Date().toLocaleString('en-IN'),
            location: 'Central Logistics Dispatch',
            description: `Order updated to ${status}.`,
          };
          return {
            ...ord,
            status,
            trackingHistory: [...ord.trackingHistory, newCheckpoint],
          };
        }
        return ord;
      })
    );
    showToast(`Order status updated to ${status}`);
  };

  const cancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'Cancelled');
    showToast('Order cancelled successfully', 'info');
  };

  const requestReturn = (orderId: string, reason: string) => {
    updateOrderStatus(orderId, 'Return Requested');
    showToast(`Return requested for: "${reason}". Support team will verify.`);
  };

  const getOrderById = (idOrNumber: string) => {
    const q = idOrNumber.trim().toUpperCase();
    return orders.find(
      (o) => o.id.toUpperCase() === q || o.orderNumber.toUpperCase() === q || o.trackingNumber.toUpperCase() === q
    );
  };

  // Product management (Admin)
  const addProduct = (p: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...p,
      id: `buy-custom-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added product "${newProduct.name}" to catalog`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const updateAnnouncements = (items: Announcement[]) => {
    setAnnouncements(items);
    try {
      localStorage.setItem('buytiful_announcements', JSON.stringify(items));
    } catch {
      // fallback
    }
    showToast('Announcement banner updated');
  };

  // Navigation
  const navigateTo = (
    view: 'home' | 'catalog' | 'product' | 'cart' | 'checkout' | 'account' | 'tracking' | 'admin' | 'policies',
    params?: { slug?: string; category?: string; gender?: Gender | 'all'; policyTab?: string; query?: string }
  ) => {
    setCurrentView(view);
    if (params?.slug) setSelectedProductSlug(params.slug);
    if (params?.category !== undefined) setCatalogCategory(params.category || null);
    if (params?.gender !== undefined) setCatalogGender(params.gender || null);
    if (params?.policyTab) setPolicyTab(params.policyTab);
    if (params?.query !== undefined) setSearchQuery(params.query);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discount: calculatedDiscount,
        shippingFee,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isFreeShippingEligible,
        remainingForFreeShipping,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentUser,
        login,
        register,
        logout,
        loginAsDemoUser,
        loginAsAdmin,
        addAddress,
        deleteAddress,
        orders,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        requestReturn,
        getOrderById,
        announcements,
        updateAnnouncements,
        currentView,
        selectedProductSlug,
        policyTab,
        catalogCategory,
        catalogGender,
        searchQuery,
        navigateTo,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
