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

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #f3f4f6',
            borderTop: '3px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading testimonials...</p>
        </div>
      </div>
    )
  }
  
  if (testimonials.length === 0) {
    return (
      <div style={{ 
        padding: '60px 20px', 
        textAlign: 'center',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#9ca3af',
        backgroundColor: '#f9fafb',
        borderRadius: '16px',
        margin: '20px'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
        <p style={{ fontSize: '16px', marginBottom: '8px' }}>No testimonials yet</p>
        <p style={{ fontSize: '14px' }}>Check back soon!</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
          }
          
          .testify-container {
            max-width: 800px;
            margin: 0 auto;
          }
          
          .testify-header {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .testify-header h2 {
            color: white;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .testify-header p {
            color: rgba(255,255,255,0.8);
            font-size: 16px;
          }
          
          .testimonial-card {
            background: white;
            border-radius: 20px;
            padding: 32px;
            margin-bottom: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .testimonial-card::before {
            content: '"';
            position: absolute;
            top: -10px;
            left: 20px;
            font-size: 120px;
            color: #f3f4f6;
            font-family: Georgia, serif;
            line-height: 1;
            z-index: 0;
          }
          
          .testimonial-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
          }
          
          .stars {
            color: #fbbf24;
            font-size: 20px;
            margin-bottom: 16px;
            position: relative;
            z-index: 1;
          }
          
          .quote {
            color: #1f2937;
            font-size: 18px;
            line-height: 1.7;
            margin-bottom: 24px;
            position: relative;
            z-index: 1;
            font-weight: 400;
          }
          
          .author-section {
            display: flex;
            align-items: center;
            gap: 16px;
            padding-top: 20px;
            border-top: 1px solid #f3f4f6;
          }
          
          .avatar {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: white;
            font-size: 20px;
            flex-shrink: 0;
          }
          
          .author-info {
            flex: 1;
          }
          
          .author-name {
            font-weight: 700;
            color: #111827;
            font-size: 16px;
            margin-bottom: 4px;
          }
          
          .company {
            color: #6b7280;
            font-size: 14px;
          }
          
          .verified-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: #dcfce7;
            color: #166534;
            font-size: 12px;
            font-weight: 600;
            padding: 4px 12px;
            border-radius: 20px;
            margin-top: 8px;
          }
          
          .powered-by {
            text-align: center;
            padding: 32px;
            color: rgba(255,255,255,0.7);
            font-size: 13px;
          }
          
          .powered-by a {
            color: white;
            text-decoration: none;
            font-weight: 600;
          }
          
          .powered-by a:hover {
            text-decoration: underline;
          }
          
          @media (max-width: 640px) {
            body { padding: 20px 16px; }
            .testimonial-card { padding: 24px; }
            .testify-header h2 { font-size: 24px; }
            .quote { font-size: 16px; }
          }
        `}</style>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <div className="testify-container">
        <div className="testify-header">
          <h2>What Our Customers Say</h2>
          <p>Trusted by {testimonials.length}+ happy customers</p>
        </div>
        
        {testimonials.map((t) => (
          <div key={t._id} className="testimonial-card">
            <div className="stars">{'★'.repeat(t.rating)}</div>
            <p className="quote">{t.text}</p>
            <div className="author-section">
              <div className="avatar">{t.name.charAt(0)}</div>
              <div className="author-info">
                <div className="author-name">{t.name}</div>
                {t.company && <div className="company">{t.company}</div>}
                <div className="verified-badge">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginRight: '4px' }}>
                    <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="currentColor"/>
                  </svg>
                  Verified Customer
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="powered-by">
          Powered by <a href="https://testify-h6td.vercel.app" target="_blank" rel="noopener">TestiFy</a> — Collect testimonials in 60 seconds
        </div>
      </div>
    </>
  )
}
