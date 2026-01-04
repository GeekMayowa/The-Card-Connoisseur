
import React from 'react';
import { Card, SelectionState } from '../types';

interface CardGalleryProps {
  cards: Card[];
  selections: SelectionState;
  onUpdate: (id: string, delta: number) => void;
  onManualSet: (id: string, value: number) => void;
}

export const CardGallery: React.FC<CardGalleryProps> = ({ cards, selections, onUpdate, onManualSet }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-20 animate-fadeIn">
      {cards.map((card) => {
        const quantity = selections[card.id] || 0;
        return (
          <div key={card.id} className="group flex flex-col items-center">
            <div className="relative w-full aspect-[3/4] mb-10 overflow-hidden bg-white border border-stone-200 rounded-sm shadow-sm transition-all duration-1000 group-hover:shadow-2xl group-hover:border-purple-100 group-hover:-translate-y-3">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-purple-600/5 transition-opacity duration-700 ${quantity > 0 ? 'opacity-100' : 'opacity-0'}`} />
              
              {quantity > 0 && (
                <div className="absolute top-8 right-8 bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-serif italic shadow-2xl border-2 border-white animate-scaleIn">
                  {quantity}
                </div>
              )}
            </div>

            <div className="flex flex-col items-center w-full px-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-3 font-bold">{card.category}</span>
              <h3 className="text-2xl font-serif text-center mb-8 text-[#2D2D2D] tracking-tight">{card.title}</h3>
              
              <div className="flex items-center gap-6 bg-white border border-stone-100 rounded-full px-6 py-2 shadow-sm transition-all duration-700 hover:border-purple-200 hover:shadow-lg">
                <button
                  type="button"
                  onClick={() => onUpdate(card.id, -1)}
                  disabled={quantity === 0}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${quantity === 0 ? 'text-stone-100' : 'text-purple-600 hover:bg-purple-50'}`}
                >
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 12H4" />
                  </svg>
                </button>
                
                <input
                  type="number"
                  min="0"
                  max="125"
                  value={quantity === 0 ? '' : quantity}
                  placeholder="0"
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    onManualSet(card.id, isNaN(val) ? 0 : val);
                  }}
                  className="w-14 text-center text-2xl font-serif tabular-nums bg-transparent outline-none focus:text-purple-600 text-stone-900"
                />
                
                <button
                  type="button"
                  onClick={() => onUpdate(card.id, 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-purple-600 hover:bg-purple-50 transition-all active:scale-75"
                >
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
