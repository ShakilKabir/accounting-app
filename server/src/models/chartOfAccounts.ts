//models/chartOfAccounts.ts

import mongoose from 'mongoose';

const chartOfAccountsSchema = new mongoose.Schema({
  account_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  account_name: { type: String, required: true },
  account_type: {
    type: String,
    enum: ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'],
    required: true
  },
  subtype: { type: String },  // Add validation or enums as needed
  description: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const ChartOfAccounts = mongoose.model('ChartOfAccounts', chartOfAccountsSchema);

export const initializeDefaultAccounts = async (userId: string) => {
  const predefinedAccounts = [
    {
      user_id: userId,
      account_name: 'Cash',
      account_type: 'Asset',
      subtype: 'Current Asset',
      description: 'Cash on hand',
    },
    {
      user_id: userId,
      account_name: 'Accounts Receivable',
      account_type: 'Asset',
      subtype: 'Current Asset',
      description: 'Amounts owed by customers from sales on credit',
    },
    {
      user_id: userId,
      account_name: 'Accounts Payable',
      account_type: 'Liability',
      subtype: 'Current Liability',
      description: 'Amounts owed to suppliers or other creditors',
    },
    {
      user_id: userId,
      account_name: 'Sales Revenue',
      account_type: 'Revenue',
      description: 'Income from sales',
    },
    {
      user_id: userId,
      account_name: 'Rent Expense',
      account_type: 'Expense',
      description: 'Expenses related to rented properties',
    },
    {
      user_id: userId,
      account_name: 'Utilities Expense',
      account_type: 'Expense',
      description: 'Expenses for utilities like electricity, water, etc.',
    },
    // ... Add more predefined accounts as needed
  ];

  return ChartOfAccounts.insertMany(predefinedAccounts);
};
