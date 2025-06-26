// utils/api.js
// API utility functions using environment variables

import config from '../config/env.js';

// Base API URL from environment
const API_BASE = config.API_BASE_URL;

// API endpoints
export const API_ENDPOINTS = {
  TRANSACTIONS: `${API_BASE}/api/transactions`,
  USERS: `${API_BASE}/api/users`,
  AUTH: `${API_BASE}/api/auth`,
};

// Fetch helper with error handling
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Specific API functions
export const transactionAPI = {
  getAll: () => apiRequest(API_ENDPOINTS.TRANSACTIONS),
  create: (transaction) => apiRequest(API_ENDPOINTS.TRANSACTIONS, {
    method: 'POST',
    body: JSON.stringify(transaction),
  }),
  delete: (id) => apiRequest(`${API_ENDPOINTS.TRANSACTIONS}/${id}`, {
    method: 'DELETE',
  }),
};

// Format currency using environment variable
export const formatCurrency = (amount) => {
  return `${config.DEFAULT_CURRENCY} ${Math.abs(amount).toFixed(2)}`;
};

// Validate amount against max limit
export const validateAmount = (amount) => {
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) {
    return { isValid: false, error: 'Amount must be a valid number' };
  }
  
  if (Math.abs(numAmount) > config.MAX_EXPENSE_AMOUNT) {
    return { 
      isValid: false, 
      error: `Amount cannot exceed ${config.DEFAULT_CURRENCY} ${config.MAX_EXPENSE_AMOUNT}` 
    };
  }
  
  return { isValid: true, error: null };
};
