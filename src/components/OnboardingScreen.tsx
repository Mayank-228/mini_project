import React, { useState } from 'react';
import { HireMeLogo } from './HireMeLogo';

interface OnboardingScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onGetStarted, onSignIn }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="w-full min-h-screen bg-[#f8f9fc] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between p-5 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Status Indicators */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2 bg-white border border-slate-200/90 px-3 py-1.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-semibold tracking-wider text-slate-700 uppercase">
            2,410+ Pros Online
          </span>
        </div>
        <div className="flex items-center space-x-1.5 bg-white border border-slate-200/90 px-3 py-1.5 rounded-full text-slate-600 text-[12px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <span className="material-symbols-outlined text-[15px] text-indigo-600">verified</span>
          <span>Top Rated 4.9/5</span>
        </div>
      </div>

      {/* Main Hero Showcase */}
      <div className="flex flex-col items-center text-center my-auto space-y-4 py-4">
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center p-2">
          <HireMeLogo size={48} />
        </div>

        {/* Feature Pill */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <span className="material-symbols-outlined text-[15px]">bolt</span>
          <span>Instant Gig & Home Services</span>
        </div>

        {/* Title */}
        <div className="space-y-2 max-w-sm">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
            Everyday help, <br />
            <span className="text-indigo-600">one tap away.</span>
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed px-4">
            Trusted help, right when you need it. High-velocity matching with vetted professionals in minutes.
          </p>
        </div>

        {/* 3 Value Proposition Cards */}
        <div className="grid grid-cols-3 gap-2.5 w-full pt-1">
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white border border-slate-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-indigo-300 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1.5">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <span className="text-xs text-slate-800 font-semibold">Verified</span>
            <span className="text-[10px] text-slate-400 mt-0.5 leading-tight">Background checked</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white border border-slate-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-indigo-300 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1.5">
              <span className="material-symbols-outlined text-[18px]">speed</span>
            </div>
            <span className="text-xs text-slate-800 font-semibold">Instant</span>
            <span className="text-[10px] text-slate-400 mt-0.5 leading-tight">&lt; 90s avg match</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white border border-slate-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-indigo-300 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1.5">
              <span className="material-symbols-outlined text-[18px]">shield</span>
            </div>
            <span className="text-xs text-slate-800 font-semibold">Escrow</span>
            <span className="text-[10px] text-slate-400 mt-0.5 leading-tight">100% guarantee</span>
          </div>
        </div>

        {/* Live Dispatch Preview Card */}
        <div className="w-full rounded-xl bg-white border border-slate-200/90 p-3.5 shadow-sm space-y-2.5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Live Dispatch
            </span>
            <span className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
              Surge active
            </span>
          </div>

          <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200/70 p-2.5 rounded-lg">
            <img
              className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200"
              alt="Elena Rostova"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvyyAUj2R6uSAtSBMIDeGzlPKw8w_of9CUiylu11ugL5aiG_SDRfGcwoKj5XbQtx3T88BfhCIFpVhP2R4B_YKLmGmnY_NCHwlbKiiu0f5ghIVpXPoqmePGYsqoW_w2xuvYxn-uEReUC7JqYlf5UG37dKB-hcoL5US03luXYGECG4QAQV1v2-sWM5_ER7vTYkE66duDG-8Mm0t061U0h1jb-UUnDBVMQfiqISCD56odpOqwtpxFGqOsPQ"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-semibold text-slate-900 truncate">Elena Rostova</span>
                <span className="material-symbols-outlined text-[14px] text-indigo-600">check_circle</span>
              </div>
              <p className="text-[10px] text-slate-500 truncate">Master Electrician • 0.4 mi away</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-900">
                $42<span className="text-[10px] text-slate-400 font-normal">/hr</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-1.5 py-0.5 rounded-full mt-0.5">
                Available
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <div className="flex -space-x-1.5 overflow-hidden items-center">
              <img
                className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover"
                alt="Pro 1"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLd7WmdQjy0DZXBCliEiQqyiia_BPsU_NR1iNSDwox7cFfAbJIvfufpaJYYps1dYWIB5h7cNHQCAZSJpCWEyJVOwYBUQEB57BHWU-HyUCKRvW33kASA21zWXShK8mhEUoSbX-eRolE3SSQ7KovnEKwlQrGrFVB57QW1gacs0H_dTJmvUXI08FjYRPvrNbMcPYwaJhz2CmmalMY1Ek8YeVn0jSz27YWljaEiW3Co1tL7C8Ymzl6tC_Lfw"
              />
              <img
                className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover"
                alt="Pro 2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV8s4QjHFMJOrC4QjVGIx71KKOMrxqiTej9m-XTbV30CGCOSgTVoFMXNTaOXMpFBil2EvKJ64LYPBJAjVaLWgTUT7FmOoqyrUMuW-nGNDRHJqu5OowAESjxf9s7AzloEbTXcR80wb5jYAx0C2Q8WujJNAVWj_YyC3ysjH4Js3UEEGZwoMZSCEj6UClOupQ3-pKDtoB7ee8oLjiTH0wVohaPXUDB90yh_8fN2AdBcs7M9ffT5QpdZkopw"
              />
              <img
                className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover"
                alt="Pro 3"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjtrG9mqs3d0mqWn9lSeVI9AtUKW2V7edPtYjW2y0pMgb_pWqTvXU78iXmsg9tJEILDO-eCMxXhDTbCZkG0sUIx2l4M1FD34ty4zTjO9aGgXM8UDrzeTFmjzyoPU7Me1j6vnXS4dHNd1p36qgbCuSEcKMc47YuJbKXbJfC0IxMcXrREFCXvK2sS-Gk8l4hiqQXjeijRNHjntB8tWPi27DWWgMPn1BdNLiqpU6yGBGuiTU3zWHG7O6GMQ"
              />
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-slate-100 text-[9px] text-slate-600 font-semibold ring-2 ring-white">
                +48
              </span>
            </div>
            <span className="text-[11px] text-slate-500">booked in your district today</span>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-1.5 py-1">
          <button
            onClick={() => setActiveSlide(0)}
            className={`h-1.5 rounded-full transition-all ${
              activeSlide === 0 ? 'w-5 bg-indigo-600' : 'w-1.5 bg-slate-200'
            }`}
          />
          <button
            onClick={() => setActiveSlide(1)}
            className={`h-1.5 rounded-full transition-all ${
              activeSlide === 1 ? 'w-5 bg-indigo-600' : 'w-1.5 bg-slate-200'
            }`}
          />
          <button
            onClick={() => setActiveSlide(2)}
            className={`h-1.5 rounded-full transition-all ${
              activeSlide === 2 ? 'w-5 bg-indigo-600' : 'w-1.5 bg-slate-200'
            }`}
          />
        </div>
      </div>

      {/* Bottom CTA Block */}
      <div className="flex flex-col space-y-2.5 pt-2">
        <button
          onClick={onGetStarted}
          className="w-full py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold shadow-sm active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
          type="button"
        >
          <span>Get Started</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <div className="flex items-center justify-center space-x-1.5">
          <span className="text-xs text-slate-500">Already have an account?</span>
          <button
            onClick={onSignIn}
            className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            type="button"
          >
            Sign In
          </button>
        </div>

        <p className="text-[10px] text-slate-400 text-center leading-tight">
          By continuing, you agree to HireMe's Terms of Service • Protected by Escrow Shield
        </p>
      </div>
    </div>
  );
};
