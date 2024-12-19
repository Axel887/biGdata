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

-- Création d'une table temporaire pour charger les données JSON
CREATE TABLE IF NOT EXISTS temp_json_data (
    data JSONB
);

