import express from 'express';
import {register, login} from './controllers/auth.js';
import {fetchExpenses, addExpense} from './controllers/expense.js';
import { isAuthenticated } from "./middleware/isAuthenticated.js";
import {sequelize} from './util/database.js';
import {User} from './models/user.js';
import {Expense} from './models/expense.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

User.hasMany(Expense);
Expense.belongsTo(User);

app.post('/register', register);
app.post('/login', login);

//expenses
app.post('/expenses', addExpense);
app.get('/expenses/:userId', fetchExpenses);



sequelize
  .sync() // the force: true is for development -- it DROPS tables!!!
  // you can use it if you like while you are building.
  // sequelize.sync({ force: true })
  .then(() => {
    app.listen(4004, () => {
      console.log("Server is listening on port 4004...");
    });
  })
  .catch((error) => {
    console.error("unable to sync the db", error);
  });