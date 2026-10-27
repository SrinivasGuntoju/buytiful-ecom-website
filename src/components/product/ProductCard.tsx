import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Plus } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart, navigateTo } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAddSize = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, size, selectedColor, 1);
    setShowQuickAdd(false);
  };

  return (
    <article
      onClick={() => navigateTo('product', { slug: product.slug })}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E8DED2]/80 hover:border-[#191919]/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onMouseEnter={() => {
        if (product.images.length > 1) setCurrentImageIndex(1);
      }}
      onMouseLeave={() => {
        setCurrentImageIndex(0);
        setShowQuickAdd(false);
      }}
    >
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F0EAE1]">
        <ImageWithFallback
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          fallbackCategory={product.category}
          fallbackName={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Subtle Editorial Tag (Quiet text kicker, no candy pill) */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#191919] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-xs">
              {product.tags[0]}
            </span>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
            isFavorited
              ? 'bg-[#8D2337] text-white shadow-md'
              : 'bg-white/80 text-[#191919] hover:bg-white hover:text-[#8D2337]'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Size Overlay on Hover */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-200 flex flex-col items-center justify-end z-10 ${
            showQuickAdd ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-[10px] uppercase font-bold tracking-widest text-white/90 mb-2">
            Quick Add Size
          </p>
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => handleQuickAddSize(size, e)}
                className="w-8 h-8 rounded-lg bg-white/90 hover:bg-white text-[#191919] hover:text-[#8D2337] text-xs font-bold transition-transform active:scale-95 shadow-sm"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed Metadata (Category · Fit) */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.fit}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-[#191919] group-hover:text-[#8D2337] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Colors & Price Section */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E8DED2]/50">
          {/* Color Swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((c) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c.name);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === c.name
                    ? 'ring-2 ring-[#8D2337] ring-offset-1 border-white scale-110'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Select color ${c.name}`}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-zinc-500">
                +{product.colors.length - 4}
              </span>
            )}
          </div>

          {/* Price & Discount */}
          <div className="flex items-baseline gap-1.5 text-right">
            <span className="text-sm font-bold text-[#191919] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-zinc-400 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
