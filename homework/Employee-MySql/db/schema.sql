DROP DATABASE IF EXISTS emloyee_db;
CREATE DATABASE emloyee_db;

USE emloyee_db;

CREATE TABLE department
(
    id INT
    AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR
    (30) NOT NULL
);

    CREATE TABLE role
    (
        id INT
        AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR
        (30) NOT NULL,
    salary DECIMAL
        (9,2) NOT NULL,
    department_id INT NOT NULL,
);

        CREATE TABLE employee
        (
            id INT
            AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR
            (30) NOT NULL, 
    last_name VARCHAR
            (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY
            (role_id) REFERENCES role
            (id),
    FOREIGN KEY
            (manager_id) REFERENCES employee
            (id)
);

            INSERT INTO department
                (name)
            VALUES
                ('Corporate');
            INSERT INTO department
                (name)
            VALUES
                ('IT');
            INSERT INTO department
                (name)
            VALUES
                ('Marketing');


            INSERT INTO role
                (title, department_id, salary)
            VALUES
                ('Engineer', '0.1', 1);
            INSERT INTO role
                (title, department_id, salary)
            VALUES
                ('CEO', '0.5', 2);
            INSERT INTO role
                (title, department_id, salary)
            VALUES
                ('Marketing Intern', '0.025', 3);
            INSERT INTO role
                (title, department_id, salary)
            VALUES
                ('Manager', '0.065', 4);

            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUES
                ('John', 'Smith', 1, 1);
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUES
                ('Mary', 'Jane', 2, 2);
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUES
                ('Ashley', 'Poppins', 3, 3);
            INSERT INTO employee
                (first_name, last_name, role_id, manager_id)
            VALUES
                ('Mike', 'Jones', 4, 4);
