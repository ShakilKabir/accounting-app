//routes/transactionRoutes.ts

import express from 'express';
import Transaction from '../models/transaction';
import verifyToken from '../middleware/authMiddleware';
import { ChartOfAccounts } from '../models/chartOfAccounts';

const router = express.Router();

router.use(verifyToken);  // Middleware to authenticate user

router.get('/', async (req, res) => {
  try {
    const userId = req.userId;
    const transactions = await Transaction.find({ user_id: userId });
    res.status(200).send(transactions);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/', async (req, res) => {
  console.log('Processing POST request for /', req.userId);
  try {
      const { date, description, account, category, amount } = req.body;
      const { userId } = req;
      
      // Fetch the ObjectIds for account and category
      const accountDocument = await ChartOfAccounts.findOne({ account_name: account });
      const categoryDocument = await ChartOfAccounts.findOne({ account_name: category });

      // Validate if we found the account and category
      if (!accountDocument || !categoryDocument) {
          return res.status(400).send({ message: 'Account or Category not found' });
      }

      const transactionData = {
          date,
          description,
          account,
          category,
          account_type: accountDocument._id,
          category_type: categoryDocument._id,
          amount,
          user_id: userId,
      };
      
      const transaction = new Transaction(transactionData);
      await transaction.save();
      res.status(200).send(transaction);
  } catch (err) {
      console.log(err);
      res.status(400).send(err);
  }
});

router.put('/:transaction_id', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.transaction_id, req.body, { new: true });
    res.status(200).send(updatedTransaction);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/:transaction_id', async (req, res) => {
  try {
    await Transaction.findByIdAndRemove(req.params.transaction_id);
    res.status(200).send({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
