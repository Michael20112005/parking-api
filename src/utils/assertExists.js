const { httpError } = require('./httpError');

async function assertExists(Model, pkValue, message) {
  const row = await Model.findByPk(pkValue);
  if (!row) throw httpError(400, message);
  return row;
}

module.exports = { assertExists };

