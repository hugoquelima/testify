import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function SimpleWidgetEditor() {
  const { data: session } = useSession()
  
  const [settings, setSettings] = useState({
    backgroundColor: '#f3f4f6',
    cardBackgroundColor: '#ffffff',
    textColor: '#1f2937',
    authorColor: '#111827',
    companyColor: '#6b7280',
    starColor: '#fbbf24',
    borderColor: '#e5e7eb',
    cardPadding: '24',
    borderRadius: '12',
    borderWidth: '2',
    bodySize: '16',
    authorSize: '14',
    companySize: '12',
  })

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (!session) return <div>Please sign in</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Head><title>Widget Editor | TestiFy</title></Head>
      
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl text-indigo-600">TestiFy Widget Editor</div>
        <Link href="/dashboard" className="text-gray-600">← Back to Dashboard</Link>
      </nav>

      <div className="flex" style={{ height: 'calc(100vh - 65px)' }}>
        
        {/* Left Panel - Settings */}
        <div className="w-80 bg-white border-r p-6 overflow-y-auto">
          <h2 className="font-bold text-lg mb-6">Customize Widget</h2>
          
          <div className="space-y-6">
            
            {/* Colors */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Colors</h3>
              
              {[
                { key: 'backgroundColor', label: 'Background' },
                { key: 'cardBackgroundColor', label: 'Card' },
                { key: 'textColor', label: 'Text' },
                { key: 'authorColor', label: 'Author' },
                { key: 'companyColor', label: 'Company' },
                { key: 'starColor', label: 'Stars' },
                { key: 'borderColor', label: 'Border' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{label}</span>
                  <input
                    type="color"
                    value={settings[key]}
                    onChange={(e) => updateSetting(key, e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>

            {/* Layout */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Layout</h3>
              
              <div className="mb-3">
                <label className="text-xs text-gray-500">Padding: {settings.cardPadding}px</label>
                <input
                  type="range"
                  min="8"
                  max="48"
                  value={settings.cardPadding}
                  onChange={(e) => updateSetting('cardPadding', e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="mb-3">
                <label className="text-xs text-gray-500">Border Radius: {settings.borderRadius}px</label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={settings.borderRadius}
                  onChange={(e) => updateSetting('borderRadius', e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="mb-3">
                <label className="text-xs text-gray-500">Border Width: {settings.borderWidth}px</label>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={settings.borderWidth}
                  onChange={(e) => updateSetting('borderWidth', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 overflow-auto" style={{ backgroundColor: settings.backgroundColor }}>
          
          <div className="p-8">
            <h2 className="font-bold text-lg mb-4">Live Preview</h2>

            {/* TESTIMONIAL CARD 1 */}
            <div style={{
              backgroundColor: settings.cardBackgroundColor,
              padding: `${settings.cardPadding}px`,
              borderRadius: `${settings.borderRadius}px`,
              border: `${settings.borderWidth}px solid ${settings.borderColor}`,
              maxWidth: '600px',
              marginBottom: '20px'
            }}>
              <div style={{ color: settings.starColor, fontSize: '20px', marginBottom: '12px' }}>
                ★★★★★
              </div>
              
              <p style={{ 
                color: settings.textColor, 
                fontSize: `${settings.bodySize}px`,
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                "TestiFy completely transformed how we collect customer feedback. Setup took 2 minutes and we got 10 testimonials in the first week!"
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: settings.starColor + '20',
                  color: settings.starColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  S
                </div>
                <div>
                  <div style={{ color: settings.authorColor, fontSize: `${settings.authorSize}px`, fontWeight: 600 }}>
                    Sarah Johnson
                  </div>
                  <div style={{ color: settings.companyColor, fontSize: `${settings.companySize}px` }}>
                    TechStart Inc.
                  </div>
                </div>
              </div>
            </div>

            {/* TESTIMONIAL CARD 2 */}
            <div style={{
              backgroundColor: settings.cardBackgroundColor,
              padding: `${settings.cardPadding}px`,
              borderRadius: `${settings.borderRadius}px`,
              border: `${settings.borderWidth}px solid ${settings.borderColor}`,
              maxWidth: '600px'
            }}>
              
              <div style={{ color: settings.starColor, fontSize: '20px', marginBottom: '12px' }}>
                ★★★★★
              </div>
              
              <p style={{ 
                color: settings.textColor, 
                fontSize: `${settings.bodySize}px`,
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                "Finally, a testimonial tool that just works. No complicated setup, no expensive monthly fees. Perfect for my agency."
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: settings.starColor + '20',
                  color: settings.starColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  M
                </div>
                <div>
                  <div style={{ color: settings.authorColor, fontSize: `${settings.authorSize}px`, fontWeight: 600 }}>
                    Michael Chen
                  </div>
                  <div style={{ color: settings.companyColor, fontSize: `${settings.companySize}px` }}>
                    DesignCo
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Embed Code */}
          <div className="bg-gray-900 text-white p-4 m-8 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Embed Code</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`<iframe src="https://testify-h6td.vercel.app/widget/${session.user.id}" width="100%" height="400" frameborder="0"></iframe>`)
                  alert('Copied!')
                }}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded"
              >
                Copy
              </button>
            </div>
            <code className="text-xs text-green-400 block">
              <iframe src="https://testify-h6td.vercel.app/widget/{session.user.id}" width="100%" height="400"></iframe>
            </code>
          </div>

        </div>
      </div>
    </div>
  )
}
