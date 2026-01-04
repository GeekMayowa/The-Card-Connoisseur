
import React, { useState } from 'react';
import { Card } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface AdminPanelProps {
  cards: Card[];
  onAdd: (card: Card) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ cards, onAdd, onDelete, onClose }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newImage, setNewImage] = useState('');
  const [aiTheme, setAiTheme] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleGeminiAssist = async () => {
    if (!aiTheme) return;
    setIsAiLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a creative director for a luxury stationery brand. Given the theme "${aiTheme}", suggest a sophisticated Card Title and a Category. Return strictly JSON with keys "title" and "category". Title should be poetic and upscale.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ["title", "category"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      if (data.title) setNewTitle(data.title);
      if (data.category) setNewCategory(data.category);
    } catch (error) {
      console.error("AI Error:", error);
      alert("The AI curator is resting. Please fill details manually.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCategory || !newImage) return;

    const newCard: Card = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      imageUrl: newImage
    };

    onAdd(newCard);
    setNewTitle('');
    setNewCategory('');
    setNewImage('');
    setAiTheme('');
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-12 border-b border-purple-50 pb-6">
        <div>
          <h2 className="text-4xl font-serif text-purple-950">Curation Studio</h2>
          <p className="text-purple-400 font-serif italic">Manage your bespoke collection</p>
        </div>
        <button onClick={onClose} className="text-purple-300 hover:text-purple-600 transition-colors uppercase text-xs tracking-widest font-black">
          Close Studio
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Form Section */}
        <section className="bg-white p-8 border border-purple-50 rounded-sm shadow-xl shadow-purple-50/50">
          <h3 className="text-sm uppercase tracking-[0.3em] text-purple-900 font-black mb-8 border-b border-purple-50 pb-4">Add New Design</h3>
          
          <div className="mb-10 bg-purple-50/50 p-6 rounded-sm border border-purple-100">
            <label className="block text-[10px] uppercase tracking-widest text-purple-400 font-black mb-3">AI Curation Assistant</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Describe a theme (e.g. Vintage Rose)"
                className="flex-grow bg-white border border-purple-100 px-4 py-2 text-sm font-serif outline-none focus:border-purple-600 transition-colors"
                value={aiTheme}
                onChange={e => setAiTheme(e.target.value)}
              />
              <button 
                onClick={handleGeminiAssist}
                disabled={isAiLoading}
                className="bg-purple-600 text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-purple-700 disabled:bg-purple-200 transition-colors flex items-center gap-2"
              >
                {isAiLoading ? 'Thinking...' : '✨ Suggest'}
              </button>
            </div>
          </div>

          <form onSubmit={handleAdd} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-purple-400 font-black mb-2">Design Title</label>
              <input 
                required
                type="text" 
                className="w-full border-b border-purple-100 py-2 font-serif text-xl outline-none focus:border-purple-600 transition-colors text-purple-950"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Poetic Title"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-purple-400 font-black mb-2">Category</label>
              <input 
                required
                type="text" 
                className="w-full border-b border-purple-100 py-2 font-serif text-xl outline-none focus:border-purple-600 transition-colors text-purple-950"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder="Collection Category"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-purple-400 font-black mb-2">Image URL</label>
              <input 
                required
                type="url" 
                className="w-full border-b border-purple-100 py-2 font-serif text-xl outline-none focus:border-purple-600 transition-colors text-purple-950"
                value={newImage}
                onChange={e => setNewImage(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <button className="w-full bg-purple-950 text-white py-4 font-serif text-lg tracking-widest uppercase hover:bg-black transition-all shadow-lg mt-4">
              Publish Design
            </button>
          </form>
        </section>

        {/* List Section */}
        <section>
          <h3 className="text-sm uppercase tracking-[0.3em] text-purple-900 font-black mb-8 border-b border-purple-50 pb-4">Live Inventory ({cards.length})</h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin">
            {cards.map(card => (
              <div key={card.id} className="flex items-center gap-6 p-4 border border-purple-50 bg-white group hover:border-purple-200 transition-colors">
                <img src={card.imageUrl} className="w-16 h-20 object-cover shadow-sm" alt="" />
                <div className="flex-grow">
                  <h4 className="font-serif text-lg text-purple-900 leading-none mb-1">{card.title}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">{card.category}</p>
                </div>
                <button 
                  onClick={() => onDelete(card.id)}
                  className="text-purple-100 hover:text-red-400 transition-colors p-2"
                  title="Remove from collection"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
