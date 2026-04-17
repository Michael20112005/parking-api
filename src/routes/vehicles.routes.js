const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const ctrl = require('../controllers/vehicles.controller');
const { validateBody } = require('../validation/validate');
const { vehiclesCreate, vehiclesUpdate } = require('../validation/schemas');

const router = express.Router();

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: List vehicles
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Vehicle' }
 */
router.get('/', asyncHandler(ctrl.listVehicles));

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get vehicle by id
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
 *             schema: { $ref: '#/components/schemas/Vehicle' }
 *       404: { description: Not found }
 */
router.get('/:id', asyncHandler(ctrl.getVehicle));

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Create vehicle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, plateNumber]
 *             properties:
 *               userId: { type: integer }
 *               plateNumber: { type: string }
 *               brand: { type: string }
 *               model: { type: string }
 *               color: { type: string }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Vehicle' }
 */
router.post('/', validateBody(vehiclesCreate), asyncHandler(ctrl.createVehicle));

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Update vehicle
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
 *               plateNumber: { type: string }
 *               brand: { type: string }
 *               model: { type: string }
 *               color: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Vehicle' }
 *       404: { description: Not found }
 */
router.put('/:id', validateBody(vehiclesUpdate), asyncHandler(ctrl.updateVehicle));

/**
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     summary: Delete vehicle
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: No Content }
 *       404: { description: Not found }
 */
router.delete('/:id', asyncHandler(ctrl.deleteVehicle));

module.exports = router;

