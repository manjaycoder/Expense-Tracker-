# 💸 Expense Tracker App (Full Stack)

A full stack **Expense Tracker Application** built using **React Native**, **Node.js**, **PostgreSQL (Neon DB)**, and deployed on **Render**. This application allows users to **add income and expenses**, categorize their transactions (e.g., Salary, Food, etc.), and visualize their **budget and financial history**.

## ✨ Features

- 🔐 User Authentication using clerk
- 🏠 avaible multiple theme 
- ➕ Add Income & Expenses
- 📊 Track Budget Usage
- 🧾 Categorized Transactions (e.g., Salary, Food, Entertainment)
- 📅 View Total Monthly Expenses and Incomes
- ☁️ Backend Hosted on Render
- 🗃️ Database on Neon (PostgreSQL)

---

## 🧰 Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Frontend     | React Native (Expo/CLI)     |
| Backend      | Node.js + Express.js        |
| Database     | PostgreSQL (NeonDB)         |
| Deployment   | Render (Backend API)        |
| Hosting DB   | Neon.tech                   |

---

## 📱 Screenshots

<table>
  <tr>
    <td align="center">
      <strong>🔐 Authentication Screen</strong><br>
      <img src="https://drive.google.com/uc?export=view&id=1uRlkvf90Rzlo2KG5PoIVY0AMS87hgq-M" width="300" />
    </td>
     <td align="center">
      <strong>🏠 Home: Track Income/Expense</strong><br>
      <img src="https://drive.google.com/uc?export=view&id=1Qr3ZowiJej7v1D5eVAB_vqiuEx9DSwgQ" width="300" />
    </td>
    <td align="center">
      <strong>👤 New User Login</strong><br>
      <img src="https://drive.google.com/uc?export=view&id=1PiUlLCCGlZJ-ldrw-FQBBUyGbDM9myb7" width="300" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>➕ Add Money & Budget</strong><br>
      <img src="https://drive.google.com/uc?export=view&id=1OanqZWkjWRMh2zWK5tjK8xVmD2Qol8ij" width="300" />
    </td>
   
  </tr>
</table>

---
## ✨ Installation & Run Locally
## 📱 Frontend (React Native)

`cd client `
`npm install`
`npm start `

## 🖥️ Backend (Node.js)

`cd server`
`npm install`
`npm run dev`

## 🔑 Add a .env file in the server/ folder:
`PORT=5000`
`DATABASE_URL=your_neon_db_url`

## 🚀 Deployment
- Backend is deployed on Render

- Database is hosted on Neon

- Frontend can be built into native apps via Expo or ejected builds

## 📦 Project Structure

```bash
project-root/
│
├── client/                 # React Native App
│   ├── components/         # Reusable components
│   ├── screens/            # Screens (Home, Add, Budget)
│   ├── services/           # API Services
│   └── App.js              # Entry point
│
├── server/                 # Node.js Backend
│   ├── routes/             # API Routes
│   ├── controllers/        # Request Handlers
│   ├── models/             # PostgreSQL DB Models
│   └── index.js            # Express app
│
└── README.md 



