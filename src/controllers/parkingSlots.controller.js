const models = require('../models');
const { httpError } = require('../utils/httpError');
const { assertExists } = require('../utils/assertExists');

async function listParkingSlots(req, res) {
  const { ParkingSlot } = models;
  const rows = await ParkingSlot.findAll({ order: [['slotId', 'ASC']] });
  res.json(rows);
}

async function getParkingSlot(req, res) {
  const { ParkingSlot } = models;
  const row = await ParkingSlot.findByPk(req.params.id);
  if (!row) throw httpError(404, 'ParkingSlot not found');
  res.json(row);
}

async function createParkingSlot(req, res) {
  const { ParkingSlot, ParkingZone } = models;
  const { zoneId } = req.body;
  await assertExists(ParkingZone, zoneId, 'Invalid zoneId');
  const created = await ParkingSlot.create(req.body);
  res.status(201).json(created);
}

async function updateParkingSlot(req, res) {
  const { ParkingSlot, ParkingZone } = models;
  const row = await ParkingSlot.findByPk(req.params.id);
  if (!row) throw httpError(404, 'ParkingSlot not found');

  const { zoneId } = req.body;
  if (zoneId !== undefined) await assertExists(ParkingZone, zoneId, 'Invalid zoneId');

  await row.update(req.body);
  res.json(row);
}

async function deleteParkingSlot(req, res) {
  const { ParkingSlot } = models;
  const row = await ParkingSlot.findByPk(req.params.id);
  if (!row) throw httpError(404, 'ParkingSlot not found');
  await row.destroy();
  res.status(204).send();
}

module.exports = { listParkingSlots, getParkingSlot, createParkingSlot, updateParkingSlot, deleteParkingSlot };

