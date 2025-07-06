import createTrainsTable from '../schemas/trainsSchema.js';
import { createTable } from '../utils/dbUtil.js';

class Trains {
    static async createTable() {
        await createTable(createTrainsTable, "Trains");
    }
}

export default Trains;