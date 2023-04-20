select * from users;
select * from roles;
select * from users_roles;

commit;

-- Maintenance
delete from users;
delete from roles;
delete from users_roles;
delete from heap_texts;


-- Features
select * from heap_texts;