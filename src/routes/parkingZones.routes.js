const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const ctrl = require('../controllers/parkingZones.controller');
const { validateBody } = require('../validation/validate');
const { parkingZonesCreate, parkingZonesUpdate } = require('../validation/schemas');

const router = express.Router();

/**
 * @swagger
 * /api/parking-zones:
 *   get:
 *     summary: List parking zones
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/ParkingZone' }
 */
router.get('/', asyncHandler(ctrl.listParkingZones));

/**
 * @swagger
 * /api/parking-zones/{id}:
 *   get:
 *     summary: Get parking zone by id
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
 *             schema: { $ref: '#/components/schemas/ParkingZone' }
 *       404: { description: Not found }
 */
router.get('/:id', asyncHandler(ctrl.getParkingZone));

/**
 * @swagger
 * /api/parking-zones:
 *   post:
 *     summary: Create parking zone
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 *               location: { type: string }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ParkingZone' }
 */
router.post('/', validateBody(parkingZonesCreate), asyncHandler(ctrl.createParkingZone));

/**
 * @swagger
 * /api/parking-zones/{id}:
 *   put:
 *     summary: Update parking zone
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
 *               location: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ParkingZone' }
 *       404: { description: Not found }
 */
router.put('/:id', validateBody(parkingZonesUpdate), asyncHandler(ctrl.updateParkingZone));

/**
 * @swagger
 * /api/parking-zones/{id}:
 *   delete:
 *     summary: Delete parking zone
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: No Content }
 *       404: { description: Not found }
 */
router.delete('/:id', asyncHandler(ctrl.deleteParkingZone));

module.exports = router;

