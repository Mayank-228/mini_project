import React, { useState } from 'react';
import { Pro } from '../types';

interface BookModalProps {
  pro: Pro | null;
  onClose: () => void;
  onConfirmBooking: (pro: Pro, timeSlot: string) => void;
}

export const BookModal: React.FC<BookModalProps> = ({ pro, onClose, onConfirmBooking }) => {
  const [selectedSlot, setSelectedSlot] = useState('Today, 3:30 PM (Immediate)');
  const [taskNotes, setTaskNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  if (!pro) return null;

  const slots = [
    'Today, 3:30 PM (Immediate)',
    'Today, 5:00 PM',
    'Tomorrow, 10:00 AM',
    'Tomorrow, 2:00 PM',
  ];

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingDone(true);
      setTimeout(() => {
        onConfirmBooking(pro, selectedSlot);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-slideUp border border-slate-200">
        {/* Drag handle */}
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src={pro.avatarUrl}
              alt={pro.name}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
            />
            <div>
              <div className="flex items-center gap-1">
                <h3 className="text-sm font-bold text-slate-900">{pro.name}</h3>
                <span className="material-symbols-outlined text-indigo-600 text-[15px]">verified</span>
              </div>
              <p className="text-xs text-slate-500">{pro.role}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-bold text-slate-900">{pro.rate}</span>
                <span className="text-[10px] text-amber-500 font-semibold flex items-center">
                  ★ {pro.rating}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {bookingDone ? (
          <div className="py-8 flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <span className="material-symbols-outlined text-[28px]">check_circle</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">Instant Booking Confirmed!</h4>
            <p className="text-xs text-slate-500 max-w-xs">
              {pro.name} has accepted the dispatch and is preparing their toolkit. Track their arrival in the Messages tab.
            </p>
          </div>
        ) : (
          <div className="py-3 space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Choose Dispatch Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSlot(s)}
                    className={`p-2 text-left rounded-xl text-xs font-medium border transition-all ${
                      selectedSlot === s
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Describe the task / issue
              </label>
              <textarea
                rows={2}
                value={taskNotes}
                onChange={(e) => setTaskNotes(e.target.value)}
                placeholder="e.g. Kitchen tap leak repair or general deep clean..."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-indigo-600 resize-none"
              />
            </div>

            {/* Escrow Guarantee Pill */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
              <span className="material-symbols-outlined text-indigo-600 text-[20px]">lock</span>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-slate-900 block">HireMe Escrow Protection</span>
                <span className="text-[10px] text-slate-500 block">
                  Payment is safely held in escrow until you approve the completed job.
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 disabled:opacity-75 transition-all"
            >
              {isProcessing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                  <span>Dispatching pro via Escrow...</span>
                </>
              ) : (
                <>
                  <span>Confirm Instant Dispatch ({pro.rate})</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
