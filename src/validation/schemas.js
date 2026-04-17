const { z } = require('zod');

const id = z.number().int().positive();
const isoDate = z.coerce.date();

const userRole = z.enum(['ADMIN', 'STAFF', 'CUSTOMER']);
const slotStatus = z.enum(['AVAILABLE', 'OCCUPIED', 'OUT_OF_SERVICE']);
const slotType = z.enum(['COMPACT', 'STANDARD', 'LARGE', 'EV', 'DISABLED']);
const ticketStatus = z.enum(['ACTIVE', 'EXPIRED', 'CANCELLED', 'PAID']);
const paymentMethod = z.enum(['CASH', 'CARD', 'TRANSFER', 'MOBILE']);
const paymentStatus = z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']);

const usersCreate = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  phone: z.string().min(3).max(32).optional(),
  role: userRole.optional()
});
const usersUpdate = usersCreate.partial();

const vehiclesCreate = z.object({
  userId: id,
  plateNumber: z.string().min(1).max(32),
  brand: z.string().max(80).optional(),
  model: z.string().max(80).optional(),
  color: z.string().max(40).optional()
});
const vehiclesUpdate = vehiclesCreate.partial();

const parkingZonesCreate = z.object({
  name: z.string().min(1).max(120),
  location: z.string().max(255).optional()
});
const parkingZonesUpdate = parkingZonesCreate.partial();

const parkingSlotsCreate = z.object({
  zoneId: id,
  status: slotStatus.optional(),
  type: slotType.optional()
});
const parkingSlotsUpdate = parkingSlotsCreate.partial();

const tariffPlansCreate = z.object({
  name: z.string().min(1).max(120),
  rate: z.coerce.number().positive()
});
const tariffPlansUpdate = tariffPlansCreate.partial();

const ticketsCreate = z.object({
  userId: id,
  slotId: id,
  tariffId: id,
  issuedAt: isoDate,
  expiresAt: isoDate.optional(),
  status: ticketStatus.optional()
});
const ticketsUpdate = ticketsCreate.partial();

const paymentsCreate = z.object({
  ticketId: id,
  amount: z.coerce.number().positive(),
  method: paymentMethod,
  paidAt: isoDate,
  status: paymentStatus.optional()
});
const paymentsUpdate = paymentsCreate.partial();

const finesCreate = z.object({
  ticketId: id,
  amount: z.coerce.number().positive(),
  reason: z.string().min(1).max(255),
  issuedAt: isoDate
});
const finesUpdate = finesCreate.partial();

module.exports = {
  usersCreate,
  usersUpdate,
  vehiclesCreate,
  vehiclesUpdate,
  parkingZonesCreate,
  parkingZonesUpdate,
  parkingSlotsCreate,
  parkingSlotsUpdate,
  tariffPlansCreate,
  tariffPlansUpdate,
  ticketsCreate,
  ticketsUpdate,
  paymentsCreate,
  paymentsUpdate,
  finesCreate,
  finesUpdate
};

