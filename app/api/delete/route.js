import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db('GIPHY');
  const collection = db.collection('fav');
  const result = await collection.deleteOne({ id: body.id });
  console.log('Inserted document:', result);
  return Response.json({result });
}