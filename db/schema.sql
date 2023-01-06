DROP DATABASE IF EXISTS employees_database;
CREATE DATABASE employees_database;

USE employees_database;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    deparment_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL, 
    deparment_id INT,
    FOREIGN KEY (deparment_id) 
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) 
    REFERENCES roles(id)
    ON DELETE SET NULL
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
);
