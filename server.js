const inquirer = require('inquirer');
const { createConnection } = require('net');
const db = require('./db/connections')

const PORT = process.env.PORT || 3001;

connection.connect(function (err) {
    if (err) {
        console.error("can't connect" + err.stack);
        return;
    }
    console.log("Connected as id " + connection.threadId);
});

console.log("Welcome to the employee tracker")

//first question- starting the app

const start = () => {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like to do? ",
        choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            "Add employee",
            "Add department",
            "Add role",
            "Update employee role",
            "Update employee manager",

            "Quit",
        ],

    });
    switch (choice) {
        case 'View all departments':
            viewAllDepartments();
            break;
        case 'View all roles':
            viewAllRoles();
            break;
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'Add a department':
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
            case 'Exit':
                process.exit();
    }

}

//viewing all of the departments in the database