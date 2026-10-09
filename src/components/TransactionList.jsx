import React, { useState, useMemo } from 'react';
import { Search, History, Inbox } from 'lucide-react';
import TransactionItem from './TransactionItem';

export default function TransactionList({ transactions, onDelete, isLoading }) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'income' | 'expense'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesType = filterType === 'all' || t.type === filterType;
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [transactions, filterType, searchQuery]);

  return (
    <div className="card">
      <div className="list-header-bar">
        <h2 className="card-title" style={{ margin: 0 }}>
          <History size={20} color="var(--primary)" />
          Transaction History
        </h2>

        {/* Filter Pills */}
        <div className="filter-pills">
          <button
            type="button"
            className={`filter-pill ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`filter-pill ${filterType === 'income' ? 'active' : ''}`}
            onClick={() => setFilterType('income')}
          >
            Income
          </button>
          <button
            type="button"
            className={`filter-pill ${filterType === 'expense' ? 'active' : ''}`}
            onClick={() => setFilterType('expense')}
          >
            Expenses
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '16px' }}>
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Loading state */}
      {isLoading && <div className="spinner"></div>}

      {/* Empty State */}
      {!isLoading && filteredTransactions.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">💸</div>
          <p className="empty-text">No transactions found</p>
          <p className="empty-subtext">
            {searchQuery
              ? 'Try adjusting your search or filter'
              : 'Add your first transaction above to get started!'}
          </p>
        </div>
      )}

      {/* Transaction Items */}
      {!isLoading && filteredTransactions.length > 0 && (
        <div className="transaction-list">
          {filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction._id}
              transaction={transaction}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
