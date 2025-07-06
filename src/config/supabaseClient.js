import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

class SupabaseClient {
    static instance;

    constructor() {
        if (!SupabaseClient.instance) {
            this.supabase = createClient(process.env.SUPABASE_API_URL, process.env.SUPABASE_ANON_KEY);
            SupabaseClient.instance = this;
        }
        return SupabaseClient.instance;
    }

    getClient() {
        return this.supabase;
    }
}

export default new SupabaseClient();
