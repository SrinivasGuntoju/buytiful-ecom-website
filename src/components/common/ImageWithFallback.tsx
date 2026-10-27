import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
  fallbackName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Buytiful Apparel',
  className = '',
  fallbackCategory = 'Fashion Collection',
  fallbackName = 'Buytiful.in',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5EFEB] via-[#EAE1D7] to-[#DDD2C4] text-[#191919] p-6 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        {/* Subtle patterned fashion watermark */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#191919_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-2">
          {/* Fashion silhouette icon */}
          <div className="w-12 h-12 rounded-full border border-[#191919]/20 flex items-center justify-center bg-white/40 backdrop-blur-sm text-[#8D2337]">
            <svg
              className="w-6 h-6 stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
            </svg>
          </div>

          <p className="text-[11px] font-semibold tracking-widest uppercase text-[#8D2337]/90">
            {fallbackCategory}
          </p>
          <p className="text-xs font-medium text-[#191919]/80 line-clamp-1 max-w-[180px]">
            {fallbackName}
          </p>
          <span className="text-[10px] text-[#191919]/50 tracking-wider">
            buytiful.in studio
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EFE9E2] ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#EFE9E2] via-[#F8F5F0] to-[#EFE9E2] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
