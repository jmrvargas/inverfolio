import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Investment, CategoryField } from '../types/investment';

interface InvestmentFormProps {
  onSubmit: (investment: Partial<Investment>) => void;
  categoryFields: Record<string, CategoryField[]>;
  categories: string[];
}

export function InvestmentForm({ onSubmit, categoryFields, categories }: InvestmentFormProps) {
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState('');
  const [fields, setFields] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      category,
      amount: parseFloat(amount),
      fields,
      date: new Date(),
    });
    setAmount('');
    setFields({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Add New Investment</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        {categoryFields[category]?.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">
              {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
            </label>
            <input
              type={field.type}
              value={fields[field.name] || ''}
              onChange={(e) => setFields({ ...fields, [field.name]: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required={field.required}
            />
          </div>
        ))}

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Investment
        </button>
      </div>
    </form>
  );
}