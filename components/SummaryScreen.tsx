
import React from 'react';
import { KitType, SelectionState, OrderDetails, Card } from '../types';
import { KIT_CONFIGS } from '../constants';

interface SummaryScreenProps {
  kitType: KitType;
  selections: SelectionState;
  orderDetails: OrderDetails;
  onReset: () => void;
  cards: Card[];
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({ kitType, selections, orderDetails, onReset, cards }) => {
  const config = KIT_CONFIGS[kitType!];
  
  // Resolve card titles from the dynamic inventory
  const selectedItems = Object.entries(selections).map(([id, count]) => {
    const card = cards.find(c => c.id === id);
    return { title: card?.title || 'Unknown Design', count };
  });

  const generateSummaryText = () => {
    let text = `ORDER SUMMARY: THE CARD CONNOISSEUR\n`;
    text += `====================================\n`;
    text += `Kit: ${config.label} (${config.size} cards)\n`;
    text += `Customer: ${orderDetails.name}\n`;
    text += `Email: ${orderDetails.email}\n`;
    text += `Shipping: ${orderDetails.address}\n\n`;
    text += `SELECTED CURATION:\n`;
    selectedItems.forEach(item => {
      text += `- ${item.count}x ${item.title}\n`;
    });
    return text;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSummaryText());
    alert('Your curation summary has been copied to clipboard.');
  };

  const mailtoLink = `mailto:curations@cardconnoisseur.com?subject=New Curation: ${orderDetails.name}&body=${encodeURIComponent(generateSummaryText())}`;

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn pb-24">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-purple-100">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-5xl font-serif mb-4 text-purple-950">Curation Finalized</h2>
        <p className="text-purple-400 italic font-serif text-xl">"A selection of true distinction, {orderDetails.name.split(' ')[0]}."</p>
      </div>

      <div className="bg-white border border-stone-200 rounded-sm p-10 md:p-14 mb-10 shadow-[0_30px_60px_-15px_rgba(45,45,45,0.05)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-purple-600 opacity-20"></div>
        <h3 className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-10 font-black pb-4 border-b border-stone-100">Curation Manifest</h3>
        
        <div className="space-y-6 mb-12">
          {selectedItems.map(item => (
            <div key={item.title} className="flex justify-between items-center text-lg font-serif">
              <span className="text-[#2D2D2D]">{item.title}</span>
              <span className="font-medium tabular-nums text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-sm font-sans">× {item.count}</span>
            </div>
          ))}
          <div className="pt-8 border-t border-stone-100 flex justify-between items-center">
            <span className="text-stone-300 text-sm uppercase tracking-widest font-bold">Volume Total</span>
            <span className="text-3xl font-serif text-[#2D2D2D]">{config.size} Cards</span>
          </div>
        </div>

        <div className="space-y-6 pt-8 border-t border-stone-100">
          <div>
            <span className="text-stone-300 block text-[10px] uppercase tracking-widest font-black mb-2">Shipment Destination</span>
            <p className="text-[#2D2D2D] font-serif text-lg leading-relaxed whitespace-pre-line">{orderDetails.address}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mb-16">
        <a 
          href={mailtoLink}
          className="flex-grow bg-[#2D2D2D] text-white text-center font-serif text-xl py-5 rounded-sm hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 tracking-widest uppercase"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Dispatch Order
        </a>
        <button 
          onClick={copyToClipboard}
          className="flex-grow border border-stone-200 text-[#2D2D2D] font-serif text-xl py-5 rounded-sm hover:bg-stone-50 transition-all flex items-center justify-center gap-3 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Record Order
        </button>
      </div>

      <button 
        onClick={onReset}
        className="w-full text-center text-stone-300 text-xs tracking-widest font-bold hover:text-purple-600 transition-colors uppercase underline underline-offset-8"
      >
        Initiate New Selection
      </button>
    </div>
  );
};
