# Parking API

Production-ready Node.js Express REST API for a parking management system using PostgreSQL + Sequelize, with Swagger docs.

## Entities

- Users
- Vehicles
- ParkingZones
- ParkingSlots
- TariffPlans
- Tickets
- Payments
- Fines

## Setup

1. Install Node.js (includes `npm`).
2. Create a database in PostgreSQL.
3. Copy environment variables:

```bash
copy .env.example .env
```

4. Install dependencies:

```bash
npm install
```

5. Run:

```bash
npm run dev
```

## Swagger

- Swagger UI: `http://localhost:3000/api-docs`

## Notes

- For production-style DB changes, use migrations:

```bash
npm run db:migrate
```

- Seed test data (sequelize-cli seeders):

```bash
npm run db:seed
```

- Alternative quick dev seed (drops + recreates tables via `sequelize.sync({ force: true })`):

```bash
npm run seed
```

