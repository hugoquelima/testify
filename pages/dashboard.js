import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [testimonials, setTestimonials] = useState([])
  const [formUrl, setFormUrl] = useState('')

  useEffect(() => {
    if (session?.user?.id) {
      setFormUrl(`${window.location.origin}/collect/${session.user.id}`)
      fetchTestimonials()
    }
  }, [session])

  const fetchTestimonials = async () => {
    const res = await fetch('/api/testimonials')
    const data = await res.json()
    setTestimonials(data.testimonials || [])
  }

  if (status === 'loading') return <div>Loading...</div>
  if (!session) return <div>Please sign in</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Head><title>Dashboard | TestiFy</title></Head>
      
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl text-indigo-600">TestiFy</div>
        <div className="flex gap-4 items-center">
          <span className="text-gray-600">{session.user.email}</span>
          <Link href="/api/auth/signout" className="text-red-500 hover:text-red-600">Sign Out</Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-gray-500 text-sm uppercase tracking-wide mb-2">Total Testimonials</h2>
            <div className="text-4xl font-bold text-gray-900">{testimonials.length}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-gray-500 text-sm uppercase tracking-wide mb-2">Pending Review</h2>
            <div className="text-4xl font-bold text-orange-500">
              {testimonials.filter(t => !t.approved).length}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-gray-500 text-sm uppercase tracking-wide mb-2">Published</h2>
            <div className="text-4xl font-bold text-green-500">
              {testimonials.filter(t => t.approved).length}
            </div>
          </div>
        </div>

        {/* Collection Form Link */}
        <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Your Collection Form</h3>
          <p className="text-white/80 mb-4">Share this link with your customers to collect testimonials</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={formUrl}
              readOnly
              className="flex-1 px-4 py-2 rounded-lg text-gray-900"
            />
            <button 
              onClick={() => {
                navigator.clipboard.writeText(formUrl)
                alert('Copied!')
              }}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold"
            >
              Copy Link
            </button>
          </div>
        </div>

        {/* Embed Code */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Embed on Your Website</h3>
          <p className="text-gray-600 mb-4">Copy this code to your website to display testimonials</p>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
            {<iframe 
  src="{window.location.origin}/widget/{session.user.id}" 
  width="100%" 
  height="400"
  frameborder="0"
></iframe>}
          </pre>
        </div>

        {/* Testimonials List */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Testimonials</h3>
          
          {testimonials.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center text-gray-500">
              No testimonials yet. Share your collection link to get started!
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((t) => (
                <div key={t._id} className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${t.approved ? 'border-green-500' : 'border-orange-500'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{t.name}</span>
                        <span className="text-yellow-500">{'★'.repeat(t.rating)}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{t.text}</p>
                      <span className="text-sm text-gray-500">{t.company && `from ${t.company}`} • {new Date(t.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      {!t.approved && (
                        <button 
                          onClick={async () => {
                            await fetch(`/api/testimonials/${t._id}/approve`, { method: 'POST' })
                            fetchTestimonials()
                          }}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600"
                        >
                          Approve
                        </button>
                      )}
                      <button 
                        onClick={async () => {
                          await fetch(`/api/testimonials/${t._id}`, { method: 'DELETE' })
                          fetchTestimonials()
                        }}
                        className="text-red-500 hover:text-red-600 px-3 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
