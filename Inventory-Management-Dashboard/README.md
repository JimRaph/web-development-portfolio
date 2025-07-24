#  Inventory Management Dashboard

A full-stack **Inventory Management Dashboard** web application built to showcase a modern dashboard with real-time inventory tracking, data visualization, and efficient product management.

>This is a **portfolio project** demonstrating my skills in full-stack development, modern UI/UX design, and data handling.

---

##  Tech Stack

###  Backend
- **Node.js** with **Express.js** – RESTful API server
- **PostgreSQL** (Supabase) – Hosted relational database
- **Prisma ORM** – Type-safe and efficient database access

### Frontend
- **Next.js** – Server-rendered React framework
- **TailwindCSS** – CSS framework for styling
- **MUI (Material UI)** – React UI components
- **Redux Toolkit** – Global state management
- **Recharts** – Data visualization and charts

---

## Features

-  Interactive dashboard with:
  - Inventory overview
  - Real-time analytics
  - Charts and graphs (sales, purchase summary, expenses, etc)
-  Product management (Add/Edit/Delete)
-  Filtering and search functionality
- Responsive

---

##  Project Structure

---

##  Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- Supabase account and project setup
- PostgreSQL database URL (from Supabase)
- `.env` files configured for both frontend and backend

---

###  Backend Setup

```bash
cd Inventory_management/my-project-backend


npm install


npx prisma migrate dev
npx prisma generate


npm run dev
