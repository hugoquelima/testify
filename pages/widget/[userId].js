import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function Widget() {
  const router = useRouter()
  const { userId } = router.query
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      fetch(`/api/widget/${userId}`)
        .then(res => res.json())
        .then(data => {
          setTestimonials(data.testimonials || [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [userId])

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>
  
  if (testimonials.length === 0) {
    return (
      <div style={{ 
        padding: 40, 
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
        color: '#666'
      }}>
        No testimonials yet.
      </div>
    )
  }

  return (
    <>
      <Head>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: system-ui, -apple-system, sans-serif; }
          
          .testimonial-card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 16px;
            border: 1px solid #e5e7eb;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          
          .stars {
            color: #fbbf24;
            font-size: 18px;
            margin-bottom: 12px;
          }
          
          .quote {
            color: #1f2937;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 16px;
          }
          
          .author {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #f3f4f6;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #6b7280;
          }
          
          .author-name {
            font-weight: 600;
            color: #111827;
          }
          
          .company {
            color: #6b7280;
            font-size: 14px;
          }
          
          .powered-by {
            text-align: center;
            padding: 16px;
            font-size: 12px;
            color: #9ca3af;
          }
          
          .powered-by a {
            color: #6366f1;
            text-decoration: none;
          }
        `}</style>
      </Head>
      
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        {testimonials.map((t) => (
          <div key={t._id} className="testimonial-card">
            <div className="stars">{'★'.repeat(t.rating)}</div>
            
            <p className="quote">"{t.text}"</p>
            
            <div className="author">
              <div className="avatar">{t.name.charAt(0)}</div>
              <div>
                <div className="author-name">{t.name}</div>
                {t.company && <div className="company">{t.company}</div>}
              </div>
            </div>
          </div>
        ))}
        
        <div className="powered-by">
          Powered by <a href="https://testify-h6td.vercel.app" target="_blank" rel="noopener">TestiFy</a>
        </div>
      </div>
    </>
  )
}
