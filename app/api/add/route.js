import clientPromise from '@/lib/mongodb'; // this is YOUR clientPromise

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db(body.db || 'GIPHY'); 
  const collection = db.collection('fav');
  const result = await collection.insertOne({id : body.id});
  console.log('Inserted document:', result);
  return Response.json({ success: true, result });
}
