import React from 'react';
import { PieChart } from 'lucide-react';
import { getCategoryMeta, formatCurrency } from '../constants';

export default function ExpenseBreakdown({ transactions }) {
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');
  const totalExpense = expenseTransactions.reduce((acc, t) => acc + Number(t.amount || 0), 0);

  // Group by category
  const categoryTotals = expenseTransactions.reduce((acc, t) => {
    const cat = t.category || 'Other';
    acc[cat] = (acc[cat] || 0) + Number(t.amount || 0);
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpense > 0 ? ((amount / totalExpense) * 100).toFixed(1) : 0,
      meta: getCategoryMeta(category),
    }))
    .sort((a, b) => b.amount - a.amount);

  if (sortedCategories.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <h2 className="card-title">
        <PieChart size={20} color="var(--primary)" />
        Expense Breakdown
      </h2>

      <div>
        {sortedCategories.map(({ category, amount, percentage, meta }) => (
          <div key={category} className="category-item">
            <div className="category-header">
              <span>
                {meta.emoji} {category}
              </span>
              <span>
                <strong>{formatCurrency(amount)}</strong> ({percentage}%)
              </span>
            </div>
            <div className="progress-bg">
              <div
                className="progress-bar"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: meta.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
