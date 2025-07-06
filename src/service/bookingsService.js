import BookingRepository from "../repository/bookingsRepository.js";
import pgClient from '../config/pgClient.js';

class BookingsService {
    static createBookingService = async (bookingData) => {
        const client = await pgClient.connect();

        try {
            await client.query('BEGIN');

            const trainRes = await client.query(
                `SELECT total_seats FROM trains WHERE train_id = $1 FOR UPDATE`,
                [bookingData.train_id]
            );

            if (trainRes.rows.length === 0) {
                throw new Error("Train instance not found");
            }

            const totalSeats = trainRes.rows[0].total_seats;

            const bookingRes = await client.query(
                `SELECT COALESCE(SUM(number_of_seats), 0) AS booked 
             FROM bookings 
             WHERE train_id = $1 AND status = 'booked'`,
                [bookingData.train_id]
            );

            const booked = bookingRes.rows[0].booked;
            const available = totalSeats - booked;

            if (available < bookingData.number_of_seats) {
                throw new Error("Not enough seats available");
            }

            const insertRes = await client.query(
                `INSERT INTO bookings 
             (user_id, train_id, boarding_station, destination_station, number_of_seats, status, created_at)
             VALUES ($1, $2, $3, $4, $5, 'booked', NOW())
             RETURNING *`,
                [
                    bookingData.user_id,
                    bookingData.train_id,
                    bookingData.boarding_station,
                    bookingData.destination_station,
                    bookingData.number_of_seats
                ]
            );

            await client.query('COMMIT');
            return insertRes.rows[0]; 

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
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