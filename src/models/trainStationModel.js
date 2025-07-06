import createTrainStationsTable from '../schemas/trainStationsSchema.js';
import { createTable } from '../utils/dbUtil.js';

class TrainStations {
    static async createTable() {
        await createTable(createTrainStationsTable, "TrainStations");
    }
}

export default TrainStations;