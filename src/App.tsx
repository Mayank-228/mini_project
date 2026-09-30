import React, { useState } from 'react';
import { ScreenType, Pro, Conversation } from './types';
import { INITIAL_CONVERSATIONS } from './data/mockData';
import { HomeScreen } from './components/HomeScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { AuthScreen } from './components/AuthScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BookModal } from './components/BookModal';
import { CreateRequestModal } from './components/CreateRequestModal';
import { FlutterCodeViewer } from './components/FlutterCodeViewer';
import { LocalSetupModal } from './components/LocalSetupModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedProForBooking, setSelectedProForBooking] = useState<Pro | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const [showFlutterCodeViewer, setShowFlutterCodeViewer] = useState(false);
  const [showLocalSetupModal, setShowLocalSetupModal] = useState(false);
  const [deviceFrame, setDeviceFrame] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = (convId: string, text: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          const updatedMessages = [
            ...c.messages,
            { sender: 'user' as const, text, timestamp: timeStr },
          ];
          const updatedConv = {
            ...c,
            lastMessage: text,
            time: 'Just now',
            messages: updatedMessages,
          };
          if (activeConversation?.id === convId) {
            setActiveConversation(updatedConv);
          }
          return updatedConv;
        }
        return c;
      })
    );

    // Simulate pro auto-reply
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === convId) {
            const replyMsg = {
              sender: 'pro' as const,
              text: 'Got it! I am reviewing the address and will update you shortly.',
              timestamp: 'Just now',
            };
            const updated = {
              ...c,
              lastMessage: replyMsg.text,
              messages: [...c.messages, replyMsg],
            };
            if (activeConversation?.id === convId) {
              setActiveConversation(updated);
            }
            return updated;
          }
          return c;
        })
      );
    }, 1500);
  };

  const handleConfirmBooking = (pro: Pro, timeSlot: string) => {
    showToast(`Booked ${pro.name} for ${timeSlot}!`);
    // Add to conversations if not exists
    const existing = conversations.find((c) => c.name === pro.name);
    if (!existing) {
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        name: pro.name,
        avatarUrl: pro.avatarUrl,
        lastMessage: `Dispatch request confirmed for ${timeSlot}`,
        time: 'Just now',
        tag: `${pro.category} Job #491`,
        status: 'online',
        unreadCount: 1,
        messages: [
          {
            sender: 'pro',
            text: `Hi! Thank you for choosing me. I am on schedule for ${timeSlot}. Feel free to share any entry codes or landmarks!`,
            timestamp: 'Just now',
          },
        ],
      };
      setConversations([newConv, ...conversations]);
    }
  };

  const isDarkCurrentScreen = currentScreen === 'home' || currentScreen === 'messages' || currentScreen === 'profile';

  return (
    <div className="min-h-screen bg-[#07080c] text-white flex flex-col items-center justify-start p-0 sm:py-6 selection:bg-[#4f46e5] selection:text-white">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 z-50 bg-[#1e2230] border border-[#4f46e5] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce text-xs font-semibold">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Flutter Pro Bar (Screen Switcher & Flutter Code Inspector Trigger) */}
      <header className="w-full max-w-2xl px-4 py-2 mb-2 flex items-center justify-between gap-2 text-xs">
        {/* Direct Screen Navigation Pills */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 mr-1 hidden sm:inline">
            Screens:
          </span>
          <button
            onClick={() => {
              setCurrentScreen('home');
              setActiveConversation(null);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              currentScreen === 'home'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'bg-[#1b1e28] text-slate-300 hover:text-white'
            }`}
          >
            1. Home (Dark)
          </button>
          <button
            onClick={() => {
              setCurrentScreen('onboarding');
              setActiveConversation(null);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              currentScreen === 'onboarding'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'bg-[#1b1e28] text-slate-300 hover:text-white'
            }`}
          >
            2. Onboarding
          </button>
          <button
            onClick={() => {
              setCurrentScreen('auth');
              setActiveConversation(null);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              currentScreen === 'auth'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'bg-[#1b1e28] text-slate-300 hover:text-white'
            }`}
          >
            3. Sign In / Auth
          </button>
          <button
            onClick={() => {
              setCurrentScreen('explore');
              setActiveConversation(null);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              currentScreen === 'explore'
                ? 'bg-[#4f46e5] text-white shadow-xs'
                : 'bg-[#1b1e28] text-slate-300 hover:text-white'
            }`}
          >
            4. Explore Categories
          </button>
        </div>

        {/* Flutter Source & Frame Mode */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => setShowLocalSetupModal(true)}
            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1 shadow-xs transition-colors"
            title="Download code and run locally"
          >
            <span className="material-symbols-outlined text-[15px]">download</span>
            <span className="hidden sm:inline">Get Code</span>
          </button>

          <button
            onClick={() => setShowFlutterCodeViewer(true)}
            className="px-2.5 py-1 rounded-lg bg-[#02569B] hover:bg-[#0369a1] text-white font-semibold flex items-center gap-1 shadow-xs transition-colors"
            title="Inspect Flutter Dart files"
          >
            <span className="material-symbols-outlined text-[15px]">code</span>
            <span className="hidden sm:inline">Flutter Code</span>
          </button>

          <button
            onClick={() => setDeviceFrame(!deviceFrame)}
            className="w-8 h-8 rounded-lg bg-[#1b1e28] border border-[#343847] flex items-center justify-center text-slate-300 hover:text-white"
            title="Toggle Device Frame"
          >
            <span className="material-symbols-outlined text-[16px]">
              {deviceFrame ? 'smartphone' : 'fit_screen'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Device Frame or Responsive Viewport Container */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceFrame
            ? 'max-w-[420px] rounded-[44px] shadow-[0_0_60px_rgba(0,0,0,0.85)] border-[8px] border-[#222533] overflow-hidden relative'
            : 'max-w-2xl rounded-2xl shadow-xl border border-[#232630] overflow-hidden relative'
        }`}
      >
        {/* Mobile Device Top Notch / Dynamic Island */}
        {deviceFrame && (
          <div className="sticky top-0 z-50 h-7 bg-black flex items-center justify-between px-7 text-[11px] font-semibold text-white/90">
            <span>9:41</span>
            <div className="w-20 h-4 bg-black rounded-full border border-white/10 flex items-center justify-end px-2">
              <span className="w-2 h-2 rounded-full bg-slate-900 border border-white/20"></span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">signal_cellular_4_bar</span>
              <span className="material-symbols-outlined text-[13px]">wifi</span>
              <span className="material-symbols-outlined text-[14px]">battery_full</span>
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div className="min-h-[820px] relative">
          {currentScreen === 'home' && (
            <HomeScreen
              onSelectPro={(pro) => setSelectedProForBooking(pro)}
              onOpenConversation={(conv) => {
                setActiveConversation(conv);
                setCurrentScreen('messages');
              }}
              onCreateRequest={() => setShowCreateRequest(true)}
              onNavigateToExplore={() => setCurrentScreen('explore')}
            />
          )}

          {currentScreen === 'onboarding' && (
            <OnboardingScreen
              onGetStarted={() => setCurrentScreen('explore')}
              onSignIn={() => setCurrentScreen('auth')}
            />
          )}

          {currentScreen === 'auth' && (
            <AuthScreen
              onSuccessLogin={() => {
                showToast('Welcome back! Signed in successfully.');
                setCurrentScreen('home');
              }}
            />
          )}

          {currentScreen === 'explore' && (
            <ExploreScreen
              onSelectPro={(pro) => setSelectedProForBooking(pro)}
              onOpenChatWithPro={(pro) => {
                const existing = conversations.find((c) => c.name === pro.name);
                if (existing) {
                  setActiveConversation(existing);
                } else {
                  const newConv: Conversation = {
                    id: `conv-${Date.now()}`,
                    name: pro.name,
                    avatarUrl: pro.avatarUrl,
                    lastMessage: 'Started direct conversation',
                    time: 'Just now',
                    tag: `${pro.category} Inquiry`,
                    status: 'online',
                    messages: [
                      { sender: 'pro', text: `Hi! Thanks for reaching out. How can I help you today?`, timestamp: 'Just now' },
                    ],
                  };
                  setConversations([newConv, ...conversations]);
                  setActiveConversation(newConv);
                }
                setCurrentScreen('messages');
              }}
              onQuickCall={() => {
                showToast('Connecting you to emergency dispatch hotline in 12s...');
              }}
            />
          )}

          {currentScreen === 'messages' && (
            <MessagesScreen
              conversations={conversations}
              activeConversation={activeConversation}
              onSelectConversation={(conv) => setActiveConversation(conv)}
              onSendMessage={handleSendMessage}
              onBack={() => setActiveConversation(null)}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              onLogout={() => {
                showToast('Signed out from current session');
                setCurrentScreen('auth');
              }}
              onNavigateToCode={() => setShowFlutterCodeViewer(true)}
            />
          )}
        </div>

        {/* Global Bottom Navigation Bar (Home, Explore, Messages, Profile) */}
        {currentScreen !== 'onboarding' && currentScreen !== 'auth' && (
          <nav
            className={`fixed sm:absolute bottom-0 inset-x-0 z-40 h-16 border-t backdrop-blur-md transition-colors ${
              isDarkCurrentScreen
                ? 'bg-[#0f1117]/95 border-[#343847]/40 text-[#9ba1b4]'
                : 'bg-white/95 border-slate-200/90 text-slate-500'
            }`}
          >
            <div className="flex justify-around items-center h-full max-w-md mx-auto px-4">
              {/* Home */}
              <button
                onClick={() => {
                  setCurrentScreen('home');
                  setActiveConversation(null);
                }}
                className={`flex flex-col items-center justify-center min-w-[54px] h-12 rounded-xl transition-all gap-0.5 ${
                  currentScreen === 'home'
                    ? isDarkCurrentScreen
                      ? 'text-white font-bold'
                      : 'text-[#4f46e5] font-bold'
                    : 'hover:text-white'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={currentScreen === 'home' ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  home
                </span>
                <span className="text-[10px]">Home</span>
              </button>

              {/* Explore */}
              <button
                onClick={() => {
                  setCurrentScreen('explore');
                  setActiveConversation(null);
                }}
                className={`flex flex-col items-center justify-center min-w-[54px] h-12 rounded-xl transition-all gap-0.5 ${
                  currentScreen === 'explore'
                    ? isDarkCurrentScreen
                      ? 'text-white font-bold'
                      : 'text-[#4f46e5] font-bold'
                    : 'hover:text-white'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={currentScreen === 'explore' ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  explore
                </span>
                <span className="text-[10px]">Explore</span>
              </button>

              {/* Messages */}
              <button
                onClick={() => setCurrentScreen('messages')}
                className={`relative flex flex-col items-center justify-center min-w-[54px] h-12 rounded-xl transition-all gap-0.5 ${
                  currentScreen === 'messages'
                    ? isDarkCurrentScreen
                      ? 'text-white font-bold'
                      : 'text-[#4f46e5] font-bold'
                    : 'hover:text-white'
                }`}
              >
                <div className="relative">
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={currentScreen === 'messages' ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    chat_bubble
                  </span>
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-current"></span>
                </div>
                <span className="text-[10px]">Messages</span>
              </button>

              {/* Profile */}
              <button
                onClick={() => {
                  setCurrentScreen('profile');
                  setActiveConversation(null);
                }}
                className={`flex flex-col items-center justify-center min-w-[54px] h-12 rounded-xl transition-all gap-0.5 ${
                  currentScreen === 'profile'
                    ? isDarkCurrentScreen
                      ? 'text-white font-bold'
                      : 'text-[#4f46e5] font-bold'
                    : 'hover:text-white'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={currentScreen === 'profile' ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  person
                </span>
                <span className="text-[10px]">Profile</span>
              </button>
            </div>
          </nav>
        )}
      </div>

      {/* Book Pro Modal */}
      {selectedProForBooking && (
        <BookModal
          pro={selectedProForBooking}
          onClose={() => setSelectedProForBooking(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Create Request Modal */}
      {showCreateRequest && (
        <CreateRequestModal
          onClose={() => setShowCreateRequest(false)}
          onSubmitRequest={(service, budget) => {
            showToast(`Broadcasted new request for ${service} (${budget}) to 184 local pros!`);
          }}
        />
      )}

      {/* Flutter Project Code Inspector Modal */}
      {showFlutterCodeViewer && (
        <FlutterCodeViewer
          onClose={() => setShowFlutterCodeViewer(false)}
          onOpenSetupGuide={() => setShowLocalSetupModal(true)}
        />
      )}

      {/* Local Setup & Download Modal */}
      {showLocalSetupModal && (
        <LocalSetupModal
          onClose={() => setShowLocalSetupModal(false)}
          onOpenCodeViewer={() => setShowFlutterCodeViewer(true)}
        />
      )}
    </div>
  );
}
