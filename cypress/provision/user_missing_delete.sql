delete from credentials where rel_owner = (select id from users where email = 'missing@email.com');
delete from role_members where rel_resource = (select concat('corteza::system:user/', id) from users where email = 'missing@email.com');
delete from users where email = 'missing@email.com';
