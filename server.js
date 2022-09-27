const inquirer = require('inquirer');
const mysql = require('mysql2');
const { inherits } = require('util');
require('console.table');


const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'employees_db'
});

const prompt = inquirer.createPromptModule();

const viewAllDepartments = () => {
    db.query('SELECT name FROM department', (err, department) => {
        if (err) throw err;
        console.table(department);
        init ();
    });
};

const viewAllroles = () => {
    db.query('SELECT title, salary, department_id FROM role', (err, role) => {
        if (err) throw err;
        console.table(role);
        init ();
    });
};

const viewAllEmployees = () => {
    db.query('SELECT first_name, last_name, role_id, manager_id FROM employee', (err, employee) => {
        if (err) throw err;
        console.table(employee);
        init ();
    });
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

const updateEmployee = () => {
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
     db.query('UPDATE employee SET first_name = ?' , input, (err) => {
        if (err) throw err;
        console.log (`Saved ${input.first_name}`);
        console.log (`Saved ${input.last_name}`);
        console.log (`Saved ${input.role_id}`);
        console.log (`Saved ${input.manager_id}`);
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
        db.query('DELETE FROM department WHERE id = ?, ', (err, department) => {
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
        db.query('DELETE FROM role WHERE id = ?, ', (err, role) => {
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
        db.query('DELETE FROM employee WHERE id = ?, ', (err, employee) => {
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
            'Update Employee',
            'Exit',
        ],
        message: 'Please select from the list of available options.'
    }).then((answers) => {
        switch(answers.departments) {
            case 'View All Departments': {
                return viewAllDepartments ();
            }
            case 'Add Departments': {
                return addDepartment ();
            }
            case 'Delete Department': {
                return deleteDepartment ();
            }
            case 'View All Roles': {
                return viewAllroles ();
            }
            case 'Add Role': {
                return addRole ();
            }
            case 'Delete Role': {
                return deleteRole ();
            }
            case 'View All Employees': {
                return viewAllEmployees ();
            }
            case 'Add Employee': {
                return addEmployee ();
            }
            case 'Delete Employee': {
                return deleteEmployee ();
            }
            case 'Update Employee': {
                return updateEmployee ();
            }
            default: {
                return process.exit();
            }
        }
    })
}






