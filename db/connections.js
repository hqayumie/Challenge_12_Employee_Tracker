const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootpass',
        database: 'employee_db'
    },
    console.log('Connected to the employees_db.')
)
db.connect();

module.exports = db