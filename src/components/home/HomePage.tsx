import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Hero } from './Hero';
import { CategoryTiles } from './CategoryTiles';
import { ShopTheLook } from './ShopTheLook';
import { BrandBenefits } from './BrandBenefits';
import { Newsletter } from './Newsletter';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight, Sparkles, Flame, Award } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, navigateTo } = useStore();

  const trendingProducts = products.filter((p) => p.isTrending || p.isFeatured).slice(0, 6);
  const newArrivals = products.filter((p) => p.isNewArrival || p.tags.includes('New Season')).slice(0, 6);
  const bestSellers = products.filter((p) => p.tags.includes('Best Seller')).slice(0, 4);

  return (
    <div className="space-y-0">
      {/* Section A: Hero Campaign */}
      <Hero />

      {/* Section B: Shop by Category */}
      <CategoryTiles />

      {/* Section C: Trending Now */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8DED2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#8D2337] mb-1">
                <Flame className="w-3.5 h-3.5 text-[#8D2337]" />
                <span>Trending Now</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191919]">
                Most-Wanted Silhouettes
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Contemporary cuts and high-density cottons that are capturing attention this season.
              </p>
            </div>

            <button
              onClick={() => navigateTo('catalog')}
              className="text-xs font-semibold uppercase tracking-wider text-[#191919] hover:text-[#8D2337] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore All Trending</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {trendingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Section D: New Arrivals */}
      <section className="py-16 sm:py-20 bg-[#F8F5F0] border-b border-[#E8DED2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#8D2337] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Just Dropped</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191919]">
                Fresh Runway Releases
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Limited-edition French linen sets, artisanal kurtas, and structured outerwear.
              </p>
            </div>

            <button
              onClick={() => navigateTo('catalog')}
              className="text-xs font-semibold uppercase tracking-wider text-[#191919] hover:text-[#8D2337] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>View All Releases</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Section E: Shop the Look */}
      <ShopTheLook />

      {/* Section G: Best Sellers */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8DED2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#8D2337] mb-1">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Verified Favorites</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191919]">
                Hallmark Best Sellers
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Based on repeat order volume and customer fit satisfaction scores across India.
              </p>
            </div>

            <button
              onClick={() => navigateTo('catalog')}
              className="text-xs font-semibold uppercase tracking-wider text-[#191919] hover:text-[#8D2337] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Shop All Best Sellers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Section H: Brand Benefits */}
      <BrandBenefits />

      {/* Section I: Newsletter Subscription */}
      <Newsletter />
    </div>
  );
};
