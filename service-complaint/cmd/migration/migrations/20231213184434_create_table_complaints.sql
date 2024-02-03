-- +goose Up
-- +goose StatementBegin
CREATE TABLE complaints (
	id bigserial NOT NULL,
	complain_no varchar NOT NULL,
	title varchar NULL,
	description text NULL,
	"location" varchar NULL,
	"date" timestamp NULL,
	is_anonymous bool NULL,
	category_id int8 NULL,
	user_id int8 NULL,
	status varchar NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT complaints_pk PRIMARY KEY (id),
	CONSTRAINT complaints_un UNIQUE (complain_no)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS complaints;
-- +goose StatementEnd
