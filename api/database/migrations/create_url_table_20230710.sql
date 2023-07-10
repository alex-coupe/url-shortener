CREATE TABLE IF NOT EXISTS url (
                id BIGSERIAL PRIMARY KEY,
               short_url varchar(250) UNIQUE,
               long_url text,
                date_added timestamp
             );