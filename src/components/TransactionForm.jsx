import React, { useState } from 'react';
import { PlusCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { CATEGORIES } from '../constants';

export default function TransactionForm({ onAddTransaction }) {
  const today = new Date().toISOString().split('T')[0];

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [date, setDate] = useState(today);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) {
      setFormError('Please enter a transaction title.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setFormError('Please enter a valid amount greater than 0.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddTransaction({
        title: title.trim(),
        amount: numAmount,
        type,
        category,
        date: date || new Date().toISOString(),
      });

      // Reset form
      setTitle('');
      setAmount('');
      setDate(today);
      if (type === 'income') {
        setCategory('Salary');
      } else {
        setCategory(CATEGORIES[0].name);
      }
    } catch (err) {
      setFormError(err.message || 'Failed to add transaction.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">
        <PlusCircle size={20} color="var(--primary)" />
        Add Transaction
      </h2>

      {formError && (
        <div className="alert-banner error" style={{ padding: '8px 12px', marginBottom: '14px' }}>
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Income / Expense Toggle */}
        <div className="type-toggle-group">
          <button
            type="button"
            className={`type-toggle-btn ${type === 'expense' ? 'active-expense' : ''}`}
            onClick={() => {
              setType('expense');
              if (category === 'Salary' || category === 'Freelance') {
                setCategory(CATEGORIES[0].name);
              }
            }}
          >
            <TrendingDown size={16} />
            Expense
          </button>
          <button
            type="button"
            className={`type-toggle-btn ${type === 'income' ? 'active-income' : ''}`}
            onClick={() => {
              setType('income');
              setCategory('Salary');
            }}
          >
            <TrendingUp size={16} />
            Income
          </button>
        </div>

        {/* Title / Description */}
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Description / Title
          </label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="e.g. Grocery store, Netflix subscription"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Amount */}
        <div className="form-group">
          <label className="form-label" htmlFor="amount">
            Amount ($)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            className="form-input"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="form-label" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isSubmitting}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? (
            'Saving...'
          ) : (
            <>
              <PlusCircle size={18} />
              Add {type === 'expense' ? 'Expense' : 'Income'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
