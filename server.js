// import mysql
const mysql = require('mysql2');
// import inquirer
const inquirer = require('inquirer');
// import console.table
const consoleTable = require('console.table')

// create connection to mysql database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Nlee390815a',
    database: 'employee_db'
});
// connect to mysql database if error throw error
connection.connect(err => {
    if (err) throw err;
    promptUser();
});

function promptUser() {
    inquirer
        .prompt ({
            name: 'action',
            type: 'list',
            message: 'Welcome to our employee database! what section would you like to see?',
            choices: [
                'View all departments',
                'View all employees',
                'View all roles',
                'add department',
                'Add employee',
                'Add role',
                'Update employee role',
                'Delete employee',
                'EXIT'
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case 'View all departments':
                    viewDeparments();
                    break;
                    case 'View all employees':
                    viewEmployee();
                    break;
                    case 'View all roles':
                        viewRoles();
                        break;
                        case 'Add departments':
                            addDepartment();
                            break;
                            case 'Add employee':
                                addEmployee();
                                break;
                                case 'Add role':
                                    addRole();
                                    break;
                                    case 'Update employee role':
                                        updateRole();
                                        break;
                                        case 'Delete employee':
                                            deleteEmployee();
                                            break;
                                            case 'EXIT':
                                                exitApp();
                                                break;
                                                default:
                                                    break;

            }
        })

};
function viewDeparments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw error(err);
        console.table('All departments:', res);
        options();
    })
};
function viewEmployee() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw error(err);
        console.log(res.length + ' employees');
        console.table('All Employees:', res);
        options();
    })
};
function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw error(err);
        console.table('All Roles:', res);
        options();

    })
};
function addDepartment() {
    inquirer
    .prompt([
        {
            name : 'newDepartment',
            type: 'input',
            message: 'What kind of departments would you like to add?'
        }
    ]).then(function (answer) {
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: answer.newDepartment
            });
            var query = 'SELECT * FROM department';
            connection.query(query, function(err, res) {
                if (err) throw error(err);
                console.log('Department has been added');
                console.table('All Department:', res);
                options();
            })
    })
};

function addEmployee() {
    connection.query('SELECT * FROM role', function (err,res) {
        if (err) throw error(err);
        inquirer
        .prompt ([
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the last name of the employee you want to add?'
            },
            {
                name: 'first_name',
                type: 'input',
                message: 'employee first name?'
            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'what is the employee manager ID?'
            },
             { 
              name: 'role',
              type: 'list',
              choices: function () {
                  var roleString = [];
                  for (var i = 0; i < res.length; i++) {
                      roleString.push(res[i].title);
                  }
                  return roleString;
              },
              message: 'What is this employee ID?'
             }
        ]).then(function (asnwer) {
            let role_id;
            for (var i = 0; i < res.length; i++) {
                if (res[i].title == asnwer.role) {
                    role_id = res[i].id;
                    console.log(role_id);
                }
            }
            connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: asnwer.first_name,
                        last_name: asnwer.last_name,
                        manager_id: asnwer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('YOur employee was successfully added');
                        options();
                    })
        })
    })
};
function addRole() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;

        inquirer
        .prompt([
            {
                name: 'new_role',
                type: 'input',
                message: 'what new role would you like to add?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'what is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var departmentString = [];
                    for (var i = 0; i < res.length; i++) {
                        departmentString.push(res[i].name);
                    }
                    return departmentString;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (var i = 0; i < res.length; i++) {
                if (res[i].name == answer.Department) {
                    department_id = res[i].id;
                }
            }
            connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.new_role,
                        salary: answer.salary,
                        department_id: department_id
                    },
                    function (err, res) {
                        if(err) throw err;
                        console.log('Your new role has been successfully added');
                        console.table('All Roles:', res);
                        options();
                    })
        })
    })
};

function updateRole() {

};

function deleteEmployee() {

};
function exitApp() {
    connection.end();
};