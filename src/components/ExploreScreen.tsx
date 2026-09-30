import React, { useState } from 'react';
import { EXPLORE_PROS, POPULAR_CATEGORIES, USER_AVATAR_URL } from '../data/mockData';
import { Pro } from '../types';
import { HireMeLogo } from './HireMeLogo';

interface ExploreScreenProps {
  onSelectPro: (pro: Pro) => void;
  onOpenChatWithPro: (pro: Pro) => void;
  onQuickCall: () => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  onSelectPro,
  onOpenChatWithPro,
  onQuickCall,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('instant');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [maxHourlyRate, setMaxHourlyRate] = useState<number>(50);

  const filteredPros = EXPLORE_PROS.filter((pro) => {
    const matchesSearch =
      pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory
      ? pro.category.toLowerCase().includes(selectedCategory.toLowerCase())
      : true;

    const matchesRate = selectedFilter === 'rate' ? pro.hourlyNum <= 45 : pro.hourlyNum <= maxHourlyRate;

    return matchesSearch && matchesCategory && matchesRate;
  });

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-[#0f172a] font-['Hanken_Grotesk',sans-serif] pb-24 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top App Header */}
      <header className="sticky top-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <HireMeLogo size={34} />
          <div className="flex flex-col min-w-0 justify-center">
            <span className="text-[10px] text-[#4f46e5] tracking-wider uppercase font-semibold truncate">
              HireMe Market
            </span>
            <h1 className="text-base text-slate-900 font-bold truncate leading-tight">
              Explore Categories
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            aria-label="Search"
            onClick={() => {
              const el = document.getElementById('explore-search-input');
              el?.focus();
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 active:bg-slate-100 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          <button
            aria-label="Notifications"
            onClick={() => alert('No new notifications in Downtown Metro zone.')}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 active:bg-slate-100 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>
          <div className="pl-1 flex items-center">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
              src={USER_AVATAR_URL}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col w-full">
        {/* Crisp Header Intro Section */}
        <div className="px-4 pt-3 pb-3 border-b border-slate-200/70 bg-white">
          {/* Location Breadcrumb & Map Action */}
          <div className="flex items-center justify-between mb-3">
            <div className="inline-flex items-center gap-1.5 text-slate-700 bg-slate-100/90 border border-slate-200/80 px-3 py-1 rounded-full cursor-pointer hover:bg-slate-200/70 transition-colors">
              <span className="material-symbols-outlined text-[#4f46e5] text-[17px]">near_me</span>
              <span className="text-xs font-semibold text-slate-800">Downtown Metro, Zone 4</span>
              <span className="material-symbols-outlined text-slate-400 text-[16px]">expand_more</span>
            </div>
            <button
              aria-label="Quick map view"
              onClick={() => alert('Map View: 124 pros actively broadcasting GPS signal within 3 miles.')}
              className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">map</span>
            </button>
          </div>

          {/* Clean Motivational Banner */}
          <div className="mb-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 leading-tight">
              Everyday help,<br />
              <span className="text-[#4f46e5] font-bold">one tap away.</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">Book vetted neighborhood pros ready for dispatch today.</p>
          </div>

          {/* Clean Search Bar & Filter Dock */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 flex items-center bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 shadow-xs focus-within:border-[#4f46e5] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#4f46e5]/15 transition-all">
              <span className="material-symbols-outlined text-slate-400 text-[19px] mr-2 flex-shrink-0">
                search
              </span>
              <input
                id="explore-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs text-slate-800 placeholder:text-slate-400 p-0 focus:ring-0"
                placeholder="Search 'Emergency plumber' or 'Deep cleaning'..."
                type="text"
              />
              <button
                aria-label="Voice search"
                onClick={() => alert('Listening... say a service name like "Electrician" or "Plumber"')}
                className="text-slate-400 hover:text-slate-600 transition-colors ml-1 flex-shrink-0"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </button>
            </div>
            <button
              aria-label="Open filter settings"
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className="w-10 h-10 flex-shrink-0 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs hover:bg-slate-800 active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px]">tune</span>
            </button>
          </div>

          {/* Filter Drawer / Options */}
          {showFilterDrawer && (
            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">Filter Preferences</span>
                <button
                  onClick={() => {
                    setMaxHourlyRate(50);
                    setSelectedCategory(null);
                    setShowFilterDrawer(false);
                  }}
                  className="text-[11px] text-indigo-600 font-semibold"
                >
                  Reset
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Max Rate:</span>
                  <span className="font-bold text-slate-900">${maxHourlyRate}/hr</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={maxHourlyRate}
                  onChange={(e) => setMaxHourlyRate(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Filter Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-0.5 scrollbar-none">
            <button
              onClick={() => setSelectedFilter(selectedFilter === 'instant' ? '' : 'instant')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-colors ${
                selectedFilter === 'instant'
                  ? 'bg-indigo-50 border border-indigo-200 text-[#4f46e5]'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Instant Booking
            </button>
            <button
              onClick={() => setSelectedFilter(selectedFilter === 'verified' ? '' : 'verified')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-colors ${
                selectedFilter === 'verified'
                  ? 'bg-indigo-50 border border-indigo-200 text-[#4f46e5]'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px] text-[#4f46e5]">verified</span>
              Background Checked
            </button>
            <button
              onClick={() => setSelectedFilter(selectedFilter === 'rate' ? '' : 'rate')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-colors ${
                selectedFilter === 'rate'
                  ? 'bg-indigo-50 border border-indigo-200 text-[#4f46e5]'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px] text-amber-500">bolt</span>
              Under $45/hr
            </button>
          </div>
        </div>

        {/* Main Section: Popular Categories (2x3 Grid) */}
        <div className="px-4 pt-3 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-1 h-3.5 rounded-full bg-[#4f46e5]"></span>
              <h3 className="text-sm font-bold text-slate-900">Popular Categories</h3>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs text-[#4f46e5] hover:text-indigo-700 font-semibold transition-colors flex items-center gap-0.5"
            >
              {selectedCategory ? 'Show All' : 'View all (18)'}
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>

          {/* Clean 2x3 Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {POPULAR_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                  className={`flex flex-col p-3 rounded-2xl bg-white border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#4f46e5] bg-indigo-50/30 ring-1 ring-[#4f46e5] shadow-sm'
                      : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-50 text-[#4f46e5] border border-indigo-100">
                      <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                    </div>

                    {cat.badge === 'Hot' && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-[10px] text-rose-600 font-semibold">
                        Hot
                      </span>
                    )}
                    {cat.badgeType === 'dot' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    )}
                    {cat.badge === 'Surge' && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 text-[10px] text-amber-700 font-semibold">
                        Surge
                      </span>
                    )}
                    {cat.badge === '24/7' && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] text-slate-600 font-semibold">
                        24/7
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{cat.name}</h4>
                  <div className="flex items-center gap-1 mt-1 text-slate-500">
                    <span className="material-symbols-outlined text-[13px]">groups</span>
                    <span className="text-[11px]">{cat.prosCount} Pros nearby</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Urgent Assistance / Surge Guarantee Card */}
        <div className="px-4 mb-4">
          <div className="relative overflow-hidden rounded-2xl bg-rose-50/80 border border-rose-200 p-3.5 shadow-2xs flex items-center justify-between gap-2">
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="material-symbols-outlined text-rose-600 text-[17px]">timer</span>
                <span className="text-[10px] font-bold text-rose-700 tracking-wide uppercase">
                  Surge Guarantee
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">Need assistance right now?</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Average dispatch responder time is 12 mins.</p>
            </div>
            <button
              onClick={onQuickCall}
              className="relative z-10 px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-semibold shadow-xs hover:bg-rose-700 active:scale-95 transition-all flex-shrink-0"
              type="button"
            >
              Quick Call
            </button>
          </div>
        </div>

        {/* Featured Verified Workers Section */}
        <div className="px-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-3.5 rounded-full bg-slate-700"></span>
              <h3 className="text-sm font-bold text-slate-900">Featured Verified Workers</h3>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Top Rated in Area</span>
          </div>

          {filteredPros.map((pro) => (
            <div
              key={pro.id}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col gap-2.5 hover:border-slate-300 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <img
                    className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-100"
                    alt={pro.name}
                    src={pro.avatarUrl}
                  />
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{pro.name}</h4>
                      <span className="material-symbols-outlined text-[#4f46e5] text-[16px]">verified</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900 flex-shrink-0">
                      {pro.rate}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{pro.role}</p>

                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-amber-500 gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">star</span>
                      <span className="text-[11px] font-bold text-slate-800">{pro.rating}</span>
                    </div>
                    <span className="text-slate-300 text-[10px]">•</span>
                    <span className="text-[10px] text-slate-500">{pro.tasksCompleted} tasks completed</span>
                  </div>
                </div>
              </div>

              {/* Quick Metrics & CTA Bar */}
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded-full text-slate-600 text-[10px] font-medium">
                  <span className="material-symbols-outlined text-emerald-600 text-[13px]">bolt</span>
                  {pro.availability}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    aria-label={`Chat with ${pro.name}`}
                    onClick={() => onOpenChatWithPro(pro)}
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 active:scale-95 transition-all"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[17px]">chat</span>
                  </button>
                  <button
                    onClick={() => onSelectPro(pro)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#4f46e5] hover:bg-indigo-700 text-white text-xs font-semibold active:scale-95 transition-all shadow-xs"
                    type="button"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
