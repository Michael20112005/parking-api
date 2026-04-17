const models = require('../models');
const { httpError } = require('../utils/httpError');
const { assertExists } = require('../utils/assertExists');

async function listVehicles(req, res) {
  const { Vehicle } = models;
  const rows = await Vehicle.findAll({ order: [['vehicleId', 'ASC']] });
  res.json(rows);
}

async function getVehicle(req, res) {
  const { Vehicle } = models;
  const row = await Vehicle.findByPk(req.params.id);
  if (!row) throw httpError(404, 'Vehicle not found');
  res.json(row);
}

async function createVehicle(req, res) {
  const { Vehicle, User } = models;
  const { userId, plateNumber, brand, model, color } = req.body;
  await assertExists(User, userId, 'Invalid userId');
  const created = await Vehicle.create({ userId, plateNumber, brand, model, color });
  res.status(201).json(created);
}

async function updateVehicle(req, res) {
  const { Vehicle, User } = models;
  const row = await Vehicle.findByPk(req.params.id);
  if (!row) throw httpError(404, 'Vehicle not found');

  const { userId } = req.body;
  if (userId !== undefined) await assertExists(User, userId, 'Invalid userId');

  await row.update(req.body);
  res.json(row);
}

async function deleteVehicle(req, res) {
  const { Vehicle } = models;
  const row = await Vehicle.findByPk(req.params.id);
  if (!row) throw httpError(404, 'Vehicle not found');
  await row.destroy();
  res.status(204).send();
}

module.exports = { listVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle };

