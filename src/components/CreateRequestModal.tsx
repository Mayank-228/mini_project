import React, { useState } from 'react';
import { POPULAR_CATEGORIES } from '../data/mockData';

interface CreateRequestModalProps {
  onClose: () => void;
  onSubmitRequest: (service: string, budget: string) => void;
}

export const CreateRequestModal: React.FC<CreateRequestModalProps> = ({ onClose, onSubmitRequest }) => {
  const [selectedCategory, setSelectedCategory] = useState(POPULAR_CATEGORIES[0].name);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('₹450');
  const [urgency, setUrgency] = useState<'immediate' | 'flexible'>('immediate');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitRequest(selectedCategory, budget);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#161820] text-[#f1f3f9] rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#343847]">
        <div className="w-10 h-1 bg-[#343847] rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-[#282c39]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c4b5fd] text-[20px]">bolt</span>
            <h3 className="text-sm font-bold text-[#f1f3f9]">Create Service Request</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#232630] flex items-center justify-center text-[#9ba1b4] hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-3 space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-[#9ba1b4] block mb-1.5">
              Service Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {POPULAR_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`p-2 rounded-xl text-center text-xs border transition-all ${
                    selectedCategory === cat.name
                      ? 'border-[#4f46e5] bg-[#4f46e5]/20 text-white font-semibold'
                      : 'border-[#343847] bg-[#1b1e28] text-[#9ba1b4] hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] block mb-0.5">{cat.icon}</span>
                  <span className="truncate block text-[10px]">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#9ba1b4] block mb-1">
              Details & Location Notes
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., Bathroom sink pipe needs fixing, Sector 12..."
              className="w-full text-xs p-2.5 rounded-xl border border-[#343847] bg-[#0b0c12] text-white focus:outline-none focus:border-[#4f46e5] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#9ba1b4] block mb-1">
                Suggested Budget
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#343847] bg-[#0b0c12] text-white focus:outline-none focus:border-[#4f46e5]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#9ba1b4] block mb-1">
                Dispatch Urgency
              </label>
              <div className="flex rounded-xl bg-[#0b0c12] p-1 border border-[#343847]">
                <button
                  type="button"
                  onClick={() => setUrgency('immediate')}
                  className={`flex-1 py-1.5 text-[10px] rounded-lg font-semibold ${
                    urgency === 'immediate' ? 'bg-[#4f46e5] text-white' : 'text-[#9ba1b4]'
                  }`}
                >
                  Instant (&lt;15m)
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('flexible')}
                  className={`flex-1 py-1.5 text-[10px] rounded-lg font-semibold ${
                    urgency === 'flexible' ? 'bg-[#4f46e5] text-white' : 'text-[#9ba1b4]'
                  }`}
                >
                  Today
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-[#4f46e5] hover:bg-indigo-600 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition-all mt-2"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                <span>Broadcasting to Verified Pros...</span>
              </>
            ) : (
              <>
                <span>Broadcast Request ({budget})</span>
                <span className="material-symbols-outlined text-[16px]">bolt</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
