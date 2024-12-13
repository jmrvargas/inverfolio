export type InvestmentCategory = 'crypto' | 'cash' | 'bonds' | 'stocks' | string;

export interface Investment {
  id: string;
  userId: string;
  category: InvestmentCategory;
  amount: number;
  date: Date;
  fields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryField {
  name: string;
  type: 'text' | 'number' | 'date';
  required: boolean;
}