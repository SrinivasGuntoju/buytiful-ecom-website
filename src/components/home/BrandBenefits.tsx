import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Clock, Sparkles, Headphones } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const BrandBenefits: React.FC = () => {
  const { navigateTo } = useStore();

  const benefits = [
    {
      icon: Truck,
      title: 'Pan-India Express Shipping',
      description: 'Free courier transit on all orders over ₹999. Dispatched within 24 hours from regional fulfillment centers.',
      linkText: 'Shipping Policy',
      policy: 'shipping',
    },
    {
      icon: RotateCcw,
      title: '7-Day Seamless Returns',
      description: 'Exchange or return unworn items with tags intact. Doorstep reverse pickups arranged across 19,000+ PIN codes.',
      linkText: 'Return Policy',
      policy: 'returns',
    },
    {
      icon: ShieldCheck,
      title: 'Bank-Grade Payment Security',
      description: 'Encrypted 256-bit SSL transaction gateway supporting UPI, RuPay, Visa, Mastercard, Net Banking, and COD.',
      linkText: 'Security Details',
      policy: 'terms',
    },
    {
      icon: Headphones,
      title: 'Dedicated Customer Care',
      description: 'Direct assistance via WhatsApp, email, or telephone. Mon–Sat from 10:00 AM to 7:00 PM IST.',
      linkText: 'Contact Support',
      policy: 'contact',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8D2337] mb-1">
            The Buytiful Standard
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#191919]">
            Fashion Built on Trust & Integrity
          </h2>
          <p className="text-sm text-zinc-600 mt-2">
            Every garment is tested for shrinkage, color fastness, and drape before reaching your wardrobe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="p-6 rounded-2xl bg-white border border-[#E8DED2] flex flex-col justify-between shadow-xs hover:border-[#191919]/30 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F8F5F0] text-[#8D2337] flex items-center justify-center mb-4 border border-[#E8DED2]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#191919]">
                    {b.title}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                    {b.description}
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('policies', { policyTab: b.policy })}
                  className="mt-4 text-xs font-semibold text-[#8D2337] hover:underline text-left inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{b.linkText}</span>
                  <span>→</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
