const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const ctrl = require('../controllers/fines.controller');
const { validateBody } = require('../validation/validate');
const { finesCreate, finesUpdate } = require('../validation/schemas');

const router = express.Router();

/**
 * @swagger
 * /api/fines:
 *   get:
 *     summary: List fines
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Fine' }
 */
router.get('/', asyncHandler(ctrl.listFines));

/**
 * @swagger
 * /api/fines/{id}:
 *   get:
 *     summary: Get fine by id
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
 *             schema: { $ref: '#/components/schemas/Fine' }
 *       404: { description: Not found }
 */
router.get('/:id', asyncHandler(ctrl.getFine));

/**
 * @swagger
 * /api/fines:
 *   post:
 *     summary: Create fine
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ticketId, amount, reason, issuedAt]
 *             properties:
 *               ticketId: { type: integer }
 *               amount: { type: number }
 *               reason: { type: string }
 *               issuedAt: { type: string, format: date-time }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Fine' }
 */
router.post('/', validateBody(finesCreate), asyncHandler(ctrl.createFine));

/**
 * @swagger
 * /api/fines/{id}:
 *   put:
 *     summary: Update fine
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
 *               reason: { type: string }
 *               issuedAt: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Fine' }
 *       404: { description: Not found }
 */
router.put('/:id', validateBody(finesUpdate), asyncHandler(ctrl.updateFine));

/**
 * @swagger
 * /api/fines/{id}:
 *   delete:
 *     summary: Delete fine
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: No Content }
 *       404: { description: Not found }
 */
router.delete('/:id', asyncHandler(ctrl.deleteFine));

module.exports = router;

