-- DDL
CREATE TABLE users (
    id              serial,
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

INSERT INTO roles (name) values ('ROLE_USER'); -- default for every successfully registered user

-- Activation and password reset tokens
CREATE TABLE registration_and_reset (
    id              serial              PRIMARY KEY,
    token           int                 NOT NULL,
    valid_until     bigint              NOT NULL,
    username           varchar(32)         NOT NULL,
    CONSTRAINT registration_and_reset_pk UNIQUE (username, token)
);

commit;
