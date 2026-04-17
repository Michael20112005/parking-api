'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(120), allowNull: false },
      email: { type: Sequelize.STRING(254), allowNull: false, unique: true },
      phone: { type: Sequelize.STRING(32), allowNull: true },
      role: { type: Sequelize.ENUM('ADMIN', 'STAFF', 'CUSTOMER'), allowNull: false, defaultValue: 'CUSTOMER' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('vehicles', {
      vehicle_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'user_id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      plate_number: { type: Sequelize.STRING(32), allowNull: false, unique: true },
      brand: { type: Sequelize.STRING(80), allowNull: true },
      model: { type: Sequelize.STRING(80), allowNull: true },
      color: { type: Sequelize.STRING(40), allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('parking_zones', {
      zone_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(120), allowNull: false, unique: true },
      location: { type: Sequelize.STRING(255), allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('parking_slots', {
      slot_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      zone_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'parking_zones', key: 'zone_id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM('AVAILABLE', 'OCCUPIED', 'OUT_OF_SERVICE'),
        allowNull: false,
        defaultValue: 'AVAILABLE'
      },
      type: {
        type: Sequelize.ENUM('COMPACT', 'STANDARD', 'LARGE', 'EV', 'DISABLED'),
        allowNull: false,
        defaultValue: 'STANDARD'
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('tariff_plans', {
      tariff_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(120), allowNull: false, unique: true },
      rate: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('tickets', {
      ticket_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'user_id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      slot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'parking_slots', key: 'slot_id' },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      },
      tariff_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tariff_plans', key: 'tariff_id' },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      },
      issued_at: { type: Sequelize.DATE, allowNull: false },
      expires_at: { type: Sequelize.DATE, allowNull: true },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'EXPIRED', 'CANCELLED', 'PAID'),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('payments', {
      payment_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      ticket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tickets', key: 'ticket_id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      method: { type: Sequelize.ENUM('CASH', 'CARD', 'TRANSFER', 'MOBILE'), allowNull: false },
      paid_at: { type: Sequelize.DATE, allowNull: false },
      status: {
        type: Sequelize.ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'),
        allowNull: false,
        defaultValue: 'COMPLETED'
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.createTable('fines', {
      fine_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      ticket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tickets', key: 'ticket_id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      reason: { type: Sequelize.STRING(255), allowNull: false },
      issued_at: { type: Sequelize.DATE, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('fines');
    await queryInterface.dropTable('payments');
    await queryInterface.dropTable('tickets');
    await queryInterface.dropTable('tariff_plans');
    await queryInterface.dropTable('parking_slots');
    await queryInterface.dropTable('parking_zones');
    await queryInterface.dropTable('vehicles');
    await queryInterface.dropTable('users');

    // Clean up enum types (Postgres)
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_parking_slots_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_parking_slots_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_tickets_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_payments_method";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_payments_status";');
  }
};

