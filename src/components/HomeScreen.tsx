import React, { useState } from 'react';
import { HOME_PROS, POPULAR_CATEGORIES, INITIAL_CONVERSATIONS, USER_AVATAR_URL } from '../data/mockData';
import { Pro, Conversation } from '../types';
import { VicinityMapWidget } from './VicinityMapWidget';
import { HireMeLogo } from './HireMeLogo';

interface HomeScreenProps {
  onSelectPro: (pro: Pro) => void;
  onOpenConversation: (conv: Conversation) => void;
  onCreateRequest: () => void;
  onNavigateToExplore: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectPro,
  onOpenConversation,
  onCreateRequest,
  onNavigateToExplore,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'accept'>('create');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Ghaziabad, Sector 12');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const locations = [
    'Ghaziabad, Sector 12',
    'Downtown Metro, Zone 4',
    'Indirapuram, Block B',
    'Noida Sector 62',
    'South Delhi, Greater Kailash',
  ];

  const filteredPros = HOME_PROS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const triggerToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 2500);
  };

  return (
    <div className="w-full min-h-screen bg-[#0f1117] text-[#f1f3f9] font-['Plus_Jakarta_Sans',sans-serif] pb-24 selection:bg-[#4f46e5] selection:text-white">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#232630] border border-[#4f46e5]/40 text-[#f1f3f9] px-4 py-2 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#0f1117]/95 backdrop-blur-md border-b border-[#343847]/40 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <HireMeLogo size={34} />
          <div className="flex flex-col min-w-0 justify-center">
            <span className="text-[10px] text-[#9ba1b4] tracking-wider uppercase font-semibold truncate">
              HireMe Market
            </span>
            <h1 className="text-base text-[#f1f3f9] font-bold truncate leading-tight">Home</h1>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            aria-label="Search"
            onClick={() => {
              const el = document.getElementById('home-search-input');
              el?.focus();
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#9ba1b4] hover:text-[#f1f3f9] active:bg-[#232630] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          <button
            aria-label="Notifications"
            onClick={() => triggerToast('No new unread system alerts')}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#9ba1b4] hover:text-[#f1f3f9] active:bg-[#232630] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#0f1117]"></span>
          </button>
          <div className="pl-1 flex items-center">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#343847]"
              src={USER_AVATAR_URL}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-3 flex flex-col gap-4">
        {/* Location Selector Bar */}
        <div className="flex items-center justify-between relative">
          <button
            onClick={() => setShowLocationPicker(!showLocationPicker)}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b1e28] hover:bg-[#232630] border border-[#343847]/40 transition-colors text-left"
            type="button"
          >
            <span className="material-symbols-outlined text-[#c4b5fd] text-[18px]">location_on</span>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#8a8e9e] uppercase tracking-wider leading-none">
                Your Location
              </span>
              <span className="text-xs text-[#f1f3f9] flex items-center gap-1 font-semibold">
                {selectedLocation}
                <span className="material-symbols-outlined text-[15px] text-[#8a8e9e] group-hover:translate-y-0.5 transition-transform">
                  expand_more
                </span>
              </span>
            </div>
          </button>

          {/* Location Dropdown Modal */}
          {showLocationPicker && (
            <div className="absolute top-12 left-0 z-50 w-64 bg-[#1b1e28] border border-[#343847] rounded-xl shadow-2xl p-2">
              <div className="text-[11px] font-bold text-[#9ba1b4] px-2 py-1 uppercase tracking-wider">
                Select Service Zone
              </div>
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setShowLocationPicker(false);
                    triggerToast(`Switched zone to ${loc}`);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between ${
                    selectedLocation === loc ? 'bg-[#4f46e5] text-white font-semibold' : 'text-[#f1f3f9] hover:bg-[#282c39]'
                  }`}
                >
                  <span>{loc}</span>
                  {selectedLocation === loc && (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1b1e28] border border-[#343847]/40 text-[#9ba1b4] text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
              Surge Active
            </span>
          </div>
        </div>

        {/* Dual Action Switcher (Create Request vs Accept) */}
        <div>
          <div className="p-1 rounded-2xl bg-[#1b1e28] border border-[#343847]/40 flex items-center">
            <button
              onClick={() => {
                setActiveTab('create');
                onCreateRequest();
              }}
              className={`flex-1 py-2 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'create'
                  ? 'bg-[#2e323d] text-[#f1f3f9] border border-[#343847]/60 shadow-sm'
                  : 'bg-transparent text-[#9ba1b4] hover:text-[#f1f3f9]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#c4b5fd]">bolt</span>
              Create Request
            </button>
            <button
              onClick={() => {
                setActiveTab('accept');
                triggerToast('Switching to Pro Mode: Listening for dispatch offers nearby...');
              }}
              className={`flex-1 py-2 px-4 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'accept'
                  ? 'bg-[#2e323d] text-[#f1f3f9] border border-[#343847]/60 shadow-sm'
                  : 'bg-transparent text-[#9ba1b4] hover:text-[#f1f3f9]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">work</span>
              Accept Work
            </button>
          </div>
        </div>

        {/* Hero Banner Card with Integrated Quick Search */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1f2330] to-[#171a23] border border-[#343847]/50 p-5 shadow-lg">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0b0c12]/60 border border-[#343847]/40 text-[#9ba1b4] mb-3">
              <span className="material-symbols-outlined text-[14px] text-emerald-400">verified</span>
              <span className="text-xs text-[#f1f3f9] font-medium">100% Background Verified Pros</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#f1f3f9] mb-1.5 leading-tight">
              Everyday help,<br />one tap away.
            </h2>
            <p className="text-xs text-[#9ba1b4] mb-4 max-w-[260px] leading-relaxed">
              Book vetted local specialists in minutes with zero upfront fees.
            </p>
            {/* Search Input Bar */}
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[#8a8e9e] text-[18px] pointer-events-none">
                search
              </span>
              <input
                id="home-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-11 rounded-xl bg-[#0b0c12] border border-[#343847]/50 text-[#f1f3f9] placeholder:text-[#8a8e9e] text-xs focus:outline-none focus:border-[#c4b5fd]/70 transition-all"
                placeholder="Search services, plumbers, cleaners..."
                type="text"
              />
              <button
                aria-label="Voice Search"
                onClick={() => triggerToast('Listening for voice request...')}
                className="absolute right-2 w-7 h-7 rounded-lg bg-[#1b1e28] flex items-center justify-center text-[#9ba1b4] hover:text-[#f1f3f9]"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">mic</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Vicinity Radar Map Widget */}
        <VicinityMapWidget
          locationName={selectedLocation}
          onSelectPro={onSelectPro}
        />

        {/* Quick Category Grid Strip */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base text-[#f1f3f9] font-bold">Popular Categories</h3>
            <button
              onClick={onNavigateToExplore}
              className="text-xs text-[#9ba1b4] hover:text-[#f1f3f9] flex items-center font-medium"
            >
              See All <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {POPULAR_CATEGORIES.slice(0, 4).map((cat) => (
              <button
                key={cat.id}
                onClick={onNavigateToExplore}
                className="flex flex-col items-center p-3 rounded-2xl bg-[#1b1e28] border border-[#343847]/30 hover:border-[#343847]/80 transition-all group"
                type="button"
              >
                <div className="w-11 h-11 rounded-xl bg-[#232630] flex items-center justify-center group-hover:scale-105 transition-transform mb-1.5">
                  <span className={`material-symbols-outlined text-[22px] ${cat.color}`}>{cat.icon}</span>
                </div>
                <span className="text-[11px] text-[#f1f3f9] font-medium text-center truncate w-full">
                  {cat.name.replace('Home ', '').replace(' Aid', '')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Near You (Horizontal Carousel) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base text-[#f1f3f9] font-bold">Recommended Near You</h3>
              <span className="px-2 py-0.5 rounded-full bg-[#1b1e28] border border-[#343847]/40 text-[#9ba1b4] text-[11px] font-medium">
                Active
              </span>
            </div>
            <span className="text-xs text-[#8a8e9e]">Swipe →</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {filteredPros.map((pro) => (
              <div
                key={pro.id}
                className="flex-shrink-0 w-64 rounded-2xl bg-[#1b1e28] border border-[#343847]/40 p-3 flex flex-col justify-between relative group hover:border-[#343847] transition-all"
              >
                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-[#232630]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={pro.name}
                    src={pro.avatarUrl}
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0f1117]/85 backdrop-blur-sm text-[#f1f3f9] text-[11px] flex items-center gap-1 font-medium border border-white/10">
                    <span className="material-symbols-outlined text-[12px] text-[#8a8e9e]">near_me</span>{' '}
                    {pro.distance}
                  </span>
                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-md bg-[#0f1117]/90 backdrop-blur-sm text-[#f1f3f9] text-[11px] font-semibold border border-white/10">
                    {pro.rate}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-1 mb-3">
                  <div className="min-w-0">
                    <h4 className="text-sm text-[#f1f3f9] font-semibold truncate">{pro.name}</h4>
                    <p className="text-xs text-[#9ba1b4] truncate">{pro.role}</p>
                  </div>
                  <div className="flex items-center gap-0.5 bg-[#232630] px-1.5 py-0.5 rounded text-amber-400 font-semibold text-xs border border-[#343847]/40">
                    <span className="material-symbols-outlined text-[13px] text-amber-400">star</span>
                    {pro.rating}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPro(pro)}
                  className="w-full py-2 rounded-xl bg-[#2e323d] hover:bg-[#282c39] text-[#f1f3f9] border border-[#343847]/50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-[0.99]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#c4b5fd]">calendar_month</span>
                  Instant Book
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Active Conversations */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base text-[#f1f3f9] font-bold">Active Conversations</h3>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <button
              onClick={() => onOpenConversation(INITIAL_CONVERSATIONS[0])}
              className="text-xs text-[#9ba1b4] hover:text-[#f1f3f9] font-medium"
            >
              View Inbox
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {INITIAL_CONVERSATIONS.map((conv) => (
              <div
                key={conv.id}
                onClick={() => onOpenConversation(conv)}
                className="p-3 rounded-2xl bg-[#1b1e28] border border-[#343847]/40 hover:bg-[#232630] transition-colors flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="relative flex-shrink-0">
                  <img
                    className="w-11 h-11 rounded-full object-cover ring-1 ring-[#343847]/60"
                    alt={conv.name}
                    src={conv.avatarUrl}
                  />
                  {conv.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#0f1117]"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs text-[#f1f3f9] font-semibold truncate">{conv.name}</h4>
                    <span className="text-[10px] text-[#8a8e9e]">{conv.time}</span>
                  </div>
                  <p className="text-xs text-[#9ba1b4] truncate mt-0.5">{conv.lastMessage}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded bg-[#232630] text-[#9ba1b4] text-[10px] font-medium">
                      {conv.tag}
                    </span>
                  </div>
                </div>

                {conv.unreadCount ? (
                  <div className="flex flex-col items-end gap-1">
                    <span className="w-5 h-5 rounded-full bg-[#2e323d] border border-[#343847]/60 text-[#f1f3f9] text-[10px] font-semibold flex items-center justify-center">
                      {conv.unreadCount}
                    </span>
                  </div>
                ) : (
                  <span className="material-symbols-outlined text-[#8a8e9e] text-[18px]">chevron_right</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* HireMe Protection Shield */}
        <div className="p-3.5 rounded-2xl bg-[#1b1e28] border border-[#343847]/40 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#232630] text-[#f1f3f9] flex items-center justify-center flex-shrink-0 border border-[#343847]/40">
            <span className="material-symbols-outlined text-[20px] text-[#c4b5fd]">shield</span>
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-xs text-[#f1f3f9] font-semibold">HireMe Protection Shield</h5>
            <p className="text-[11px] text-[#9ba1b4] leading-relaxed">
              Every task insured up to ₹10,000 with emergency resolution support.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
