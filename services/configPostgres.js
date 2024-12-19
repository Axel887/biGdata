import { Pool } from 'pg';

// Configuration de PostgreSQL
export const pool = new Pool({
  user: 'user',         // Nom d'utilisateur PostgreSQL
  host: 'localhost',    // Utilisez "postgres" si vous êtes dans Docker
  database: 'crimes',   // Nom de la base de données
  password: 'password', // Mot de passe PostgreSQL
  port: 5432,           // Port par défaut de PostgreSQL
});
