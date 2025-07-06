const createBookingsTable = `
    CREATE TABLE IF NOT EXISTS bookings (
        booking_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(uid),
        train_id UUID REFERENCES trains(train_id),
        boarding_station TEXT NOT NULL,
        destination_station TEXT NOT NULL,
        number_of_seats INT NOT NULL CHECK (number_of_seats > 0),
        status TEXT NOT NULL CHECK (status IN ('booked', 'cancelled')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export default createBookingsTable;