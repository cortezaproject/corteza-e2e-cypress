delete from credentials where rel_owner = (select id from users where email = 'missing@email.com');
delete from role_members where rel_user = (select id from users where email = 'missing@email.com');
delete from users where email = 'missing@email.com';
