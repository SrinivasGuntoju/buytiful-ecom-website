import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Check, Mail, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { showToast, applyCoupon } = useStore();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    if (!consent) {
      showToast('Please consent to receiving style updates', 'error');
      return;
    }

    setIsSubscribed(true);
    showToast('Subscribed! Use code WELCOME10 for 10% off your first order.', 'success');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#191919] text-[#F8F5F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F8F5F0] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>The Buytiful Inner Circle</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Never Miss a Limited Fabric Drop
        </h2>

        <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed mb-8">
          Subscribe for early access to seasonal capsule releases, private previews, and receive <span className="text-amber-300 font-bold">10% OFF</span> on your inaugural order.
        </p>

        {isSubscribed ? (
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-md mx-auto text-center space-y-2 animate-in fade-in zoom-in-95">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">You're on the VIP list!</h3>
            <p className="text-xs text-zinc-300">
              Your promotional voucher code is:
            </p>
            <div className="inline-flex items-center gap-2 p-2 bg-black/40 rounded-lg border border-white/10">
              <span className="font-mono font-bold text-sm text-amber-300 tracking-wider">
                WELCOME10
              </span>
              <button
                onClick={() => applyCoupon('WELCOME10')}
                className="text-[11px] font-semibold text-white bg-[#8D2337] px-2.5 py-1 rounded hover:bg-[#a62b42] cursor-pointer"
              >
                Auto-Apply to Bag
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-amber-300 focus:bg-white/15 transition-all"
                />
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#8D2337] hover:bg-[#a62b42] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-md cursor-pointer whitespace-nowrap"
              >
                Join & Save
              </button>
            </div>

            <label className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="rounded border-zinc-600 text-[#8D2337] focus:ring-0"
              />
              <span>I consent to receiving email notifications. Unsubscribe anytime.</span>
            </label>
          </form>
        )}

      </div>
    </section>
  );
};
