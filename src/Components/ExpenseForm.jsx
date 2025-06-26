import React, { useState } from "react";
import config from "../config/env.js";

function ExpenseForm({ addTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!title || !amount) {
      setError("Please fill in all fields");
      return;
    }

    const numAmount = parseFloat(amount);
    
    // Validate amount using environment variable
    if (Math.abs(numAmount) > config.MAX_EXPENSE_AMOUNT) {
      setError(`Amount cannot exceed ${config.DEFAULT_CURRENCY} ${config.MAX_EXPENSE_AMOUNT}`);
      return;
    }

    addTransaction({ title, amount: numAmount });
    setTitle("");
    setAmount("");
  };

  return (
    <div className="transaction-form">
      <h3 className="section-title">Add New Transaction</h3>
      {error && (
        <div style={{ 
          color: "#ef4444", 
          backgroundColor: "#fef2f2", 
          padding: "0.5rem", 
          borderRadius: "4px", 
          marginBottom: "1rem",
          border: "1px solid #fecaca"
        }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title</label>
          <input
            type="text"
            className="form-input"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-input"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            max={config.MAX_EXPENSE_AMOUNT}
            min={-config.MAX_EXPENSE_AMOUNT}
          />
        </div>
        <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "1rem" }}>
          (negative for expense, positive for income) - Max: {config.DEFAULT_CURRENCY} {config.MAX_EXPENSE_AMOUNT}
        </p>
        <button type="submit" className="submit-button">Add Transaction</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
