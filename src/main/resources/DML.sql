-- Realm
select * from users;
select * from roles;
select * from users_roles;

-- Use-cases
select * from heap_texts;
select * from sentences;
select * from lesson_split_sentences;
select * from stats_split_sentences;

-- Maintenance
-- delete from users;
-- delete from roles;
-- delete from users_roles;
-- delete from heap_texts;
-- delete from sentences;



-- HeapText and Sentences
select h.id, h.user_id, h.name, s.line
from heap_texts h, sentences s
where h.id = s.text_id;


