-- +goose Up
-- +goose StatementBegin
CREATE TABLE notifications (
	id bigserial NOT NULL,
	user_id int8 NOT NULL,
	title varchar NULL,
	description text NULL,
	icon varchar NULL,
	is_read bool NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT notifications_pk PRIMARY KEY (id)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS notifications;
-- +goose StatementEnd
