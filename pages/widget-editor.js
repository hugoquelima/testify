import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function WidgetEditor() {
  const { data: session, status } = useSession()
  const [testimonials, setTestimonials] = useState([])
  const [activeTab, setActiveTab] = useState('design')
  const [previewDevice, setPreviewDevice] = useState('desktop')
  
  // Widget Settings State
  const [settings, setSettings] = useState({
    // Widget Type
    widgetType: 'carousel',
    
    // Colors
    backgroundColor: '#ffffff',
    cardBackgroundColor: '#ffffff',
    textColor: '#1f2937',
    authorColor: '#111827',
    companyColor: '#6b7280',
    starColor: '#fbbf24',
    borderColor: '#e5e7eb',
    
    // Typography
    fontFamily: 'Inter',
    titleSize: '18',
    bodySize: '16',
    authorSize: '14',
    companySize: '12',
    
    // Layout
    cardPadding: '24',
    borderRadius: '12',
    borderWidth: '1',
    shadowIntensity: 'medium',
    maxWidth: '1200',
    columns: '3',
    spacing: '24',
    
    // Effects
    hoverEffect: 'lift',
    animation: 'fade',
    animationSpeed: 'normal',
    
    // Carousel Settings
    autoplay: true,
    autoplaySpeed: '5000',
    showArrows: true,
    showDots: true,
    infiniteLoop: true,
    
    // Logo
    showLogo: false,
    logoUrl: '',
    logoHeight: '40',
    
    // Display Options
    showStars: true,
    showDate: false,
    showCompany: true,
    showAvatar: true,
    maxTestimonials: '10',
  })

  // Available Options
  const widgetTypes = [
    { id: 'carousel', name: 'Carousel', icon: '◀ ▶' },
    { id: 'grid', name: 'Grid', icon: '▦' },
    { id: 'masonry', name: 'Masonry', icon: '▤' },
    { id: 'wall', name: 'Wall/Stream', icon: '☰' },
    { id: 'badge', name: 'Badge', icon: '●' },
    { id: 'marquee', name: 'Marquee', icon: '→' },
  ]

  const fontFamilies = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Poppins',
    'Montserrat',
    'Lato',
    'Playfair Display',
    'Merriweather',
  ]

  const hoverEffects = [
    { id: 'none', name: 'None' },
    { id: 'lift', name: 'Lift Up' },
    { id: 'glow', name: 'Glow' },
    { id: 'scale', name: 'Scale' },
    { id: 'border', name: 'Border Highlight' },
  ]

  const animations = [
    { id: 'none', name: 'None' },
    { id: 'fade', name: 'Fade In' },
    { id: 'slide', name: 'Slide Up' },
    { id: 'zoom', name: 'Zoom In' },
    { id: 'flip', name: 'Flip' },
  ]

  useEffect(() => {
    if (session?.user?.id) {
      fetchTestimonials()
    }
  }, [session])

  const sampleTestimonials = [
    {
      _id: 'sample1',
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      rating: 5,
      text: 'TestiFy completely transformed how we collect customer feedback. Setup took 2 minutes and we got 10 testimonials in the first week!',
      createdAt: new Date().toISOString(),
      approved: true
    },
    {
      _id: 'sample2',
      name: 'Michael Chen',
      company: 'DesignCo',
      rating: 5,
      text: 'Finally, a testimonial tool that just works. No complicated setup, no expensive monthly fees. Perfect for my agency.',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      approved: true
    },
    {
      _id: 'sample3',
      name: 'Emily Rodriguez',
      company: 'Marketing Pro',
      rating: 5,
      text: 'We switched from Trustpilot and saved $200/month. TestiFy does everything we need at a fraction of the cost. Highly recommend!',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      approved: true
    }
  ]

  const fetchTestimonials = async () => {
    const res = await fetch('/api/testimonials')
    const data = await res.json()
    const realTestimonials = data.testimonials?.filter(t => t.approved) || []
    // Use real testimonials if available, otherwise show samples
    setTestimonials(realTestimonials.length > 0 ? realTestimonials : sampleTestimonials)
  }

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const generateEmbedCode = () => {
    const params = new URLSearchParams({
      userId: session?.user?.id || '',
      ...settings,
    }).toString()
    
    return `<iframe 
  src="${typeof window !== 'undefined' ? window.location.origin : ''}/widget/${session?.user?.id}?${params}" 
  width="100%" 
  height="400"
  frameborder="0"
  style="border: none;"
></iframe>`
  }

  const getShadowStyle = () => {
    switch(settings.shadowIntensity) {
      case 'none': return 'none'
      case 'light': return '0 1px 3px rgba(0,0,0,0.1)'
      case 'medium': return '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)'
      case 'heavy': return '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)'
      default: return '0 4px 6px rgba(0,0,0,0.1)'
    }
  }

  const getHoverStyle = () => {
    switch(settings.hoverEffect) {
      case 'lift': return 'translateY(-4px)'
      case 'scale': return 'scale(1.02)'
      default: return 'none'
    }
  }

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!session) return <div className="min-h-screen flex items-center justify-center">Please sign in</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Head><title>Widget Editor | TestiFy</title></Head>
      
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

      {/* Main Content */}
      <div className="flex" style={{ height: 'calc(100vh - 73px)' }}>
        {/* Left Sidebar - Settings */}
        <div className="bg-white border-r flex-shrink-0" style={{ width: "384px", minWidth: "384px", overflowY: "auto" }}>
          {/* Tabs */}
          <div className="flex border-b">
            {['design', 'layout', 'effects', 'advanced'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium capitalize ${
                  activeTab === tab 
                    ? 'text-indigo-600 border-b-2 border-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-6">
            {/* Widget Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Widget Type</label>
              <div className="grid grid-cols-3 gap-2">
                {widgetTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => handleSettingChange('widgetType', type.id)}
                    className={`p-3 rounded-lg border-2 text-center transition ${
                      settings.widgetType === type.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-xs">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'design' && (
              <>
                {/* Colors Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Colors</label>
                  
                  <div className="space-y-3">
                    {[
                      { key: 'backgroundColor', label: 'Background' },
                      { key: 'cardBackgroundColor', label: 'Card Background' },
                      { key: 'textColor', label: 'Text Color' },
                      { key: 'authorColor', label: 'Author Name' },
                      { key: 'companyColor', label: 'Company' },
                      { key: 'starColor', label: 'Star Rating' },
                      { key: 'borderColor', label: 'Border' },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{label}</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={settings[key]}
                            onChange={(e) => handleSettingChange(key, e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer"
                          />
                          <span className="text-xs text-gray-400 w-16">{settings[key]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Typography</label>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Font Family</label>
                      <select
                        value={settings.fontFamily}
                        onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                      >
                        {fontFamilies.map(font => (
                          <option key={font} value={font}>{font}</option>
                        ))}
                      </select>
                    </div>

                    {[
                      { key: 'titleSize', label: 'Quote Text', min: 12, max: 32 },
                      { key: 'bodySize', label: 'Body Text', min: 12, max: 24 },
                      { key: 'authorSize', label: 'Author Name', min: 10, max: 20 },
                      { key: 'companySize', label: 'Company', min: 8, max: 16 },
                    ].map(({ key, label, min, max }) => (
                      <div key={key}>
                        <div className="flex justify-between">
                          <label className="text-xs text-gray-500">{label}</label>
                          <span className="text-xs text-gray-400">{settings[key]}px</span>
                        </div>
                        <input
                          type="range"
                          min={min}
                          max={max}
                          value={settings[key]}
                          onChange={(e) => handleSettingChange(key, e.target.value)}
                          className="w-full mt-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'layout' && (
              <>
                {/* Layout Settings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Layout</label>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <label className="text-xs text-gray-500">Card Padding</label>
                        <span className="text-xs text-gray-400">{settings.cardPadding}px</span>
                      </div>
                      <input
                        type="range"
                        min="8"
                        max="48"
                        value={settings.cardPadding}
                        onChange={(e) => handleSettingChange('cardPadding', e.target.value)}
                        className="w-full mt-1"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between">
                        <label className="text-xs text-gray-500">Border Radius</label>
                        <span className="text-xs text-gray-400">{settings.borderRadius}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="32"
                        value={settings.borderRadius}
                        onChange={(e) => handleSettingChange('borderRadius', e.target.value)}
                        className="w-full mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">Shadow</label>
                      <select
                        value={settings.shadowIntensity}
                        onChange={(e) => handleSettingChange('shadowIntensity', e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="none">None</option>
                        <option value="light">Light</option>
                        <option value="medium">Medium</option>
                        <option value="heavy">Heavy</option>
                      </select>
                    </div>

                    {settings.widgetType === 'grid' && (
                      <div>
                        <label className="text-xs text-gray-500">Columns</label>
                        <div className="flex gap-2 mt-1">
                          {['1', '2', '3', '4'].map(col => (
                            <button
                              key={col}
                              onClick={() => handleSettingChange('columns', col)}
                              className={`flex-1 py-2 rounded-lg border ${
                                settings.columns === col
                                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                                  : 'border-gray-200'
                              }`}
                            >
                              {col}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between">
                        <label className="text-xs text-gray-500">Max Width</label>
                        <span className="text-xs text-gray-400">{settings.maxWidth}px</span>
                      </div>
                      <input
                        type="range"
                        min="400"
                        max="1600"
                        step="100"
                        value={settings.maxWidth}
                        onChange={(e) => handleSettingChange('maxWidth', e.target.value)}
                        className="w-full mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Display Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Display Options</label>
                  
                  <div className="space-y-2">
                    {[
                      { key: 'showStars', label: 'Show Star Rating' },
                      { key: 'showCompany', label: 'Show Company' },
                      { key: 'showAvatar', label: 'Show Avatar' },
                      { key: 'showDate', label: 'Show Date' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[key]}
                          onChange={(e) => handleSettingChange(key, e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'effects' && (
              <>
                {/* Animation Settings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Effects</label>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500">Hover Effect</label>
                      <select
                        value={settings.hoverEffect}
                        onChange={(e) => handleSettingChange('hoverEffect', e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                      >
                        {hoverEffects.map(effect => (
                          <option key={effect.id} value={effect.id}>{effect.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">Entrance Animation</label>
                      <select
                        value={settings.animation}
                        onChange={(e) => handleSettingChange('animation', e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                      >
                        {animations.map(anim => (
                          <option key={anim.id} value={anim.id}>{anim.name}</option>
                        ))}
                      </select>
                    </div>

                    {settings.widgetType === 'carousel' && (
                      <>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.autoplay}
                            onChange={(e) => handleSettingChange('autoplay', e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-600">Autoplay</span>
                        </label>

                        {settings.autoplay && (
                          <div>
                            <div className="flex justify-between">
                              <label className="text-xs text-gray-500">Speed</label>
                              <span className="text-xs text-gray-400">{settings.autoplaySpeed}ms</span>
                            </div>
                            <input
                              type="range"
                              min="2000"
                              max="10000"
                              step="500"
                              value={settings.autoplaySpeed}
                              onChange={(e) => handleSettingChange('autoplaySpeed', e.target.value)}
                              className="w-full mt-1"
                            />
                          </div>
                        )}

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.showArrows}
                            onChange={(e) => handleSettingChange('showArrows', e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-600">Show Navigation Arrows</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.showDots}
                            onChange={(e) => handleSettingChange('showDots', e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-600">Show Dots</span>
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'advanced' && (
              <>
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Branding</label>
                  
                  <label className="flex items-center gap-2 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={settings.showLogo}
                      onChange={(e) => handleSettingChange('showLogo', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-600">Show My Logo</span>
                  </label>

                  {settings.showLogo && (
                    <div className="space-y-3 pl-6">
                      <div>
                        <label className="text-xs text-gray-500">Logo URL</label>
                        <input
                          type="text"
                          placeholder="https://yoursite.com/logo.png"
                          value={settings.logoUrl}
                          onChange={(e) => handleSettingChange('logoUrl', e.target.value)}
                          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <label className="text-xs text-gray-500">Logo Height</label>
                          <span className="text-xs text-gray-400">{settings.logoHeight}px</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="100"
                          value={settings.logoUrl}
                          onChange={(e) => handleSettingChange('logoHeight', e.target.value)}
                          className="w-full mt-1"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Max Testimonials */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Content</label>
                  
                  <div>
                    <div className="flex justify-between">
                      <label className="text-xs text-gray-500">Max Testimonials to Show</label>
                      <span className="text-xs text-gray-400">{settings.maxTestimonials}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={settings.maxTestimonials}
                      onChange={(e) => handleSettingChange('maxTestimonials', e.target.value)}
                      className="w-full mt-1"
                    />
                  </div>
                </div>

                {/* Custom CSS */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Custom CSS</label>
                  <p className="text-xs text-gray-500 mb-2">For advanced customization (Pro feature)</p>
                  <textarea
                    placeholder=".testimonial-card { custom: styles; }"
                    className="w-full h-24 border rounded-lg px-3 py-2 text-sm font-mono"
                    disabled
                  />
                  <p className="text-xs text-indigo-600 mt-1">Upgrade to Pro to enable custom CSS</p>
                </div>
              </>
            )}

            {/* Save Button */}
            <button
              onClick={() => alert('Settings saved! (In production, this would save to database)')}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Save Widget Settings
            </button>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="flex-1 flex flex-col">
          {/* Preview Header */}
          <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Live Preview</h2>
            
            <div className="flex items-center gap-4">
              {/* Device Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['desktop', 'tablet', 'mobile'].map(device => (
                  <button
                    key={device}
                    onClick={() => setPreviewDevice(device)}
                    className={`px-3 py-1 rounded-md text-sm capitalize transition ${
                      previewDevice === device
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {device}
                  </button>
                ))}
              </div>

              {/* Get Code Button */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateEmbedCode())
                  alert('Embed code copied!')
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
              >
                Copy Embed Code
              </button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 overflow-auto p-8" style={{ backgroundColor: settings.backgroundColor }}>
            <div 
              className="mx-auto transition-all duration-300"
              style={{ 
                maxWidth: previewDevice === 'mobile' ? '375px' : previewDevice === 'tablet' ? '768px' : `${settings.maxWidth}px`,
                margin: '0 auto'
              }}
            >
              {/* Widget Preview */}
              {testimonials.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No testimonials yet</h3>
                  <p className="text-gray-400">Add some testimonials to see the preview</p>
                </div>
              ) : (
                <div 
                  className={`grid gap-${settings.spacing} ${
                    settings.widgetType === 'grid' 
                      ? `grid-cols-${previewDevice === 'mobile' ? '1' : settings.columns}` 
                      : 'grid-cols-1'
                  }`}
                  style={{ gap: `${settings.spacing}px` }}
                >
                  {testimonials.slice(0, parseInt(settings.maxTestimonials)).map((t, i) => (
                    <div
                      key={t._id}
                      className="testimonial-card transition-all duration-300"
                      style={{
                        backgroundColor: settings.cardBackgroundColor,
                        padding: `${settings.cardPadding}px`,
                        borderRadius: `${settings.borderRadius}px`,
                        border: `${settings.borderWidth}px solid ${settings.borderColor}`,
                        boxShadow: getShadowStyle(),
                        fontFamily: settings.fontFamily,
                      }}
                      onMouseEnter={(e) => {
                        if (settings.hoverEffect !== 'none') {
                          e.currentTarget.style.transform = getHoverStyle()
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none'
                      }}
                    >
                      {/* Stars */}
                      {settings.showStars && (
                        <div 
                          className="mb-3"
                          style={{ color: settings.starColor, fontSize: `${parseInt(settings.titleSize) - 4}px` }}
                        >
                          {'★'.repeat(t.rating)}
                        </div>
                      )}

                      {/* Quote */}
                      <p 
                        className="mb-4"
                        style={{ 
                          color: settings.textColor, 
                          fontSize: `${settings.bodySize}px`,
                          lineHeight: '1.6'
                        }}
                      >
                        "{t.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        {settings.showAvatar && (
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                            style={{ 
                              backgroundColor: settings.starColor + '20',
                              color: settings.starColor
                            }}
                          >
                            {t.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div 
                            className="font-semibold"
                            style={{ color: settings.authorColor, fontSize: `${settings.authorSize}px` }}
                          >
                            {t.name}
                          </div>
                          {settings.showCompany && t.company && (
                            <div 
                              style={{ color: settings.companyColor, fontSize: `${settings.companySize}px` }}
                            >
                              {t.company}
                            </div>
                          )}
                          {settings.showDate && (
                            <div style={{ color: settings.companyColor, fontSize: '11px' }}>
                              {new Date(t.createdAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Embed Code Preview */}
          <div className="bg-gray-900 text-white p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Embed Code</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateEmbedCode())
                  alert('Copied!')
                }}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded"
              >
                Copy
              </button>
            </div>
            <code className="text-xs text-green-400 block overflow-x-auto">
              {generateEmbedCode()}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
