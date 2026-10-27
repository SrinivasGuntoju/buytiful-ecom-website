import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { Product, Gender } from '../../types';
import {
  SlidersHorizontal,
  X,
  Search,
  Grid3X3,
  LayoutGrid,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const {
    products,
    catalogCategory,
    catalogGender,
    searchQuery,
    navigateTo,
  } = useStore();

  const [selectedGender, setSelectedGender] = useState<Gender | 'all'>(
    catalogGender || 'all'
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    catalogCategory
  );
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popularity' | 'discount'>('newest');
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  // Synchronize when store params change
  useEffect(() => {
    if (catalogGender) setSelectedGender(catalogGender);
  }, [catalogGender]);

  useEffect(() => {
    if (catalogCategory) setSelectedCategory(catalogCategory);
  }, [catalogCategory]);

  useEffect(() => {
    if (searchQuery) setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Unique categories, sizes, fits, materials from product base
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [products]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34'];
  const allFits = ['Oversized', 'Relaxed Fit', 'Regular Fit', 'Slim Fit', 'Wide Leg'];
  const allMaterials = ['100% Combed Organic Cotton', '100% French Flax Linen', 'Cotton Denim', 'Viscose Satin', 'Cotton Chanderi'];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Gender filter
      if (selectedGender !== 'all' && p.gender !== selectedGender) return false;

      // Category filter
      if (selectedCategory && p.category !== selectedCategory) return false;

      // Price filter
      if (p.price > priceRange) return false;

      // In stock
      if (inStockOnly && p.stockQuantity <= 0) return false;

      // Size filter
      if (selectedSizes.length > 0 && !selectedSizes.some((s) => p.sizes.includes(s))) {
        return false;
      }

      // Fit filter
      if (selectedFits.length > 0 && !selectedFits.includes(p.fit)) {
        return false;
      }

      // Material filter
      if (selectedMaterials.length > 0) {
        const matchesMat = selectedMaterials.some((m) =>
          p.material.toLowerCase().includes(m.toLowerCase())
        );
        if (!matchesMat) return false;
      }

      // Search query
      if (localSearch.trim()) {
        const q = localSearch.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [
    products,
    selectedGender,
    selectedCategory,
    priceRange,
    inStockOnly,
    selectedSizes,
    selectedFits,
    selectedMaterials,
    localSearch,
  ]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'popularity':
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'discount':
        return list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
      case 'newest':
      default:
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [filteredProducts, sortBy]);

  // Clear filters
  const handleClearAllFilters = () => {
    setSelectedGender('all');
    setSelectedCategory(null);
    setPriceRange(5000);
    setSelectedSizes([]);
    setSelectedFits([]);
    setSelectedMaterials([]);
    setInStockOnly(false);
    setLocalSearch('');
  };

  const hasActiveFilters =
    selectedGender !== 'all' ||
    selectedCategory !== null ||
    priceRange < 5000 ||
    selectedSizes.length > 0 ||
    selectedFits.length > 0 ||
    selectedMaterials.length > 0 ||
    inStockOnly ||
    localSearch.length > 0;

  return (
    <div className="bg-[#F8F5F0] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#E8DED2] gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 uppercase tracking-widest mb-1">
              <span>Catalog</span>
              <span>·</span>
              <span>{selectedGender === 'all' ? 'All Collections' : `${selectedGender}'s Apparel`}</span>
              {selectedCategory && (
                <>
                  <span>·</span>
                  <span className="text-[#8D2337] font-semibold">{selectedCategory}</span>
                </>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191919]">
              {selectedCategory || (selectedGender === 'all' ? 'All Apparel' : `${selectedGender.toUpperCase()}'S COLLECTION`)}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Showing <span className="font-bold text-[#191919] tabular-nums">{sortedProducts.length}</span> pieces crafted from premium natural fibres
            </p>
          </div>

          {/* Gender Segmented Switcher & Search Bar */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center p-1 bg-white rounded-xl border border-[#E8DED2]">
              <button
                onClick={() => setSelectedGender('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedGender === 'all'
                    ? 'bg-[#191919] text-white shadow-xs'
                    : 'text-zinc-600 hover:text-[#191919]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedGender('women')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedGender === 'women'
                    ? 'bg-[#191919] text-white shadow-xs'
                    : 'text-zinc-600 hover:text-[#191919]'
                }`}
              >
                Women
              </button>
              <button
                onClick={() => setSelectedGender('men')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedGender === 'men'
                    ? 'bg-[#191919] text-white shadow-xs'
                    : 'text-zinc-600 hover:text-[#191919]'
                }`}
              >
                Men
              </button>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-[#E8DED2] rounded-xl text-xs font-bold text-[#191919]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#8D2337]" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#8D2337]" />
              )}
            </button>
          </div>
        </div>

        {/* Toolbar: Active Filters, Sort & Grid Controls */}
        <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DED2]">
          
          {/* Active Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8DED2] text-xs font-semibold text-[#191919]">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="hover:text-[#8D2337]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {localSearch && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8DED2] text-xs font-semibold text-[#191919]">
                Search: "{localSearch}"
                <button onClick={() => setLocalSearch('')} className="hover:text-[#8D2337]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedSizes.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#E8DED2] text-xs font-semibold"
              >
                Size: {s}
                <button
                  onClick={() => setSelectedSizes(selectedSizes.filter((x) => x !== s))}
                  className="hover:text-[#8D2337]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {hasActiveFilters && (
              <button
                onClick={handleClearAllFilters}
                className="text-xs font-semibold text-[#8D2337] hover:underline flex items-center gap-1 ml-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown & Grid View */}
          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#E8DED2] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#191919] focus:outline-none focus:border-[#8D2337]"
              >
                <option value="newest">Newest Releases</option>
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-1 p-1 bg-white rounded-xl border border-[#E8DED2]">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-lg ${gridCols === 3 ? 'bg-[#F8F5F0] text-[#191919]' : 'text-zinc-400 hover:text-zinc-700'}`}
                title="3-Column Grid"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-lg ${gridCols === 4 ? 'bg-[#F8F5F0] text-[#191919]' : 'text-zinc-400 hover:text-zinc-700'}`}
                title="4-Column Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Catalog Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            
            {/* Search Filter Box */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DED2]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Search Apparel
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter by keyword..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-[#F8F5F0] border border-[#E8DED2] rounded-xl focus:outline-none focus:border-[#8D2337]"
                />
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Categories list */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DED2] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Categories
                </h3>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-[10px] text-[#8D2337] hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={`w-full flex items-center justify-between text-xs py-1.5 px-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#191919] text-white font-semibold'
                        : 'text-zinc-700 hover:bg-[#F8F5F0]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] opacity-70 tabular-nums">
                      {products.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DED2] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Max Price
                </h3>
                <span className="text-xs font-bold text-[#8D2337] tabular-nums">
                  ₹{priceRange.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={700}
                max={5000}
                step={100}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#8D2337] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>₹700</span>
                <span>₹5,000</span>
              </div>
            </div>

            {/* Size Filter */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DED2] space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Sizes
              </h3>
              <div className="grid grid-cols-4 gap-1.5">
                {allSizes.map((s) => {
                  const isSelected = selectedSizes.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() =>
                        setSelectedSizes(
                          isSelected
                            ? selectedSizes.filter((x) => x !== s)
                            : [...selectedSizes, s]
                        )
                      }
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#8D2337] text-white shadow-2xs'
                          : 'bg-[#F8F5F0] hover:bg-[#E8DED2] text-zinc-800'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fit Filter */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DED2] space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Silhouettes & Fit
              </h3>
              <div className="space-y-1">
                {allFits.map((fit) => (
                  <label
                    key={fit}
                    className="flex items-center gap-2 text-xs text-zinc-700 cursor-pointer py-1"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFits.includes(fit)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFits([...selectedFits, fit]);
                        } else {
                          setSelectedFits(selectedFits.filter((f) => f !== fit));
                        }
                      }}
                      className="rounded border-[#E8DED2] text-[#8D2337] focus:ring-0"
                    />
                    <span>{fit}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* In stock toggle */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DED2]">
              <label className="flex items-center justify-between text-xs font-semibold text-zinc-700 cursor-pointer">
                <span>In-Stock Ready to Ship</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#E8DED2] text-[#8D2337] focus:ring-0"
                />
              </label>
            </div>

          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {sortedProducts.length > 0 ? (
              <div
                className={`grid grid-cols-2 ${
                  gridCols === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'
                } gap-4 sm:gap-6`}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-3xl border border-[#E8DED2] p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F8F5F0] text-[#8D2337] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#191919]">
                  No garments match your active filters
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Try widening your price range or clearing selected categories to explore our full wardrobe.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="px-5 py-2.5 bg-[#191919] text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-xs">
          <div className="w-4/5 max-w-sm ml-auto bg-[#F8F5F0] h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DED2]">
              <h3 className="text-base font-bold text-[#191919]">Filter Apparel</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-zinc-500">Category</h4>
              <div className="space-y-1">
                {allCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setSelectedCategory(selectedCategory === c ? null : c);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs text-left ${
                      selectedCategory === c ? 'bg-[#191919] text-white font-bold' : 'bg-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold">Max Price:</span>
                <span className="text-[#8D2337] font-bold">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min={700}
                max={5000}
                step={100}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#8D2337]"
              />
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-[#8D2337] text-white text-xs font-bold uppercase rounded-xl"
            >
              Apply Filters ({sortedProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
