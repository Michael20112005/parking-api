/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error: { type: string }
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field: { type: string, nullable: true }
 *               message: { type: string }
 *
 *     User:
 *       type: object
 *       properties:
 *         userId: { type: integer }
 *         name: { type: string }
 *         email: { type: string }
 *         phone: { type: string, nullable: true }
 *         role: { type: string, enum: [ADMIN, STAFF, CUSTOMER] }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     Vehicle:
 *       type: object
 *       properties:
 *         vehicleId: { type: integer }
 *         userId: { type: integer }
 *         plateNumber: { type: string }
 *         brand: { type: string, nullable: true }
 *         model: { type: string, nullable: true }
 *         color: { type: string, nullable: true }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     ParkingZone:
 *       type: object
 *       properties:
 *         zoneId: { type: integer }
 *         name: { type: string }
 *         location: { type: string, nullable: true }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     ParkingSlot:
 *       type: object
 *       properties:
 *         slotId: { type: integer }
 *         zoneId: { type: integer }
 *         status: { type: string, enum: [AVAILABLE, OCCUPIED, OUT_OF_SERVICE] }
 *         type: { type: string, enum: [COMPACT, STANDARD, LARGE, EV, DISABLED] }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     TariffPlan:
 *       type: object
 *       properties:
 *         tariffId: { type: integer }
 *         name: { type: string }
 *         rate: { type: number }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     Ticket:
 *       type: object
 *       properties:
 *         ticketId: { type: integer }
 *         userId: { type: integer }
 *         slotId: { type: integer }
 *         tariffId: { type: integer }
 *         issuedAt: { type: string, format: date-time }
 *         expiresAt: { type: string, format: date-time, nullable: true }
 *         status: { type: string, enum: [ACTIVE, EXPIRED, CANCELLED, PAID] }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     Payment:
 *       type: object
 *       properties:
 *         paymentId: { type: integer }
 *         ticketId: { type: integer }
 *         amount: { type: number }
 *         method: { type: string, enum: [CASH, CARD, TRANSFER, MOBILE] }
 *         paidAt: { type: string, format: date-time }
 *         status: { type: string, enum: [PENDING, COMPLETED, FAILED, REFUNDED] }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     Fine:
 *       type: object
 *       properties:
 *         fineId: { type: integer }
 *         ticketId: { type: integer }
 *         amount: { type: number }
 *         reason: { type: string }
 *         issuedAt: { type: string, format: date-time }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 */

