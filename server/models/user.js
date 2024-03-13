import { DataTypes } from "sequelize";
import {sequelize} from '../util/database.js';

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    // username: {
    //     type: DataTypes.STRING
    // },
    username: DataTypes.STRING,
    // hashedPass: {
    //     type: DataTypes.STRING
    // }
    hashedPass: DataTypes.STRING
});