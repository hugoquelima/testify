import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

// Pre-made templates
const templates = {
  modern: {
    name: 'Modern Clean',
    backgroundColor: '#f8fafc',
    cardBackgroundColor: '#ffffff',
    textColor: '#334155',
    authorColor: '#0f172a',
    companyColor: '#64748b',
    starColor: '#fbbf24',
    borderColor: '#e2e8f0',
    cardPadding: '32',
    borderRadius: '16',
    borderWidth: '1',
    shadowIntensity: 'medium',
  },
  dark: {
    name: 'Dark Mode',
    backgroundColor: '#0f172a',
    cardBackgroundColor: '#1e293b',
    textColor: '#e2e8f0',
    authorColor: '#f8fafc',
    companyColor: '#94a3b8',
    starColor: '#fbbf24',
    borderColor: '#334155',
    cardPadding: '32',
    borderRadius: '16',
    borderWidth: '1',
    shadowIntensity: 'none',
  },
  colorful: {
    name: 'Colorful Pop',
    backgroundColor: '#fef3c7',
    cardBackgroundColor: '#ffffff',
    textColor: '#374151',
    authorColor: '#111827',
    companyColor: '#6b7280',
    starColor: '#f59e0b',
    borderColor: '#fcd34d',
    cardPadding: '28',
    borderRadius: '24',
    borderWidth: '2',
    shadowIntensity: 'light',
  },
  minimal: {
    name: 'Minimalist',
    backgroundColor: '#ffffff',
    cardBackgroundColor: '#ffffff',
    textColor: '#171717',
    authorColor: '#000000',
    companyColor: '#737373',
    starColor: '#171717',
    borderColor: '#e5e5e5',
    cardPadding: '24',
    borderRadius: '8',
    borderWidth: '1',
    shadowIntensity: 'none',
  },
  gradient: {
    name: 'Gradient Background',
    backgroundColor: '#4f46e5',
    cardBackgroundColor: '#ffffff',
    textColor: '#1e1b4b',
    authorColor: '#312e81',
    companyColor: '#6366f1',
    starColor: '#fbbf24',
    borderColor: 'transparent',
    cardPadding: '32',
    borderRadius: '20',
    borderWidth: '0',
    shadowIntensity: 'heavy',
  }
}

export default function WidgetEditor() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('design')
  const [copied, setCopied] = useState(false)
  
  // Widget settings
  const [settings, setSettings] = useState({
    widgetType: 'grid',
    columns: '2',
    backgroundColor: '#f8fafc',
    cardBackgroundColor: '#ffffff',
    textColor: '#334155',
    authorColor: '#0f172a',
    companyColor: '#64748b',
    starColor: '#fbbf24',
    borderColor: '#e2e8f0',
    cardPadding: '32',
    borderRadius: '16',
    borderWidth: '1',
    shadowIntensity: 'medium',
    showStars: true,
    showAvatar: true,
    showCompany: true,
    maxTestimonials: '6',
  })

  // Sample testimonials
  const sampleTestimonials = [
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      rating: 5,
      text: 'TestiFy completely transformed how we collect customer feedback. Setup took 2 minutes and we got 10 testimonials in the first week!',
    },
    {
      id: '2',
      name: 'Michael Chen',
      company: 'DesignCo',
      rating: 5,
      text: 'Finally, a testimonial tool that just works. No complicated setup, no expensive monthly fees. Perfect for my agency.',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      company: 'Marketing Pro',
      rating: 5,
      text: 'We switched from Trustpilot and saved $200/month. TestiFy does everything we need at a fraction of the cost.',
    },
  ]

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const applyTemplate = (templateKey) => {
    setSettings(prev => ({ ...prev, ...templates[templateKey] }))
  }

  const getEmbedCode = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    return `<iframe 
  src="${baseUrl}/widget/${session?.user?.id}" 
  width="100%" 
  height="600" 
  frameborder="0"
  style="border: none;"
></iframe>`
  }

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(getEmbedCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getShadow = () => {
    const shadows = {
      none: 'none',
      light: '0 1px 3px rgba(0,0,0,0.1)',
      medium: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
      heavy: '0 20px 40px rgba(0,0,0,0.15)',
    }
    return shadows[settings.shadowIntensity]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Widget Editor | TestiFy</title>
      </Head>

      {/* Navigation */}
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💬</span>
          <span className="font-bold text-xl text-indigo-600">TestiFy</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Widget Editor</span>
        </div>
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
          ← Back to Dashboard
        </Link>
      </nav>

      <div className="flex" style={{ height: 'calc(100vh - 65px)' }}>
        {/* Left Panel - Editor */}
        <div className="w-96 bg-white border-r overflow-y-auto">
          {/* Templates */}
          <div className="p-6 border-b">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Templates</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(templates).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => applyTemplate(key)}
                  className="p-3 text-left border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition text-sm"
                >
                  <div 
                    className="w-full h-8 rounded mb-2 border"
                    style={{ backgroundColor: template.cardBackgroundColor }}
                  />
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            {['design', 'layout', 'content'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Settings */}
          <div className="p-6 space-y-6">
            {activeTab === 'design' && (
              <>
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Colors</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'cardBackgroundColor', label: 'Card Background' },
                      { key: 'textColor', label: 'Text' },
                      { key: 'authorColor', label: 'Author Name' },
                      { key: 'companyColor', label: 'Company' },
                      { key: 'starColor', label: 'Stars' },
                      { key: 'borderColor', label: 'Border' },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{label}</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={settings[key]}
                            onChange={(e) => updateSetting(key, e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer border"
                          />
                          <span className="text-xs text-gray-400 w-16 font-mono">
                            {settings[key]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Style */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Card Style</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500">Border Radius</label>
                      <input
                        type="range"
                        min="0"
                        max="32"
                        value={settings.borderRadius}
                        onChange={(e) => updateSetting('borderRadius', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Shadow</label>
                      <select
                        value={settings.shadowIntensity}
                        onChange={(e) => updateSetting('shadowIntensity', e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="none">None</option>
                        <option value="light">Light</option>
                        <option value="medium">Medium</option>
                        <option value="heavy">Heavy</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'layout' && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Layout</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500">Padding</label>
                      <input
                        type="range"
                        min="16"
                        max="48"
                        value={settings.cardPadding}
                        onChange={(e) => updateSetting('cardPadding', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Border Width</label>
                      <input
                        type="range"
                        min="0"
                        max="4"
                        value={settings.borderWidth}
                        onChange={(e) => updateSetting('borderWidth', e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Display Options</h3>
                  <div className="space-y-2">
                    {[
                      { key: 'showStars', label: 'Show Star Rating' },
                      { key: 'showAvatar', label: 'Show Avatar' },
                      { key: 'showCompany', label: 'Show Company' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[key]}
                          onChange={(e) => updateSetting(key, e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'content' && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Content</h3>
                <div>
                  <label className="text-xs text-gray-500">Max Testimonials</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={settings.maxTestimonials}
                    onChange={(e) => updateSetting('maxTestimonials', e.target.value)}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{settings.maxTestimonials}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 flex flex-col">
          {/* Preview Header */}
          <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Live Preview</h2>
            <button
              onClick={copyEmbedCode}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy Embed Code'}
            </button>
          </div>

          {/* Preview Area */}
          <div 
            className="flex-1 overflow-auto p-8"
            style={{ backgroundColor: settings.backgroundColor }}
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-center text-2xl font-bold mb-2" style={{ color: settings.textColor }}>
                What Our Customers Say
              </h3>
              <p className="text-center mb-8" style={{ color: settings.companyColor }}>
                Trusted by {sampleTestimonials.length}+ happy customers
              </p>

              <div className="grid gap-6" style={{ gridTemplateColumns: settings.widgetType === 'grid' ? 'repeat(2, 1fr)' : '1fr' }}>
                {sampleTestimonials.slice(0, parseInt(settings.maxTestimonials)).map((t) => (
                  <div
                    key={t.id}
                    style={{
                      backgroundColor: settings.cardBackgroundColor,
                      padding: `${settings.cardPadding}px`,
                      borderRadius: `${settings.borderRadius}px`,
                      border: `${settings.borderWidth}px solid ${settings.borderColor}`,
                      boxShadow: getShadow(),
                    }}
                  >
                    {settings.showStars && (
                      <div style={{ color: settings.starColor, fontSize: '18px', marginBottom: '12px' }}>
                        {'★'.repeat(t.rating)}
                      </div>
                    )}
                    
                    <p style={{ color: settings.textColor, fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                      "{t.text}"
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {settings.showAvatar && (
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          backgroundColor: settings.starColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '16px',
                        }}>
                          {t.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div style={{ color: settings.authorColor, fontWeight: 600, fontSize: '14px' }}>
                          {t.name}
                        </div>
                        {settings.showCompany && (
                          <div style={{ color: settings.companyColor, fontSize: '13px' }}>
                            {t.company}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Embed Code Preview */}
          <div className="bg-gray-900 text-white p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Embed Code</span>
            </div>
            <code className="text-xs text-green-400 block overflow-x-auto whitespace-pre">
              {getEmbedCode()}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
