import React, { useState } from 'react';
import { defaultCategoryFields } from '../utils/categoryConfig';
import { useInvestments } from '../hooks/useInvestments';
import { InvestmentForm } from './InvestmentForm';
import { InvestmentList } from './InvestmentList';
import { InvestmentDistribution } from './charts/InvestmentDistribution';
import { MonthlyInvestments } from './charts/MonthlyInvestments';

export function Dashboard() {
  const { investments, addInvestment, deleteInvestment } = useInvestments();
  const [categories] = useState(Object.keys(defaultCategoryFields));
  const [categoryFields] = useState(defaultCategoryFields);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InvestmentDistribution investments={investments} categories={categories} />
        <MonthlyInvestments investments={investments} />
      </div>

      <InvestmentForm
        onSubmit={addInvestment}
        categoryFields={categoryFields}
        categories={categories}
      />

      <InvestmentList
        investments={investments}
        onDelete={deleteInvestment}
      />
    </div>
  );
}