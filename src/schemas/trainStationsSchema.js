const createTrainStationsTable = `
    CREATE TABLE IF NOT EXISTS train_stations (
        mapping_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        train_id UUID REFERENCES trains(train_id),
        station_name TEXT NOT NULL,
        arrival_time TIMESTAMP NOT NULL,
        departure_time TIMESTAMP NOT NULL,
        platform_number INT NOT NULL,
        sequence INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;


export default createTrainStationsTable;
