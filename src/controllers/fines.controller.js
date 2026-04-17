const models = require('../models');
const { httpError } = require('../utils/httpError');
const { assertExists } = require('../utils/assertExists');

async function listFines(req, res) {
  const { Fine } = models;
  const rows = await Fine.findAll({ order: [['fineId', 'ASC']] });
  res.json(rows);
}

async function getFine(req, res) {
  const { Fine } = models;
  const row = await Fine.findByPk(req.params.id);
  if (!row) throw httpError(404, 'Fine not found');
  res.json(row);
}

async function createFine(req, res) {
  const { Fine, Ticket } = models;
  const { ticketId } = req.body;
  await assertExists(Ticket, ticketId, 'Invalid ticketId');
  const created = await Fine.create(req.body);
  res.status(201).json(created);
}

async function updateFine(req, res) {
  const { Fine, Ticket } = models;
  const row = await Fine.findByPk(req.params.id);
  if (!row) throw httpError(404, 'Fine not found');

  const { ticketId } = req.body;
  if (ticketId !== undefined) await assertExists(Ticket, ticketId, 'Invalid ticketId');

  await row.update(req.body);
  res.json(row);
}

async function deleteFine(req, res) {
  const { Fine } = models;
  const row = await Fine.findByPk(req.params.id);
  if (!row) throw httpError(404, 'Fine not found');
  await row.destroy();
  res.status(204).send();
}

module.exports = { listFines, getFine, createFine, updateFine, deleteFine };

