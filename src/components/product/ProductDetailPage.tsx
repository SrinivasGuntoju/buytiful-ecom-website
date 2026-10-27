import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
  Ruler,
  Star,
  Check,
  MapPin,
  ChevronRight,
  Share2,
} from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SizeGuideModal } from './SizeGuideModal';
import { checkPinCodeDelivery, PinCodeEstimate } from '../../data/storeConfig';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    showToast,
    setIsCartOpen,
  } = useStore();

  const product = products.find((p) => p.slug === slug) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0]?.name || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'reviews'>('details');

  // PIN code delivery checker state
  const [pinInput, setPinInput] = useState('560038');
  const [pinEstimate, setPinEstimate] = useState<PinCodeEstimate | null>(() =>
    checkPinCodeDelivery('560038')
  );

  const isFavorited = isInWishlist(product.id);

  // Sync state if product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0]?.name || '');
      setActiveImageIndex(0);
      setQuantity(1);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <p className="text-sm text-zinc-500">Product not found.</p>
        <button
          onClick={() => navigateTo('catalog')}
          className="mt-4 px-4 py-2 bg-[#191919] text-white text-xs rounded-xl"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkPinCodeDelivery(pinInput);
    setPinEstimate(result);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Please select a size first', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      showToast('Please select a size first', 'error');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Buytiful.in`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  return (
    <div className="bg-[#F8F5F0] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <button onClick={() => navigateTo('home')} className="hover:text-[#191919]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => navigateTo('catalog', { gender: product.gender })}
            className="hover:text-[#191919] capitalize"
          >
            {product.gender}'s Apparel
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => navigateTo('catalog', { category: product.category })}
            className="hover:text-[#191919]"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#191919] font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Contiguous PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnail Column */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 sm:w-20 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-white ${
                    activeImageIndex === idx
                      ? 'border-[#8D2337] ring-2 ring-[#8D2337]/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    fallbackCategory={product.category}
                    fallbackName={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-[3/4] rounded-3xl overflow-hidden bg-white border border-[#E8DED2] shadow-sm">
              <ImageWithFallback
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fallbackCategory={product.category}
                fallbackName={product.name}
                className="w-full h-full object-cover"
              />

              {/* Wishlist and Share Floating Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-full backdrop-blur-md shadow-md transition-all cursor-pointer ${
                    isFavorited
                      ? 'bg-[#8D2337] text-white'
                      : 'bg-white/85 text-[#191919] hover:bg-white hover:text-[#8D2337]'
                  }`}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/85 hover:bg-white text-[#191919] backdrop-blur-md shadow-md transition-all cursor-pointer"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Tag overlay */}
              {product.tags && product.tags[0] && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#191919] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xs">
                    {product.tags[0]}
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Title & Category */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                <span>{product.gender}'s Apparel</span>
                <span>·</span>
                <span>{product.category}</span>
                <span>·</span>
                <span className="text-emerald-700 font-bold">{product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191919]">
                {product.name}
              </h1>

              {/* Rating review strip */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold text-[#191919] tabular-nums">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs text-zinc-400">·</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs text-zinc-600 hover:text-[#8D2337] underline cursor-pointer"
                >
                  {product.reviewCount} customer reviews
                </button>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DED2] flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#191919] tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-base text-zinc-400 line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="text-xs font-bold text-white bg-[#8D2337] px-2 py-0.5 rounded">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Inclusive of all taxes. Free Express Shipping on orders over ₹999.
                </p>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="text-zinc-700">
                  Color: <span className="text-[#191919] font-bold">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-[#8D2337] bg-white ring-2 ring-[#8D2337]/20 shadow-xs'
                        : 'border-[#E8DED2] bg-white/70 hover:bg-white text-zinc-700'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection & Size Guide */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="text-zinc-700">
                  Select Size: <span className="text-[#8D2337] font-bold">{selectedSize}</span>
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1 text-[#8D2337] hover:underline normal-case font-medium cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#191919] text-white shadow-sm'
                        : 'bg-white border border-[#E8DED2] text-[#191919] hover:border-[#191919]/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-zinc-500 mt-2">
                Stock Status: <span className="text-emerald-700 font-semibold">{product.stockQuantity} units available</span> in Indian fulfillment center.
              </p>
            </div>

            {/* Quantity Stepper & CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E8DED2] bg-white rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-zinc-600 hover:text-black hover:bg-[#F8F5F0] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-bold text-[#191919] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-zinc-600 hover:text-black hover:bg-[#F8F5F0] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-white border border-[#191919] hover:bg-[#191919] text-[#191919] hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-xl bg-[#8D2337] hover:bg-[#a62b42] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Express Buy Now</span>
              </button>
            </div>

            {/* Indian PIN Code Delivery Checker */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DED2] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#191919]">
                <MapPin className="w-4 h-4 text-[#8D2337]" />
                <span>Estimate Delivery to Your City</span>
              </div>

              <form onSubmit={handlePinCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#191919] text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Verify PIN
                </button>
              </form>

              {pinEstimate && (
                <div className={`p-2.5 rounded-xl text-xs ${pinEstimate.valid ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800'}`}>
                  {pinEstimate.valid ? (
                    <div className="space-y-1">
                      <p className="font-bold flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Deliverable to {pinEstimate.city} ({pinEstimate.state})</span>
                      </p>
                      <p className="text-[11px] text-zinc-600">
                        Standard Delivery: <strong className="text-zinc-900">{pinEstimate.standardDays}</strong> · Express: <strong className="text-zinc-900">{pinEstimate.expressDays}</strong>
                      </p>
                      <p className="text-[10px] text-emerald-700 font-medium">
                        Cash on Delivery (COD) supported in this postal jurisdiction.
                      </p>
                    </div>
                  ) : (
                    <p>{pinEstimate.message}</p>
                  )}
                </div>
              )}
            </div>

            {/* Fabric, Care & Highlights Accordion/Tabs */}
            <div className="bg-white rounded-2xl border border-[#E8DED2] p-4">
              <div className="flex border-b border-[#E8DED2] gap-4 text-xs font-bold uppercase tracking-wider pb-2">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'border-b-2 border-[#8D2337] text-[#8D2337]'
                      : 'text-zinc-500 hover:text-[#191919]'
                  }`}
                >
                  Fabric & Fit
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'care'
                      ? 'border-b-2 border-[#8D2337] text-[#8D2337]'
                      : 'text-zinc-500 hover:text-[#191919]'
                  }`}
                >
                  Wash Care
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-1 transition-colors cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-[#8D2337] text-[#8D2337]'
                      : 'text-zinc-500 hover:text-[#191919]'
                  }`}
                >
                  Verified Reviews
                </button>
              </div>

              <div className="pt-4 text-xs text-zinc-600 leading-relaxed">
                {activeTab === 'details' && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8DED2]/50 text-[11px]">
                      <div>
                        <span className="font-bold text-[#191919]">Material: </span>
                        <span>{product.material}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#191919]">Fit Profile: </span>
                        <span>{product.fit}</span>
                      </div>
                    </div>
                    {product.highlights && (
                      <ul className="list-disc pl-4 space-y-1 text-[11px] pt-1">
                        {product.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="space-y-2">
                    <p className="font-bold text-[#191919]">Garment Longevity Instructions:</p>
                    <ul className="list-disc pl-4 space-y-1 text-[11px]">
                      {product.careInstructions.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8DED2]/60">
                      <div>
                        <span className="text-base font-bold text-[#191919]">{product.rating} / 5</span>
                        <span className="text-zinc-400 ml-1">({product.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-[#F8F5F0] rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#191919]">Pooja M. · Bengaluru</span>
                          <span className="text-[10px] text-zinc-400">Verified Buyer</span>
                        </div>
                        <p className="text-[11px]">
                          "Drape and stitch quality are outstanding. Surpassed my expectations for the price point."
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#E8DED2]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#8D2337] mb-1">
                  Complete The Collection
                </p>
                <h3 className="text-2xl font-bold text-[#191919]">
                  You May Also Like
                </h3>
              </div>
              <button
                onClick={() => navigateTo('catalog', { category: product.category })}
                className="text-xs font-semibold uppercase tracking-wider text-[#191919] hover:text-[#8D2337]"
              >
                View Category
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Sizing Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultGender={product.gender}
      />
    </div>
  );
};
