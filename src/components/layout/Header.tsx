import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ShieldCheck,
  Package,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const Header: React.FC = () => {
  const {
    cart,
    wishlist,
    currentUser,
    logout,
    loginAsDemoUser,
    loginAsAdmin,
    navigateTo,
    setIsCartOpen,
    products,
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target as Node) &&
        !searchInputRef.current?.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered preview products for live search
  const searchResults = searchInput.trim().length > 1
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.category.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.material.toLowerCase().includes(searchInput.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigateTo('catalog', { query: searchInput.trim() });
      setIsSearchOpen(false);
      setSearchInput('');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#F8F5F0]/95 backdrop-blur-md border-b border-[#E8DED2]">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Distinctive Wordmark Brand */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#191919] hover:bg-[#E8DED2]/50 rounded-lg transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="text-left group cursor-pointer"
          >
            <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#191919]">
              buytiful<span className="text-[#8D2337]">.in</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Single-line Primary Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#191919]/80">
          <button
            onClick={() => navigateTo('catalog', { gender: 'women' })}
            className="hover:text-[#8D2337] transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Women
          </button>
          <button
            onClick={() => navigateTo('catalog', { gender: 'men' })}
            className="hover:text-[#8D2337] transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Men
          </button>
          <button
            onClick={() => navigateTo('catalog', { category: 'Dresses' })}
            className="hover:text-[#8D2337] transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Dresses
          </button>
          <button
            onClick={() => navigateTo('catalog', { category: 'Co-ord Sets' })}
            className="hover:text-[#8D2337] transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Co-ords
          </button>
          <button
            onClick={() => navigateTo('catalog', { category: 'Linen Shirts' })}
            className="hover:text-[#8D2337] transition-colors whitespace-nowrap cursor-pointer py-1"
          >
            Pure Linen
          </button>
          <button
            onClick={() => navigateTo('catalog')}
            className="hover:text-[#8D2337] transition-colors whitespace-nowrap cursor-pointer py-1 text-[#8D2337]"
          >
            Shop All
          </button>
        </nav>

        {/* Zone 3: Interactive Affordances (Search, Wishlist, Account, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Live Search Trigger & Expandable Input */}
          <div className="relative">
            <div className="hidden sm:flex items-center relative">
              <form onSubmit={handleSearchSubmit}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search shirts, dresses, linen..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-48 lg:w-64 pl-9 pr-3 py-1.5 text-xs bg-white/70 border border-[#E8DED2] rounded-full focus:outline-none focus:border-[#8D2337] focus:bg-white focus:w-72 transition-all placeholder:text-zinc-400"
                />
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />
              </form>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="sm:hidden p-2 text-[#191919] hover:bg-[#E8DED2]/50 rounded-full transition-colors"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Search Dropdown Results */}
            {isSearchOpen && searchInput.trim().length > 1 && (
              <div
                ref={searchDropdownRef}
                className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E8DED2] overflow-hidden z-50 p-3"
              >
                <div className="flex items-center justify-between px-2 pb-2 border-b border-[#E8DED2]/60">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Matching Apparel ({searchResults.length})
                  </span>
                  <button
                    onClick={() => {
                      navigateTo('catalog', { query: searchInput.trim() });
                      setIsSearchOpen(false);
                    }}
                    className="text-xs font-semibold text-[#8D2337] hover:underline"
                  >
                    View all results
                  </button>
                </div>

                <div className="divide-y divide-[#E8DED2]/40 mt-1">
                  {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          navigateTo('product', { slug: item.slug });
                          setIsSearchOpen(false);
                          setSearchInput('');
                        }}
                        className="w-full flex items-center gap-3 p-2 hover:bg-[#F8F5F0] rounded-xl text-left transition-colors"
                      >
                        <div className="w-12 h-14 rounded-lg overflow-hidden shrink-0 bg-[#E8DED2]">
                          <ImageWithFallback
                            src={item.images[0]}
                            alt={item.name}
                            fallbackCategory={item.category}
                            fallbackName={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#191919] truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-zinc-500">
                            {item.category} · {item.gender === 'women' ? 'Women' : 'Men'}
                          </p>
                          <p className="text-xs font-bold text-[#8D2337] mt-0.5">
                            ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="py-6 text-center text-xs text-zinc-500">
                      No matching clothing found for "{searchInput}".
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => navigateTo('account')}
            className="relative p-2 text-[#191919] hover:bg-[#E8DED2]/50 rounded-full transition-colors cursor-pointer"
            aria-label="Wishlist"
            title="Saved Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#8D2337] text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Account Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1.5 p-2 text-[#191919] hover:bg-[#E8DED2]/50 rounded-full transition-colors cursor-pointer"
              aria-label="User Account"
            >
              <UserIcon className="w-5 h-5" />
              <ChevronDown className="w-3 h-3 text-zinc-500 hidden sm:block" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#E8DED2] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                {currentUser ? (
                  <div className="p-3 border-b border-[#E8DED2]/60">
                    <p className="text-xs font-bold text-[#191919]">{currentUser.name}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{currentUser.email}</p>
                    {currentUser.isAdmin && (
                      <span className="mt-1 inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-900 text-amber-300">
                        Admin Mode
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="p-3 border-b border-[#E8DED2]/60">
                    <p className="text-xs font-semibold text-[#191919]">Welcome to Buytiful</p>
                    <p className="text-[11px] text-zinc-500">Sign in to track orders & manage bag</p>
                  </div>
                )}

                <div className="py-1">
                  <button
                    onClick={() => {
                      navigateTo('account');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-[#F8F5F0] hover:text-[#191919] rounded-lg transition-colors text-left"
                  >
                    <Package className="w-4 h-4 text-zinc-500" />
                    <span>My Orders & Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('tracking');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-[#F8F5F0] hover:text-[#191919] rounded-lg transition-colors text-left"
                  >
                    <Package className="w-4 h-4 text-zinc-500" />
                    <span>Track Consignment</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('admin');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-[#F8F5F0] hover:text-[#8D2337] rounded-lg transition-colors text-left"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#8D2337]" />
                    <span>Store Admin Panel</span>
                  </button>
                </div>

                {/* Quick Account Switcher for Demo testing */}
                <div className="pt-2 mt-1 border-t border-[#E8DED2]/60 px-2 space-y-1">
                  <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-1">
                    Quick Role Switch:
                  </p>
                  <div className="grid grid-cols-2 gap-1 text-[11px]">
                    <button
                      onClick={() => {
                        loginAsDemoUser();
                        setIsUserMenuOpen(false);
                      }}
                      className="px-2 py-1 bg-[#F8F5F0] hover:bg-[#E8DED2] rounded text-zinc-700 font-medium transition-colors"
                    >
                      Customer
                    </button>
                    <button
                      onClick={() => {
                        loginAsAdmin();
                        setIsUserMenuOpen(false);
                      }}
                      className="px-2 py-1 bg-zinc-900 text-white hover:bg-zinc-800 rounded font-medium transition-colors"
                    >
                      Admin
                    </button>
                  </div>

                  {currentUser && (
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 mt-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log out</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#191919] text-[#F8F5F0] hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-semibold tabular-nums">
              {totalCartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DED2] bg-[#F8F5F0] px-4 py-4 space-y-3 animate-in slide-in-from-top-2">
          {/* Mobile search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search Buytiful..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E8DED2] rounded-xl"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold uppercase tracking-wider pt-2">
            <button
              onClick={() => {
                navigateTo('catalog', { gender: 'women' });
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-white rounded-xl text-left hover:bg-[#E8DED2]/40"
            >
              Women's Apparel
            </button>
            <button
              onClick={() => {
                navigateTo('catalog', { gender: 'men' });
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-white rounded-xl text-left hover:bg-[#E8DED2]/40"
            >
              Men's Apparel
            </button>
            <button
              onClick={() => {
                navigateTo('catalog', { category: 'Dresses' });
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-white rounded-xl text-left hover:bg-[#E8DED2]/40"
            >
              Dresses
            </button>
            <button
              onClick={() => {
                navigateTo('catalog', { category: 'Co-ord Sets' });
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-white rounded-xl text-left hover:bg-[#E8DED2]/40"
            >
              Co-ord Sets
            </button>
            <button
              onClick={() => {
                navigateTo('catalog', { category: 'Linen Shirts' });
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-white rounded-xl text-left hover:bg-[#E8DED2]/40"
            >
              Pure Linen
            </button>
            <button
              onClick={() => {
                navigateTo('catalog');
                setIsMobileMenuOpen(false);
              }}
              className="p-3 bg-[#8D2337] text-white rounded-xl text-left"
            >
              Explore All
            </button>
          </div>

          <div className="pt-2 border-t border-[#E8DED2]/60 flex items-center justify-between text-xs text-zinc-600">
            <button
              onClick={() => {
                navigateTo('tracking');
                setIsMobileMenuOpen(false);
              }}
              className="py-1 hover:text-[#8D2337]"
            >
              Track Order
            </button>
            <button
              onClick={() => {
                navigateTo('admin');
                setIsMobileMenuOpen(false);
              }}
              className="py-1 hover:text-[#8D2337] text-[#8D2337] font-semibold"
            >
              Admin Panel
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
