
import React, { useState, useMemo, useEffect } from 'react';
import { KitType, SelectionState, OrderDetails, Card } from './types';
import { CARDS as INITIAL_CARDS, KIT_CONFIGS } from './constants';
import { KitSelector } from './components/KitSelector';
import { CardGallery } from './components/CardGallery';
import { CheckoutForm } from './components/CheckoutForm';
import { SummaryScreen } from './components/SummaryScreen';
import { StickyFooter } from './components/StickyFooter';
import { AdminPanel } from './components/AdminPanel';

// NOTE: Set your Google Apps Script URL here once deployed
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

const App: React.FC = () => {
  const [step, setStep] = useState<'kit-selection' | 'gallery' | 'checkout' | 'summary' | 'admin'>('kit-selection');
  const [kitType, setKitType] = useState<KitType>(null);
  const [selections, setSelections] = useState<SelectionState>({});
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({ name: '', email: '', address: '' });
  
  const [cards, setCards] = useState<Card[]>(() => {
    const saved = localStorage.getItem('bespoke_cards');
    return saved ? JSON.parse(saved) : INITIAL_CARDS;
  });

  useEffect(() => {
    localStorage.setItem('bespoke_cards', JSON.stringify(cards));
  }, [cards]);

  const totalSelected = useMemo(() => {
    return Object.values(selections).reduce((sum: number, count: number) => sum + count, 0);
  }, [selections]);

  const targetSize = kitType ? KIT_CONFIGS[kitType].size : 0;

  const handleKitSelect = (type: KitType) => {
    setKitType(type);
    setStep('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateQuantity = (cardId: string, delta: number) => {
    setSelections(prev => {
      const current = prev[cardId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [cardId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [cardId]: next };
    });
  };

  const manualSetQuantity = (cardId: string, value: number) => {
    setSelections(prev => {
      const next = Math.max(0, value);
      if (next === 0) {
        const { [cardId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [cardId]: next };
    });
  };

  const handleCheckoutSubmit = async (details: OrderDetails) => {
    setOrderDetails(details);
    
    // Prepare Data for Google Sheet with high-readability formatting
    const manifest = Object.entries(selections)
      .map(([id, count]) => {
        const card = cards.find(c => c.id === id);
        return `${count}x ${card?.title || 'Unknown Card'}`;
      })
      .join(', ');

    const payload = {
      date: new Date().toLocaleString(),
      customerName: details.name,
      email: details.email,
      address: details.address,
      packSize: kitType === 'standard' ? '60 Cards' : '125 Cards',
      manifest: manifest
    };

    if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } catch (e) {
            console.error("Failed to sync with Google Sheet", e);
        }
    }

    setStep('summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetSelection = () => {
    setKitType(null);
    setSelections({});
    setStep('kit-selection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-purple-100">
      <header className="py-16 text-center border-b border-stone-200 bg-[#FDFCF8]/95 backdrop-blur-sm sticky top-0 z-40">
        <h1 
          className="text-5xl md:text-6xl font-serif mb-4 tracking-tight cursor-pointer text-[#2D2D2D] hover:text-purple-900 transition-colors" 
          onClick={resetSelection}
        >
          The Card Connoisseur
        </h1>
        <p className="text-[11px] uppercase tracking-[0.6em] text-stone-400 font-semibold">A Curated Collection of Handcrafted Cards for Life's Most Notable Moments</p>
      </header>

      <main className="flex-grow container mx-auto px-6 py-20 max-w-6xl">
        {step === 'admin' && (
          <AdminPanel 
            cards={cards} 
            onAdd={(c) => setCards(prev => [c, ...prev])} 
            onDelete={(id) => setCards(prev => prev.filter(c => c.id !== id))} 
            onClose={() => setStep('kit-selection')} 
          />
        )}

        {step === 'kit-selection' && (
          <KitSelector onSelect={handleKitSelect} />
        )}

        {step === 'gallery' && (
          <div className="pb-40">
            <div className="mb-24 text-center animate-fadeIn">
              <h2 className="text-4xl font-serif mb-6 text-[#2D2D2D]">Assemble Your Collection</h2>
              <div className="flex items-center justify-center gap-4">
                <span className="h-[1px] w-12 bg-stone-200"></span>
                <p className="text-stone-500 italic font-serif text-xl">
                  {KIT_CONFIGS[kitType!].label}; Select {targetSize} Cards
                </p>
                <span className="h-[1px] w-12 bg-stone-200"></span>
              </div>
            </div>
            <CardGallery 
              cards={cards} 
              selections={selections} 
              onUpdate={updateQuantity} 
              onManualSet={manualSetQuantity}
            />
          </div>
        )}

        {step === 'checkout' && (
          <CheckoutForm 
            onSubmit={handleCheckoutSubmit} 
            onBack={() => setStep('gallery')} 
          />
        )}

        {step === 'summary' && (
          <SummaryScreen 
            kitType={kitType!} 
            selections={selections} 
            orderDetails={orderDetails} 
            onReset={resetSelection} 
            cards={cards}
          />
        )}
      </main>

      {step === 'gallery' && (
        <StickyFooter 
          total={totalSelected} 
          target={targetSize} 
          onContinue={() => setStep('checkout')} 
        />
      )}

      <footer className="py-24 border-t border-stone-200 text-center">
        <p className="text-stone-300 text-[10px] tracking-[0.4em] uppercase font-black mb-6 italic">Since MMXXIV</p>
        <p className="text-stone-500 text-sm font-serif italic max-w-md mx-auto leading-relaxed mb-16">
          "A letter is a piece of your soul sent across the miles."
        </p>
        
        <button 
          onClick={() => setStep('admin')}
          className="text-stone-200 text-[9px] font-bold tracking-widest uppercase hover:text-purple-400 transition-colors"
        >
          &copy; Admin Access Studio
        </button>
      </footer>
    </div>
  );
};

export default App;
