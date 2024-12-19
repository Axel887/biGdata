import { Pool } from 'pg';

export const pool = new Pool({
    user: 'user',         // Nom d'utilisateur PostgreSQL
    host: 'postgres',    // Utilisez "postgres" si vous êtes dans Docker
    database: 'db_project',   // Nom de la base de données
    password: 'password', // Mot de passe PostgreSQL
    port: 5432,           // Port par défaut de PostgreSQL
  });

export default pool;

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
    Object.values(newCrime) // Passer les valeurs du crime généré
  );
}

// Générer les données d'un nouveau crime à partir d'un crime existant
async function generateNewCrimeData() {
  try {
    // Récupérer un crime aléatoire pour générer les données
    const result = await pool.query('SELECT * FROM crimes ORDER BY RANDOM() LIMIT 1');
    const crime = result.rows[0];

    if (!crime) {
      throw new Error('Aucun crime existant trouvé pour générer un nouveau crime.');
    }

    // Générer un nouvel identifiant unique pour le crime
    const now = new Date();
    const newFullComplaintId = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000); // Générer un ID unique basé sur le timestamp

    // Créer un nouvel enregistrement basé sur le crime existant
    const newCrime = {
      full_complaint_id: newFullComplaintId,           // Nouvel ID unique
      complaint_year_number: now.getFullYear(),        // Année courante
      month_number: now.getMonth() + 1,               // Mois courant
      record_create_date: now.toISOString(),          // Date courante avec heure
      complaint_precinct_code: crime.complaint_precinct_code,
      patrol_borough_name: crime.patrol_borough_name,
      county: crime.county,
      law_code_category_description: crime.law_code_category_description,
      offense_description: crime.offense_description,
      pd_code_description: crime.pd_code_description,
      bias_motive_description: crime.bias_motive_description,
      offense_category: crime.offense_category,
      arrest_date: now.toISOString(),                 // Date courante avec heure
      arrest_id: `A${Math.floor(Math.random() * 100000000)}`, // Nouvel ID d'arrestation unique
    };

    return newCrime;
  } catch (error) {
    console.error('Erreur lors de la génération des données :', error);
    throw error;
  }
}