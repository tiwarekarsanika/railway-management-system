import supabaseClient from "../config/supabaseClient.js";

const supabase = supabaseClient.getClient();

const TrainStationsRepository = {
    async getAllTrainStationsByTrainId(train_code) {
        const { data, error } = await supabase
        .from("train_stations")
        .select("*")
        .eq("train_code", train_code);

        if (error) {
        throw new Error(`Error fetching train stations: ${error.message}`);
        }
        return data;
    },
    
    async createTrainStationMapping(stationData) {
        const { data, error } = await supabase
        .from("train_stations")
        .insert(stationData)
        .select("*");

        // console.log("Data:", data);
    
        if (error) {
        throw new Error(`Error creating train station: ${error.message}`);
        }
        return data;
    },
}

export default TrainStationsRepository;