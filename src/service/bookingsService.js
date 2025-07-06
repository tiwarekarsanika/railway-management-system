import BookingRepository from "../repository/bookingsRepository.js";

class BookingsService {
    static createBookingService = async (bookingData) => {
        return BookingRepository.createBooking(bookingData);
    }

    static getAllBookingsService = async () => {
        return BookingRepository.getAllBookings();
    }

    static getBookingByIdService = async (booking_id) => {
        return BookingRepository.getBookingById(booking_id);
    }

    static getAllBookingsForATrainIdService = async (train_id) => {
        return BookingRepository.getAllBookingsForATrainId(train_id);
    }
}

export default BookingsService;