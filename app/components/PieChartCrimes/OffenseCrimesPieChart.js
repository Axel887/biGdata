'use client'; // Recharts nécessite que ce composant s'exécute côté client

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Couleurs des segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666', '#AAAAFF'];

export default function OffenseCrimesPieChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/crimes/getOffenseCrime'); // Appel à votre endpoint
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');
        const jsonData = await response.json();
        setData(jsonData); // Enregistre les données transformées
      } catch (err) {
        setError(err.message); // Gestion des erreurs
      } finally {
        setLoading(false); // Fin du chargement
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        dataKey="value" // La clé des données transformées pour la taille des segments
        nameKey="name" // La clé des données transformées pour le nom des segments
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
