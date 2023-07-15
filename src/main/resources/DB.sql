-- jdbc:postgresql://localhost:5432/ucimsa?currentSchema=ucimsa

-- https://www.postgresql.org/docs/current/libpq-pgpass.html
-- psql -U postgres -f DB.sql
CREATE ROLE ucimsa;
ALTER ROLE ucimsa WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:aTV8aIO4gYwgg05MUcStUw==$kqIcd0jkSvY6rSKsEiuxSc2PMWrO3Otd8b+Eyk32C7U=:PkDTVd0k+DBKsXt1YO0ckNYyLvRDptfOjoZpn5tJGFg=';
REVOKE ALL on DATABASE postgres from ucimsa;
CREATE DATABASE ucimsa WITH OWNER = ucimsa ENCODING = 'UTF8' TABLESPACE = pg_default CONNECTION LIMIT = -1;

\connect ucimsa
CREATE SCHEMA AUTHORIZATION ucimsa;

\connect postgres
ALTER ROLE ucimsa IN DATABASE ucimsa SET search_path TO ucimsa;

