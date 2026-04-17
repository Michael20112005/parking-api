const models = require('../models');
const { httpError } = require('../utils/httpError');

async function listUsers(req, res) {
  const { User } = models;
  const users = await User.findAll({ order: [['userId', 'ASC']] });
  res.json(users);
}

async function getUser(req, res) {
  const { User } = models;
  const user = await User.findByPk(req.params.id);
  if (!user) throw httpError(404, 'User not found');
  res.json(user);
}

async function createUser(req, res) {
  const { User } = models;
  const { name, email, phone, role } = req.body;
  const created = await User.create({ name, email, phone, role });
  res.status(201).json(created);
}

async function updateUser(req, res) {
  const { User } = models;
  const user = await User.findByPk(req.params.id);
  if (!user) throw httpError(404, 'User not found');

  const { name, email, phone, role } = req.body;
  await user.update({ name, email, phone, role });
  res.json(user);
}

async function deleteUser(req, res) {
  const { User } = models;
  const user = await User.findByPk(req.params.id);
  if (!user) throw httpError(404, 'User not found');
  await user.destroy();
  res.status(204).send();
}

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };

