import React, { useState } from 'react';
import { HireMeLogo } from './HireMeLogo';

interface AuthScreenProps {
  onSuccessLogin: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccessLogin }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [identifier, setIdentifier] = useState('mayankworks03@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [keepActive, setKeepActive] = useState(true);
  const [countryCode, setCountryCode] = useState('+91');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [authStatus, setAuthStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const countryCodes = ['+91 (India)', '+1 (USA)', '+44 (UK)', '+65 (Singapore)', '+971 (UAE)'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStatus('loading');
    setTimeout(() => {
      setAuthStatus('success');
      setTimeout(() => {
        onSuccessLogin();
      }, 800);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fc] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-center px-6 py-8 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="w-full max-w-sm mx-auto flex flex-col">
        {/* Top Brand & Header Section */}
        <div className="w-full flex flex-col items-center text-center pb-5">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center shadow-sm p-2">
              <HireMeLogo size={48} withBoltBadge />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/60 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="text-[10px] font-semibold text-slate-600 tracking-wider uppercase">
              On-Demand Gigs & Talent
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {isSignIn ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-xs text-slate-500 max-w-[260px] mt-1 leading-relaxed">
            {isSignIn
              ? 'Log in to find verified gigs & top local talent instantly.'
              : 'Sign up to hire top rated talent or find verified jobs nearby.'}
          </p>
        </div>

        {/* Segmented Pill Switcher */}
        <div className="w-full bg-slate-200/70 p-1 rounded-xl mb-5 flex items-center">
          <button
            onClick={() => setIsSignIn(true)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 ${
              isSignIn ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">login</span>
            <span>Sign In</span>
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 ${
              !isSignIn ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">person_add</span>
            <span>Register</span>
          </button>
        </div>

        {/* Main Form Card */}
        <div className="w-full bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
          <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
            {/* Input 1: Identifier (Email / Phone) */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700" htmlFor="auth-identifier">
                  Email or Phone
                </label>
                <span className="text-[11px] text-indigo-600 font-medium">SMS login ready</span>
              </div>
              <div className="relative flex items-center h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 transition-colors focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100">
                <button
                  type="button"
                  onClick={() => setShowCountryModal(!showCountryModal)}
                  className="flex items-center gap-0.5 pr-2 mr-2 border-r border-slate-200 hover:text-indigo-600"
                >
                  <span className="text-xs font-semibold text-slate-700">{countryCode}</span>
                  <span className="material-symbols-outlined text-slate-400 text-[15px]">expand_more</span>
                </button>

                {showCountryModal && (
                  <div className="absolute top-12 left-0 z-50 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-1">
                    {countryCodes.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setCountryCode(c.split(' ')[0]);
                          setShowCountryModal(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 rounded-lg"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}

                <input
                  id="auth-identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-transparent text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none min-w-0"
                  placeholder="name@work.com or 98765..."
                  required
                  type="text"
                />
                <span className="material-symbols-outlined text-slate-400 text-[18px] ml-1">badge</span>
              </div>
            </div>

            {/* Input 2: Password */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700" htmlFor="auth-password">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to registered email!')}
                  className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="flex items-center h-11 bg-slate-50 border border-slate-200 rounded-xl px-3 transition-colors focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100">
                <span className="material-symbols-outlined text-slate-400 text-[18px] mr-2">lock</span>
                <input
                  id="auth-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none min-w-0"
                  placeholder="••••••••••••"
                  required
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-700 transition-colors flex items-center justify-center focus:outline-none"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember / Status Quick Row */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  checked={keepActive}
                  onChange={(e) => setKeepActive(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  type="checkbox"
                />
                <span className="text-xs font-normal text-slate-600">Keep me active</span>
              </label>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Instant Gig Pass
              </span>
            </div>

            {/* Primary Submit Button */}
            <button
              disabled={authStatus === 'loading'}
              className="mt-1 w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-75"
              type="submit"
            >
              {authStatus === 'loading' ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                  <span>Verifying credentials...</span>
                </>
              ) : authStatus === 'success' ? (
                <>
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Authenticated!</span>
                </>
              ) : (
                <>
                  <span>{isSignIn ? 'Log In' : 'Create Account'}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full border-t border-slate-200"></div>
            <span className="absolute px-2.5 bg-white text-slate-400 text-[10px] font-semibold uppercase tracking-wider">
              or continue with
            </span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-3 gap-2">
            <button
              aria-label="Sign in with Google"
              onClick={() => {
                setAuthStatus('loading');
                setTimeout(() => {
                  setAuthStatus('success');
                  setTimeout(onSuccessLogin, 600);
                }, 700);
              }}
              className="h-10 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200/90 transition-colors flex items-center justify-center"
              type="button"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  d="M12 5c1.56 0 2.96.54 4.07 1.59l3.05-3.05C17.27 1.77 14.82 1 12 1 7.37 1 3.44 3.61 1.54 7.43l3.66 2.84C6.07 7.44 8.78 5 12 5z"
                  fill="#EA4335"
                ></path>
                <path
                  d="M23.49 12.27c0-.82-.07-1.61-.2-2.27H12v4.51h6.47c-.28 1.48-1.12 2.73-2.39 3.58l3.71 2.88c2.17-2 3.7-4.94 3.7-8.7z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M5.2 14.73c-.22-.67-.35-1.38-.35-2.12s.13-1.45.35-2.12L1.54 7.65C.56 9.61 0 11.75 0 14.09s.56 4.48 1.54 6.44l3.66-2.8z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 23c3.24 0 5.96-1.07 7.95-2.92l-3.71-2.88c-1.08.72-2.45 1.16-4.24 1.16-3.22 0-5.93-2.44-6.8-5.27L1.54 16.03C3.44 19.85 7.37 23 12 23z"
                  fill="#34A853"
                ></path>
              </svg>
            </button>

            <button
              aria-label="Sign in with Apple"
              onClick={() => {
                setAuthStatus('loading');
                setTimeout(() => {
                  setAuthStatus('success');
                  setTimeout(onSuccessLogin, 600);
                }, 700);
              }}
              className="h-10 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200/90 transition-colors flex items-center justify-center text-slate-800"
              type="button"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.77-8.14-12.24-15.17-5.86-9.19-10.45-19.8-13.78-31.84-3.33-12.04-5-23.13-5-33.28 0-14.18 3.57-25.77 10.72-34.78 7.15-9.01 16.05-13.59 26.7-13.74 5.37 0 11.02 1.48 16.96 4.43 5.94 2.95 9.77 4.48 11.49 4.48 1.48 0 5.48-1.59 12-4.77 6.52-3.18 12.31-4.59 17.38-4.23 13.56 1.05 24.31 6.53 32.26 16.44-11.83 7.15-17.61 17.06-17.34 29.74.27 9.87 4.04 18.06 11.31 24.58 7.27 6.52 16.05 10.37 26.34 11.55-2.22 6.78-4.73 13.25-7.53 19.41zM119.22 31.88c0-7.39 2.65-14.34 7.95-20.85 5.3-6.52 11.95-10.55 19.95-12.09.27 1.05.4 2.05.4 3.01 0 7.39-2.78 14.48-8.34 21.28-5.56 6.8-12.29 10.87-20.19 12.22-.27-1.19-.4-2.37-.4-3.57z"></path>
              </svg>
            </button>

            <button
              aria-label="Sign in with Phone OTP"
              onClick={() => {
                alert('6-digit OTP code sent to ' + countryCode + ' ' + identifier);
              }}
              className="h-10 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200/90 transition-colors flex items-center justify-center text-slate-700"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">smartphone</span>
            </button>
          </div>
        </div>

        {/* Micro Highlights */}
        <div className="w-full mt-4 px-2 flex items-center justify-around text-center">
          <div className="flex items-center gap-1 text-slate-500 text-[11px] font-medium">
            <span className="material-symbols-outlined text-slate-400 text-[15px]">verified_user</span>
            <span>100% Verified</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <div className="flex items-center gap-1 text-slate-500 text-[11px] font-medium">
            <span className="material-symbols-outlined text-slate-400 text-[15px]">bolt</span>
            <span>60s Hiring</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <div className="flex items-center gap-1 text-slate-500 text-[11px] font-medium">
            <span className="material-symbols-outlined text-slate-400 text-[15px]">lock_clock</span>
            <span>Escrow Pay</span>
          </div>
        </div>

        {/* Bottom Registration Prompt */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            {isSignIn ? 'New to HireMe?' : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 ml-0.5 inline-flex items-center gap-0.5"
              type="button"
            >
              {isSignIn ? 'Create an account' : 'Sign In'}
              <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
