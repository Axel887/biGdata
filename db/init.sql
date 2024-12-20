-- Création de la table principale
CREATE TABLE IF NOT EXISTS crimes (
    id SERIAL PRIMARY KEY,
    full_complaint_id BIGINT PRIMARY KEY,
    complaint_year_number INT NOT NULL,
    month_number INT NOT NULL,
    record_create_date TIMESTAMP NOT NULL,
    complaint_precinct_code INT,
    patrol_borough_name VARCHAR(255),
    county VARCHAR(255),
    law_code_category_description VARCHAR(255),
    offense_description VARCHAR(255),
    pd_code_description VARCHAR(255),
    bias_motive_description VARCHAR(255),
    offense_category VARCHAR(255),
    arrest_date TIMESTAMP,
    arrest_id VARCHAR(255)
);

DO $$
DECLARE
    json_data JSONB;
BEGIN
    -- Vérifier si le fichier existe
    PERFORM pg_ls_dir('docker-entrypoint-initdb.d') WHERE pg_ls_dir = 'complaints.json';
    IF NOT FOUND THEN
        RAISE NOTICE 'Le fichier complaints.json est introuvable.';
        RETURN;
    END IF;

    -- Lire le fichier JSON
    json_data := (
        SELECT jsonb_agg(data)
        FROM jsonb_array_elements(pg_read_file('docker-entrypoint-initdb.d/complaints.json')::jsonb) as data
    );

    -- Insérer les données dans la table principale
    INSERT INTO crimes
    SELECT *
    FROM json_populate_recordset(NULL::crimes, json_data);

    RAISE NOTICE 'Les données ont été insérées avec succès.';
END $$;

