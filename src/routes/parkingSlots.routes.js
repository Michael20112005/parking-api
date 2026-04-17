const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const ctrl = require('../controllers/parkingSlots.controller');
const { validateBody } = require('../validation/validate');
const { parkingSlotsCreate, parkingSlotsUpdate } = require('../validation/schemas');

const router = express.Router();

/**
 * @swagger
 * /api/parking-slots:
 *   get:
 *     summary: List parking slots
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/ParkingSlot' }
 */
router.get('/', asyncHandler(ctrl.listParkingSlots));

/**
 * @swagger
 * /api/parking-slots/{id}:
 *   get:
 *     summary: Get parking slot by id
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
 *             schema: { $ref: '#/components/schemas/ParkingSlot' }
 *       404: { description: Not found }
 */
router.get('/:id', asyncHandler(ctrl.getParkingSlot));

/**
 * @swagger
 * /api/parking-slots:
 *   post:
 *     summary: Create parking slot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [zoneId]
 *             properties:
 *               zoneId: { type: integer }
 *               status: { type: string, enum: [AVAILABLE, OCCUPIED, OUT_OF_SERVICE] }
 *               type: { type: string, enum: [COMPACT, STANDARD, LARGE, EV, DISABLED] }
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ParkingSlot' }
 */
router.post('/', validateBody(parkingSlotsCreate), asyncHandler(ctrl.createParkingSlot));

/**
 * @swagger
 * /api/parking-slots/{id}:
 *   put:
 *     summary: Update parking slot
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
 *               zoneId: { type: integer }
 *               status: { type: string, enum: [AVAILABLE, OCCUPIED, OUT_OF_SERVICE] }
 *               type: { type: string, enum: [COMPACT, STANDARD, LARGE, EV, DISABLED] }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ParkingSlot' }
 *       404: { description: Not found }
 */
router.put('/:id', validateBody(parkingSlotsUpdate), asyncHandler(ctrl.updateParkingSlot));

/**
 * @swagger
 * /api/parking-slots/{id}:
 *   delete:
 *     summary: Delete parking slot
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: No Content }
 *       404: { description: Not found }
 */
router.delete('/:id', asyncHandler(ctrl.deleteParkingSlot));

module.exports = router;

