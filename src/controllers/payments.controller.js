const models = require('../models');
const { httpError } = require('../utils/httpError');
const { assertExists } = require('../utils/assertExists');

async function listPayments(req, res) {
  const { Payment } = models;
  const rows = await Payment.findAll({ order: [['paymentId', 'ASC']] });
  res.json(rows);
}

async function getPayment(req, res) {
  const { Payment } = models;
  const row = await Payment.findByPk(req.params.id);
  if (!row) throw httpError(404, 'Payment not found');
  res.json(row);
}

async function createPayment(req, res) {
  const { Payment, Ticket } = models;
  const { ticketId } = req.body;
  await assertExists(Ticket, ticketId, 'Invalid ticketId');
  const created = await Payment.create(req.body);
  res.status(201).json(created);
}

async function updatePayment(req, res) {
  const { Payment, Ticket } = models;
  const row = await Payment.findByPk(req.params.id);
  if (!row) throw httpError(404, 'Payment not found');

  const { ticketId } = req.body;
  if (ticketId !== undefined) await assertExists(Ticket, ticketId, 'Invalid ticketId');

  await row.update(req.body);
  res.json(row);
}

async function deletePayment(req, res) {
  const { Payment } = models;
  const row = await Payment.findByPk(req.params.id);
  if (!row) throw httpError(404, 'Payment not found');
  await row.destroy();
  res.status(204).send();
}

module.exports = { listPayments, getPayment, createPayment, updatePayment, deletePayment };

