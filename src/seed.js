require('dotenv').config();

const { sequelize } = require('./db');
const models = require('./models');

async function seed() {
  const { User, Vehicle, ParkingZone, ParkingSlot, TariffPlan, Ticket, Payment, Fine } = models;

  await sequelize.authenticate();
  await sequelize.sync({ force: true });

  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', phone: '+10000000001', role: 'ADMIN' });
  const customer = await User.create({ name: 'Customer', email: 'customer@example.com', phone: '+10000000002', role: 'CUSTOMER' });

  await Vehicle.create({ userId: customer.userId, plateNumber: 'BB-222-BB', brand: 'Tesla', model: 'Model 3', color: 'White' });

  const zone = await ParkingZone.create({ name: 'Zone A', location: 'Central' });
  const slot = await ParkingSlot.create({ zoneId: zone.zoneId, status: 'AVAILABLE', type: 'EV' });

  const tariff = await TariffPlan.create({ name: 'Hourly', rate: 3.0 });

  const issuedAt = new Date();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const ticket = await Ticket.create({
    userId: customer.userId,
    slotId: slot.slotId,
    tariffId: tariff.tariffId,
    issuedAt,
    expiresAt,
    status: 'ACTIVE'
  });

  await Payment.create({ ticketId: ticket.ticketId, amount: 3.0, method: 'CARD', paidAt: new Date(), status: 'COMPLETED' });
  await Fine.create({ ticketId: ticket.ticketId, amount: 5.0, reason: 'Test fine', issuedAt: new Date() });

  // eslint-disable-next-line no-console
  console.log('Seed complete:', { adminUserId: admin.userId, customerUserId: customer.userId, ticketId: ticket.ticketId });
}

seed()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await sequelize.close();
  });

