import supabaseClient from "../config/supabaseClient.js";

const supabase = supabaseClient.getClient();

class TrainsRepository {
    static async createTrain(trainData) {
        const { data, error } = await supabase
            .from('trains')
            .insert(trainData)
            .select('*')
            .single();

        if (error) {
            throw new Error(`Error creating train: ${error.message}`);
        }
        return data;
    }

    static async getAllTrains() {
        const { data, error } = await supabase
            .from('trains')
            .select('*');

        if (error) {
            throw new Error(`Error fetching trains: ${error.message}`);
        }
        return data;
    }

    static async getTrainById(train_id) {
        const { data, error } = await supabase
            .from('trains')
            .select('*')
            .eq('train_id', train_id)
            .single();

        if (error) {
            throw new Error(`Error fetching train with ID ${train_id}: ${error.message}`);
        }
        return data;
    }

    static async getTrainBySourceAndDestination(source, destination) {
        const { data, error } = await supabase
            .from('trains')
            .select('*')
            .eq('source', source)
            .eq('destination', destination);

        if (error) {
            throw new Error(`Error fetching trains from ${source} to ${destination}: ${error.message}`);
        }
        return data;
    }
}

export default TrainsRepository;