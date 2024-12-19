CREATE TABLE IF NOT EXISTS complaints (
    full_complaint_id TEXT PRIMARY KEY,
    complaint_year_number INT,
    month_number INT,
    record_create_date TIMESTAMP,
    complaint_precinct_code INT,
    patrol_borough_name TEXT,
    county TEXT,
    law_code_category_description TEXT,
    offense_description TEXT,
    pd_code_description TEXT,
    bias_motive_description TEXT,
    offense_category TEXT,
    arrest_date TIMESTAMP,
    arrest_id TEXT
);

-- Charger les données JSON
COPY complaints (
    full_complaint_id, complaint_year_number, month_number, record_create_date,
    complaint_precinct_code, patrol_borough_name, county, law_code_category_description,
    offense_description, pd_code_description, bias_motive_description,
    offense_category, arrest_date, arrest_id
)
FROM '/docker-entrypoint-initdb.d/complaints.json'
WITH (FORMAT json);
