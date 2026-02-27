import { getSession } from 'next-auth/react'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const session = await getSession({ req })
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.query
  const client = await clientPromise
  const db = client.db('testify')

  if (req.method === 'POST') {
    await db.collection('testimonials').updateOne(
      { _id: new ObjectId(id), userId: session.user.id },
      { $set: { approved: true } }
    )
    return res.status(200).json({ success: true })
  }

  if (req.method === 'DELETE') {
    await db.collection('testimonials').deleteOne(
      { _id: new ObjectId(id), userId: session.user.id }
    )
    return res.status(200).json({ success: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
