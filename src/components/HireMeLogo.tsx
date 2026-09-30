import React from 'react';

interface HireMeLogoProps {
  size?: number;
  className?: string;
  withBoltBadge?: boolean;
}

export const HireMeLogo: React.FC<HireMeLogoProps> = ({
  size = 36,
  className = '',
  withBoltBadge = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        className="w-full h-full object-contain"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Background Gradient */}
          <linearGradient id="hmLogoBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1c2e" />
            <stop offset="50%" stopColor="#13141f" />
            <stop offset="100%" stopColor="#0b0c13" />
          </linearGradient>

          {/* Roof Gradient (Hot Pink / Magenta to Vivid Purple) */}
          <linearGradient id="hmRoofGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          {/* Core Loop Gradient */}
          <linearGradient id="hmCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="60%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>

          {/* Neon Glow */}
          <filter id="hmGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Squircle Base */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="26"
          fill="url(#hmLogoBg)"
          stroke="#383c50"
          strokeWidth="2.5"
        />

        {/* Ambient Radial Bloom */}
        <circle cx="50" cy="50" r="30" fill="#a855f7" opacity="0.18" filter="url(#hmGlow)" />

        {/* Neon Roof Chevron */}
        <path
          d="M 28 44 L 50 25 L 72 44"
          fill="none"
          stroke="url(#hmRoofGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#hmGlow)"
        />

        {/* Inner Curved Ribbon / S-Loop */}
        <path
          d="M 40 45 C 40 38, 60 38, 60 48 C 60 55, 40 54, 40 64 C 40 73, 60 73, 60 66"
          fill="none"
          stroke="url(#hmCoreGrad)"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Energy Accent Spark */}
        <circle cx="50" cy="55" r="2.5" fill="#ffffff" opacity="0.95" />
      </svg>

      {/* Optional Bolt Badge in Lower-Right (Screen 3) */}
      {withBoltBadge && (
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center border-2 border-white shadow-xs">
          <span className="material-symbols-outlined text-white text-[12px] font-bold">bolt</span>
        </div>
      )}
    </div>
  );
};
