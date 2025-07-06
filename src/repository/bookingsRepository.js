import supabaseClient from "../config/supabaseClient.js";

const supabase = supabaseClient.getClient();

class BookingRepository {
    static async createBooking(bookingData) {
        const { data, error } = await supabase
            .from('bookings')
            .insert(bookingData)
            .select('*')
            .single();

        if (error) {
            throw new Error(`Error creating booking: ${error.message}`);
        }
        return data;
    }

    static async getAllBookings() {
        const { data, error } = await supabase
            .from('bookings')
            .select('*');

        if (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
        return data;
    }

    static async getBookingById(booking_id) {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('booking_id', booking_id)
            .single();

        if (error) {
            throw new Error(`Error fetching booking with ID ${booking_id}: ${error.message}`);
        }
        return data;
    }

    static async getAllBookingsForATrainId(train_id) {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('train_id', train_id);

        if (error) {
            throw new Error(`Error fetching bookings for train ID ${train_id}: ${error.message}`);
        }
        return data || [];
    }
}

export default BookingRepository;