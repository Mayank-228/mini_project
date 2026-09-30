import React, { useState } from 'react';
import { Conversation } from '../types';

interface MessagesScreenProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conv: Conversation) => void;
  onSendMessage: (convId: string, text: string) => void;
  onBack: () => void;
}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({
  conversations,
  activeConversation,
  onSelectConversation,
  onSendMessage,
  onBack,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;
    onSendMessage(activeConversation.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="w-full min-h-screen bg-[#0f1117] text-[#f1f3f9] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0f1117]/95 backdrop-blur-md border-b border-[#343847]/40 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {activeConversation ? (
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-[#1b1e28] flex items-center justify-center text-slate-300 hover:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
          ) : (
            <span className="material-symbols-outlined text-[#c4b5fd] text-[24px]">chat_bubble</span>
          )}
          <div>
            <h1 className="text-base font-bold text-white">
              {activeConversation ? activeConversation.name : 'Messages'}
            </h1>
            <span className="text-[10px] text-[#9ba1b4]">
              {activeConversation ? activeConversation.tag : 'Active task communications'}
            </span>
          </div>
        </div>

        {activeConversation && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => alert(`Calling ${activeConversation.name} via masked secure relay...`)}
              className="w-9 h-9 rounded-full bg-[#1b1e28] border border-[#343847] flex items-center justify-center text-emerald-400 hover:bg-[#232630]"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
            </button>
          </div>
        )}
      </header>

      {/* Body: Thread View or Inbox List */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col justify-between p-4">
          {/* Thread messages */}
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-210px)] pr-1">
            <div className="text-center py-2">
              <span className="text-[10px] text-[#8a8e9e] px-3 py-1 rounded-full bg-[#1b1e28] border border-[#343847]/40">
                End-to-end encrypted dispatch chat
              </span>
            </div>

            {activeConversation.messages.map((m, idx) => {
              const isMe = m.sender === 'user';
              return (
                <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-[#4f46e5] text-white rounded-br-xs'
                        : 'bg-[#1b1e28] border border-[#343847]/50 text-[#f1f3f9] rounded-bl-xs'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span
                      className={`text-[9px] block text-right mt-1 ${
                        isMe ? 'text-indigo-200' : 'text-[#8a8e9e]'
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="pt-3 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type message to pro..."
              className="flex-1 h-11 bg-[#1b1e28] border border-[#343847] text-white text-xs px-3.5 rounded-xl focus:outline-none focus:border-[#4f46e5]"
            />
            <button
              type="submit"
              className="w-11 h-11 rounded-xl bg-[#4f46e5] hover:bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="p-4 space-y-2.5">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => onSelectConversation(conv)}
              className="p-3.5 rounded-2xl bg-[#1b1e28] border border-[#343847]/40 hover:bg-[#232630] transition-colors flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full object-cover ring-1 ring-[#343847]"
                  alt={conv.name}
                  src={conv.avatarUrl}
                />
                {conv.status === 'online' && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#0f1117]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs text-white font-bold truncate">{conv.name}</h4>
                  <span className="text-[10px] text-[#8a8e9e]">{conv.time}</span>
                </div>
                <p className="text-xs text-[#9ba1b4] truncate mt-0.5">{conv.lastMessage}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#232630] text-[#9ba1b4] text-[10px] font-medium">
                    {conv.tag}
                  </span>
                </div>
              </div>

              {conv.unreadCount ? (
                <span className="w-5 h-5 rounded-full bg-[#4f46e5] text-white text-[10px] font-bold flex items-center justify-center">
                  {conv.unreadCount}
                </span>
              ) : (
                <span className="material-symbols-outlined text-[#8a8e9e] text-[18px]">chevron_right</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
