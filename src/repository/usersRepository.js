import supabaseClient from '../config/supabaseClient.js';

const supabase = supabaseClient.getClient();

class UsersRepository {
    static loginUser = async(email, password) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .single();

        if (error) {
            throw new Error(`Error logging in user: ${error.message}`);
        }

        return data;
    }

    static registerUser= async(userData) => {
        const { data, error } = await supabase
            .from('users')
            .insert([userData])
            .select()
            .single();

        if (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }

        return data;
    }

    static getUserById = async(userId) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }

        return data;
    }

    static getUserByEmail = async(email) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        if (error) {
            throw new Error(`Error fetching user by email: ${error.message}`);
        }

        return data;
    }
}

export default UsersRepository;