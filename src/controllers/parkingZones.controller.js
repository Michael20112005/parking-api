const models = require('../models');
const { httpError } = require('../utils/httpError');

async function listParkingZones(req, res) {
  const { ParkingZone } = models;
  const rows = await ParkingZone.findAll({ order: [['zoneId', 'ASC']] });
  res.json(rows);
}

async function getParkingZone(req, res) {
  const { ParkingZone } = models;
  const row = await ParkingZone.findByPk(req.params.id);
  if (!row) throw httpError(404, 'ParkingZone not found');
  res.json(row);
}

async function createParkingZone(req, res) {
  const { ParkingZone } = models;
  const created = await ParkingZone.create(req.body);
  res.status(201).json(created);
}

async function updateParkingZone(req, res) {
  const { ParkingZone } = models;
  const row = await ParkingZone.findByPk(req.params.id);
  if (!row) throw httpError(404, 'ParkingZone not found');
  await row.update(req.body);
  res.json(row);
}

async function deleteParkingZone(req, res) {
  const { ParkingZone } = models;
  const row = await ParkingZone.findByPk(req.params.id);
  if (!row) throw httpError(404, 'ParkingZone not found');
  await row.destroy();
  res.status(204).send();
}

module.exports = { listParkingZones, getParkingZone, createParkingZone, updateParkingZone, deleteParkingZone };

