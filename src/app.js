const express = require('express');

const { swaggerUi, swaggerSpec } = require('./swagger');
const { notFoundHandler, errorHandler } = require('./middleware/errors');

const usersRoutes = require('./routes/users.routes');
const vehiclesRoutes = require('./routes/vehicles.routes');
const parkingZonesRoutes = require('./routes/parkingZones.routes');
const parkingSlotsRoutes = require('./routes/parkingSlots.routes');
const tariffPlansRoutes = require('./routes/tariffPlans.routes');
const ticketsRoutes = require('./routes/tickets.routes');
const paymentsRoutes = require('./routes/payments.routes');
const finesRoutes = require('./routes/fines.routes');

function createApp() {
  const app = express();

  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ ok: true });
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use('/api/users', usersRoutes);
  app.use('/api/vehicles', vehiclesRoutes);
  app.use('/api/parking-zones', parkingZonesRoutes);
  app.use('/api/parking-slots', parkingSlotsRoutes);
  app.use('/api/tariff-plans', tariffPlansRoutes);
  app.use('/api/tickets', ticketsRoutes);
  app.use('/api/payments', paymentsRoutes);
  app.use('/api/fines', finesRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };

