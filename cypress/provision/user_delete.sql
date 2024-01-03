delete from users where id = 368979993402802177;
delete from credentials where rel_owner = 368979993402802177;
delete from role_members where rel_user = 368979993402802177;

delete from users where email = 'cypress@test.com';
delete from credentials where rel_owner = (select id from users where email = 'cypress@test.com');
delete from role_members where rel_user = (select id from users where email = 'cypress@test.com');
