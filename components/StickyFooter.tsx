
import React from 'react';

interface StickyFooterProps {
  total: number;
  target: number;
  onContinue: () => void;
}

export const StickyFooter: React.FC<StickyFooterProps> = ({ total, target, onContinue }) => {
  const percentage = Math.min((total / target) * 100, 100);
  const isComplete = total === target;
  const isExceeded = total > target;
  const remaining = target - total;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-8 md:p-10 bg-[#FDFCF8]/95 backdrop-blur-xl border-t border-stone-200 shadow-[0_-20px_50px_-15px_rgba(45,45,45,0.05)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-grow w-full max-w-2xl">
          <div className="flex justify-between items-end mb-4">
            <div className="flex flex-col">
              <span className={`text-[11px] font-black tracking-[0.3em] uppercase mb-1 ${isExceeded ? 'text-red-500' : 'text-stone-400'}`}>
                {isExceeded ? 'Volume Exceeded' : isComplete ? 'Curation Perfected' : 'Curating Your Selection'}
              </span>
              <p className="text-lg text-[#2D2D2D] font-serif italic">
                {isExceeded 
                  ? `Kindly remove ${Math.abs(remaining)} design${Math.abs(remaining) !== 1 ? 's' : ''} to match the ${target}-card standard.` 
                  : isComplete 
                    ? `Your curation of ${target} cards is balanced and ready.` 
                    : `Please curate ${remaining} additional card${remaining !== 1 ? 's' : ''} to complete your set.`}
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-serif tabular-nums text-stone-900">
                <span className={isExceeded ? 'text-red-500 font-bold' : isComplete ? 'text-purple-600 font-bold' : 'text-[#2D2D2D]'}>{total}</span>
                <span className="text-stone-200 mx-3">/</span>
                <span className="text-stone-400">{target}</span>
              </span>
            </div>
          </div>
          
          <div className="h-[2px] w-full bg-stone-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${isExceeded ? 'bg-red-400' : 'bg-purple-600'}`} 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <button
          onClick={onContinue}
          disabled={!isComplete}
          className={`px-16 py-6 rounded-sm font-serif text-2xl tracking-[0.1em] transition-all duration-700 w-full md:w-auto uppercase shadow-sm ${
            isComplete 
            ? 'bg-[#2D2D2D] text-[#FDFCF8] hover:bg-black active:scale-95' 
            : 'bg-stone-50 text-stone-200 cursor-not-allowed border border-stone-100'
          }`}
        >
          Confirm Curation
        </button>
      </div>
    </div>
  );
};
