import React, { useEffect, useState } from "react";
import History from "./History.jsx";
import ExpenseForm from "./ExpenseForm.jsx";
import config from "../config/env.js";

const API_URL = `${config.API_BASE_URL}/api/transactions`;

function ExpenseContainer() {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setTransactions)
      .catch(console.error);
  }, []);

  // Add transaction to backend
  const addTransaction = (transaction) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    })
      .then((res) => res.json())
      .then((newTx) => setTransactions((prev) => [...prev, newTx]))
      .catch(console.error);
  };

  // Delete transaction from backend
  const deleteTransaction = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setTransactions((prev) => prev.filter((t) => t._id !== id)))
      .catch(console.error);
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income + expense;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">{config.APP_NAME}</h1>
      </header>

      <div className="balance-summary">
        <div className="balance-grid">
          <div className="balance-item">
            <div className="balance-item-title">Income</div>
            <div className="balance-item-amount income">{config.DEFAULT_CURRENCY} {income.toFixed(2)}</div>
          </div>
          <div className="balance-item">
            <div className="balance-item-title">Expense</div>
            <div className="balance-item-amount expense">{config.DEFAULT_CURRENCY} {Math.abs(expense).toFixed(2)}</div>
          </div>
          <div className="balance-item">
            <div className="balance-item-title">Balance</div>
            <div className="balance-item-amount">{config.DEFAULT_CURRENCY} {balance.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <History transactions={transactions} deleteTransaction={deleteTransaction} />
      <ExpenseForm addTransaction={addTransaction} />
    </div>
  );
}

export default ExpenseContainer;
