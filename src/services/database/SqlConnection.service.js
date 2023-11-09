import sql from 'mssql';
import config from "../../config/default";

const dbSettings = {
    user: config.db_User,
    password: config.db_Password,
    server: config.db_Server,
    database: config.db_Database,
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        throw error; // Lanza una excepción para que el código que llama maneje el error
    }
}

export { sql, getConnection };