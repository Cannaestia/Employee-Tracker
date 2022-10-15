const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');


const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'employees_db'
});

const prompt = inquirer.createPromptModule();


const viewAllDepartments = () => {
    db.query(`SELECT department.id AS id, department.name AS depart FROM department`, (err, department) => {
        if (err) throw err;
        console.table(department);
        init();
    });
};

const viewAllroles = () => {
    db.query(`SELECT role.id, role.title, role.salary, department.name FROM role
              INNER JOIN department ON role.department_id = department.id`, (err, role) => {
        if (err) throw err;
        console.table(role);
        init();
    });
};

const viewAllEmployees = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, 
              department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager
              FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id
              LEFT JOIN employee manager ON employee.manager_id = manager.id`, (err, employee) => {
        if (err) throw err;
        console.table(employee);
        init();
    })
};

const addDepartment = () => {
    prompt ({
        name: 'name',
        type: 'input',
        message: 'What Department would you like to add?',
    })
    .then((input) =>  {
        db.query('INSERT INTO department SET ?', input, (err) => {
            if (err) throw err;
            console.log(`Saved ${input.name}`);
            init();
        });
    });
};

const addRole = () => {
    prompt ([
        {
         type: 'input',
         name: 'title',
         message: 'Enter a title for the new role',
        },
        {
         type: 'input',
         name: 'salary',
         message: 'Enter a salary for the new role',
        },
        {
         type: 'input',
         name: 'department_id',
         message: 'Enter a department id for the new role',
        },
    ])
    .then((input) => {
        db.query('INSERT INTO role SET ?', input, (err) => {
            if (err) throw err;
            console.log (`Saved ${input.title}`);
            console.log (`Saved ${input.salary}`);
            console.log (`Saved ${input.department_id}`);
            init();
        });
    });
}

const addEmployee = () => {
    prompt ([
        {
         type: 'input',
         name: 'first_name',
         message: 'Please enter employee first name',
        },
        {
         type: 'input',
         name: 'last_name',
         message: 'Please enter employee last name',
        },
        {
         type: 'input',
         name: 'role_id',
         message: 'Please enter employee role id',
        },
        {
         type: 'input',
         name: 'manager_id',
         message: 'Please enter the manager id of the employee',
        },
    ])
    .then((input) => {
     db.query('INSERT INTO employee SET ?' , input, (err) => {
        if (err) throw err;
        console.log (`Saved ${input.first_name}`);
        console.log (`Saved ${input.last_name}`);
        console.log (`Saved ${input.role_id}`);
        console.log (`Saved ${input.manager_id}`);
        init();
     })   
    })
}

const updateEmployeeRole = () => {
    prompt ([
        {
         type: 'input',
         name: 'id',
         message: 'Please enter employee id',
        },
        // {
        //  type: 'input',
        //  name: 'first_name',
        //  message: 'Please enter employee first name',
        // },
        // {
        //  type: 'input',
        //  name: 'last_name',
        //  message: 'Please enter employee last name',
        // },
        {
         type: 'input',
         name: 'role_id',
         message: 'Please enter employee role id',
        },
        // {
        //  type: 'input',
        //  name: 'manager_id',
        //  message: 'Please enter the manager id of the employee',
        // },
    ])
    .then((input) => {
     db.query('UPDATE employee SET employee.role_id = ? WHERE employee.id = ?', [input.role_id, input.id], (err) => {
        if (err) throw err;
        init();
     })   
    })
}

const deleteDepartment = () => {
    prompt ({
        type: 'input',
        name: 'id',
        message: 'Please enter Department id'
    })
    .then ((input) => {
        db.query('DELETE FROM department WHERE id = ?', input.id, (err, department) => {
          if (err) throw err;
          console.table(department);
          init();
        })
        });
      };
     
const deleteRole = () => {
    prompt ({
        type: 'input',
        name: 'id',
        message: 'Please enter the role id'
    })
    .then ((input) => {
        db.query('DELETE FROM role WHERE id = ?', input.id, (err, role) => {
          if (err) throw err;
          console.table(role);
          init();
        })
        });
      };        

const deleteEmployee = () => {
    prompt ({
        type: 'input',
        name: 'id',
        message: 'Please enter Employee id'
    })
    .then ((input) => {
        db.query('DELETE FROM employee WHERE id = ?', input.id, (err, employee) => {
          if (err) throw err;
          console.table(employee);
          init();
        })
        });
      };




// const updateEmployee = () => {
//     prompt ([
//         {
//          type: 'input',
//          name: 'id',
//          message: 'Please enter in employee id',
//         },
//     ])
//     .then ((input) => {
//         db.query('UPDATE FROM employee WHERE id = ?', (err, employee) => {
//             if (err) throw err;
//             console.table(employee);
//             init();
//         })
//     })
// }

const init = () => {
    prompt({
        type: 'rawlist',
        name: 'departments',
        choices: [
            'View All Departments',
            'Add Department',
            'Delete Department',
            'View All Roles',
            'Add Role',
            'Delete Role',
            'View All Employees',
            'Add Employee',
            'Delete Employee',
            'Update Employee Role',
            'Exit',
        ],
        message: 'Please select from the list of available options.'
    }).then((answers) => {
        switch(answers.departments) {
            case 'View All Departments': {
                viewAllDepartments ();
                 break;
            }
            case 'Add Department': {
                 addDepartment ();
                 break;
            }
            case 'Delete Department': {
                deleteDepartment ();
                break;
            }
            case 'View All Roles': {
                 viewAllroles ();
                 break;
            }
            case 'Add Role': {
                addRole ();
                break;
            }
            case 'Delete Role': {
                deleteRole ();
                break;
            }
            case 'View All Employees': {
                viewAllEmployees ();
                break;
            }
            case 'Add Employee': {
                addEmployee ();
                break;
            }
            case 'Delete Employee': {
                deleteEmployee ();
                break;
            }
            case 'Update Employee Role': {
                updateEmployeeRole ();
                break;
            }
            default: {
                process.exit();
                break;
            }
        }
    })
}
init();





