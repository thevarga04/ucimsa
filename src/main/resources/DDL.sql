-- DDL
CREATE TABLE users (
    id              serial              UNIQUE,
    username        varchar(32)         PRIMARY KEY,
    firstname       varchar(32)         NOT NULL,
    lastname        varchar(32)         NOT NULL,
    password        varchar(255)        NOT NULL,
    activated       boolean
);

CREATE TABLE roles (
    name            varchar(32)         PRIMARY KEY
);

CREATE TABLE users_roles (
    users_username  varchar(32)         NOT NULL CONSTRAINT users_roles_username REFERENCES users(username) ON DELETE CASCADE,
    roles_name      varchar(32)         NOT NULL CONSTRAINT user_roles_role REFERENCES roles(name) ON DELETE CASCADE,
    PRIMARY KEY (users_username, roles_name)
);

-- Activation and password reset tokens
CREATE TABLE registration_and_reset (
    id              serial              PRIMARY KEY,
    token           int                 NOT NULL,
    valid_until     bigint              NOT NULL,
    username        varchar(32)         NOT NULL,
    CONSTRAINT registration_and_reset_pk UNIQUE (username, token)
);

-- Texts
-- All texts types uses the same sequence as a primary key
CREATE SEQUENCE seq_texts start 1 increment 1;

CREATE TABLE heap_texts(
    id                      int                 NOT NULL DEFAULT nextval('seq_texts') PRIMARY KEY,
    user_id                 int                 CONSTRAINT heap_texts_user_id REFERENCES users(id) ON DELETE CASCADE,
    name                    varchar(64)         NOT NULL,
    CONSTRAINT heap_texts_user_id_name          UNIQUE (user_id, name)
);

CREATE TABLE sentences(
    id                      serial              PRIMARY KEY,
    text_id                 int                 CONSTRAINT sentences_text_id REFERENCES heap_texts(id) ON DELETE CASCADE,
    line                    varchar(4096)       NOT NULL
);

-- Learning
CREATE SEQUENCE seq_lessons start 1 increment 1;


CREATE TABLE lesson_split_sentences(
    id              int                 PRIMARY KEY,
    user_id         int                 CONSTRAINT lesson_split_sentences_user_id REFERENCES users(id) ON DELETE CASCADE,
    text_id         int                 NOT NULL,
    coverage        int                 NOT NULL,
    splits          int                 NOT NULL,
    matching        int                 NOT NULL,
    sections        int                 NOT NULL
);

CREATE TABLE stats_split_sentences(
    id              serial              PRIMARY KEY,
    user_id         int                 CONSTRAINT stats_split_sentences_user_id REFERENCES users(id) ON DELETE CASCADE,
    text_id         int                 CONSTRAINT stats_split_sentences_text_id REFERENCES heap_texts(id) ON DELETE CASCADE,
    lesson_id       int                 CONSTRAINT stats_split_sentences_lesson_id REFERENCES lesson_split_sentences(id) ON DELETE CASCADE,
    sentence_id     int                 NOT NULL, -- sentences are quite volatile
    good_pick       boolean             DEFAULT FALSE,
    timestamp       bigint              NOT NULL
);

commit;