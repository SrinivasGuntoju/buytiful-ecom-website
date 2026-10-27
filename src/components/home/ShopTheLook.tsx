import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { SHOP_THE_LOOKS } from '../../data/storeConfig';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export const ShopTheLook: React.FC = () => {
  const { products, navigateTo, addToCart } = useStore();
  const [activeLookIndex, setActiveLookIndex] = useState(0);

  const look = SHOP_THE_LOOKS[activeLookIndex];
  const lookProducts = products.filter((p) => look.productIds.includes(p.id));

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-[#E8DED2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#8D2337] mb-1">
              Stylist Edit
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191919]">
              Shop the Look
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              Complete, coordinated wardrobe combinations curated by our editorial team.
            </p>
          </div>

          {/* Look Switcher Buttons */}
          <div className="flex items-center gap-2">
            {SHOP_THE_LOOKS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveLookIndex(idx)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                  activeLookIndex === idx
                    ? 'bg-[#191919] text-[#F8F5F0]'
                    : 'bg-[#F8F5F0] text-zinc-700 hover:bg-[#E8DED2]'
                }`}
              >
                Look 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Look Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Visual on the Left */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden aspect-[3/4] shadow-xl border border-[#E8DED2]">
            <ImageWithFallback
              src={look.imageUrl}
              alt={look.title}
              fallbackCategory="Editorial Styling"
              fallbackName={look.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#F8F5F0]/80">
                Coordinated Capsule
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {look.title}
              </h3>
              <p className="text-xs text-zinc-300 mt-1 max-w-sm">
                {look.description}
              </p>
            </div>
          </div>

          {/* Linked Products on the Right */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
              Featured Pieces in this Ensemble ({lookProducts.length})
            </h4>

            <div className="space-y-3">
              {lookProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigateTo('product', { slug: p.slug })}
                  className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-[#F8F5F0] hover:bg-[#F2ECE3] border border-[#E8DED2] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-[#E8DED2]/60">
                      <ImageWithFallback
                        src={p.images[0]}
                        alt={p.name}
                        fallbackCategory={p.category}
                        fallbackName={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        {p.category}
                      </span>
                      <h5 className="text-sm font-semibold text-[#191919] group-hover:text-[#8D2337] transition-colors">
                        {p.name}
                      </h5>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {p.material} · {p.fit}
                      </p>
                      <p className="text-sm font-bold text-[#8D2337] mt-1 tabular-nums">
                        ₹{p.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p, p.sizes[0] || 'M', p.colors[0]?.name || 'Default', 1);
                      }}
                      className="px-3 py-2 bg-white hover:bg-[#191919] text-[#191919] hover:text-white border border-[#191919]/20 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add Piece</span>
                    </button>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#8D2337] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
