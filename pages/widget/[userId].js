import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Widget() {
  const router = useRouter()
  const { userId } = router.query
  const [testimonials, setTestimonials] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (userId) {
      fetch(`/api/widget/${userId}`)
        .then(res => res.json())
        .then(data => setTestimonials(data.testimonials || []))
    }
  }, [userId])

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [testimonials])

  if (testimonials.length === 0) {
    return <div style={{ padding: 20, textAlign: 'center', fontFamily: 'sans-serif' }}>No testimonials yet.</div>
  }

  const current = testimonials[currentIndex]

  return (
    <>
      <Head>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .testimonial-card {
            animation: fadeIn 0.5s ease;
          }
        `}</style>
      </Head>
      
      <div style={{
        padding: '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div className="testimonial-card" key={currentIndex}>
          <div style={{ fontSize: '48px', opacity: 0.3, marginBottom: '-20px' }}>"""</div>
          
          <p style={{ 
            fontSize: '18px', 
            lineHeight: '1.6',
            marginBottom: '16px',
            fontStyle: 'italic'
          }}>
            {current.text}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {current.name.charAt(0)}
            </div>
            
            <div>
              <div style={{ fontWeight: '600' }}>{current.name}</div>
              {current.company && (
                <div style={{ fontSize: '14px', opacity: 0.8 }}>{current.company}</div>
              )}
            </div>
            
            <div style={{ marginLeft: 'auto', color: '#fbbf24' }}>
              {'★'.repeat(current.rating)}
            </div>
          </div>
        </div>
        
        {testimonials.length > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '6px',
            marginTop: '16px'
          }}>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  background: idx === currentIndex ? 'white' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
