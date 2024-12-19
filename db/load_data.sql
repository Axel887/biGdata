-- Charger le fichier JSON brut dans une table temporaire
COPY temp_json_data(data)
FROM 'data/complaints.json/docker-entrypoint-initdb.d/complaints.json'
WITH (FORMAT text);

-- Insérer les données dans la table finale
INSERT INTO complaints (
    full_complaint_id, complaint_year_number, month_number, record_create_date,
    complaint_precinct_code, patrol_borough_name, county, law_code_category_description,
    offense_description, pd_code_description, bias_motive_description,
    offense_category, arrest_date, arrest_id
)
SELECT
    data->>'full_complaint_id',
    (data->>'complaint_year_number')::INT,
    (data->>'month_number')::INT,
    (data->>'record_create_date')::TIMESTAMP,
    (data->>'complaint_precinct_code')::INT,
    data->>'patrol_borough_name',
    data->>'county',
    data->>'law_code_category_description',
    data->>'offense_description',
    data->>'pd_code_description',
    data->>'bias_motive_description',
    data->>'offense_category',
    (data->>'arrest_date')::TIMESTAMP,
    data->>'arrest_id'
FROM temp_json_data;

-- Supprimer la table temporaire
DROP TABLE temp_json_data;
