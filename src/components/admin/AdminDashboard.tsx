import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Order, OrderStatus, ProductCategory, Gender } from '../../types';
import {
  ShieldCheck,
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Truck,
  RotateCcw,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    announcements,
    updateAnnouncements,
    navigateTo,
    showToast,
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState<'metrics' | 'products' | 'orders' | 'announcements'>('metrics');
  
  // Product creation/edit modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<ProductCategory>('Oversized T-Shirts');
  const [prodGender, setProdGender] = useState<Gender>('women');
  const [prodPrice, setProdPrice] = useState(1299);
  const [prodOriginalPrice, setProdOriginalPrice] = useState(1999);
  const [prodStock, setProdStock] = useState(40);
  const [prodSku, setProdSku] = useState('BUYT-NEW-01');
  const [prodMaterial, setProdMaterial] = useState('100% Combed Cotton');
  const [prodFit, setProdFit] = useState<'Oversized' | 'Relaxed Fit' | 'Regular Fit' | 'Slim Fit' | 'Wide Leg' | 'Straight Fit'>('Relaxed Fit');
  const [prodDescription, setProdDescription] = useState('Premium apparel tailored for contemporary everyday living.');
  const [prodImage, setProdImage] = useState('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80');

  // Order status filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Announcement edit
  const [announcementText, setAnnouncementText] = useState(announcements[0]?.text || '');

  // Metrics calculation from actual orders
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Success' ? o.total : 0), 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const lowStockProducts = products.filter((p) => p.stockQuantity < 25);

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProdName('');
    setProdCategory('Oversized T-Shirts');
    setProdGender('women');
    setProdPrice(1299);
    setProdOriginalPrice(1999);
    setProdStock(40);
    setProdSku(`BUYT-NEW-${Math.floor(10 + Math.random() * 90)}`);
    setProdMaterial('100% Organic Combed Cotton');
    setProdFit('Relaxed Fit');
    setProdDescription('Engineered for breathability and effortless contemporary styling.');
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdGender(p.gender);
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice || Math.round(p.price * 1.4));
    setProdStock(p.stockQuantity);
    setProdSku(p.sku);
    setProdMaterial(p.material);
    setProdFit(p.fit);
    setProdDescription(p.description);
    setProdImage(p.images[0] || '');
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName) {
      showToast('Please enter a product title', 'error');
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: prodName,
        category: prodCategory,
        gender: prodGender,
        price: Number(prodPrice),
        originalPrice: Number(prodOriginalPrice),
        discountPercent: Math.round(((prodOriginalPrice - prodPrice) / prodOriginalPrice) * 100),
        stockQuantity: Number(prodStock),
        sku: prodSku,
        material: prodMaterial,
        fit: prodFit,
        description: prodDescription,
        images: [prodImage],
      });
    } else {
      addProduct({
        slug: prodName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: prodName,
        category: prodCategory,
        gender: prodGender,
        description: prodDescription,
        price: Number(prodPrice),
        originalPrice: Number(prodOriginalPrice),
        discountPercent: Math.round(((prodOriginalPrice - prodPrice) / prodOriginalPrice) * 100),
        images: [prodImage],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
          { name: 'Classic Black', hex: '#191919', inStock: true },
          { name: 'Natural Sand', hex: '#E0D6C3', inStock: true },
        ],
        stockQuantity: Number(prodStock),
        sku: prodSku,
        material: prodMaterial,
        fit: prodFit,
        tags: ['New Season'],
        highlights: ['Pre-shrunk fabric', 'Reinforced seams', 'Breathable weave'],
        careInstructions: ['Machine wash cold, line dry'],
        rating: 5.0,
        reviewCount: 1,
      });
    }

    setIsProductModalOpen(false);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.shippingAddress.fullName.toLowerCase().includes(q) ||
        o.shippingAddress.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-[#F8F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-zinc-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-zinc-950 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Buytiful.in Admin Operations
                </h1>
                <span className="text-[10px] font-bold uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  Role: Store Manager
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Live catalog modification, inventory reservations, and logistics fulfillment dispatcher.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl transition-colors"
            >
              Back to Storefront
            </button>
            <button
              onClick={handleOpenAddProduct}
              className="px-4 py-2 bg-[#8D2337] hover:bg-[#a62b42] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create Product</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-[#E8DED2] pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveAdminTab('metrics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeAdminTab === 'metrics'
                ? 'bg-[#191919] text-white'
                : 'bg-white text-zinc-600 hover:text-[#191919]'
            }`}
          >
            Analytics & KPI
          </button>
          <button
            onClick={() => setActiveAdminTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeAdminTab === 'products'
                ? 'bg-[#191919] text-white'
                : 'bg-white text-zinc-600 hover:text-[#191919]'
            }`}
          >
            Catalog Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeAdminTab === 'orders'
                ? 'bg-[#191919] text-white'
                : 'bg-white text-zinc-600 hover:text-[#191919]'
            }`}
          >
            Fulfillment & Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveAdminTab('announcements')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeAdminTab === 'announcements'
                ? 'bg-[#191919] text-white'
                : 'bg-white text-zinc-600 hover:text-[#191919]'
            }`}
          >
            Store Announcements
          </button>
        </div>

        {/* TAB 1: METRICS */}
        {activeAdminTab === 'metrics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-[#E8DED2] shadow-2xs space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Total Gross Revenue
                </span>
                <p className="text-3xl font-bold text-[#191919] tabular-nums">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold">
                  From {orders.length} verified customer orders
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-[#E8DED2] shadow-2xs space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Total Orders Placed
                </span>
                <p className="text-3xl font-bold text-[#191919] tabular-nums">
                  {orders.length}
                </p>
                <p className="text-[11px] text-zinc-500">
                  {totalItemsSold} garment units packed
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-[#E8DED2] shadow-2xs space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Catalog Active SKUs
                </span>
                <p className="text-3xl font-bold text-[#191919] tabular-nums">
                  {products.length}
                </p>
                <p className="text-[11px] text-zinc-500">
                  Women & Men apparel styles
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-[#E8DED2] shadow-2xs space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Low Stock Warnings
                </span>
                <p className="text-3xl font-bold text-amber-600 tabular-nums">
                  {lowStockProducts.length}
                </p>
                <p className="text-[11px] text-amber-700">
                  SKUs below 25 inventory units
                </p>
              </div>
            </div>

            {/* Low stock table */}
            {lowStockProducts.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E8DED2] p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-bold text-[#191919]">
                    Inventory Attention Items (Low Stock)
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F8F5F0] text-zinc-600 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3">SKU</th>
                        <th className="p-3">Product Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Stock Left</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DED2]">
                      {lowStockProducts.map((p) => (
                        <tr key={p.id}>
                          <td className="p-3 font-mono font-bold text-zinc-800">{p.sku}</td>
                          <td className="p-3 font-semibold text-[#191919]">{p.name}</td>
                          <td className="p-3">{p.category}</td>
                          <td className="p-3 tabular-nums">₹{p.price}</td>
                          <td className="p-3">
                            <span className="font-bold text-rose-600 px-2 py-0.5 rounded bg-rose-50 border border-rose-200">
                              {p.stockQuantity} remaining
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                updateProduct(p.id, { stockQuantity: p.stockQuantity + 50 });
                              }}
                              className="px-2.5 py-1 bg-[#191919] text-white rounded-lg text-[11px] font-semibold hover:bg-zinc-800 cursor-pointer"
                            >
                              + Restock 50
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeAdminTab === 'products' && (
          <div className="bg-white rounded-3xl border border-[#E8DED2] p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DED2]">
              <h3 className="text-base font-bold text-[#191919]">
                Live Store Catalog ({products.length} Products)
              </h3>
              <button
                onClick={handleOpenAddProduct}
                className="px-3.5 py-1.5 bg-[#8D2337] text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F8F5F0] text-zinc-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Item</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Gender</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DED2]/60">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F8F5F0]/40 transition-colors">
                      <td className="p-3 font-semibold text-[#191919] max-w-xs truncate">
                        {p.name}
                      </td>
                      <td className="p-3 text-zinc-600">{p.category}</td>
                      <td className="p-3 capitalize">{p.gender}</td>
                      <td className="p-3 font-bold tabular-nums">₹{p.price}</td>
                      <td className="p-3 tabular-nums font-bold">
                        <span className={p.stockQuantity < 20 ? 'text-amber-600' : 'text-zinc-800'}>
                          {p.stockQuantity}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-zinc-500">{p.sku}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1 text-zinc-500 hover:text-black transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5 inline" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1 text-zinc-400 hover:text-rose-600 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeAdminTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-[#E8DED2] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DED2]">
              <h3 className="text-base font-bold text-[#191919]">
                Customer Consignments ({filteredOrders.length})
              </h3>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search order ref or customer..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="px-3 py-1.5 text-xs border rounded-xl"
                />

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs border rounded-xl bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="Payment Confirmed">Payment Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Return Requested">Return Requested</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredOrders.map((ord) => (
                <div key={ord.id} className="p-4 rounded-2xl border border-[#E8DED2] bg-[#F8F5F0]/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-mono font-bold text-sm text-[#191919]">
                        {ord.orderNumber}
                      </span>
                      <span className="text-zinc-500 ml-2">
                        {ord.shippingAddress.fullName} ({ord.shippingAddress.city}, {ord.shippingAddress.state})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#8D2337] tabular-nums">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </span>
                      <span className="text-zinc-400">·</span>
                      <span className="text-zinc-500 font-semibold">{ord.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Status Switcher */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E8DED2] text-xs">
                    <span className="text-zinc-500 font-medium">Update Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="px-3 py-1 text-xs font-bold border rounded-lg bg-white"
                    >
                      <option value="Pending Payment">Pending Payment</option>
                      <option value="Payment Confirmed">Payment Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Return Requested">Return Requested</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ANNOUNCEMENTS */}
        {activeAdminTab === 'announcements' && (
          <div className="bg-white rounded-3xl border border-[#E8DED2] p-6 space-y-4 max-w-2xl">
            <h3 className="text-base font-bold text-[#191919]">
              Store Promotional Announcement Bar
            </h3>
            <p className="text-xs text-zinc-500">
              Customize the rotating announcements displayed at the very top of the storefront.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Primary Announcement Text
                </label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-[#E8DED2] rounded-xl"
                />
              </div>

              <button
                onClick={() => {
                  const updated = [...announcements];
                  if (updated[0]) {
                    updated[0].text = announcementText;
                    updateAnnouncements(updated);
                  }
                }}
                className="px-5 py-2 bg-[#191919] text-white text-xs font-semibold rounded-xl"
              >
                Update Banner Text
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Product Creation & Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveProduct}
            className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-[#E8DED2] max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-bold text-[#191919]">
              {editingProductId ? 'Edit Garment Listing' : 'Create New Garment Style'}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Category *
                </label>
                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
                >
                  <option value="Oversized T-Shirts">Oversized T-Shirts</option>
                  <option value="Casual Shirts">Casual Shirts</option>
                  <option value="Linen Shirts">Linen Shirts</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Wide-Leg Jeans">Wide-Leg Jeans</option>
                  <option value="Straight-Fit Jeans">Straight-Fit Jeans</option>
                  <option value="Co-ord Sets">Co-ord Sets</option>
                  <option value="Ethnic Kurtas">Ethnic Kurtas</option>
                  <option value="Trousers & Chinos">Trousers & Chinos</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Hoodies">Hoodies</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Target Gender
                </label>
                <select
                  value={prodGender}
                  onChange={(e) => setProdGender(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
                >
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Sale Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={prodPrice}
                  onChange={(e) => setProdPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  value={prodOriginalPrice}
                  onChange={(e) => setProdOriginalPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Inventory Stock *
                </label>
                <input
                  type="number"
                  required
                  value={prodStock}
                  onChange={(e) => setProdStock(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  SKU Identifier
                </label>
                <input
                  type="text"
                  value={prodSku}
                  onChange={(e) => setProdSku(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Fit Silhouette
                </label>
                <select
                  value={prodFit}
                  onChange={(e) => setProdFit(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border rounded-xl bg-white"
                >
                  <option value="Oversized">Oversized</option>
                  <option value="Relaxed Fit">Relaxed Fit</option>
                  <option value="Regular Fit">Regular Fit</option>
                  <option value="Slim Fit">Slim Fit</option>
                  <option value="Wide Leg">Wide Leg</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Material Composition
              </label>
              <input
                type="text"
                value={prodMaterial}
                onChange={(e) => setProdMaterial(e.target.value)}
                placeholder="e.g. 100% French Flax Linen"
                className="w-full px-3 py-2 text-xs border rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Image CDN URL
              </label>
              <input
                type="text"
                value={prodImage}
                onChange={(e) => setProdImage(e.target.value)}
                className="w-full px-3 py-2 text-xs border rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={prodDescription}
                onChange={(e) => setProdDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs border rounded-xl"
              />
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-[#E8DED2]">
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#8D2337] text-white rounded-xl text-xs font-semibold"
              >
                {editingProductId ? 'Save Changes' : 'Publish Product'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
