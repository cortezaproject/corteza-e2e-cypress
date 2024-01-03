insert into users (id, username, kind, email, email_confirmed, name, handle, created_at) values (368979993402802177, '', '', 'cypress@test.com', true, 'Cypress test account', 'cypress', now());
insert into credentials (id, rel_owner, label, kind, credentials, created_at) values (368979993503465473, 368979993402802177, '', 'password', '$2a$10$wuWr/KTeVLOiAtwmJ4Alu.EGNn99nVhV7uT3uPh7L.t6AswKMfGZm', now());
insert into role_members (rel_user, rel_role) select 368979993402802177, id from roles where handle = 'super-admin';
