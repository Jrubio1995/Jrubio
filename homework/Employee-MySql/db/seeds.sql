USE employee_db;

INSERT INTO department
    (name)
VALUES
    ("Engineering"),
    ("HR"),
    ("Finance"),
    ("Sales")

INSERT INTO role
    (title, salary, department_id)
VALUES("Head of Engineering", 120000.00, 1),
    ("Senior Developer", 80000.00, 1),
    ("HR Director", 75000.00, 2),
    ("Recruiter", 40000.00, 2),
    ("Accountant", 125000.00, 3),
    ("Head of Accounting", 155000.00, 3),
    ("Sales Manager", 110000.00, 4),
    ("Sales Lead", 100000.00, 1);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Smith", 1, NULL),
    ("Jade", "White", 2, 1 ),
    ("Paul", "Rubio", 3, NULL),
    ("James", "Jones", 4, 3),
    ("Zach", "Haas", 5, NULL),
    ("Jessica", "Brown", 6, 5),
    ("Alex", "Roads", 7, NULL),
    ("John", "Smith", 8, 7);