import React from 'react';
import { Wallet, RefreshCw, Database } from 'lucide-react';

export default function Navbar({ isDatabaseConnected, onRefresh, isLoading }) {
  return (
    <header className="navbar">
      <div className="logo-wrapper">
        <div className="logo-icon">
          <Wallet size={24} />
        </div>
        <div>
          <h1 className="brand-title">ExpenseTracker</h1>
          <p className="brand-subtitle">MERN Stack • Personal Finance</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className={`db-badge ${isDatabaseConnected ? 'connected' : 'memory'}`} title={
          isDatabaseConnected 
            ? 'Connected to MongoDB Database' 
            : 'Using in-memory fallback. Connect MongoDB URI in server/.env to save permanently.'
        }>
          <span className={`db-dot ${isDatabaseConnected ? 'connected' : 'memory'}`}></span>
          <span>{isDatabaseConnected ? 'MongoDB Connected' : 'In-Memory Mode'}</span>
        </div>

        <button 
          onClick={onRefresh}
          className="btn-delete"
          style={{ border: '1px solid var(--card-border)', padding: '8px 10px' }}
          title="Refresh Transactions"
          disabled={isLoading}
        >
          <RefreshCw size={16} className={isLoading ? 'spinner' : ''} style={{ margin: 0 }} />
        </button>
      </div>
    </header>
  );
}
