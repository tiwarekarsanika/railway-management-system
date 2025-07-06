const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        uid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        gender TEXT,
        dob DATE,
        aadhaar_number TEXT UNIQUE,
        phone_number TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export default createUsersTable;