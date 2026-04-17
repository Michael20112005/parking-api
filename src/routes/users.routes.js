const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const ctrl = require('../controllers/users.controller');
const { validateBody } = require('../validation/validate');
const { usersCreate, usersUpdate } = require('../validation/schemas');

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List users
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/User' }
 */
router.get('/', asyncHandler(ctrl.listUsers));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.get('/:id', asyncHandler(ctrl.getUser));

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               phone: { type: string }
 *               role: { type: string, enum: [ADMIN, STAFF, CUSTOMER] }
 *     responses:
 *       201: { description: Created }
 */
router.post('/', validateBody(usersCreate), asyncHandler(ctrl.createUser));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               phone: { type: string }
 *               role: { type: string, enum: [ADMIN, STAFF, CUSTOMER] }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.put('/:id', validateBody(usersUpdate), asyncHandler(ctrl.updateUser));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: No Content }
 *       404: { description: Not found }
 */
router.delete('/:id', asyncHandler(ctrl.deleteUser));

module.exports = router;

