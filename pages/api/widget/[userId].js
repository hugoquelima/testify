import clientPromise from '@/lib/mongodb'

export default async function handler(req, res) {
  const { userId } = req.query

  const client = await clientPromise
  const db = client.db('testify')

  const testimonials = await db.collection('testimonials')
    .find({ userId, approved: true })
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray()

  res.status(200).json({ testimonials })
}
