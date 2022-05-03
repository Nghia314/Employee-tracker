USE employee_db;
INSERT INTO department (name)
VALUES
('IT'),
('FINANCE & ACCOUNTING'),
('SALES & MARKETING'),
('OPERATIONS');

INSERT INTO role (title, salary, department_id)
VALUES
('Full stack web developer', 100000, 1),
('Accountant', 20000, 2),
('financial manager', 300000, 2),
('accounting manager', 300000, 3),
('software Engineer', 300000, 3),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Devin','John', 1, null),
('John','Miller', 1, 3),
('Smith','John', 2, 3),
('Ana','Gomez',5, 4),
('Tyler', 'Smith', 4, null),
('David','John', 6, null),