import React, { useState } from 'react';
import { USER_AVATAR_URL } from '../data/mockData';

interface ProfileScreenProps {
  onLogout: () => void;
  onNavigateToCode: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout, onNavigateToCode }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="w-full min-h-screen bg-[#0f1117] text-[#f1f3f9] font-['Plus_Jakarta_Sans',sans-serif] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0f1117]/95 backdrop-blur-md border-b border-[#343847]/40 px-4 h-16 flex items-center justify-between">
        <h1 className="text-base font-bold text-white">Profile & Settings</h1>
        <button
          onClick={onNavigateToCode}
          className="px-2.5 py-1 rounded-lg bg-[#4f46e5]/20 border border-[#4f46e5]/40 text-[#c4b5fd] text-xs font-semibold flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[15px]">code</span>
          <span>Flutter Source</span>
        </button>
      </header>

      <main className="p-4 space-y-4">
        {/* User Card */}
        <div className="p-4 rounded-2xl bg-[#1b1e28] border border-[#343847]/40 flex items-center gap-3.5">
          <img
            src={USER_AVATAR_URL}
            alt="Profile Avatar"
            className="w-14 h-14 rounded-full object-cover ring-2 ring-[#4f46e5]"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-white truncate">Mayank Sharma</h2>
              <span className="material-symbols-outlined text-[#c4b5fd] text-[16px]">verified</span>
            </div>
            <p className="text-xs text-[#9ba1b4] truncate">mayankworks03@gmail.com</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                Instant Gig Pass Active
              </span>
            </div>
          </div>
        </div>

        {/* Escrow Shield & Wallet Balance */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#1b1e28] border border-[#343847]/40">
            <span className="text-[10px] text-[#8a8e9e] font-semibold uppercase tracking-wider block">
              Escrow Protection
            </span>
            <span className="text-lg font-bold text-emerald-400 block mt-0.5">₹10,000</span>
            <span className="text-[10px] text-[#9ba1b4]">Insured per task</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1b1e28] border border-[#343847]/40">
            <span className="text-[10px] text-[#8a8e9e] font-semibold uppercase tracking-wider block">
              Completed Tasks
            </span>
            <span className="text-lg font-bold text-white block mt-0.5">14 Jobs</span>
            <span className="text-[10px] text-[#9ba1b4]">100% 5-star rating</span>
          </div>
        </div>

        {/* Account Menu */}
        <div className="rounded-2xl bg-[#1b1e28] border border-[#343847]/40 divide-y divide-[#343847]/40 overflow-hidden">
          <button
            onClick={onNavigateToCode}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#232630] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-[#c4b5fd] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">flutter</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">View Flutter Project Code</span>
                <span className="text-[10px] text-[#9ba1b4] block">Ready-to-run Dart widgets & theme</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#8a8e9e] text-[18px]">chevron_right</span>
          </button>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">notifications</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Live Dispatch Alerts</span>
                <span className="text-[10px] text-[#9ba1b4] block">Push updates when pros are near</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="accent-[#4f46e5] w-4 h-4 cursor-pointer"
            />
          </div>

          <button
            onClick={() => alert('Saved addresses: Ghaziabad Sector 12 (Home), Downtown Metro (Work)')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#232630] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">pin_drop</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Saved Service Addresses</span>
                <span className="text-[10px] text-[#9ba1b4] block">Ghaziabad, Sector 12 (Primary)</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#8a8e9e] text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          <span>Switch Account / Sign Out</span>
        </button>
      </main>
    </div>
  );
};
