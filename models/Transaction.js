import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a transaction title'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add a positive amount'],
      min: [0.01, 'Amount must be greater than zero'],
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Please specify transaction type (income or expense)'],
      default: 'expense',
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      default: 'Other',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
