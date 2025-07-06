import pgClient from '../config/pgClient.js';
import BookingsTable from '../models/bookingModel.js'
import UsersTable from '../models/userModel.js';
import TrainsTable from '../models/trainModel.js';
import TrainStationsTable from '../models/trainStationModel.js';

const initialiseDB = async () => {
    try {
        console.log("PostgreSQL Connected");
        await BookingsTable.createTable();
        await UsersTable.createTable();
        await TrainsTable.createTable();
        await TrainStationsTable.createTable();
        console.log("Database tables initialized successfully");
        await pgClient.end();
    } catch (error) {
        console.error("PostgreSQL Connection Error:", error);
        throw error; 
    }
};

export default initialiseDB;
