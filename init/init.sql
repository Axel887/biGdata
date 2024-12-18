-- creation de la base de donnée
CREATE TABLE IF NOT EXISTS crimes (
   
    id SERIAL PRIMARY KEY,         -- Identifiant unique, généré automatiquement
    report_crime_date DATE NOT NULL,      -- Date du rapport du crime
    crime_month SMALLINT NOT NULL CHECK (crime_month BETWEEN 1 AND 12), -- Mois (1-12)
    crime_year SMALLINT NOT NULL,         -- Année du crime
    offense_description TEXT NOT NULL,    -- Description de l'infraction
    county_crime VARCHAR(255) NOT NULL,   -- Comté où le crime a eu lieu
    motive_crime TEXT,                    -- Motif du crime (facultatif)
    offense_crime TEXT,                   -- Catégorie ou nature du crime
    arrest_date DATE                      -- Date d'arrestation (facultatif)
);

CREATE INDEX idx_crime_date ON Crime (report_crime_date);
CREATE INDEX idx_crime_year_month ON Crime (crime_year, crime_month);
CREATE INDEX idx_county_crime ON Crime (county_crime);
