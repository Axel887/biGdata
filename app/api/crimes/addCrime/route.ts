import { createNewCrime } from '@/services/db/crimesService';

export async function POST(request: Request) {
  try {
    await createNewCrime();

    return new Response("Nouveau Crime ajouté avec succès !", {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la création du crime:' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
