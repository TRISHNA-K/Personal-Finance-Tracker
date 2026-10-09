export const CATEGORIES = [
  { name: 'Food & Dining', emoji: '🍔', color: '#f59e0b' },
  { name: 'Housing & Rent', emoji: '🏠', color: '#3b82f6' },
  { name: 'Transportation', emoji: '🚗', color: '#8b5cf6' },
  { name: 'Shopping', emoji: '🛍️', color: '#ec4899' },
  { name: 'Entertainment', emoji: '🎬', color: '#06b6d4' },
  { name: 'Utilities', emoji: '💡', color: '#eab308' },
  { name: 'Salary', emoji: '💼', color: '#10b981' },
  { name: 'Freelance', emoji: '💻', color: '#14b8a6' },
  { name: 'Investment', emoji: '📈', color: '#6366f1' },
  { name: 'Other', emoji: '📦', color: '#64748b' },
];

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getCategoryMeta = (categoryName) => {
  const found = CATEGORIES.find((c) => c.name.toLowerCase() === (categoryName || '').toLowerCase());
  return found || { name: categoryName || 'Other', emoji: '🏷️', color: '#64748b' };
};
