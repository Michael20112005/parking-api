const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const ctrl = require('../controllers/payments.controller');
const { validateBody } = require('../validation/validate');
const { paymentsCreate, paymentsUpdate } = require('../validation/schemas');

const router = express.Router();

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: List payments
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Payment' }
 */
router.get('/', asyncHandler(ctrl.listPayments));

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment by id
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
 *             schema: { $ref: '#/components/schemas/Payment' }
 *       404: { description: Not found }
 */
router.get('/:id', asyncHandler(ctrl.getPayment));

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ticketId, amount, method, paidAt]
 *             properties:
 *               ticketId: { type: integer }
 *               amount: { type: number }
 *               method: { type: string, enum: [CASH, CARD, TRANSFER, MOBILE] }
 *               paidAt: { type: string, format: date-time }
 *               status: { type: string, enum: [PENDING, COMPLETED, FAILED, REFUNDED] }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Payment' }
 */
router.post('/', validateBody(paymentsCreate), asyncHandler(ctrl.createPayment));

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Update payment
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
 *               ticketId: { type: integer }
 *               amount: { type: number }
 *               method: { type: string, enum: [CASH, CARD, TRANSFER, MOBILE] }
 *               paidAt: { type: string, format: date-time }
 *               status: { type: string, enum: [PENDING, COMPLETED, FAILED, REFUNDED] }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Payment' }
 *       404: { description: Not found }
 */
router.put('/:id', validateBody(paymentsUpdate), asyncHandler(ctrl.updatePayment));

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete payment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: No Content }
 *       404: { description: Not found }
 */
router.delete('/:id', asyncHandler(ctrl.deletePayment));

module.exports = router;

