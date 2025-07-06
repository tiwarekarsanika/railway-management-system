import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";

dotenv.config(); 

const supabaseUrl = process.env.SUPABASE_API_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const checkDBConnection = async () => {
    try {
        const { data, error } = await supabase.from('users').select('*').limit(1);
        if (error) {
            console.log("Supabase database connection established, but 'users' table does not exist.");
        } else {
            console.log("Supabase database connected successfully!");
        }
    } catch (err) {
        console.error("Supabase database connection failed:", err.message);
        process.exit(1);
    }
};

export { supabase, checkDBConnection };
