import React, { useState } from 'react';
import { Sun } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
  loading = 'lazy',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#064B2D] via-[#086B3A] to-[#171A18] text-white ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sun className="w-8 h-8 text-[#F49A16] mb-3 opacity-90" />
        <p className="text-sm font-medium text-white/95 max-w-xs">
          {fallbackTitle || alt}
        </p>
        <span className="text-xs text-white/70 mt-1">
          Betapawa AgriPower™ Architectural Visualization
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={loading}
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
