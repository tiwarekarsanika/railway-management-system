import BookingsController from "../controller/bookingsController.js";
import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createBooking", verifyToken, BookingsController.createBookingController);
router.get("/allBookings", verifyToken, verifyAdmin, BookingsController.getAllBookingsController);
router.get("/getBooking/:booking_id", verifyToken, BookingsController.getBookingByIdController);
router.get("/getAllBookingsForTrain/:train_id", verifyToken, BookingsController.getAllBookingsForATrainIdController);       

export default router;