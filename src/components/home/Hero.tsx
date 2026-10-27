import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles, Shield, RotateCcw, Truck } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const Hero: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="relative overflow-hidden bg-[#F8F5F0] border-b border-[#E8DED2]">
      {/* Hero Visual Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8D2337]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Winter 2026 Collection</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#191919] leading-[1.08] [text-wrap:balance]">
              STYLE THAT FEELS LIKE YOU.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-600 max-w-xl font-normal leading-relaxed">
              Discover your next favorite look with Buytiful. Honest fabrics, precision tailoring, and contemporary silhouettes engineered for Indian everyday wear.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap pt-2">
              <button
                onClick={() => navigateTo('catalog', { gender: 'women' })}
                className="px-6 py-3.5 bg-[#191919] text-[#F8F5F0] hover:bg-zinc-800 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
              >
                <span>Shop Women</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('catalog', { gender: 'men' })}
                className="px-6 py-3.5 bg-white text-[#191919] hover:bg-[#E8DED2]/50 border border-[#191919]/20 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <span>Shop Men</span>
              </button>

              <button
                onClick={() => navigateTo('catalog')}
                className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-[#8D2337] hover:underline uppercase tracking-wider cursor-pointer"
              >
                Explore New Arrivals
              </button>
            </div>

            {/* Micro proof markers */}
            <div className="pt-4 border-t border-[#E8DED2] grid grid-cols-3 gap-4 text-xs text-zinc-600">
              <div>
                <p className="font-bold text-[#191919] text-base tabular-nums">240+ GSM</p>
                <p className="text-[11px] text-zinc-500">Combed heavy cottons</p>
              </div>
              <div>
                <p className="font-bold text-[#191919] text-base tabular-nums">100%</p>
                <p className="text-[11px] text-zinc-500">Pure French flax linen</p>
              </div>
              <div>
                <p className="font-bold text-[#191919] text-base tabular-nums">₹999+</p>
                <p className="text-[11px] text-zinc-500">Free Express Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Editorial Image Display */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Primary Large Editorial Image */}
              <div className="col-span-7 rounded-3xl overflow-hidden aspect-[3/4] shadow-xl border border-[#E8DED2]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                  alt="Contemporary women fashion lookbook"
                  fallbackCategory="Women's Collection"
                  fallbackName="Linen Resort Shirt & Denim"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                />
              </div>

              {/* Secondary Layered Image */}
              <div className="col-span-5 space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-lg border border-[#E8DED2]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
                    alt="Men's overdyed graphic tee"
                    fallbackCategory="Men's Collection"
                    fallbackName="Heavyweight Graphic Drop"
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                  />
                </div>

                {/* Editorial Callout Card */}
                <div className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-[#E8DED2] shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#8D2337]">
                    Craftsmanship First
                  </p>
                  <p className="text-xs font-semibold text-[#191919] mt-0.5">
                    Pre-shrunk, bio-washed and double-stitched for longevity.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Brand Benefit Bar below hero */}
      <div className="border-t border-[#E8DED2] bg-white py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-zinc-700">
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <Truck className="w-4 h-4 text-[#8D2337]" />
            <span>Free Express Delivery above ₹999</span>
          </div>
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <RotateCcw className="w-4 h-4 text-[#8D2337]" />
            <span>Hassle-free 7-Day Exchange</span>
          </div>
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <Shield className="w-4 h-4 text-[#8D2337]" />
            <span>100% Genuine Cotton & Linen</span>
          </div>
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <Sparkles className="w-4 h-4 text-[#8D2337]" />
            <span>Curated Indian Contemporary Fit</span>
          </div>
        </div>
      </div>
    </section>
  );
};
