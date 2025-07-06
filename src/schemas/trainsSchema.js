const createTrainsTable =`
    CREATE TABLE IF NOT EXISTS trains (
        train_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        train_name TEXT NOT NULL,
        source TEXT NOT NULL,
        destination TEXT NOT NULL,
        departure_date DATE NOT NULL,
        arrival_date DATE NOT NULL,
        total_seats INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`

export default createTrainsTable;