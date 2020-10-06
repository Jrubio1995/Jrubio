const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
//const { start } = require("repl");
const util = require("util");

// type in your own INFO for this part
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "employee",
  password: "password123",
  database: "emloyee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "employeeList",
      type: "list",
      message: "Would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Info",
        "View Departments",
        "Remove Employee",
        "Exit",
      ],
    })
    .then((answer) => {
      if (answer.employeeList === "View All Employees") {
        viewAllEmployees();
      } else if (answer.employeeList === "Add Employee") {
        addEmployee();
      } else if (answer.employeeList === "Update Employee Info") {
        updateEmployee();
      } else if (answer.employeeList === "View Departments") {
        viewDepartments();
      } else if (answer.employeeList === "Remove Employee") {
        RemoveEmployee();
      } else if (answer.employeeList === "Extit") {
        connection.end();
      }
    });
}

function addEmployee() {
  console.log("Adding an employee:");
  inquirer
    .prompt([
      { name: "firstName", type: "input", message: "Enter First name:" },
      { name: "lastName", type: "input", message: "Enter Last name:" },
      { name: "roleId", type: "input", message: "Enter ID number:" },
      { name: "manager", type: "input", message: "Enter you Manager's name:" },
      { name: "title", type: "input", message: "Enter Job Title:" },
      { name: "salary", type: "input", message: "Enter Your Salary:" },
      {
        name: "departmentId",
        type: "input",
        message: "Enter the Department ID:",
      },
      {
        name: "departmentName",
        type: "input",
        message: "Enter the Department Name",
      },
    ])
    .then((answers) => {
      connnection.query("INSERT INTO employee_info SET ?", {
        first_name: answers.firstName,
        last_name: answers.lastName,
        role_id: answers.roleId,
        manager_name: answers.answers.manager,
      });
      connection.query("INSERT INTO departmen SET ?", {
        title: answers.title,
        salary: answers.salary,
        department_id: answers.departmentId,
      });
      connection.query("INSERT INTO department SET ?", {
        name: answers.departmentName,
        department_id: answers.departmentId,
      });
      start();
    });
}

function viewAllEmployees() {
  connection.query(
    "SELECT * FROM employee_info INNER JOIN roles ON employee_info.id + roles.id",
    function (err, results) {
      if (err) throw err;
      console.table(rusults);
      start();
    }
  );
}

function updateEmployee() {
  console.log("Making changes to an employee.");
  connection.query("SELECT * FROM employee_info", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          message: "What chamges will you be making to this employee?",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].id);
            }
            return choiceArray;
          },
        },
        {
          name: "firstName",
          type: "input",
          message: "Enter First name:",
        },
        {
          name: "lastName",
          type: "input",
          message: "Enter First name:",
        },
        {
          name: "roleId",
          type: "input",
          message: "Enter ID number:",
        },
        {
          name: "manager",
          type: "input",
          message: "Enter you Manager's name:",
        },
        {
          name: "title",
          type: "input",
          message: "Enter Job Title:?",
        },
        {
          name: "salary",
          type: "input",
          message: "Enter Your Salary:",
        },
        {
          name: "departmentId",
          type: "input",
          message: "Enter the Department ID:",
        },
        {
          name: "departmentName",
          type: "input",
          message: "Enter the Department Name",
        },
      ])
      .then((answers) => {
        var selected;
        for (var i = 0; i < results.length; i++) {
          if (results[i].id === answers.choice) {
            selected = results[i];
          }
        }
        connection.query("UPDATE employee_info SET ? WHERE ?", [
          {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleId,
            manager_name: answers.manager,
          },
          {
            id: selected.id,
          },
        ]);
        connection.query("UPDATE roles SET ? WHERE ?", [
          {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.departmentId,
          },
          {
            id: selected.id,
          },
        ]);
        connection.query("UPDATE department SET ? WHERE ?", [
          {
            name: answers.departmentName,
            department_id: answers.departmentId,
          },
          {
            id: selected.id,
          },
        ]);
        start();
      });
  });
}

function RemoveEmployee() {
  connection.query("SELECT * FROM employee_info", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "selection",
          type: "rawlist",
          message: "Which Employee do youwish to remove?",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].id);
            }
            return choiceArray;
          },
        },
      ])
      .then((answers) => {
        var selected;
        for (var i = 0; i < results.length; i++) {
          if (results[i].id === answers.choice) {
            selected = results[i];
          }
        }
        connection.query("DELETE FROM employee_info WHERE ?", [
          {
            id: selected.id,
          },
        ]);
        connection.query("DELETE FROM roles WHERE ?", [
          {
            id: selected.id,
          },
        ]);
        connection.query("DELETE FROM department WHERE ?", [
          {
            id: selected.id,
          },
        ]);
        start();
      });
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

connection.query = util.promisify(connection.query);
module.exports = connection;

//
