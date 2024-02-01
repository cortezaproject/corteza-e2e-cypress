insert into users (id, username, kind, email, email_confirmed, name, handle, created_at) values (368979993402802178, '', '', 'authclient@test.com', true, 'Cypress auth client user', 'cypress_auth_client_user', now());
insert into role_members (rel_user, rel_role) select 368979993402802178, id from roles where handle = 'super-admin';

-- hPK7hiO15mI3qwboi7oTOrhc1ntn68mRRpmgLkbV6seXLLRjZtieUHdJECvEEN8Y
insert into auth_clients (id, handle, meta, secret, scope, valid_grant, enabled, trusted, security, redirect_uri) values (374948212714242049, 'compose_auth_helper', '{"name": "Compose Auth Helper", "description": ""}'::json, 'hPK7hiO15mI3qwboi7oTOrhc1ntn68mRRpmgLkbV6seXLLRjZtieUHdJECvEEN8Y', 'profile api openid', 'client_credentials', true, true, '{"impersonateUser": "368979993402802178"}'::json, '');
