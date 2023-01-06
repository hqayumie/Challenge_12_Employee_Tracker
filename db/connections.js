const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootpass',
        database: 'employees_database'
    },
    console.log('Connected to the employees_database.')
)
db.connect();

module.exports = db