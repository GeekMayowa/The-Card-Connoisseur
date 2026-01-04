
export type KitType = 'standard' | 'jumbo' | null;

export interface Card {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface OrderDetails {
  name: string;
  email: string;
  address: string;
}

export interface SelectionState {
  [cardId: string]: number;
}
