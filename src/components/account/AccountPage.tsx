import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, Address } from '../../types';
import { INDIAN_STATES } from '../../data/storeConfig';
import {
  Package,
  Heart,
  MapPin,
  User as UserIcon,
  Plus,
  Trash2,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ProductCard } from '../product/ProductCard';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    orders,
    wishlist,
    products,
    logout,
    login,
    register,
    loginAsDemoUser,
    addAddress,
    deleteAddress,
    requestReturn,
    navigateTo,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');
  
  // Auth Form State (if logged out)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');

  // Add Address Modal state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLine1, setNewLine1] = useState('');
  const [newLine2, setNewLine2] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('Karnataka');
  const [newPin, setNewPin] = useState('');

  // Return request modal state
  const [selectedReturnOrderId, setSelectedReturnOrderId] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState('Size was too large');

  // Handle Login / Register
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(authEmail, authPassword);
    } else {
      register(authName, authEmail, authPhone);
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newPhone || !newLine1 || !newCity || !newPin) {
      showToast('Please fill out all mandatory address fields', 'error');
      return;
    }
    addAddress({
      fullName: newFullName,
      phone: newPhone,
      addressLine1: newLine1,
      addressLine2: newLine2,
      city: newCity,
      state: newState,
      pinCode: newPin,
    });
    setIsAddingAddress(false);
    setNewFullName('');
    setNewPhone('');
    setNewLine1('');
    setNewLine2('');
    setNewCity('');
    setNewPin('');
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // If user is not logged in, show elegant auth panel
  if (!currentUser) {
    return (
      <div className="bg-[#F8F5F0] min-h-screen py-16 px-4 sm:px-6">
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#E8DED2] p-8 shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <span className="font-editorial text-2xl font-bold text-[#191919]">
              buytiful<span className="text-[#8D2337]">.in</span>
            </span>
            <h2 className="text-xl font-bold text-[#191919]">
              {authMode === 'login' ? 'Customer Sign In' : 'Create an Account'}
            </h2>
            <p className="text-xs text-zinc-500">
              Manage saved addresses, track shipments, and access your curated wishlist.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="e.g. Gra Cnu"
                    className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Mobile Number (+91) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#191919] hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              {authMode === 'login' ? 'Sign In Securely' : 'Complete Registration'}
            </button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="pt-4 border-t border-[#E8DED2] text-center space-y-3">
            <p className="text-xs text-zinc-500">
              {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-[#8D2337] font-bold hover:underline"
              >
                {authMode === 'login' ? 'Register Now' : 'Sign In'}
              </button>
            </p>

            <button
              onClick={loginAsDemoUser}
              className="w-full py-2 bg-[#F8F5F0] hover:bg-[#E8DED2] text-zinc-800 text-xs font-semibold rounded-xl border border-[#E8DED2] transition-colors"
            >
              Explore as Demo Customer (Gra Cnu)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Customer Header */}
        <div className="bg-white rounded-3xl border border-[#E8DED2] p-6 sm:p-8 mb-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#191919] text-[#F8F5F0] flex items-center justify-center font-bold text-lg">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#191919]">
                  {currentUser.name}
                </h1>
                {currentUser.isAdmin && (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-900 text-amber-300">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">{currentUser.email} · {currentUser.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('tracking')}
              className="px-4 py-2.5 bg-[#F8F5F0] hover:bg-[#E8DED2] text-[#191919] text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 border border-[#E8DED2]"
            >
              <Truck className="w-4 h-4 text-[#8D2337]" />
              <span>Track Consignments</span>
            </button>

            <button
              onClick={logout}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 pb-6 border-b border-[#E8DED2] mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#191919] text-white shadow-sm'
                : 'bg-white text-zinc-600 hover:text-[#191919] border border-[#E8DED2]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'addresses'
                ? 'bg-[#191919] text-white shadow-sm'
                : 'bg-white text-zinc-600 hover:text-[#191919] border border-[#E8DED2]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({currentUser.addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'wishlist'
                ? 'bg-[#191919] text-white shadow-sm'
                : 'bg-white text-zinc-600 hover:text-[#191919] border border-[#E8DED2]'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlist.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDERS LIST */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-[#E8DED2] overflow-hidden shadow-xs"
                >
                  {/* Order Top Bar */}
                  <div className="p-4 sm:p-6 bg-[#F8F5F0]/60 border-b border-[#E8DED2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div>
                        <span className="text-zinc-500 uppercase font-semibold text-[10px]">
                          Order Reference
                        </span>
                        <p className="font-bold text-[#191919] font-mono mt-0.5">
                          {order.orderNumber}
                        </p>
                      </div>
                      <div className="hidden sm:block w-px h-8 bg-[#E8DED2]" />
                      <div>
                        <span className="text-zinc-500 uppercase font-semibold text-[10px]">
                          Order Placed
                        </span>
                        <p className="font-semibold text-[#191919] mt-0.5">
                          {new Date(order.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="hidden sm:block w-px h-8 bg-[#E8DED2]" />
                      <div>
                        <span className="text-zinc-500 uppercase font-semibold text-[10px]">
                          Total Paid
                        </span>
                        <p className="font-bold text-[#8D2337] mt-0.5 tabular-nums">
                          ₹{order.total.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.status}
                      </span>

                      <button
                        onClick={() => navigateTo('tracking')}
                        className="px-3 py-1.5 bg-[#191919] text-white hover:bg-zinc-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 sm:p-6 divide-y divide-[#E8DED2]/40">
                    {order.items.map((item) => (
                      <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 aspect-[3/4] rounded-xl overflow-hidden bg-[#F8F5F0] shrink-0 border border-[#E8DED2]/60">
                            <ImageWithFallback
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fallbackCategory={item.product.category}
                              fallbackName={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4
                              onClick={() => navigateTo('product', { slug: item.product.slug })}
                              className="text-sm font-semibold text-[#191919] hover:text-[#8D2337] cursor-pointer"
                            >
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-zinc-500 mt-0.5">
                              Size: <strong>{item.selectedSize}</strong> · Color: <strong>{item.selectedColor}</strong> · Qty: <strong>{item.quantity}</strong>
                            </p>
                            <p className="text-xs font-bold text-[#191919] mt-1 tabular-nums">
                              ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>

                        {/* Return request button if delivered */}
                        {order.status === 'Delivered' && (
                          <button
                            onClick={() => setSelectedReturnOrderId(order.id)}
                            className="text-xs font-semibold text-[#8D2337] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Return Item</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Order Footer with Courier notes */}
                  <div className="px-6 py-3 bg-[#F8F5F0]/30 border-t border-[#E8DED2] flex items-center justify-between text-[11px] text-zinc-500">
                    <span>
                      Carrier: <strong className="text-zinc-800">{order.courier}</strong> · AWB: <strong className="text-zinc-800">{order.trackingNumber}</strong>
                    </span>
                    <span>
                      Shipping Address: {order.shippingAddress.city}, {order.shippingAddress.state} ({order.shippingAddress.pinCode})
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-white rounded-3xl border border-[#E8DED2] p-8 space-y-4">
                <Package className="w-12 h-12 text-zinc-300 mx-auto" />
                <h3 className="text-lg font-bold text-[#191919]">No Orders Yet</h3>
                <p className="text-xs text-zinc-500">
                  You haven't placed any apparel orders yet. Browse our contemporary wardrobe.
                </p>
                <button
                  onClick={() => navigateTo('catalog')}
                  className="px-5 py-2.5 bg-[#191919] text-white text-xs font-semibold rounded-xl"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-xs font-semibold text-zinc-500">
                Addresses used for 1-click checkout and delivery estimates.
              </p>
              <button
                onClick={() => setIsAddingAddress(true)}
                className="px-4 py-2 bg-[#191919] hover:bg-zinc-800 text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentUser.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-6 bg-white rounded-2xl border border-[#E8DED2] space-y-3 relative shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#191919]">
                      {addr.fullName}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Primary Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {addr.addressLine1}
                    {addr.addressLine2 && `, ${addr.addressLine2}`}
                    {addr.landmark && ` (Near ${addr.landmark})`}
                    <br />
                    {addr.city}, {addr.state} - <strong>{addr.pinCode}</strong>
                  </p>
                  <p className="text-xs text-zinc-500">Phone: {addr.phone}</p>

                  <div className="pt-2 border-t border-[#E8DED2] flex justify-end">
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Address Modal */}
            {isAddingAddress && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                <form
                  onSubmit={handleSaveAddress}
                  className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-[#E8DED2]"
                >
                  <h3 className="text-lg font-bold text-[#191919]">Add Delivery Address</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newFullName}
                        onChange={(e) => setNewFullName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Mobile</label>
                      <input
                        type="tel"
                        required
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs border rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={newLine1}
                      onChange={(e) => setNewLine1(e.target.value)}
                      className="w-full px-3 py-2 text-xs border rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">PIN Code</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        className="w-full px-3 py-2 text-xs border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs border rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">State</label>
                      <select
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        className="w-full px-2 py-2 text-xs border rounded-xl bg-white"
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-4 py-2 border rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#191919] text-white rounded-xl text-xs font-semibold"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {wishlistProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-3xl border border-[#E8DED2] p-8 space-y-4">
                <Heart className="w-12 h-12 text-zinc-300 mx-auto" />
                <h3 className="text-lg font-bold text-[#191919]">Your Wishlist is Empty</h3>
                <p className="text-xs text-zinc-500">
                  Tap the heart icon on any product card to save your favorite fits for later.
                </p>
                <button
                  onClick={() => navigateTo('catalog')}
                  className="px-5 py-2.5 bg-[#191919] text-white text-xs font-semibold rounded-xl"
                >
                  Explore Collection
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Return Request Modal */}
      {selectedReturnOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-[#E8DED2]">
            <h3 className="text-lg font-bold text-[#191919]">7-Day Return / Exchange Request</h3>
            <p className="text-xs text-zinc-500">
              Please specify why you are requesting a return for Order #{selectedReturnOrderId}.
            </p>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Reason for Return</label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full p-2.5 text-xs border border-[#E8DED2] rounded-xl bg-white"
              >
                <option value="Size was too large">Size was too large</option>
                <option value="Size was too small">Size was too small</option>
                <option value="Fabric color did not match expectation">Fabric color did not match expectation</option>
                <option value="Changed mind / Defect">Changed mind / Quality issue</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedReturnOrderId(null)}
                className="px-4 py-2 border rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  requestReturn(selectedReturnOrderId, returnReason);
                  setSelectedReturnOrderId(null);
                }}
                className="px-5 py-2 bg-[#8D2337] text-white rounded-xl text-xs font-semibold"
              >
                Submit Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
