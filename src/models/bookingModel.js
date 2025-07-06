import createBookingsTable from '../schemas/bookingsSchema.js';
import { createTable } from '../utils/dbUtil.js';

class Bookings {
    static async createTable() {
        await createTable(createBookingsTable, "Bookings");
    }
}

export default Bookings;