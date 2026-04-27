# 🚗 Parking API

Production-ready REST API for a parking management system built with **Node.js**, **Express**, **PostgreSQL**, and **Sequelize**.
The application is deployed on a cloud server and provides full CRUD functionality via HTTP endpoints.

---

## 📌 Description

Parking API is a backend service designed to manage a parking system.

It supports operations for:

* Users
* Vehicles
* Parking Zones
* Parking Slots
* Tariff Plans
* Tickets
* Payments
* Fines

The system uses a **relational database structure** with defined relationships between entities.

---

## ⚙️ Technologies

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* Swagger (OpenAPI)
* Git / GitHub
* Cloud deployment on **Microsoft Azure Virtual Machine**

---

## 🌐 Live API

Swagger UI is available at:

```text
http://68.210.185.215:3000/api-docs
```

This interface allows:

* viewing all endpoints
* sending requests (GET, POST, PUT, DELETE)
* testing API functionality in real time

---

## 📡 API Structure

The project follows a layered architecture:

```
request → routes → controllers → models → PostgreSQL → response
```

### Key concepts:

* **Routes** – handle incoming HTTP requests
* **Controllers** – contain business logic
* **Models** – represent database tables
* **Sequelize** – handles communication with PostgreSQL

---

## 🚀 Setup

### 1. Install Node.js

Make sure Node.js (v18+) is installed.

---

### 2. Create PostgreSQL database

Create a database named:

```text
parking
```

---

### 3. Configure environment variables

Copy the example file:

```bash
copy .env.example .env
```

Edit `.env`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=parking
DB_USER=postgres
DB_PASSWORD=your_password
```

---

### 4. Install dependencies

```bash
npm install
```

---

### 5. Run database migrations

```bash
npm run db:migrate
```

---

### 6. Seed test data

```bash
npm run db:seed
```

---

### 7. Start the server

```bash
npm start
```

---

## 🔄 Deployment

The application is deployed on a cloud VM using Git-based deployment.

### Steps:

```bash
ssh azureuser@68.210.185.215
cd parking-api
./deploy.sh
```

### deploy.sh script:

* pulls latest code from GitHub
* installs dependencies
* runs migrations
* restarts the server

---

## 📊 Example Endpoints

| Method | Endpoint  | Description      |
| ------ | --------- | ---------------- |
| GET    | /vehicles | Get all vehicles |
| POST   | /vehicles | Create a vehicle |
| GET    | /users    | Get all users    |
| POST   | /users    | Create a user    |

Full API documentation is available in Swagger.

---

## ☁️ Cloud Infrastructure

The application is deployed using:

* Azure Virtual Machine (Ubuntu)
* Public IP access
* Open port `3000` (HTTP API)

---

## 🧠 Development Notes

* Database schema is managed using **Sequelize migrations**
* Test data is inserted via **seeders**
* Environment variables are stored in `.env`
* The application follows RESTful principles

---

## ⚠️ Limitations

* PostgreSQL is currently deployed on the same VM
* Full CI/CD pipeline is not implemented (manual deployment via git is used)

### Possible improvements:

* Move DB to **Azure Database for PostgreSQL**
* Add CI/CD using GitHub Actions
* Implement authentication (JWT / Basic Auth)

---

## 👨‍💻 Author

Mykhailo
