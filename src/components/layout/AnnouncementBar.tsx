import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { announcements, applyCoupon } = useStore();
  const activeAnnouncements = announcements.filter((a) => a.active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeAnnouncements.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
    }, 4200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeAnnouncements.length, isPaused]);

  if (activeAnnouncements.length === 0) return null;

  const current = activeAnnouncements[currentIndex] || activeAnnouncements[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeAnnouncements.length) % activeAnnouncements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
  };

  const handleCodeClick = (code: string) => {
    navigator.clipboard?.writeText(code);
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <aside
      className="bg-[#191919] text-[#F8F5F0] text-[11px] sm:text-xs py-2 px-4 transition-colors relative z-40 border-b border-white/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Promotional announcements"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="text-zinc-400 hover:text-white transition-colors p-1"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 text-center px-4 overflow-hidden">
          <div className="inline-flex items-center gap-2 justify-center flex-wrap transition-opacity duration-300">
            <span className="tracking-widest font-medium uppercase text-zinc-200">
              {current.text}
            </span>

            {current.code && (
              <button
                onClick={() => handleCodeClick(current.code!)}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#8D2337] text-white font-semibold text-[11px] hover:bg-[#a62b42] transition-colors cursor-pointer"
                title="Click to copy and apply discount"
              >
                {copiedCode === current.code ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-300" />
                    <span>APPLIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 opacity-80" />
                    <span>{current.code}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="text-zinc-400 hover:text-white transition-colors p-1"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
