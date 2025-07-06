import BookingsService from "../service/bookingsService.js";

class BookingsController {
    static createBookingController = async (req, res) => {
        try {
            const {user_id, train_id } = req.query;
            if (!user_id || !train_id) {
                return res.status(400).json({ error: "User ID and Train ID are required" });
            }
            const bookingData = req.body;
            bookingData.user_id = user_id;
            bookingData.train_id = train_id;
            const newBooking = await BookingsService.createBookingService(bookingData);
            res.status(201).json(newBooking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static getAllBookingsController = async (req, res) => {
        try {
            const bookings = await BookingsService.getAllBookingsService();
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static getBookingByIdController = async (req, res) => {
        try {
            const { booking_id } = req.params;
            const booking = await BookingsService.getBookingByIdService(booking_id);
            if (!booking) {
                return res.status(404).json({ error: "Booking not found" });
            }
            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static getAllBookingsForATrainIdController = async (req, res) => {
        try {
            const { train_id } = req.params;
            const bookings = await BookingsService.getAllBookingsForATrainIdService(train_id);
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default BookingsController;