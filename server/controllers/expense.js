import { Expense } from '../models/expense.js';

export const fetchExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({where: {userId: req.params.userId}});
    res.status(200).send(expenses)
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(400).send(error);
  }
};

export const addExpense = async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);
    res.status(200).send(newExpense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(400).send(error);
  }
};
