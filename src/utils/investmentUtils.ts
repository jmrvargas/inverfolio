import { Investment } from '../types/investment';

export const getCategoryData = (investments: Investment[], categories: string[]) => {
  return categories.map(category => ({
    name: category,
    value: investments
      .filter(inv => inv.category === category)
      .reduce((sum, inv) => sum + inv.amount, 0)
  }));
};

export const getMonthlyData = (investments: Investment[]) => {
  const monthlyData: Record<string, number> = {};
  investments.forEach(inv => {
    const month = new Date(inv.date).toLocaleString('default', { month: 'short' });
    monthlyData[month] = (monthlyData[month] || 0) + inv.amount;
  });
  return Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount
  }));
};