export interface PriceItem {
  id: number;
  category: string;
  name: string;
  priceRange: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface EstimateRequest {
  name: string;
  phone: string;
  message?: string;
  image?: File | null;
}