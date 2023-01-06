const inquirer = require('inquirer');
const db = require('./db/connections')

const PORT = process.env.PORT || 3001;

// connection.connect(function (err) {
//     if (err) {
//         console.error("can't connect" + err.stack);
//         return;
//     }
//     console.log("Connected as id " + connection.threadId);
// });

console.log("Welcome to the employee tracker")

//first question- starting the app

const options = () => {
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

function allDepartments() {
    var query = 'SELECT * FROM department';
    Connection.query(query, function(err, res){
        if(err)throw err;
        console.log (res.length + 'departments found!');
        console.table('All Departments:', res);
        options();
    })
};

//view all roles in the database
function allRoles() {
    var query= 'SELECT * FROM roles';
    Connection.query(query, function(err, res){
        if(err) throw err;
        console.log (res.length + 'roles found!');
        console.table('All Roles:', res);
        options();
    })
};

//view all employees in the database
function allEmployees() {
    var query= 'SELECT * FROM employees';
    Connection.query(query, function(err, res){
        if(err) throw err;
        console.log (res.length + 'employees found!');
        console.table('All Employees:', res);
        options();
    })
};

//adding a department to the departments table using sequel and inquirer prompt
const addNewDepartment = () => {
    let questions = [
      {
        type: "input",
        name: "name",
        message: "what is the new department name?"
      }
    ];
  
    inquier.prompt(questions)
    .then(response => {
      const query = `INSERT INTO department (name) VALUES (?)`;
      connection.query(query, [response.name], (err, res) => {
        if (err) throw err;
        console.log(`Successfully inserted ${response.name} department at id ${res.insertId}`);
        options();
      });
    })
    .catch(err => {
      console.error(err);
    });
  }

  //adding a role to the roles table using sequel and inquirer prompt
  const addNewRole = () => {
    
    const departments = [];
    connection.query("SELECT * FROM DEPARTMENT", (err, res) => {
      if (err) throw err;
  
      res.forEach(dep => {
        let object = {
          name: dep.name,
          value: dep.id
        }
        departments.push(object);
      });
  
      //question list to get arguments for making new roles
      let questions = [
        {
          type: "input",
          name: "title",
          message: "what is the title of the new role?"
        },
        {
          type: "input",
          name: "salary",
          message: "what is the salary of the new role?"
        },
        {
          type: "list",
          name: "department",
          choices: departments,
          message: "which department is this role in?"
        }
      ];
  
      inquier.prompt(questions)
      .then(response => {
        const query = `INSERT INTO ROLES (title, salary, department_id) VALUES (?)`;
        connection.query(query, [[response.title, response.salary, response.department]], (err, res) => {
          if (err) throw err;
          console.log(`Successfully inserted ${response.title} role at id ${res.insertId}`);
          options();
        });
      })
      .catch(err => {
        console.error(err);
      });
    });
  }
  //adding an employee to the employees table using sequel and inquirer prompt.

  const addNewEmployee = () => {
    //get all the employee list to make choice of employee's manager
    connection.query("SELECT * FROM EMPLOYEES", (err, res) => {
      if (err) throw err;
      const employeeSelection = [
        {
          name: 'None',
          value: 0
        }
      ]; 
      res.forEach(({ first_name, last_name, id }) => {
        employeeSelection.push({
          name: first_name + " " + last_name,
          value: id
        });
      });
      
      //get all the role list to make choice of employee's role
      connection.query("SELECT * FROM ROLES", (err, res) => {
        if (err) throw err;
        const roleSelection = [];
        res.forEach(({ title, id }) => {
          roleSelection.push({
            name: title,
            value: id
            });
          });
       
        let questions = [
          {
            type: "input",
            name: "first_name",
            message: "what is the employee's first name?"
          },
          {
            type: "input",
            name: "last_name",
            message: "what is the employee's last name?"
          },
          {
            type: "list",
            name: "role_id",
            choices: roleSelection,
            message: "what is the employee's role?"
          },
          {
            type: "list",
            name: "manager_id",
            choices: employeeSelection,
            message: "who is the employee's manager? (could be null)"
          }
        ]
    
        inquier.prompt(questions)
          .then(response => {
            const query = `INSERT INTO EMPLOYEES (first_name, last_name, role_id, manager_id) VALUES (?)`;
            let manager_id = response.manager_id !== 0? response.manager_id: null;
            connection.query(query, [[response.first_name, response.last_name, response.role_id, manager_id]], (err, res) => {
              if (err) throw err;
              console.log(`successfully inserted employee ${response.first_name} ${response.last_name} with id ${res.insertId}`);
              options();
            });
          })
          .catch(err => {
            console.error(err);
          });
      })
    });
  }

  //updating an employees role using sql and inquirer prompt

  const updateRole = () => {
    //get all the employees list 
    connection.query("SELECT * FROM EMPLOYEES", (err, res) => {
      if (err) throw err;
      const employeeSelection = [];
      res.forEach(({ first_name, last_name, id }) => {
        employeeSelection.push({
          name: first_name + " " + last_name,
          value: id
        });
      });
      
      //get all the roles to choose the employee's role
      connection.query("SELECT * FROM ROLE", (err, res) => {
        if (err) throw err;
        const roleSelection = [];
        res.forEach(({ title, id }) => {
          roleSelection.push({
            name: title,
            value: id
            });
          });
       
        let questions = [
          {
            type: "list",
            name: "id",
            choices: employeeSelection,
            message: "whose role do you want to update?"
          },
          {
            type: "list",
            name: "role_id",
            choices: roleSelection,
            message: "what is the employee's new role?"
          }
        ]
    
        inquier.prompt(questions)
          .then(response => {
            const query = `UPDATE EMPLOYEE SET ? WHERE ?? = ?;`;
            connection.query(query, [
              {role_id: response.role_id},
              "id",
              response.id
            ], (err, res) => {
              if (err) throw err;
              
              console.log("successfully updated the employee's role!");
              options();
            });
          })
          .catch(err => {
            console.error(err);
          });
        })
    });
  }