import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables
dotenv.config();

// Retrieve the connection string from environment variables
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// Create a new instance of the Sequelize class
 export const sequelize = new Sequelize(CONNECTION_STRING, {
    // Add additional configuration options 
    dialect: 'postgres'
  });