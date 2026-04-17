const models = require('../models');
const { httpError } = require('../utils/httpError');
const { assertExists } = require('../utils/assertExists');

async function listTickets(req, res) {
  const { Ticket } = models;
  const tickets = await Ticket.findAll({ order: [['ticketId', 'ASC']] });
  res.json(tickets);
}

async function getTicket(req, res) {
  const { Ticket } = models;
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) throw httpError(404, 'Ticket not found');
  res.json(ticket);
}

async function createTicket(req, res) {
  const { Ticket, User, ParkingSlot, TariffPlan } = models;
  const { userId, slotId, tariffId } = req.body;

  await assertExists(User, userId, 'Invalid userId');
  await assertExists(ParkingSlot, slotId, 'Invalid slotId');
  await assertExists(TariffPlan, tariffId, 'Invalid tariffId');

  const created = await Ticket.create(req.body);
  res.status(201).json(created);
}

async function updateTicket(req, res) {
  const { Ticket, User, ParkingSlot, TariffPlan } = models;
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) throw httpError(404, 'Ticket not found');

  const { userId, slotId, tariffId } = req.body;

  if (userId !== undefined) await assertExists(User, userId, 'Invalid userId');
  if (slotId !== undefined) await assertExists(ParkingSlot, slotId, 'Invalid slotId');
  if (tariffId !== undefined) await assertExists(TariffPlan, tariffId, 'Invalid tariffId');

  await ticket.update(req.body);
  res.json(ticket);
}

async function deleteTicket(req, res) {
  const { Ticket } = models;
  const ticket = await Ticket.findByPk(req.params.id);
  if (!ticket) throw httpError(404, 'Ticket not found');
  await ticket.destroy();
  res.status(204).send();
}

module.exports = { listTickets, getTicket, createTicket, updateTicket, deleteTicket };

