import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const client = new Pool({
    connectionString: process.env.SUPABASE_DB_URL, 
});

client.connect()
    .then(() => console.log("PostgreSQL Connected"))
    .catch(err => console.error("PostgreSQL Connection Error:", err));

export default client;