import { getSession } from 'next-auth/react'
import clientPromise from '@/lib/mongodb'

export default async function handler(req, res) {
  const session = await getSession({ req })
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const client = await clientPromise
  const db = client.db('testify')

  if (req.method === 'GET') {
    const testimonials = await db.collection('testimonials')
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray()
    
    return res.status(200).json({ testimonials })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
