import createUsersTable from '../schemas/usersSchema.js';
import { createTable } from '../utils/dbUtil.js';

class User {
    static async createTable() {
        await createTable(createUsersTable, "Users");
    }
}

export default User;