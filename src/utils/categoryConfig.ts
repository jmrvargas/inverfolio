import { CategoryField } from '../types/investment';

export const defaultCategoryFields: Record<string, CategoryField[]> = {
  crypto: [
    { name: 'currency', type: 'text', required: true },
    { name: 'storage', type: 'text', required: true },
  ],
  cash: [
    { name: 'expenses', type: 'number', required: false },
    { name: 'storage', type: 'text', required: true },
  ],
  bonds: [
    { name: 'issuer', type: 'text', required: true },
    { name: 'interestRate', type: 'number', required: true },
    { name: 'maturity', type: 'date', required: true },
  ],
  stocks: [
    { name: 'broker', type: 'text', required: true },
  ],
};

export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];