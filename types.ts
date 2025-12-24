
export interface PricingResult {
  area: number;
  pricePerM2: number;
  totalCost: number;
  discountPercentage: number;
  savings: number;
}

export interface ChartDataPoint {
  area: number;
  pricePerM2: number;
  totalCost: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
