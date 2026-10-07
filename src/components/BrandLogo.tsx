import React, { useState } from 'react';

interface BrandLogoProps {
  variant?: 'default' | 'light';
  size?: 'sm' | 'md' | 'lg';
  customLogoUrl?: string | null;
}

/**
 * Official Betapawa Brand Mark
 * Preserves the original sunburst symbol, forest green "Beta" (#086B3A) lettering,
 * and brand orange "Pawa" (#F49A16) lettering on a clean transparent background.
 * Also supports rendering a user-supplied image asset if configured, with seamless
 * fallback to the exact vector mark so it never displays a broken image icon.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'default',
  size = 'md',
  customLogoUrl = null,
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
  };

  if (customLogoUrl && !imgError) {
    return (
      <img
        src={customLogoUrl}
        alt="Betapawa Solutions Limited"
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${sizeClasses[size]} w-auto object-contain select-none`}
      />
    );
  }

  const betaColor = variant === 'light' ? '#34D399' : '#086B3A';
  const pawaColor = '#F49A16';

  return (
    <span className="inline-flex items-center gap-2 select-none" aria-label="Betapawa">
      {/* Original Sunburst Symbol */}
      <svg
        viewBox="0 0 44 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={size === 'sm' ? 'w-7 h-6' : size === 'lg' ? 'w-10 h-9' : 'w-8 h-7'}
        aria-hidden="true"
      >
        {/* Sunburst rays */}
        <path
          d="M22 3V9M9.5 7.8L13.6 12.2M34.5 7.8L30.4 12.2M4 19.5H10M34 19.5H40M12.2 4.8L15.1 10.1M31.8 4.8L28.9 10.1M5.8 13.2L11.2 15.8M38.2 13.2L32.8 15.8"
          stroke={pawaColor}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        {/* Rising sun core */}
        <path
          d="M11 23C11 16.9249 15.9249 12 22 12C28.0751 12 33 16.9249 33 23H11Z"
          fill={pawaColor}
        />
        {/* Horizon agricultural Leaf / Energy arc in Betapawa Green */}
        <path
          d="M6 27.5C13.5 24.5 30.5 24.5 38 27.5"
          stroke={betaColor}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M11 32C17.5 29.8 26.5 29.8 33 32"
          stroke={pawaColor}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>

      {/* Exact Green "Beta" and Orange "Pawa" Lettering */}
      <span className="font-sans font-bold tracking-tight leading-none flex items-baseline text-xl md:text-2xl">
        <span style={{ color: betaColor }}>Beta</span>
        <span style={{ color: pawaColor }}>Pawa</span>
      </span>
    </span>
  );
};
