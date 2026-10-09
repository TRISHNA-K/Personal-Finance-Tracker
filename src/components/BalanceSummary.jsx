import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { formatCurrency } from '../constants';

export default function BalanceSummary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const balance = income - expense;

  return (
    <section className="stats-grid">
      {/* Total Balance Card */}
      <div className="stat-card balance">
        <div>
          <div className="stat-label">Total Balance</div>
          <div className="stat-amount">
            {formatCurrency(balance)}
          </div>
        </div>
        <div className="stat-icon-box">
          <DollarSign size={26} />
        </div>
      </div>

      {/* Total Income Card */}
      <div className="stat-card">
        <div>
          <div className="stat-label">Total Income</div>
          <div className="stat-amount income">
            +{formatCurrency(income)}
          </div>
        </div>
        <div className="stat-icon-box income">
          <ArrowUpRight size={26} />
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="stat-card">
        <div>
          <div className="stat-label">Total Expenses</div>
          <div className="stat-amount expense">
            -{formatCurrency(expense)}
          </div>
        </div>
        <div className="stat-icon-box expense">
          <ArrowDownLeft size={26} />
        </div>
      </div>
    </section>
  );
}
