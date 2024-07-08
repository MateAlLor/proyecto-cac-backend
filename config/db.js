
import { createPool } from "mysql2/promise";
import 'dotenv/config'
// const mysql = require('mysql2/promise')


// Crear Pool de conexiones
const pool = createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0
});

// console.log(pool.getConnection())

pool.getConnection()
    .then(connection =>{
        pool.releaseConnection(connection);
        console.log('Database connected')
    })
    .catch(err => console.error('Error connecting to database', err))


// console.log(pool)

export default pool;

