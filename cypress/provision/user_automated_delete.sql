-- remove the one we manually create in provisioning
delete from credentials where rel_owner = 368979993402802178;
delete from role_members where rel_user = 368979993402802178;
delete from users where id = 368979993402802178;

-- remove the one that was created in app and we do not know its id
delete from credentials where rel_owner = (select id from users where email = 'automated@email.com');
delete from role_members where rel_user = (select id from users where email = 'automated@email.com');
delete from users where email = 'automated@email.com';
