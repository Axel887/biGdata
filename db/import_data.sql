COPY crimes (
    full_complaint_id,
    complaint_year_number,
    month_number,
    record_create_date,
    complaint_precinct_code,
    patrol_borough_name,
    county,
    law_code_category_description,
    offense_description,
    pd_code_description,
    bias_motive_description,
    offense_category,
    arrest_date,
    arrest_id
)
FROM '/docker-entrypoint-initdb.d/complaints.csv'
DELIMITER ','
CSV HEADER;
