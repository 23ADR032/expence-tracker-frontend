import React from "react";

function History({ transactions, deleteTransaction }) {
  return (
    <div className="transaction-list">
      <h3 className="section-title">History</h3>
      {transactions.map((tx) => (
        <div
          key={tx._id} // changed from tx.id
          className={`transaction-card ${
            tx.amount < 0 ? "negative" : "positive"
          }`}
        >
          {/* Left: Title */}
          <div className="transaction-title">{tx.title}</div>

          {/* Right: Amount + Hover Icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              className={`transaction-amount ${
                tx.amount < 0 ? "negative" : "positive"
              }`}
            >
              {tx.amount < 0 ? "-" : "+"}₹{Math.abs(tx.amount)}
            </div>

            <div
              className="delete-icon"
              onClick={() => deleteTransaction(tx._id)} // changed from tx.id
              title="Delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="red"
                style={{ width: "20px", height: "20px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;