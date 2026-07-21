# PERN Stack Product Manager - REST API Server

[![Node.js](https://img.shields.io/badge/Node.js-v20-green?logo=nodedotjs)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-lightgrey?logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6-brightgreen?logo=sequelize)](https://sequelize.org/)
[![Jest](https://img.shields.io/badge/Jest-29-red?logo=jest)](https://jestjs.io/)
[![Swagger](https://img.shields.io/badge/Swagger-UI-green?logo=swagger)](https://swagger.io/)

A robust, type-safe REST API server built with **Node.js**, **Express**, and **TypeScript**. It utilizes **Sequelize ORM** to interface with a **PostgreSQL** database, featuring request validation, API documentation via **Swagger**, and comprehensive integration tests using **Jest** and **Supertest**.

## 🚀 Live Demo & Repository links

- **API Documentation (Swagger):** [Swagger Docs](https://pern-type-script-administrador-de-p.vercel.app/docs)
- **Live Deployment:** [PERN Product Manager Preview](https://pern-type-script-administrador-de-p.vercel.app/)
  > [!NOTE]
  > Since the API server is hosted on a free hobby plan, the first request may take up to **50 seconds** to wake up the server spin-up.
- **Frontend Client Repository:** [ProductManager-PERN_Client](https://github.com/CamiloVelasquezBotero/ProductManager-PERN_Client)

---

## ✨ Key Features

- **Full CRUD Endpoints:** Robust routes to register, read, update, patch (toggle availability), and delete products.
- **Strict Data Validation:** Utilizes `express-validator` middleware to check incoming payload structures and sanitize inputs.
- **TypeScript Integration:** Compile-time check verification, type safety, and object-relational mapping validations via `sequelize-typescript`.
- **Interactive Documentation:** Automatic OpenAPI documentation generated using `swagger-jsdoc` and displayed visually at `/docs` using `swagger-ui-express`.
- **Comprehensive Testing:** Automated endpoint verification covering valid and invalid inputs, test database clearing via hooks, and test coverage calculation.
- **Dev-friendly Features:** Integrated console styling utilizing `colors` and real-time request logging using `morgan`.

---

## 🛠️ Tech Stack & Dependencies

- **Runtime:** Node.js (with `ts-node` & `nodemon` in development)
- **Framework:** Express (v5)
- **Language:** TypeScript
- **Database ORM:** Sequelize & Sequelize-TypeScript
- **Database Engine:** PostgreSQL (driver: `pg`)
- **API Specs:** Swagger JSdoc & Swagger UI Express
- **Testing Tools:** Jest & Supertest

---

## 💻 Installation & Setup

Follow these steps to run the server locally:

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) database instance

### 2. Clone the Repository
```bash
git clone https://github.com/CamiloVelasquezBotero/ProductManager-PERN_Server.git
cd ProductManager-PERN_Server
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root folder of the server:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name?ssl=true
FRONTEND_URL=http://localhost:5173
```
*(Replace credentials, host, and port with your PostgreSQL server details. Append `?ssl=true` if SSL/TLS connection is required).*

### 5. Running the API Server
To launch the server in development mode (with hot-reloading via nodemon):
```bash
npm run dev
```
The server will start, authenticate the database, synchronize tables, and listen on the configured port.

### 6. Running Tests
To run the automated test suite with Jest:
```bash
npm run test
```
To run the test suite and output test coverage details:
```bash
npm run test:coverage
```

### 7. Compile to Production
To compile the TypeScript project into JavaScript:
```bash
npm run build
```

---

## 📂 Project Structure

```text
src/
├── __tests__/     # Jest integration and endpoint test suites
├── config/        # Database configurations, Sequelize instance, and Swagger configurations
├── data/          # Database seeding and cleanup tasks
├── handlers/      # Controller handlers for endpoints logic
├── middleware/    # Input validation checks and validation result handlers
├── models/        # Sequelize database models definition
├── router.ts      # API routes definitions and Swagger annotation blocks
├── server.ts      # Server initialization, CORS setup, and middleware stack
└── index.ts       # Application entry point
```