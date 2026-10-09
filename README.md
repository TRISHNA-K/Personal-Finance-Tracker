# 💰 MERN Stack Expense Tracker (Beginner Friendly)

A clean, modern, and simple **Expense Tracker Web Application** built with the **MERN Stack** (MongoDB, Express, React, Node.js).

Designed specifically for beginners to understand end-to-end fullstack JavaScript development with clean code, standard folder organization, and zero-headache setup.

---

## 🌟 Features

- 💵 **Track Incomes & Expenses**: Add earnings and spending with title, amount, category, and date.
- 📊 **Real-Time Financial Summary**: Instant calculations of **Total Balance**, **Total Income**, and **Total Expenses**.
- 📈 **Category Spending Breakdown**: Visual progress bars showing where your money is spent.
- 🔍 **Search & Filter**: Search transactions by keyword or filter by *All*, *Income*, or *Expense*.
- 🗑️ **Delete Transactions**: Instant removal of records.
- ⚡ **Works Instantly (In-Memory Fallback)**: Runs right out of the box even before you set up MongoDB, and seamlessly switches to MongoDB once connected!
- 🎨 **Modern Responsive UI**: Clean, mobile-friendly interface styled with modern CSS.

---

## 🧱 What is MERN?

| Tech | Role | File / Location |
| :--- | :--- | :--- |
| **M**ongoDB | Database for persisting transactions | `server/models/Transaction.js` & `server/config/db.js` |
| **E**xpress | Backend REST API server | `server/routes/transactionRoutes.js` |
| **R**eact | Interactive Frontend UI | `client/src/App.jsx` & components |
| **N**ode.js | JavaScript runtime for backend | `server/server.js` |

---

## 📁 Project Structure

```text
expense-tracker/
├── server/                    # Backend (Node.js + Express + Mongoose)
│   ├── config/
│   │   └── db.js              # MongoDB database connection
│   ├── controllers/
│   │   └── transactionController.js # CRUD business logic
│   ├── models/
│   │   └── Transaction.js     # Mongoose schema
│   ├── routes/
│   │   └── transactionRoutes.js # REST API routes
│   ├── .env                   # Environment variables (PORT, MONGO_URI)
│   ├── .env.example           # Example environment template
│   ├── package.json
│   └── server.js              # Express app entry point
│
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Header & DB connection badge
│   │   │   ├── BalanceSummary.jsx   # Balance & stat cards
│   │   │   ├── TransactionForm.jsx  # Add transaction form
│   │   │   ├── ExpenseBreakdown.jsx # Spending by category bars
│   │   │   ├── TransactionList.jsx  # Search, filter & list container
│   │   │   └── TransactionItem.jsx  # Single transaction row
│   │   ├── App.jsx            # Main state and API integration
│   │   ├── constants.js       # Categories, formatters & colors
│   │   ├── index.css          # Modern styling
│   │   └── main.jsx           # React DOM root
│   ├── index.html
│   ├── vite.config.js         # Vite config with API proxy
│   └── package.json
│
├── package.json               # Root scripts
└── README.md
```

---

## 🚀 Quick Start Guide

### Step 1: Open Two Terminals

#### Terminal 1 — Start the Backend Server:
```bash
cd server
npm start
```
> The backend server will run on `http://localhost:5000`.  
> *Note: If MongoDB isn't running on your machine yet, the server will automatically use an in-memory store so you can start testing immediately!*

#### Terminal 2 — Start the React Frontend:
```bash
cd client
npm run dev
```
> Open your browser and go to `http://localhost:3000`.

---

## 🗄️ Connecting MongoDB (Optional for Permanent Storage)

By default, the server checks for a local MongoDB on `mongodb://127.0.0.1:27017/expense_tracker`.

To save your data permanently to the cloud for free with **MongoDB Atlas**:
1. Sign up for a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a free M0 cluster and a database user.
3. Click **Connect** → **Drivers** and copy your connection string:
   ```text
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/expense_tracker?retryWrites=true&w=majority
   ```
4. Open `server/.env` and replace `MONGO_URI`:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/expense_tracker?retryWrites=true&w=majority
   ```
5. Restart the server (`npm start` in `server`). The navbar badge will turn to `🟢 MongoDB Connected`!

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check status & database connection status |
| `GET` | `/api/transactions` | Fetch all transactions |
| `POST` | `/api/transactions` | Add a new transaction (Body: `title`, `amount`, `type`, `category`, `date`) |
| `DELETE` | `/api/transactions/:id` | Delete a transaction by ID |

---

## 💡 How the Frontend Communicates with the Backend

In `client/vite.config.js`, a proxy is configured:
```js
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```
When React calls `fetch('/api/transactions')`, Vite forwards the request to `http://localhost:5000/api/transactions`, eliminating CORS issues during development.
