import clientPromise from '@/lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, company, rating, text, userId } = req.body

  if (!name || !email || !rating || !text || !userId) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const client = await clientPromise
  const db = client.db('testify')

  const testimonial = {
    userId,
    name,
    email,
    company: company || '',
    rating: parseInt(rating),
    text,
    approved: false,
    createdAt: new Date()
  }

  await db.collection('testimonials').insertOne(testimonial)

  res.status(201).json({ success: true })
}
