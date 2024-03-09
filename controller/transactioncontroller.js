const Transaction = require('../models/Transcation.js');
const { v4: uuidv4 } = require('uuid');

const generateTransactionId = () => {
  return uuidv4();
};

exports.addTransaction = async (req, res) => {
  const { type, amount, category,date } = req.body;
  const userId = req.user.userId;
  const transactionId=generateTransactionId()

  try {
    const transaction = new Transaction({ userId, type, amount, category, date,transactionId });
 
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getTransactions = async (req, res) => {
  const userId = req.user.userId;
  const { datePeriod } = req.query;
  let query = { userId }; // Base query with userId

  // Adjust query based on datePeriod
  if (datePeriod === 'today') {
    query.date = { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) };
  } else if (datePeriod === 'thisWeek') {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of current week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // End of current week (Saturday)
    query.date = { $gte: startOfWeek, $lt: new Date(endOfWeek.setHours(23, 59, 59, 999)) };
  } else if (datePeriod === 'thisMonth') {
    const startOfMonth = new Date();
    startOfMonth.setDate(1); // Start of current month
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1); // End of current month
    endOfMonth.setDate(0); // Last day of current month
    query.date = { $gte: startOfMonth, $lt: new Date(endOfMonth.setHours(23, 59, 59, 999)) };
  }
  
  try {
    const transactions = await Transaction.find(query);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransactionSummary = async (req, res) => {
  const userId = req.user.userId;
  const { timePeriod } = req.query;
  let query = { userId }; // Base query with userId

  // Adjust query based on timePeriod
  if (timePeriod === 'today') {
    query.date = { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) };
  } else if (timePeriod === 'thisWeek') {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of current week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // End of current week (Saturday)
    query.date = { $gte: startOfWeek, $lt: new Date(endOfWeek.setHours(23, 59, 59, 999)) };
  } else if (timePeriod === 'thisMonth') {
    const startOfMonth = new Date();
    startOfMonth.setDate(1); // Start of current month
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1); // End of current month
    endOfMonth.setDate(0); // Last day of current month
    query.date = { $gte: startOfMonth, $lt: new Date(endOfMonth.setHours(23, 59, 59, 999)) };
  } else if (timePeriod === 'custom') {
    const { startDate, endDate } = req.query;
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lt: new Date(endDate) };
    }
  }
  
  try {
    const transactions = await Transaction.find(query);
    
    let totalIncome = 0;
    let totalSavings = 0;
    let totalExpenses = 0;
    
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      }  else {
        totalExpenses += transaction.amount;
      }
    });

    totalSavings=totalIncome-totalExpenses;
    
    res.json({ totalIncome, totalSavings, totalExpenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteTransaction = async (req, res) => {

  try {
    const { id } = req.params;
const t1 = await Transaction.deleteOne({transactionId:id})

res.status(200).json(ti)
   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
