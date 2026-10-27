import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ArrowUpRight } from 'lucide-react';

interface CategoryTileItem {
  name: string;
  count: string;
  imageUrl: string;
  categoryFilter?: string;
  genderFilter?: 'women' | 'men';
}

const CATEGORIES: CategoryTileItem[] = [
  {
    name: "Women's Collection",
    count: '15+ Styles',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    genderFilter: 'women',
  },
  {
    name: "Men's Collection",
    count: '15+ Styles',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    genderFilter: 'men',
  },
  {
    name: 'Dresses & Gowns',
    count: 'Flowing Silhouettes',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    categoryFilter: 'Dresses',
  },
  {
    name: 'Pure Linen Shirts',
    count: 'French Flax Weave',
    imageUrl: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=600&q=80',
    categoryFilter: 'Linen Shirts',
  },
  {
    name: 'Denim & Jeans',
    count: 'Wide-Leg & Relaxed',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
    categoryFilter: 'Wide-Leg Jeans',
  },
  {
    name: 'Co-ord Sets',
    count: 'Tailored 2-Pieces',
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    categoryFilter: 'Co-ord Sets',
  },
  {
    name: 'Ethnic Kurtas',
    count: 'Chanderi & Mulmul',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    categoryFilter: 'Ethnic Kurtas',
  },
  {
    name: 'Jackets & Overshirts',
    count: 'Chore & Corduroy',
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
    categoryFilter: 'Jackets',
  },
];

export const CategoryTiles: React.FC = () => {
  const { navigateTo } = useStore();

  const handleCategoryClick = (cat: CategoryTileItem) => {
    if (cat.genderFilter) {
      navigateTo('catalog', { gender: cat.genderFilter });
    } else if (cat.categoryFilter) {
      navigateTo('catalog', { category: cat.categoryFilter });
    } else {
      navigateTo('catalog');
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#8D2337] mb-1">
              Curated Wardrobe
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191919]">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('catalog')}
            className="text-xs font-semibold uppercase tracking-wider text-[#191919] hover:text-[#8D2337] inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View Full Directory</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#EAE2D8] border border-[#E8DED2] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <ImageWithFallback
                src={cat.imageUrl}
                alt={cat.name}
                fallbackCategory={cat.name}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] font-medium tracking-wider text-zinc-300 uppercase">
                  {cat.count}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#F8F5F0] transition-colors flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
