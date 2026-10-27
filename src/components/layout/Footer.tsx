import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CreditCard, Truck, ShieldCheck, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <footer className="bg-[#191919] text-[#F8F5F0] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => navigateTo('home')}
              className="text-left cursor-pointer"
            >
              <span className="font-editorial text-3xl font-bold tracking-tight text-white">
                buytiful<span className="text-[#8D2337]">.in</span>
              </span>
            </button>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              Buytiful.in is an Indian contemporary fashion brand delivering honest fabrics, architectural cuts, and timeless everyday essentials for men and women.
            </p>

            <div className="pt-2 flex items-center gap-3 text-zinc-400">
              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); alert('Connecting to Buytiful Official Instagram (@buytiful.in)'); }}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:text-white hover:border-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => { e.preventDefault(); alert('Connecting to Buytiful Official Twitter (@buytiful_in)'); }}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:text-white hover:border-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                onClick={(e) => { e.preventDefault(); alert('Connecting to Buytiful Facebook'); }}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:text-white hover:border-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => navigateTo('catalog', { gender: 'women' })}
                  className="hover:text-white transition-colors"
                >
                  Women's Wardrobe
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('catalog', { gender: 'men' })}
                  className="hover:text-white transition-colors"
                >
                  Men's Streetwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('catalog', { category: 'Dresses' })}
                  className="hover:text-white transition-colors"
                >
                  Dresses & Gowns
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('catalog', { category: 'Co-ord Sets' })}
                  className="hover:text-white transition-colors"
                >
                  Linen Co-ord Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('catalog', { category: 'Wide-Leg Jeans' })}
                  className="hover:text-white transition-colors"
                >
                  Architectural Denim
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('catalog', { category: 'Ethnic Kurtas' })}
                  className="hover:text-white transition-colors"
                >
                  Artisanal Kurtas
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => navigateTo('tracking')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Track My Order</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policies', { policyTab: 'shipping' })}
                  className="hover:text-white transition-colors"
                >
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policies', { policyTab: 'returns' })}
                  className="hover:text-white transition-colors"
                >
                  Returns & Exchange (7 Days)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policies', { policyTab: 'size-guide' })}
                  className="hover:text-white transition-colors"
                >
                  Apparel Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policies', { policyTab: 'faq' })}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policies', { policyTab: 'contact' })}
                  className="hover:text-white transition-colors"
                >
                  Contact Support Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Store Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => navigateTo('policies', { policyTab: 'terms' })}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('policies', { policyTab: 'privacy' })}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-zinc-300"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8D2337]" />
                  <span>Store Administration</span>
                </button>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-zinc-500 space-y-1">
              <p className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Indiranagar, Bengaluru, KA 560038</span>
              </p>
              <p className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>support@buytiful.in</span>
              </p>
            </div>
          </div>

        </div>

        {/* Payment Methods and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            <p>© 2026 Buytiful.in — Crafted with care for India.</p>
          </div>

          {/* Real Supported Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap text-[11px]">
            <span className="text-zinc-400">Supported Methods:</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 font-medium">UPI / QR</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 font-medium">RuPay</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 font-medium">Visa</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 font-medium">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 font-medium">Net Banking</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 font-medium">Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
