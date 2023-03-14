INSERT INTO department
  (name)
VALUES
  ('Engineering'),
  ('Managers'),
  ('Finance'),
  ('Medicine');


INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Software Engineer', 100000, 1),
  ('Managerment', 120000, 2),
  ('Accountant', 100000, 3),
  ('Doctor', 150000, 4);


INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Jinmin', 'Dai', 1, 2),
  ('Sam', 'Mulcahy', 2, null),
  ('Emma', 'Paris', 3, 2),
  ('Jake', 'Rudlong', 4, 2);
