
import { createPool } from "mysql2/promise";

// const mysql = require('mysql2/promise')

// Crear Pool de conexiones
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cac_database_test',
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

