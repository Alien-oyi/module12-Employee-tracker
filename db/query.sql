SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
SELECT * FROM employee, role WHERE employee.role_id = role.id;