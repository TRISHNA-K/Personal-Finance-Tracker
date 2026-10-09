import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { getCategoryMeta, formatCurrency, formatDate } from '../constants';

export default function TransactionItem({ transaction, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const meta = getCategoryMeta(transaction.category);
  const isIncome = transaction.type === 'income';

  const handleDelete = async () => {
    if (window.confirm(`Delete "${transaction.title}"?`)) {
      setIsDeleting(true);
      try {
        await onDelete(transaction._id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`transaction-card ${isIncome ? 'income' : 'expense'}`}>
      <div className="transaction-left">
        <div
          className="category-icon-bubble"
          style={{
            backgroundColor: `${meta.color}20`,
            border: `1px solid ${meta.color}40`,
          }}
          title={transaction.category}
        >
          {meta.emoji}
        </div>
        <div>
          <h4 className="transaction-title">{transaction.title}</h4>
          <div className="transaction-subtitle">
            <span>{transaction.category}</span>
            <span>•</span>
            <span>{formatDate(transaction.date)}</span>
          </div>
        </div>
      </div>

      <div className="transaction-right">
        <span className={`transaction-amount ${isIncome ? 'income' : 'expense'}`}>
          {isIncome ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </span>
        <button
          onClick={handleDelete}
          className="btn-delete"
          title="Delete Transaction"
          disabled={isDeleting}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
