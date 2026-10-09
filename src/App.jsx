import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BalanceSummary from './components/BalanceSummary';
import TransactionForm from './components/TransactionForm';
import ExpenseBreakdown from './components/ExpenseBreakdown';
import TransactionList from './components/TransactionList';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Fetch all transactions from Backend API
  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) {
        throw new Error(`Failed to fetch transactions (Status: ${response.status})`);
      }
      const result = await response.json();
      if (result.success) {
        setTransactions(result.data || []);
        setIsDatabaseConnected(!!result.isDatabaseConnected);
      } else {
        throw new Error(result.error || 'Failed to load transactions');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      showNotification(
        'Backend not reachable. Ensure the Express server is running on port 5000.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add a new transaction
  const handleAddTransaction = async (newTx) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTx),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to save transaction');
      }

      setTransactions((prev) => [result.data, ...prev]);
      setIsDatabaseConnected(!!result.isDatabaseConnected);
      showNotification(`Added "${newTx.title}" successfully!`, 'success');
    } catch (err) {
      showNotification(err.message, 'error');
      throw err;
    }
  };

  // Delete a transaction by ID
  const handleDeleteTransaction = async (id) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to delete transaction');
      }

      setTransactions((prev) => prev.filter((t) => t._id !== id));
      showNotification('Transaction deleted.', 'info');
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        isDatabaseConnected={isDatabaseConnected}
        onRefresh={fetchTransactions}
        isLoading={isLoading}
      />

      {/* Dynamic Alerts / Notifications */}
      {notification && (
        <div className={`alert-banner ${notification.type}`}>
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'inherit',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <BalanceSummary transactions={transactions} />

      {/* Main Grid: Left (Form + Breakdown), Right (History) */}
      <main className="main-layout">
        <aside>
          <TransactionForm onAddTransaction={handleAddTransaction} />
          <ExpenseBreakdown transactions={transactions} />
        </aside>

        <section>
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            isLoading={isLoading}
          />
        </section>
      </main>

      {/* Beginner Guide Footer */}
      <footer
        style={{
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid var(--card-border)',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
          lineHeight: '1.6',
        }}
      >
        <p style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
          🎓 How this MERN Stack App Works:
        </p>
        <p>
          <strong>MongoDB:</strong> Stores data schemas using Mongoose in <code>server/models/Transaction.js</code> • 
          <strong> Express:</strong> REST API endpoints in <code>server/routes/transactionRoutes.js</code> • 
          <strong> React:</strong> Vite component UI in <code>client/src/</code> • 
          <strong> Node.js:</strong> Backend runtime in <code>server/server.js</code>
        </p>
      </footer>
    </div>
  );
}
