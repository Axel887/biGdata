'use client'; // Recharts nécessite que ce composant s'exécute côté client

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Couleurs des segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666', '#AAAAFF'];

export default function OffenseCrimesPieChart() {
  const [data, setData] = useState([]); // Données pour le pie chart
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [notification, setNotification] = useState(null); // Notifications utilisateur

  // Fonction pour ajouter un nouveau crime
  const addNewCrime = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/crimes/addCrime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout d\'un nouveau crime');
      }

      // Affiche une notification temporaire
      setNotification('Nouveau crime ajouté avec succès !');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error('Erreur lors de l\'ajout du crime:', err);
      setNotification('Erreur lors de l\'ajout d\'un crime.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Fonction pour récupérer les données
  const fetchData = async () => {
    setLoading(true); // Début du chargement
    try {
      const response = await fetch('http://localhost:3000/api/crimes/getOffenseCrime');
      if (!response.ok) throw new Error('Erreur lors de la récupération des données');
      const rawData = await response.json();

      setData(rawData); // Mettre à jour les données une fois prêtes
    } catch (err) {
      console.error('Erreur lors de la récupération des données:', err);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  useEffect(() => {
    // Récupérer les données au montage
    fetchData();

    // Ajouter un nouveau crime toutes les 15 secondes
    const intervalId = setInterval(async () => {
      await addNewCrime();
      await fetchData(); // Rafraîchir les données après l'ajout
    }, 15000);

    // Nettoyage de l'intervalle
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Répartition des Crimes par Catégorie</h2>
      
      {/* Notification */}
      {notification && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>
          {notification}
        </p>
      )}

      {/* Affichage du PieChart */}
      {data.length > 0 ? (
        <PieChart width={410} height={410}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={150}
            innerRadius={80} // Optionnel : pour un effet de donut
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        !loading && <p>Aucune donnée disponible</p> // Si aucune donnée et pas de chargement
      )}

      {/* Indicateur de chargement */}
      {loading && <p>Chargement des données...</p>}
    </div>
  );
}
