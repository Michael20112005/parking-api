const models = require('../models');
const { httpError } = require('../utils/httpError');

async function listTariffPlans(req, res) {
  const { TariffPlan } = models;
  const rows = await TariffPlan.findAll({ order: [['tariffId', 'ASC']] });
  res.json(rows);
}

async function getTariffPlan(req, res) {
  const { TariffPlan } = models;
  const row = await TariffPlan.findByPk(req.params.id);
  if (!row) throw httpError(404, 'TariffPlan not found');
  res.json(row);
}

async function createTariffPlan(req, res) {
  const { TariffPlan } = models;
  const created = await TariffPlan.create(req.body);
  res.status(201).json(created);
}

async function updateTariffPlan(req, res) {
  const { TariffPlan } = models;
  const row = await TariffPlan.findByPk(req.params.id);
  if (!row) throw httpError(404, 'TariffPlan not found');
  await row.update(req.body);
  res.json(row);
}

async function deleteTariffPlan(req, res) {
  const { TariffPlan } = models;
  const row = await TariffPlan.findByPk(req.params.id);
  if (!row) throw httpError(404, 'TariffPlan not found');
  await row.destroy();
  res.status(204).send();
}

module.exports = { listTariffPlans, getTariffPlan, createTariffPlan, updateTariffPlan, deleteTariffPlan };

