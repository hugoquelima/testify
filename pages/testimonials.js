import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function TestimonialsPage() {
  const { data: session, status } = useSession()
  const [testimonials, setTestimonials] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRating, setFilterRating] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    if (session?.user?.id) fetchTestimonials()
  }, [session])

  useEffect(() => {
    applyFilters()
  }, [testimonials, search, filterStatus, filterRating, sortBy])

  const fetchTestimonials = async () => {
    const res = await fetch('/api/testimonials')
    const data = await res.json()
    setTestimonials(data.testimonials || [])
  }

  const applyFilters = () => {
    let result = [...testimonials]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.text.toLowerCase().includes(q) ||
        (t.company || '').toLowerCase().includes(q)
      )
    }
    if (filterStatus === 'approved') result = result.filter(t => t.approved)
    if (filterStatus === 'pending') result = result.filter(t => !t.approved)
    if (filterRating !== 'all') result = result.filter(t => t.rating === parseInt(filterRating))
    if (sortBy === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    if (sortBy === 'oldest') result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    if (sortBy === 'rating_high') result.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'rating_low') result.sort((a, b) => a.rating - b.rating)
    setFiltered(result)
  }

  const handleApprove = async (id) => {
    await fetch(`/api/testimonials/${id}`, { method: 'POST' })
    fetchTestimonials()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
    fetchTestimonials()
  }

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Rating', 'Testimonial', 'Status', 'Date']
    const rows = filtered.map(t => [
      t.name,
      t.email || '',
      t.company || '',
      t.rating,
      `"${(t.text || '').replace(/"/g, '""')}"`,
      t.approved ? 'Published' : 'Pending',
      new Date(t.createdAt).toLocaleDateString()
    ])
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'testimonials.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportJSON = () => {
    const data = filtered.map(t => ({
      name: t.name,
      email: t.email || '',
      company: t.company || '',
      rating: t.rating,
      text: t.text,
      approved: t.approved,
      createdAt: t.createdAt
    }))
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'testimonials.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!session) return <div className="min-h-screen flex items-center justify-center">Please sign in</div>

  const approvedCount = testimonials.filter(t => t.approved).length
  const pendingCount = testimonials.filter(t => !t.approved).length
  const avgRating = testimonials.length
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : '-'

  return (
    <div className="min-h-screen bg-gray-50">
      <Head><title>Testimonials | TestiFy</title></Head>
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">💬</span>
            <span className="font-bold text-xl text-indigo-600">TestiFy</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 font-medium">Testimonials</span>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 text-gray-700">
            Export CSV
          </button>
          <button onClick={exportJSON} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 text-gray-700">
            Export JSON
          </button>
          <span className="text-gray-500 text-sm">{session.user.email}</span>
        </div>
      </nav>
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage, filter, and export your customer testimonials</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="text-gray-500 text-xs mb-1">Total</div>
            <div className="text-2xl font-bold text-gray-900">{testimonials.length}</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="text-gray-500 text-xs mb-1">Published</div>
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="text-gray-500 text-xs mb-1">Pending</div>
            <div className="text-2xl font-bold text-orange-500">{pendingCount}</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="text-gray-500 text-xs mb-1">Avg Rating</div>
            <div className="text-2xl font-bold text-yellow-500">{avgRating} stars</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search by name, company, or content..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-48 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="all">All Status</option>
            <option value="approved">Published</option>
            <option value="pending">Pending</option>
          </select>
          <select value={filterRating} onChange={e => setFilterRating(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating_high">Rating: High to Low</option>
            <option value="rating_low">Rating: Low to High</option>
          </select>
          <span className="text-sm text-gray-400">{filtered.length} results</span>
        </div>
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">{testimonials.length === 0 ? '📝' : '🔍'}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {testimonials.length === 0 ? 'No testimonials yet' : 'No results found'}
            </h3>
            <p className="text-gray-500">
              {testimonials.length === 0 ? 'Share your collection link to start!' : 'Try adjusting your filters.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(t => (
              <div key={t._id} className={`bg-white rounded-xl p-6 border shadow-sm flex flex-col md:flex-row gap-4 border-l-4 ${t.approved ? 'border-l-green-400' : 'border-l-orange-400'}`}>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-lg">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{t.name}</span>
                    {t.company && <span className="text-gray-400 text-sm">· {t.company}</span>}
                    <span className={t.approved ? 'px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full' : 'px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full'}>
                      {t.approved ? 'Published' : 'Pending'}
                    </span>
                  </div>
                  <div className="text-yellow-400 text-sm mb-2">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                  <p className="text-gray-700 text-sm leading-relaxed">{t.text}</p>
                  <div className="mt-2 text-xs text-gray-400">
                    {t.email && <span className="mr-3">{t.email}</span>}
                    <span>{new Date(t.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
                <div className="flex md:flex-col gap-2 flex-shrink-0">
                  {!t.approved && (
                    <button onClick={() => handleApprove(t._id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Approve
                    </button>
                  )}
                  <button onClick={() => handleDelete(t._id)} className="border border-red-200 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-indigo-600 hover:underline text-sm">Back to Dashboard</Link>
        </div>
      </main>
    </div>
  )
}
