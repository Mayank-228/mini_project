import React, { useState } from 'react';
import { Pro } from '../types';

interface MapProvider {
  id: string;
  name: string;
  role: string;
  category: 'cleaning' | 'plumbing' | 'electric' | 'all';
  rate: string;
  rating: number;
  eta: string;
  distance: string;
  xPercent: number; // 0 to 100 on map canvas
  yPercent: number; // 0 to 100 on map canvas
  avatarUrl: string;
  available: boolean;
}

interface VicinityMapWidgetProps {
  locationName: string;
  onSelectPro: (pro: Pro) => void;
}

const VICINITY_PROVIDERS: MapProvider[] = [
  {
    id: 'pro-1',
    name: 'Sreemathi S.',
    role: 'Deep Home Cleaning',
    category: 'cleaning',
    rate: '₹199/hr',
    rating: 4.9,
    eta: '8 mins away',
    distance: '1.2 km',
    xPercent: 32,
    yPercent: 38,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRwogEjXFrhM46WVSdPk006C8-AnG4TyNMOudbDf1CVfTBb2cfhEVvWpa2TugrpBycsNTzuGJCSTvPt5WpqLwgx8WN-cPkfmAJjDrIPOkXB5Ifc3ezEnkHUWeBkY7QQ9dW1coLGVhDGgW2SlNab7lrTYNoPE0KYj_-JuAmOlp8e-BxJfY2X1zA0UCdCAXzfnHigrt8EFJAvFU4O7xT6mQyQt5plsJqNV3_zErg3LB-eZLTEC0ij8a9qw',
    available: true,
  },
  {
    id: 'pro-2',
    name: 'Rajeev Sharma',
    role: 'Leak Fix & Fitments',
    category: 'plumbing',
    rate: '₹249/hr',
    rating: 4.8,
    eta: '14 mins away',
    distance: '2.4 km',
    xPercent: 74,
    yPercent: 28,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA99t9GCptx5Dy-5s5yueJRI0ALxrSifnFFXWXXn7ndqUaoH4K1jHcDfdVe4iXHbQtF4i6pDcRE8V-Og3AchJJSgSUK8Nf35JAvifZ85bkdewKwzVkBz4tq7p0owaHa9PBsDB1xxtSMRj_VCXn6qOuqB-hrAbr7m-ANcmD-KFHSajnx6Wp4WI-HymE9HzwpAw53VIjKN69aST4Jay6uGVIwIJDeNzvV1GHTQDwbPLsDxRto867POLRQrA',
    available: true,
  },
  {
    id: 'pro-3',
    name: 'Imran Qureshi',
    role: 'Wiring & Inverters',
    category: 'electric',
    rate: '₹299/hr',
    rating: 5.0,
    eta: '5 mins away',
    distance: '0.8 km',
    xPercent: 62,
    yPercent: 68,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvMbd_wPOh6OI-qXrenocLLNOJqVP6Vmdt9ND4eYSA3ADJ07L5r7O4C9ndYMIuqqK5RLzupNKtN5gve6GL2fIBqd5dAgdUGA60Q41HPaFBBGSi7i6Ojo8LfpZu9XVlNjlmilMD_5hMwJjZ0FmIHGAlyvwnlLJJSpX57PnWU9KExenw2tFecUNjXc1rcqG-Cd7CUDqJyfLb2_MRR7JHrNtxPGtB60DeX21bn5ub63uydOslR_fL53fwdQ',
    available: true,
  },
  {
    id: 'pro-4',
    name: 'Elena Rostova',
    role: 'Master Electrician',
    category: 'electric',
    rate: '$42/hr',
    rating: 4.9,
    eta: '3 mins away',
    distance: '0.4 mi',
    xPercent: 22,
    yPercent: 72,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvyyAUj2R6uSAtSBMIDeGzlPKw8w_of9CUiylu11ugL5aiG_SDRfGcwoKj5XbQtx3T88BfhCIFpVhP2R4B_YKLmGmnY_NCHwlbKiiu0f5ghIVpXPoqmePGYsqoW_w2xuvYxn-uEReUC7JqYlf5UG37dKB-hcoL5US03luXYGECG4QAQV1v2-sWM5_ER7vTYkE66duDG-8Mm0t061U0h1jb-UUnDBVMQfiqISCD56odpOqwtpxFGqOsPQ',
    available: true,
  },
  {
    id: 'pro-5',
    name: 'David Vance',
    role: 'Emergency Pipe Tech',
    category: 'plumbing',
    rate: '$48/hr',
    rating: 5.0,
    eta: '11 mins away',
    distance: '1.4 mi',
    xPercent: 82,
    yPercent: 76,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyDi4hHCX1PO_kOCUmjcnprwdIs9-trM4qVQmSvjybPSMCaLoq6GaWygL-LUiQ6y_Wgm4v_6YJBXgnDtw98d55nJ0Czrlf7yg_1kHjt_6B20NLUs63uK4HEpKM1MLiPAODR7ZoeIj0By7ioOBT6g3ceIyIDRg4H2uNnj-nZh0peKXJ5fVUFXdGllaSE51uzV5h6dqqPeY6uD-iAtuwH90xabSt4_FTmEvB1344goEMhfpE8hNyQvCSWw',
    available: true,
  },
];

export const VicinityMapWidget: React.FC<VicinityMapWidgetProps> = ({ locationName, onSelectPro }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'cleaning' | 'plumbing' | 'electric'>('all');
  const [selectedProvider, setSelectedProvider] = useState<MapProvider | null>(VICINITY_PROVIDERS[0]);
  const [radarActive, setRadarActive] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredProviders = VICINITY_PROVIDERS.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  return (
    <div className="w-full rounded-2xl bg-[#1b1e28] border border-[#343847]/50 overflow-hidden shadow-lg">
      {/* Top Map Header & Controls */}
      <div className="px-3.5 py-2.5 bg-[#161820] border-b border-[#343847]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ba1b4]">
              Live Vicinity Radar
            </span>
            <span className="text-xs font-bold text-[#f1f3f9] flex items-center gap-1">
              {locationName}
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-[#c4b5fd] font-medium">
                {filteredProviders.length} active pros
              </span>
            </span>
          </div>
        </div>

        {/* Quick Map Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setRadarActive(!radarActive)}
            className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-colors flex items-center gap-1 ${
              radarActive
                ? 'bg-indigo-500/20 border-indigo-500/40 text-[#c4b5fd]'
                : 'bg-[#232630] border-[#343847] text-[#8a8e9e]'
            }`}
            title="Toggle radar sweep"
          >
            <span className="material-symbols-outlined text-[12px]">radar</span>
            <span>{radarActive ? 'Scanning' : 'Paused'}</span>
          </button>
          <div className="flex items-center rounded-lg bg-[#232630] border border-[#343847] overflow-hidden">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
              className="w-6 h-6 flex items-center justify-center text-[#8a8e9e] hover:text-white text-xs font-bold"
            >
              +
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
              className="w-6 h-6 flex items-center justify-center text-[#8a8e9e] hover:text-white text-xs font-bold border-l border-[#343847]"
            >
              -
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills on Map Top */}
      <div className="px-3 py-1.5 bg-[#1b1e28] border-b border-[#343847]/30 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-colors ${
            selectedFilter === 'all'
              ? 'bg-[#4f46e5] text-white'
              : 'bg-[#232630] text-[#9ba1b4] hover:text-white'
          }`}
        >
          All ({VICINITY_PROVIDERS.length})
        </button>
        <button
          onClick={() => setSelectedFilter('cleaning')}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-colors ${
            selectedFilter === 'cleaning'
              ? 'bg-indigo-600 text-white'
              : 'bg-[#232630] text-[#9ba1b4] hover:text-white'
          }`}
        >
          Cleaning
        </button>
        <button
          onClick={() => setSelectedFilter('plumbing')}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-colors ${
            selectedFilter === 'plumbing'
              ? 'bg-sky-600 text-white'
              : 'bg-[#232630] text-[#9ba1b4] hover:text-white'
          }`}
        >
          Plumbing
        </button>
        <button
          onClick={() => setSelectedFilter('electric')}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-colors ${
            selectedFilter === 'electric'
              ? 'bg-amber-600 text-white'
              : 'bg-[#232630] text-[#9ba1b4] hover:text-white'
          }`}
        >
          Electrician
        </button>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative h-56 w-full bg-[#0d0f15] overflow-hidden select-none">
        {/* Dynamic Zoom Wrapper */}
        <div
          className="absolute inset-0 transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Stylized Vector Map Grid Lines & Roads */}
          <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2a3042" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Simulated Road Arteries */}
            <path
              d="M-20 40 Q 140 70 420 50"
              fill="none"
              stroke="#3b4256"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M-20 40 Q 140 70 420 50"
              fill="none"
              stroke="#4a5568"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            <path
              d="M 120 -20 Q 160 140 180 300"
              fill="none"
              stroke="#3b4256"
              strokeWidth="5"
            />
            <path
              d="M 280 -20 Q 240 120 290 300"
              fill="none"
              stroke="#3b4256"
              strokeWidth="4"
            />
            <path
              d="M 50 180 Q 220 170 380 220"
              fill="none"
              stroke="#3b4256"
              strokeWidth="5"
            />

            {/* Area Blocks / Parks */}
            <rect x="50" y="80" width="80" height="60" rx="10" fill="#132420" opacity="0.6" />
            <text x="56" y="96" fill="#34d399" fontSize="8" fontWeight="600" opacity="0.8">
              District Green
            </text>

            <rect x="220" y="100" width="110" height="50" rx="8" fill="#181e2e" opacity="0.8" />
            <text x="228" y="118" fill="#818cf8" fontSize="8" fontWeight="600" opacity="0.8">
              Sector 12 Market
            </text>
          </svg>

          {/* User Location Radar Rings in Center (50%, 50%) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {/* Radius circles */}
            <div className="w-44 h-44 rounded-full border border-indigo-500/20 absolute -translate-x-1/2 -translate-y-1/2" />
            <div className="w-28 h-28 rounded-full border border-indigo-500/30 absolute -translate-x-1/2 -translate-y-1/2" />

            {/* Radar Sweep Effect */}
            {radarActive && (
              <div className="w-44 h-44 rounded-full absolute -translate-x-1/2 -translate-y-1/2 overflow-hidden animate-spin duration-3000">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-indigo-500/25 to-transparent rounded-tl-full origin-bottom-right" />
              </div>
            )}

            {/* Center User Pin */}
            <div className="relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-indigo-500/30 flex items-center justify-center shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
              <span className="mt-1 px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-bold text-white tracking-wider border border-white/10 uppercase">
                You
              </span>
            </div>
          </div>

          {/* Interactive Provider Pins */}
          {filteredProviders.map((pro) => {
            const isSelected = selectedProvider?.id === pro.id;
            return (
              <div
                key={pro.id}
                onClick={() => setSelectedProvider(pro)}
                style={{ left: `${pro.xPercent}%`, top: `${pro.yPercent}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                {/* Pin Card */}
                <div
                  className={`flex items-center gap-1 px-1.5 py-1 rounded-full border transition-all shadow-md ${
                    isSelected
                      ? 'bg-indigo-600 border-white ring-2 ring-indigo-400 scale-110'
                      : 'bg-[#1b1e28]/95 border-[#343847] hover:border-indigo-400 hover:scale-105'
                  }`}
                >
                  <img
                    src={pro.avatarUrl}
                    alt={pro.name}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-white/30"
                  />
                  <div className="flex flex-col pr-1">
                    <span className="text-[9px] font-bold text-white leading-none">
                      {pro.name.split(' ')[0]}
                    </span>
                    <span className="text-[7px] text-[#c4b5fd] font-medium leading-none mt-0.5">
                      {pro.eta.split(' ')[0]}m
                    </span>
                  </div>
                </div>

                {/* Pulse wave when selected */}
                {isSelected && (
                  <span className="absolute -inset-1 rounded-full bg-indigo-500/40 animate-ping pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Mini Compass / Legend */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs px-2 py-1 rounded-lg border border-white/10 text-[9px] text-[#9ba1b4] flex items-center gap-1.5 pointer-events-none z-30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Active within 2.5 km</span>
        </div>
      </div>

      {/* Selected Provider Quick Action Tray */}
      {selectedProvider && (
        <div className="p-3 bg-[#161820] border-t border-[#343847]/40 flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src={selectedProvider.avatarUrl}
                alt={selectedProvider.name}
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#343847]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#161820]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h4 className="text-xs font-bold text-[#f1f3f9] truncate">
                  {selectedProvider.name}
                </h4>
                <span className="text-amber-400 text-[10px] font-bold flex items-center">
                  ★ {selectedProvider.rating}
                </span>
              </div>
              <p className="text-[10px] text-[#9ba1b4] truncate">{selectedProvider.role}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-bold text-white">{selectedProvider.rate}</span>
                <span className="text-[9px] text-[#c4b5fd] font-medium flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[10px]">near_me</span>
                  {selectedProvider.distance} • {selectedProvider.eta}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onSelectPro({
                id: selectedProvider.id,
                name: selectedProvider.name,
                role: selectedProvider.role,
                category: selectedProvider.category,
                rate: selectedProvider.rate,
                hourlyNum: 199,
                rating: selectedProvider.rating,
                tasksCompleted: 120,
                distance: selectedProvider.distance,
                availability: selectedProvider.eta,
                verified: true,
                avatarUrl: selectedProvider.avatarUrl,
              });
            }}
            className="px-3.5 py-2 rounded-xl bg-[#4f46e5] hover:bg-indigo-600 active:scale-95 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[15px]">bolt</span>
            <span>Dispatch Now</span>
          </button>
        </div>
      )}
    </div>
  );
};
