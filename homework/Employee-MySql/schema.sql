drop DATABASE if not EXISTS employees;


CREATE DATABASE employees;

use employees;

create table employee_info


(
    id int
    auto_increment not null,
first_name varchar
    (30) null,
last_name varchar
    (30) null,
role_id int, 
manager_name varchar
    (30),
    primary key
    (id)
);

    create table department
    (
        id int
        auto_increment not null,
name varchar
        (30) null,
 department_id int,
primary key
        (id)
);

        create table roles
        (
            id int
            auto_increment not null,
title varchar
            (30) null,
salary decimal,
department_id int,
primary key
            (id)
);


--- Also could be like this (  DROP DATABASE IF EXISTS emloyee_db;
--CREATE DATABASE emloyee_db;

--USE emloyee_db;

--CREATE TABLE department
--(
  --  id INT
   -- AUTO_INCREMENT PRIMARY KEY NOT NULL,
    --name VARCHAR
    --(30) NOT NULL
--);

  --  CREATE TABLE role
    --(
      --  id INT
        --AUTO_INCREMENT PRIMARY KEY,
    --title VARCHAR
      --  (30) NOT NULL,
    --salary DECIMAL
      --   NOT NULL,
    --department_id INT NOT NULL,
--);

  --      CREATE TABLE employee
    --    (
      --      id INT
        --    AUTO_INCREMENT PRIMARY KEY NOT NULL,
    --first_name VARCHAR
      --      (30) NOT NULL, 
    -- last_name VARCHAR
          --  (30) NOT NULL,
    --role_id INT NOT NULL,
    --manager_id INT,
    --FOREIGN KEY
      --      (role_id) REFERENCES role
        --    (id),
    --FOREIGN KEY
      --      (manager_id) REFERENCES employee
        --    (id)
--);

--)
-- With some seeds(--USE employee_db;

--INSERT INTO department (name)
--VALUES ("Engineering"), ("HR"), ("Finance"), ("Sales")

--INSERT INTO role (title, salary, department_id)
--VALUES("Head of Engineering", 120000.00, 1), ("Senior Developer", 80000.00, 1), ("HR Director", 75000.00, 2), ("Recruiter", 40000.00, 2), ("Accountant", 125000.00, 3), ("Head of Accounting", 155000.00, 3),("Sales Manager", 110000.00, 4),("Sales Lead", 100000.00, 1);

--INSERT INTO employee (first_name, last_name, role_id, manager_id)
--VALUES ("John", "Smith", 1, NULL),("Jade", "White", 2,1 ),("Paul", "Rubio", 3, NULL),("James", "Jones", 4, 3),("Zach", "Haas", 5, NULL),("Jessica", "Brown", 6, 5),("Alex", "Roads", 7, NULL),("John", "Smith", 8, 7);)