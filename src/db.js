const { Sequelize } = require('sequelize');
const { initModels } = require('./models');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    dialect: 'postgres',
    logging: false,
    define: {
      underscored: true,
      timestamps: true
    }
  }
);

initModels(sequelize);

async function initDb() {
  await sequelize.authenticate();

  // For production, prefer migrations via sequelize-cli.
  if (String(process.env.DB_SYNC).toLowerCase() === 'true') {
    await sequelize.sync();
  }
}

module.exports = { sequelize, initDb };

