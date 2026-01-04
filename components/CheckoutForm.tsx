
import React, { useState } from 'react';
import { OrderDetails } from '../types';

interface CheckoutFormProps {
  onSubmit: (details: OrderDetails) => void;
  onBack: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<OrderDetails>({
    name: '',
    email: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-xl mx-auto animate-fadeIn py-10">
      <button 
        onClick={onBack}
        className="flex items-center text-xs uppercase tracking-widest text-purple-300 hover:text-purple-600 transition-colors mb-12 group font-bold"
      >
        <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Return to Curation
      </button>

      <h2 className="text-4xl font-serif mb-12 text-center text-purple-900">Delivery Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-purple-400 mb-3 font-black">Full Recipient Name</label>
          <input
            required
            type="text"
            id="name"
            className="w-full bg-white border border-purple-50 px-6 py-4 rounded-sm focus:ring-1 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all text-purple-900 font-serif text-lg placeholder:text-purple-100 shadow-sm"
            placeholder="Alexandra Sterling"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-purple-400 mb-3 font-black">Correspondence Email</label>
          <input
            required
            type="email"
            id="email"
            className="w-full bg-white border border-purple-50 px-6 py-4 rounded-sm focus:ring-1 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all text-purple-900 font-serif text-lg placeholder:text-purple-100 shadow-sm"
            placeholder="alexandra@sterling.com"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-[10px] uppercase tracking-[0.2em] text-purple-400 mb-3 font-black">Shipping Destination</label>
          <textarea
            required
            id="address"
            rows={4}
            className="w-full bg-white border border-purple-50 px-6 py-4 rounded-sm focus:ring-1 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all resize-none text-purple-900 font-serif text-lg placeholder:text-purple-100 shadow-sm"
            placeholder="123 Royal Terrace, Suite 400&#10;London, SW1A 1AA"
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-serif text-2xl py-6 rounded-sm hover:bg-purple-700 transition-all shadow-xl hover:shadow-purple-100 active:scale-[0.98] mt-6 tracking-widest uppercase"
        >
          Submit Curation
        </button>
      </form>
    </div>
  );
};
