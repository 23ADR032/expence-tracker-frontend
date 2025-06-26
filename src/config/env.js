// config/env.js
// Central place to manage all environment variables

const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Expense Tracker',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Database Configuration
  DB_NAME: import.meta.env.VITE_DB_NAME || 'expense_tracker',
  
  // Business Logic Configuration
  MAX_EXPENSE_AMOUNT: Number(import.meta.env.VITE_MAX_EXPENSE_AMOUNT) || 10000,
  DEFAULT_CURRENCY: import.meta.env.VITE_DEFAULT_CURRENCY || '₹',
  
  // Development mode check
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
};

export default config;
