const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const ctrl = require('../controllers/tickets.controller');
const { validateBody } = require('../validation/validate');
const { ticketsCreate, ticketsUpdate } = require('../validation/schemas');

const router = express.Router();

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: List tickets
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Ticket' }
 */
router.get('/', asyncHandler(ctrl.listTickets));

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get ticket by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Ticket' }
 *       404: { description: Not found }
 */
router.get('/:id', asyncHandler(ctrl.getTicket));

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, slotId, tariffId, issuedAt]
 *             properties:
 *               userId: { type: integer }
 *               slotId: { type: integer }
 *               tariffId: { type: integer }
 *               issuedAt: { type: string, format: date-time }
 *               expiresAt: { type: string, format: date-time }
 *               status: { type: string, enum: [ACTIVE, EXPIRED, CANCELLED, PAID] }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Ticket' }
 */
router.post('/', validateBody(ticketsCreate), asyncHandler(ctrl.createTicket));

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: Update ticket
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
 *               userId: { type: integer }
 *               slotId: { type: integer }
 *               tariffId: { type: integer }
 *               issuedAt: { type: string, format: date-time }
 *               expiresAt: { type: string, format: date-time }
 *               status: { type: string, enum: [ACTIVE, EXPIRED, CANCELLED, PAID] }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Ticket' }
 *       404: { description: Not found }
 */
router.put('/:id', validateBody(ticketsUpdate), asyncHandler(ctrl.updateTicket));

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Delete ticket
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: No Content }
 *       404: { description: Not found }
 */
router.delete('/:id', asyncHandler(ctrl.deleteTicket));

module.exports = router;

