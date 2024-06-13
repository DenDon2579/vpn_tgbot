import dotenv from 'dotenv';
dotenv.config();

export const subscriptionCost = {
  '30': 200,
  '60': 360,
  '90': 500,
  '365': 1450,
};

export const SETUP_ID = process.env.SETUP_ID || '';
export const MONGO = process.env.MONGO || '';
export const TOKEN = process.env.TOKEN || '';
export const adminId = 1050181123;
