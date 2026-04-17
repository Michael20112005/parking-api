'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert(
      'users',
      [
        { name: 'Admin User', email: 'admin@example.com', phone: '+10000000001', role: 'ADMIN', created_at: now, updated_at: now },
        { name: 'Staff User', email: 'staff@example.com', phone: '+10000000002', role: 'STAFF', created_at: now, updated_at: now },
        { name: 'Customer One', email: 'customer1@example.com', phone: '+10000000003', role: 'CUSTOMER', created_at: now, updated_at: now }
      ],
      {}
    );

    const users = await queryInterface.sequelize.query('SELECT user_id, email FROM users;', { type: queryInterface.sequelize.QueryTypes.SELECT });
    const byEmail = Object.fromEntries(users.map((u) => [u.email, u.user_id]));

    await queryInterface.bulkInsert(
      'vehicles',
      [
        {
          user_id: byEmail['customer1@example.com'],
          plate_number: 'AA-111-AA',
          brand: 'Toyota',
          model: 'Corolla',
          color: 'Blue',
          created_at: now,
          updated_at: now
        }
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'parking_zones',
      [
        { name: 'Zone A', location: 'Main street', created_at: now, updated_at: now },
        { name: 'Zone B', location: 'Back lot', created_at: now, updated_at: now }
      ],
      {}
    );

    const zones = await queryInterface.sequelize.query('SELECT zone_id, name FROM parking_zones;', {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });
    const zoneA = zones.find((z) => z.name === 'Zone A').zone_id;

    await queryInterface.bulkInsert(
      'parking_slots',
      [
        { zone_id: zoneA, status: 'AVAILABLE', type: 'STANDARD', created_at: now, updated_at: now },
        { zone_id: zoneA, status: 'AVAILABLE', type: 'EV', created_at: now, updated_at: now }
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'tariff_plans',
      [
        { name: 'Hourly', rate: 2.5, created_at: now, updated_at: now },
        { name: 'Daily', rate: 15.0, created_at: now, updated_at: now }
      ],
      {}
    );

    const slots = await queryInterface.sequelize.query('SELECT slot_id FROM parking_slots ORDER BY slot_id ASC;', {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });
    const tariffs = await queryInterface.sequelize.query('SELECT tariff_id, name FROM tariff_plans;', {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });
    const hourly = tariffs.find((t) => t.name === 'Hourly').tariff_id;

    await queryInterface.bulkInsert(
      'tickets',
      [
        {
          user_id: byEmail['customer1@example.com'],
          slot_id: slots[0].slot_id,
          tariff_id: hourly,
          issued_at: now,
          expires_at: new Date(now.getTime() + 60 * 60 * 1000),
          status: 'ACTIVE',
          created_at: now,
          updated_at: now
        }
      ],
      {}
    );

    const tickets = await queryInterface.sequelize.query('SELECT ticket_id FROM tickets ORDER BY ticket_id ASC;', {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });

    await queryInterface.bulkInsert(
      'payments',
      [
        {
          ticket_id: tickets[0].ticket_id,
          amount: 2.5,
          method: 'CARD',
          paid_at: now,
          status: 'COMPLETED',
          created_at: now,
          updated_at: now
        }
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'fines',
      [
        {
          ticket_id: tickets[0].ticket_id,
          amount: 10.0,
          reason: 'Overstayed',
          issued_at: now,
          created_at: now,
          updated_at: now
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('fines', null, {});
    await queryInterface.bulkDelete('payments', null, {});
    await queryInterface.bulkDelete('tickets', null, {});
    await queryInterface.bulkDelete('tariff_plans', null, {});
    await queryInterface.bulkDelete('parking_slots', null, {});
    await queryInterface.bulkDelete('parking_zones', null, {});
    await queryInterface.bulkDelete('vehicles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};

