// config.js
const {createPool} = require('mysql');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'fizzah',        // your MySQL password     Muzammil@124
    database: 'mydatabase',
    connectionLimit : 10
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ DB connection error:", err);
    } else {
        console.log("✅ DB connected");
        connection.release(); // Always release the connection back to the pool
    }
});

module.exports = pool;
