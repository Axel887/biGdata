const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Configuration de connexion à PostgreSQL
const pool = new Pool({
  user: 'user',
  host: 'postgres', // Service PostgreSQL défini dans docker-compose.yml
  database: 'db_project',
  password: 'password',
  port: 5432,
});

async function insertData() {
  try {
    // Charger les données JSON
    const dataPath = path.join(__dirname, '../db/data/complaints.json');
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Préparer la requête d'insertion
    const insertQuery = `
      INSERT INTO crimes (
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
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
      )
      ON CONFLICT (full_complaint_id) DO NOTHING; -- Évite les doublons
    `;

    // Insérer chaque enregistrement
    for (const record of jsonData) {
      const values = [
        record.full_complaint_id,
        parseInt(record.complaint_year_number, 10),
        parseInt(record.month_number, 10),
        record.record_create_date,
        parseInt(record.complaint_precinct_code, 10) || null,
        record.patrol_borough_name || null,
        record.county || null,
        record.law_code_category_description || null,
        record.offense_description || null,
        record.pd_code_description || null,
        record.bias_motive_description || null,
        record.offense_category || null,
        record.arrest_date || null,
        record.arrest_id || null,
      ];

      await pool.query(insertQuery, values);
    }

    console.log('Données insérées avec succès.');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
    process.exit(1);
  }
}

insertData();
