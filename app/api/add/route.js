import clientPromise from '@/lib/mongodb'; // this is YOUR clientPromise

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db('GIPHY');
  const collection = db.collection('fav');
  const result = await collection.insertOne(body);
  console.log('Inserted document:', result);
  return Response.json({ success: true, result });
}
