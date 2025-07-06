import pgClient from '../config/pgClient.js';

export const createTable = async (schemaQuery, tableName) => {
    try {
        await pgClient.query(schemaQuery);
        console.log(`${tableName} table created successfully!`);
    } catch (error) {
        console.error(`Error creating ${tableName} table:`, error);
    }
};

