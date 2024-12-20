import pkg from 'pg'; // Importer le module pg comme un package par défaut
const { Pool } = pkg; // Déstructurer pour obtenir Pool

export const pool = new Pool({
  user: 'user',
  host: 'postgres',
  database: 'db_project',
  password: 'password',
  port: 5432,
});

export async function getAllCrimes() {
  const result = await pool.query('SELECT * FROM crimes');
  return result.rows;
}

export async function getAllOffenseCrimes() {
  const result = await pool.query('SELECT offense_category FROM crimes');
  return result.rows;
}

export async function createNewCrime() {
  const newCrime = await generateNewCrimeData();

  await pool.query(
    `INSERT INTO crimes (
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
    )`,
    Object.values(newCrime)
  );
}

// Générer les données d'un nouveau crime
async function generateNewCrimeData() {
  try {
    const result = await pool.query('SELECT * FROM crimes ORDER BY RANDOM() LIMIT 1');
    const crime = result.rows[0];

    if (!crime) {
      throw new Error('Aucun crime existant trouvé pour générer un nouveau crime.');
    }

    const now = new Date();
    const newCrime = {
      full_complaint_id: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000),
      complaint_year_number: now.getFullYear(),
      month_number: now.getMonth() + 1,
      record_create_date: now.toISOString(),
      complaint_precinct_code: crime.complaint_precinct_code,
      patrol_borough_name: crime.patrol_borough_name,
      county: crime.county,
      law_code_category_description: crime.law_code_category_description,
      offense_description: crime.offense_description,
      pd_code_description: crime.pd_code_description,
      bias_motive_description: crime.bias_motive_description,
      offense_category: crime.offense_category,
      arrest_date: now.toISOString(),
      arrest_id: `A${Math.floor(Math.random() * 100000000)}`,
    };

    return newCrime;
  } catch (error) {
    console.error('Erreur lors de la génération des données :', error);
    throw error;
  }
}
