import express from 'express';
import userRoutes from './userRoutes.js';
import trainRoutes from './trainRoutes.js';
// import bookingRoutes from './bookingRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/trains', trainRoutes);
// router.use('/bookings', bookingRoutes);

export default router;