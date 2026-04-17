const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const ctrl = require('../controllers/tariffPlans.controller');
const { validateBody } = require('../validation/validate');
const { tariffPlansCreate, tariffPlansUpdate } = require('../validation/schemas');

const router = express.Router();

/**
 * @swagger
 * /api/tariff-plans:
 *   get:
 *     summary: List tariff plans
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/TariffPlan' }
 */
router.get('/', asyncHandler(ctrl.listTariffPlans));

/**
 * @swagger
 * /api/tariff-plans/{id}:
 *   get:
 *     summary: Get tariff plan by id
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
 *             schema: { $ref: '#/components/schemas/TariffPlan' }
 *       404: { description: Not found }
 */
router.get('/:id', asyncHandler(ctrl.getTariffPlan));

/**
 * @swagger
 * /api/tariff-plans:
 *   post:
 *     summary: Create tariff plan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, rate]
 *             properties:
 *               name: { type: string }
 *               rate: { type: number }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/TariffPlan' }
 */
router.post('/', validateBody(tariffPlansCreate), asyncHandler(ctrl.createTariffPlan));

/**
 * @swagger
 * /api/tariff-plans/{id}:
 *   put:
 *     summary: Update tariff plan
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
 *               rate: { type: number }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/TariffPlan' }
 *       404: { description: Not found }
 */
router.put('/:id', validateBody(tariffPlansUpdate), asyncHandler(ctrl.updateTariffPlan));

/**
 * @swagger
 * /api/tariff-plans/{id}:
 *   delete:
 *     summary: Delete tariff plan
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: No Content }
 *       404: { description: Not found }
 */
router.delete('/:id', asyncHandler(ctrl.deleteTariffPlan));

module.exports = router;

