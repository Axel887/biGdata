import { getAllOffenseCrimes } from '@/services/db/crimesService';

export async function GET(request: Request) {
  try {
    const result = await getAllOffenseCrimes();

    // Transformer les données pour regrouper les occurrences par offense_crime
    const formattedData = result.reduce((acc, item) => {
      const existing = acc.find((entry) => entry.name === item.offense_category);
      if (existing) {
        existing.value += 1; // Incrémentez si l'élément existe
      } else {
        acc.push({ name: item.offense_category, value: 1 }); // Ajoutez un nouvel élément
      }
      return acc;
    }, []);

    // Retourner les données transformées
    return new Response(JSON.stringify(formattedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);

    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des données' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
