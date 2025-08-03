import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  const body = await request.json();

  const client = await clientPromise;
  const db = client.db(body.db || 'GIPHY');
  const collection = db.collection('fav');

  const result = await collection.find({}).toArray();

  console.log('Found documents:', result);

  return Response.json({ result });
}
