const inquirer = require('inquirer');
const db = require('./db/connect');

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    promptWindows();
});

var promptWindows = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Department', 'View All Roles', 'View All Employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role','Log Out']
    }]).then((answers) => {
        if (answers.prompt === 'View All Department') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result);
                promptWindows();
            });
        } else if (answers.prompt === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Roles: ");
                console.table(result);
                promptWindows();
            });
        } else if (answers.prompt === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Employees: ");
                console.table(result);
                promptWindows();
            });
        } else if (answers.prompt=== 'Add a department') {
            inquirer.prompt([{
                type:"input",
                name:"department",
                message:"What is the department name you wanna add?",
                validate: input =>{
                    if(input) {
                        return true
                    } else {
                        console.log("plz add a department name");
                        return false
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUE (?)`,[answers.department],(err,result)=>{
                    if (err) throw err;
                    console.log("Added a new department");
                    promptWindows();
                })
            })
        } else if (answers.prompt=== 'Add a role') {
            db.query(`SELECT * FROM department`, (err, result) => {
        if (err) throw err;
        inquirer.prompt([{
            type: "input",
            name: "role",
            message: "What is the role you want to add?",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log("Please add a role.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log("Please add a valid salary.");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "department",
            message: "Which department does this role belong to?",
            choices: () => {
                let choicesArray = [];
                for (i = 0; i < result.length; i++) {
                    choicesArray.push(result[i].name);
                }
                return choicesArray;
            }
        }
        ]).then((answers) => {
            const selectedDepartment = result.find(department => department.name === answers.department);
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
                [answers.role, answers.salary, selectedDepartment.id], (err, result) => {
                    if (err) {
                        console.log("Error adding new role: ", err);
                        return promptWindows();
                    }
                    console.log("New role added");
                     promptWindows();
              })
           })                                    
        } 
        )
        } else if (answers.prompt === 'Add an employee') {
            db.query(`SELECT * FROM employee,role`,(err,result)=>{
                if (err) throw err;
                inquirer.prompt([{
                  type:'input',
                  name:'firstName',
                  message:'What is his/her first name?',
                  validate: firstName =>{
                    if (firstName) {
                        return true
                    } else {
                        console.log('plz add a first name');
                        return false
                    }
                  }
                },{
                    type:'input',
                  name:'lastName',
                  message:'What is his/her last name?',
                  validate: lastName =>{
                    if (lastName) {
                        return true
                    } else {
                        console.log('plz add a first name');
                        return false
                    }
                  }                    
                },{
                   type: 'list',
                   name: 'role',
                   message: 'What is the employees role?',
                   choices: () => {
                      var array = [];
                      for (i = 0; i < result.length; i++) {
                      array.push(result[i].title);}
                            var newArray = [...new Set(array)];
                            return newArray;} 
                },{
                    type: 'input',
                    name: 'manager',
                    message: "What's her/his manager's manager_id?",
                    validate: managerInput => {
                        if (managerInput) {
                            return true;
                            } else {
                                console.log('Please Add A manager_id!');
                                return false;
                         }
                    } 
                }
            ]).then((answers) => {
                for (i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager], (err, result) => {
                        if (err) throw err;
                        console.log("New employee added")
                        promptWindows();
            } ) 
            })
        })
        } else if (answers.prompt === 'Update an employee role') {
            
        }
         
    }
    )}