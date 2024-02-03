-- +goose Up
-- +goose StatementBegin
CREATE TABLE users (
	id bigserial NOT NULL,
	fullname varchar NULL,
	email varchar NULL,
	whatsapp_number varchar NULL,
	address varchar NULL,
	photo_url varchar NULL,
	"password" varchar NULL,
	salt varchar NULL,
	status varchar NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	role_id int8 NULL,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_un UNIQUE (email)
);

CREATE TABLE roles (
	id bigserial NOT NULL,
	role_name varchar NOT NULL,
	CONSTRAINT roles_pk PRIMARY KEY (id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS users;
-- +goose StatementEnd
