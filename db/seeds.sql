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
  ('Retail', 120000, 2),
  ('Accountant', 100000, 3),
  ('Doctor', 150000, 4);


INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Jinmin', 'Dai', 1, 4),
  ('Sam', 'Mulcahy', 2, 3),
  ('Emma', 'Paris', 3, 1),
  ('Jake', 'Rudlong', 4, 5);
