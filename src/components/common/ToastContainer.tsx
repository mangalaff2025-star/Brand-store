import React from 'react';
import { X, CheckCircle2, Sparkles, Info } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isGold = toast.type === 'gold';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xs shadow-xl flex items-center justify-between gap-3 text-xs border transition-all transform animate-in slide-in-from-bottom duration-200 ${
              isGold
                ? 'bg-[#12372A] text-[#F8F5ED] border-[#C6A15B]/50'
                : isInfo
                ? 'bg-white text-[#12372A] border-[#A8BFA8]/50'
                : 'bg-[#12372A] text-white border-[#2F6B4F]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isGold ? (
                <Sparkles className="w-4 h-4 text-[#C6A15B] shrink-0" />
              ) : isInfo ? (
                <Info className="w-4 h-4 text-[#2F6B4F] shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span className="leading-snug">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white p-1"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
