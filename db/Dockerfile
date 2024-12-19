FROM postgres:17

COPY 01-init.sql /docker-entrypoint-initdb.d/
COPY 02-load_data.sql /docker-entrypoint-initdb.d/
COPY data/complaints.json /docker-entrypoint-initdb.d/
