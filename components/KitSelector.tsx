
import React from 'react';
import { KitType } from '../types';
import { KIT_CONFIGS } from '../constants';

interface KitSelectorProps {
  onSelect: (type: KitType) => void;
}

export const KitSelector: React.FC<KitSelectorProps> = ({ onSelect }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-serif mb-8 italic text-[#2D2D2D]">Welcome to Our Card Catalogue</h2>
        <p className="text-xl text-stone-400 font-serif max-w-xl mx-auto leading-relaxed">
          Discover a sanctuary of fine paper and ink; explore our curated selection of bespoke cards designed for life’s most meaningful notes and heartwarming messages.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {(Object.entries(KIT_CONFIGS) as [KitType, typeof KIT_CONFIGS['standard']][]).map(([key, config]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="group relative bg-[#FDFCF8] border border-stone-200 p-16 rounded-sm text-left transition-all duration-700 hover:border-purple-300 hover:shadow-[0_40px_100px_-20px_rgba(124,58,237,0.06)] hover:-translate-y-2 overflow-hidden"
          >
            <div className="relative z-10">
              <div className="mb-8">
                <span className="text-[11px] uppercase tracking-[0.5em] text-purple-600 font-black">The {config.label}</span>
              </div>
              <h3 className="text-4xl font-serif mb-6 text-[#2D2D2D] leading-tight">{config.size} Bespoke Cards</h3>
              <p className="text-stone-400 mb-16 leading-relaxed font-serif italic text-lg pr-4">{config.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-4xl font-serif text-stone-900">{config.price}</span>
                <div className="w-16 h-16 border border-stone-200 rounded-full flex items-center justify-center transition-all duration-700 group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:shadow-xl">
                  <svg className="w-7 h-7 text-stone-400 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
