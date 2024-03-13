import { DataTypes } from "sequelize";
import {sequelize} from '../util/database.js';

export const Expense = sequelize.define('expense', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE
});