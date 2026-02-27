import Head from 'next/head'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'

export default function Landing() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <Head>
        <title>TestiFy - Collect Testimonials in 60 Seconds</title>
        <meta name="description" content="Stop losing customers. Collect and display testimonials in 60 seconds." />
      </Head>

      <nav className="p-6 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">TestiFy</div>
        <div className="space-x-4">
          <Link href="#pricing" className="text-white/80 hover:text-white">Pricing</Link>
          {session ? (
            <Link href="/dashboard" className="bg-white text-indigo-900 px-4 py-2 rounded-lg font-semibold hover:bg-white/90">Dashboard</Link>
          ) : (
            <button onClick={() => signIn()} className="bg-white text-indigo-900 px-4 py-2 rounded-lg font-semibold hover:bg-white/90">Get Started</button>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Collect Testimonials in
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500"> 60 Seconds</span>
        </h1>
        
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Stop losing customers because you have no reviews. Collect, manage, and display 
          testimonials on your website with one simple link. No coding required.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <button onClick={() => signIn()} className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition">
            Start Free Trial →
          </button>
          <a href="#demo" className="bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition">
            See Demo
          </a>
        </div>

        {/* Social Proof */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { stars: "★★★★★", text: "Increased conversions by 34%", author: "Sarah K., E-commerce" },
            { stars: "★★★★★", text: "Setup took literally 2 minutes", author: "Mike R., Agency Owner" },
            { stars: "★★★★★", text: "Best $9 I spend each month", author: "Lisa T., Consultant" },
          ].map((testimonial, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-left">
              <div className="text-yellow-400 mb-2">{testimonial.stars}</div>
              <p className="text-white/90 mb-3">"{testimonial.text}"</p>
              <p className="text-white/60 text-sm">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Simple Pricing</h2>
          
          <div className="max-w-md mx-auto bg-white rounded-2xl p-8 text-center">
            <div className="text-gray-500 mb-2">Professional</div>
            <div className="text-5xl font-bold text-gray-900 mb-2">$9<span className="text-xl text-gray-500">/month</span></div>
            
            <ul className="text-left space-y-3 mb-8 text-gray-700">
              <li>✓ Unlimited testimonials</li>
              <li>✓ Custom branded forms</li>
              <li>✓ Embeddable widgets</li>
              <li>✓ Email notifications</li>
              <li>✓ Export to JSON/CSV</li>
              <li>✓ Remove TestiFy branding</li>
            </ul>
            
            <button onClick={() => signIn()} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:opacity-90">
              Start 7-Day Free Trial
            </button>
            
            <p className="text-sm text-gray-500 mt-4">Credit card required. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Create Your Form", desc: "Customize your testimonial collection page with your branding" },
              { step: "2", title: "Share The Link", desc: "Send to customers via email, SMS, or QR code" },
              { step: "3", title: "Display Widget", desc: "Copy-paste one line of code to show testimonials on your site" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-white/60">
        © 2026 TestiFy. Made with 💜 to help businesses grow.
      </footer>
    </div>
  )
}
