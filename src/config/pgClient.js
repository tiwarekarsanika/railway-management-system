import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg;

const client = new Client({
    connectionString: process.env.SUPABASE_DB_URL, 
});

client.connect()
    .then(() => console.log("PostgreSQL Connected"))
    .catch(err => console.error("PostgreSQL Connection Error:", err));

export default client;