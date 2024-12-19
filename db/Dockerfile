FROM postgres:17

COPY init.sql /docker-entrypoint-initdb.d/
COPY load_data.sql /docker-entrypoint-initdb.d/
COPY data/complaints.json /docker-entrypoint-initdb.d/
