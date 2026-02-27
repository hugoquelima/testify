import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [testimonials, setTestimonials] = useState([])
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (session?.user?.id) {
      fetchTestimonials()
    }
  }, [session])

  const fetchTestimonials = async () => {
    const res = await fetch('/api/testimonials')
    const data = await res.json()
    setTestimonials(data.testimonials || [])
  }

  const collectionUrl = session?.user?.id 
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/collect/${session.user.id}`
    : ''

  const widgetCode = session?.user?.id
    ? `<iframe 
  src="${typeof window !== 'undefined' ? window.location.origin : ''}/widget/${session.user.id}" 
  width="100%" 
  height="400"
  frameborder="0"
></iframe>`
    : ''

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!session) return <div className="min-h-screen flex items-center justify-center">Please sign in</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Head><title>Dashboard | TestiFy</title></Head>
      
      {/* Navigation */}
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💬</span>
          <span className="font-bold text-xl text-indigo-600">TestiFy</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-gray-600 text-sm">{session.user.email}</span>
          <Link href="/api/auth/signout" className="text-red-500 hover:text-red-600 text-sm">Sign Out</Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {session.user.name || 'there'}! 👋</h1>
          <p className="text-gray-600 mt-1">Here's everything you need to collect amazing testimonials</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Total Testimonials</div>
            <div className="text-3xl font-bold text-gray-900">{testimonials.length}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Published</div>
            <div className="text-3xl font-bold text-green-600">
              {testimonials.filter(t => t.approved).length}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Pending Review</div>
            <div className="text-3xl font-bold text-orange-500">
              {testimonials.filter(t => !t.approved).length}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm mb-1">Your Plan</div>
            <div className="text-lg font-bold text-indigo-600">Pro ✨</div>
          </div>
        </div>

        {/* Onboarding Steps */}
        {showOnboarding && testimonials.length === 0 && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">🚀 Get Started in 3 Steps</h2>
                <p className="text-white/80">Complete these steps to start collecting testimonials</p>
              </div>
              <button 
                onClick={() => setShowOnboarding(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">1️⃣</div>
                <div className="font-semibold mb-1">Share Your Link</div>
                <p className="text-sm text-white/80">Copy your collection URL and send it to customers</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">2️⃣</div>
                <div className="font-semibold mb-1">Collect Reviews</div>
                <p className="text-sm text-white/80">Customers submit testimonials through your branded form</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">3️⃣</div>
                <div className="font-semibold mb-1">Display Widget</div>
                <p className="text-sm text-white/80">Add the widget to your website with one line of code</p>
              </div>
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Collection Link */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🔗</span>
                <h2 className="text-xl font-semibold">Your Collection Link</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                Share this link with your customers to collect testimonials. They'll see a branded form.
              </p>
              
              <div className="bg-gray-100 rounded-lg p-3 mb-4">
                <code className="text-sm break-all">{collectionUrl}</code>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(collectionUrl)
                    alert('Copied to clipboard!')
                  }}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Copy Link
                </button>
                <a 
                  href={collectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Preview
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💡</span>
                <h2 className="text-xl font-semibold">Pro Tips</h2>
              </div>
              
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Add the link to your email signature</span>
                </li>
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Send it after successful project delivery</span>
                </li>
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Include in your thank you emails</span>
                </li>
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Share on social media with a QR code</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Widget Code */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎨</span>
                <h2 className="text-xl font-semibold">Website Widget</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                Copy this code and paste it into your website to display testimonials. Works with any site!
              </p>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                <pre className="text-sm text-green-400">{widgetCode}</pre>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(widgetCode)
                    alert('Widget code copied!')
                  }}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Copy Code
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎯</span>
                <h3 className="text-lg font-semibold">What is TestiFy?</h3>
              </div>
              
              <p className="text-white/90 text-sm">
                TestiFy helps you collect, manage, and display customer testimonials. 
                Use social proof to convert more visitors into customers. 
                Simple setup, powerful results.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Testimonials */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Testimonials</h2>
          
          {testimonials.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-200">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No testimonials yet</h3>
              <p className="text-gray-600 mb-6">Share your collection link to start gathering testimonials!</p>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(collectionUrl)
                  alert('Collection link copied!')
                }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Copy Collection Link
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div 
                  key={t._id} 
                  className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${t.approved ? 'border-green-500' : 'border-orange-500'}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        {t.company && <div className="text-sm text-gray-500">{t.company}</div>}
                      </div>
                    </div>
                    
                    <span className="text-yellow-500 text-lg">{'★'.repeat(t.rating)}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{t.text}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </span>
                    
                    <div className="flex gap-2">
                      {!t.approved && (
                        <button 
                          onClick={async () => {
                            await fetch(`/api/testimonials/${t._id}`, { method: 'POST' })
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
                        className="text-red-500 hover:text-red-600 px-3 py-1 text-sm"
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
