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
        choices: ['View All Department', 'View All Roles', 'View All Employees', 'Add a Department', 'Add A Role', 'Add An Employee', 'update an employee role','Log Out']
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
        } else if (answers.prompt=== 'Add a Department') {
            inquirer.prompt([{
                type:"input",
                name:"department",
                message:"what is department name you wanna add?",
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
        }
    })}