import { getAllCrimes } from '@/services/db/crimesService';

export async function GET(request: Request) {
  try {
    const result = await getAllCrimes();

    return new Response(JSON.stringify(result), {
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
