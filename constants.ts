
import { Card } from './types';

export const CARDS: Card[] = [
  { id: '1', title: 'Birthday Sparkle', category: 'Celebration', imageUrl: 'https://picsum.photos/seed/card1/600/800' },
  { id: '2', title: 'Minimalist Thank You', category: 'Gratitude', imageUrl: 'https://picsum.photos/seed/card2/600/800' },
  { id: '3', title: 'Abstract Celebration', category: 'General', imageUrl: 'https://picsum.photos/seed/card3/600/800' },
  { id: '4', title: 'Midnight Botanical', category: 'Flora', imageUrl: 'https://picsum.photos/seed/card4/600/800' },
  { id: '5', title: 'Golden Hour Notes', category: 'Personal', imageUrl: 'https://picsum.photos/seed/card5/600/800' },
  { id: '6', title: 'Classic Sympathy', category: 'Support', imageUrl: 'https://picsum.photos/seed/card6/600/800' },
  { id: '7', title: 'Whimsical Welcome', category: 'Newborn', imageUrl: 'https://picsum.photos/seed/card7/600/800' },
  { id: '8', title: 'Modern Monogram', category: 'Professional', imageUrl: 'https://picsum.photos/seed/card8/600/800' },
  { id: '9', title: 'Serene Landscape', category: 'Scenic', imageUrl: 'https://picsum.photos/seed/card9/600/800' },
  { id: '10', title: 'Velvet Anniversary', category: 'Love', imageUrl: 'https://picsum.photos/seed/card10/600/800' },
];

export const KIT_CONFIGS = {
  standard: {
    label: 'Standard Pack',
    size: 60,
    price: '$120',
    description: 'Perfect for the casual correspondent. A curated set for all major life moments.'
  },
  jumbo: {
    label: 'Jumbo Pack',
    size: 125,
    price: '$225',
    description: 'For the ultimate connoisseur. Never be without the perfect card again.'
  }
};
