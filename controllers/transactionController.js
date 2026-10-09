import Transaction from '../models/Transaction.js';
import { getDbStatus } from '../config/db.js';

// In-memory fallback dataset for beginners who haven't started MongoDB yet
let memoryTransactions = [
  {
    _id: 'mem_1',
    title: 'Monthly Salary',
    amount: 3500,
    type: 'income',
    category: 'Salary',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'mem_2',
    title: 'Grocery Supermarket',
    amount: 145.50,
    type: 'expense',
    category: 'Food & Dining',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'mem_3',
    title: 'Electricity & Water Bill',
    amount: 85.20,
    type: 'expense',
    category: 'Utilities',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'mem_4',
    title: 'Freelance Design Gig',
    amount: 450,
    type: 'income',
    category: 'Freelance',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Public
export const getTransactions = async (req, res) => {
  try {
    if (getDbStatus()) {
      const transactions = await Transaction.find().sort({ date: -1, createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: transactions.length,
        isDatabaseConnected: true,
        data: transactions,
      });
    } else {
      // Memory fallback
      return res.status(200).json({
        success: true,
        count: memoryTransactions.length,
        isDatabaseConnected: false,
        data: [...memoryTransactions].sort((a, b) => new Date(b.date) - new Date(a.date)),
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error: ' + error.message,
    });
  }
};

// @desc    Add a new transaction
// @route   POST /api/transactions
// @access  Public
export const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        success: false,
        error: 'Please provide title, amount, type, and category',
      });
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be a positive number',
      });
    }

    if (getDbStatus()) {
      const transaction = await Transaction.create({
        title,
        amount: parsedAmount,
        type,
        category,
        date: date ? new Date(date) : new Date(),
      });

      return res.status(201).json({
        success: true,
        isDatabaseConnected: true,
        data: transaction,
      });
    } else {
      // In-memory fallback
      const newTransaction = {
        _id: 'mem_' + Date.now(),
        title,
        amount: parsedAmount,
        type,
        category,
        date: date ? new Date(date).toISOString() : new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      memoryTransactions.unshift(newTransaction);

      return res.status(201).json({
        success: true,
        isDatabaseConnected: false,
        data: newTransaction,
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', '),
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error: ' + error.message,
      });
    }
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Public
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      const transaction = await Transaction.findById(id);

      if (!transaction) {
        return res.status(404).json({
          success: false,
          error: 'Transaction not found',
        });
      }

      await transaction.deleteOne();

      return res.status(200).json({
        success: true,
        data: {},
        message: 'Transaction removed successfully',
      });
    } else {
      // Memory fallback
      const index = memoryTransactions.findIndex((t) => t._id === id);
      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: 'Transaction not found',
        });
      }

      memoryTransactions.splice(index, 1);

      return res.status(200).json({
        success: true,
        data: {},
        message: 'Transaction removed successfully from in-memory store',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error: ' + error.message,
    });
  }
};
