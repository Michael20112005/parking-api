require('dotenv').config();

const { createApp } = require('./app');
const { initDb } = require('./db');

async function main() {
  const app = createApp();

  await initDb();

  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Parking API listening on port ${port}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Fatal startup error:', err);
  process.exit(1);
});

