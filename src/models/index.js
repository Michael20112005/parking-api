const { DataTypes } = require('sequelize');

let User;
let Vehicle;
let ParkingZone;
let ParkingSlot;
let TariffPlan;
let Ticket;
let Payment;
let Fine;
let initialized = false;

function assertInitialized() {
  if (!initialized) {
    throw new Error('Sequelize models are not initialized. Call initModels(sequelize) before using models.');
  }
}

function initModels(sequelize) {
  if (initialized) {
    return { User, Vehicle, ParkingZone, ParkingSlot, TariffPlan, Ticket, Payment, Fine };
  }

  User = sequelize.define(
    'User',
    {
      userId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'user_id' },
      name: { type: DataTypes.STRING(120), allowNull: false },
      email: { type: DataTypes.STRING(254), allowNull: false, unique: true },
      phone: { type: DataTypes.STRING(32), allowNull: true },
      role: { type: DataTypes.ENUM('ADMIN', 'STAFF', 'CUSTOMER'), allowNull: false, defaultValue: 'CUSTOMER' }
    },
    { tableName: 'users' }
  );

  Vehicle = sequelize.define(
    'Vehicle',
    {
      vehicleId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'vehicle_id' },
      userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
      plateNumber: { type: DataTypes.STRING(32), allowNull: false, unique: true, field: 'plate_number' },
      brand: { type: DataTypes.STRING(80), allowNull: true },
      model: { type: DataTypes.STRING(80), allowNull: true },
      color: { type: DataTypes.STRING(40), allowNull: true }
    },
    { tableName: 'vehicles' }
  );

  ParkingZone = sequelize.define(
    'ParkingZone',
    {
      zoneId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'zone_id' },
      name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
      location: { type: DataTypes.STRING(255), allowNull: true }
    },
    { tableName: 'parking_zones' }
  );

  ParkingSlot = sequelize.define(
    'ParkingSlot',
    {
      slotId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'slot_id' },
      zoneId: { type: DataTypes.INTEGER, allowNull: false, field: 'zone_id' },
      status: {
        type: DataTypes.ENUM('AVAILABLE', 'OCCUPIED', 'OUT_OF_SERVICE'),
        allowNull: false,
        defaultValue: 'AVAILABLE'
      },
      type: { type: DataTypes.ENUM('COMPACT', 'STANDARD', 'LARGE', 'EV', 'DISABLED'), allowNull: false, defaultValue: 'STANDARD' }
    },
    { tableName: 'parking_slots' }
  );

  TariffPlan = sequelize.define(
    'TariffPlan',
    {
      tariffId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'tariff_id' },
      name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
      rate: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
    },
    { tableName: 'tariff_plans' }
  );

  Ticket = sequelize.define(
    'Ticket',
    {
      ticketId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'ticket_id' },
      userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
      slotId: { type: DataTypes.INTEGER, allowNull: false, field: 'slot_id' },
      tariffId: { type: DataTypes.INTEGER, allowNull: false, field: 'tariff_id' },
      issuedAt: { type: DataTypes.DATE, allowNull: false, field: 'issued_at' },
      expiresAt: { type: DataTypes.DATE, allowNull: true, field: 'expires_at' },
      status: {
        type: DataTypes.ENUM('ACTIVE', 'EXPIRED', 'CANCELLED', 'PAID'),
        allowNull: false,
        defaultValue: 'ACTIVE'
      }
    },
    { tableName: 'tickets' }
  );

  Payment = sequelize.define(
    'Payment',
    {
      paymentId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'payment_id' },
      ticketId: { type: DataTypes.INTEGER, allowNull: false, field: 'ticket_id' },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      method: { type: DataTypes.ENUM('CASH', 'CARD', 'TRANSFER', 'MOBILE'), allowNull: false },
      paidAt: { type: DataTypes.DATE, allowNull: false, field: 'paid_at' },
      status: { type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'), allowNull: false, defaultValue: 'COMPLETED' }
    },
    { tableName: 'payments' }
  );

  Fine = sequelize.define(
    'Fine',
    {
      fineId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'fine_id' },
      ticketId: { type: DataTypes.INTEGER, allowNull: false, field: 'ticket_id' },
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      reason: { type: DataTypes.STRING(255), allowNull: false },
      issuedAt: { type: DataTypes.DATE, allowNull: false, field: 'issued_at' }
    },
    { tableName: 'fines' }
  );

  // Associations (foreign keys)
  User.hasMany(Vehicle, { foreignKey: { name: 'userId', field: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  Vehicle.belongsTo(User, { foreignKey: { name: 'userId', field: 'user_id', allowNull: false } });

  ParkingZone.hasMany(ParkingSlot, { foreignKey: { name: 'zoneId', field: 'zone_id', allowNull: false }, onDelete: 'CASCADE' });
  ParkingSlot.belongsTo(ParkingZone, { foreignKey: { name: 'zoneId', field: 'zone_id', allowNull: false } });

  User.hasMany(Ticket, { foreignKey: { name: 'userId', field: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
  Ticket.belongsTo(User, { foreignKey: { name: 'userId', field: 'user_id', allowNull: false } });

  ParkingSlot.hasMany(Ticket, { foreignKey: { name: 'slotId', field: 'slot_id', allowNull: false }, onDelete: 'RESTRICT' });
  Ticket.belongsTo(ParkingSlot, { foreignKey: { name: 'slotId', field: 'slot_id', allowNull: false } });

  TariffPlan.hasMany(Ticket, { foreignKey: { name: 'tariffId', field: 'tariff_id', allowNull: false }, onDelete: 'RESTRICT' });
  Ticket.belongsTo(TariffPlan, { foreignKey: { name: 'tariffId', field: 'tariff_id', allowNull: false } });

  Ticket.hasMany(Payment, { foreignKey: { name: 'ticketId', field: 'ticket_id', allowNull: false }, onDelete: 'CASCADE' });
  Payment.belongsTo(Ticket, { foreignKey: { name: 'ticketId', field: 'ticket_id', allowNull: false } });

  Ticket.hasMany(Fine, { foreignKey: { name: 'ticketId', field: 'ticket_id', allowNull: false }, onDelete: 'CASCADE' });
  Fine.belongsTo(Ticket, { foreignKey: { name: 'ticketId', field: 'ticket_id', allowNull: false } });

  initialized = true;

  return { User, Vehicle, ParkingZone, ParkingSlot, TariffPlan, Ticket, Payment, Fine };
}

module.exports = {
  initModels,
  isInitialized() {
    return initialized;
  },
  getModels() {
    assertInitialized();
    return { User, Vehicle, ParkingZone, ParkingSlot, TariffPlan, Ticket, Payment, Fine };
  },
  get User() {
    assertInitialized();
    return User;
  },
  get Vehicle() {
    assertInitialized();
    return Vehicle;
  },
  get ParkingZone() {
    assertInitialized();
    return ParkingZone;
  },
  get ParkingSlot() {
    assertInitialized();
    return ParkingSlot;
  },
  get TariffPlan() {
    assertInitialized();
    return TariffPlan;
  },
  get Ticket() {
    assertInitialized();
    return Ticket;
  },
  get Payment() {
    assertInitialized();
    return Payment;
  },
  get Fine() {
    assertInitialized();
    return Fine;
  }
};

