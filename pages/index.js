import Head from 'next/head'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { useEffect, useState, useRef } from 'react'

export default function Landing() {
  const { data: session } = useSession()
  const [isVisible, setIsVisible] = useState({})
  const heroRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: entry.isIntersecting }))
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: "⚡",
      title: "60-Second Setup",
      desc: "Create your testimonial collection page in under a minute. No coding required."
    },
    {
      icon: "🎨",
      title: "Beautiful Widgets",
      desc: "Display testimonials anywhere with our stunning, customizable widgets."
    },
    {
      icon: "🔒",
      title: "Full Control",
      desc: "Approve every testimonial before it goes live. No surprises."
    },
    {
      icon: "📊",
      title: "Analytics",
      desc: "Track views, clicks, and conversions from your testimonials."
    },
    {
      icon: "🚀",
      title: "Boost Conversions",
      desc: "Customers who see testimonials convert 34% more on average."
    },
    {
      icon: "💎",
      title: "Affordable",
      desc: "Just $9/month. No hidden fees. Cancel anytime."
    }
  ]

  const testimonials = [
    {
      quote: "TestiFy increased our conversion rate by 40%. Best investment we've made.",
      author: "Sarah Chen",
      role: "CEO, TechStart",
      avatar: "SC"
    },
    {
      quote: "Setup took literally 2 minutes. My customers love how easy it is to leave reviews.",
      author: "Marcus Johnson",
      role: "Founder, DesignCo",
      avatar: "MJ"
    },
    {
      quote: "We switched from Trustpilot and saved $200/month. TestiFy is perfect.",
      author: "Emily Rodriguez",
      role: "Marketing Director",
      avatar: "ER"
    }
  ]

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Head>
        <title>TestiFy - Collect Testimonials That Convert</title>
        <meta name="description" content="The easiest way to collect and display customer testimonials. Boost conversions with social proof." />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">💬</span>
            <span className="text-white text-2xl font-bold tracking-tight">TestiFy</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="#features" className="text-white/70 hover:text-white transition-colors hidden md:block">Features</Link>
            <Link href="#pricing" className="text-white/70 hover:text-white transition-colors hidden md:block">Pricing</Link>
            {session ? (
              <Link 
                href="/dashboard" 
                className="bg-white text-black px-6 py-2.5 rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105"
              >
                Dashboard
              </Link>
            ) : (
              <button 
                onClick={() => signIn()}
                className="bg-white text-black px-6 py-2.5 rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/30 rounded-full blur-[128px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm">Trusted by 1,000+ businesses</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
            Collect
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"> Testimonials </span>
            <br />
            That Convert
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed">
            The easiest way to gather and display customer reviews. 
            Boost trust, increase conversions, and grow your business with social proof.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => signIn()}
              className="group bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-105 flex items-center gap-2"
            >
              Start Free Trial
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <a 
              href="#demo" 
              className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
            >
              <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">▶</span>
              Watch Demo
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-4 text-white/50">
            <div className="flex -space-x-3">
              {['SC', 'MJ', 'ER', 'TK'].map((initials, i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold border-2 border-black"
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-sm">Join 1,000+ businesses using TestiFy</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 animate-on-scroll" id="features-header">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Powerful features to help you collect, manage, and display testimonials effortlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`animate-on-scroll group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 ${isVisible[`feature-${i}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                id={`feature-${i}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Three Steps to Success
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create Your Form", desc: "Customize your branded testimonial collection page in seconds." },
              { step: "02", title: "Share With Customers", desc: "Send the link via email, SMS, or embed it anywhere." },
              { step: "03", title: "Display & Convert", desc: "Add our widget to your site and watch conversions soar." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-bold text-white/5 absolute -top-8 -left-4">{item.step}</div>
                <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-orange-900/10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by Businesses
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div 
                key={i}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                <p className="text-white/90 text-lg mb-6 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{t.author}</div>
                    <div className="text-white/50 text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-white/60">
              Everything you need for one low price. No hidden fees.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-bl-2xl">
              Most Popular
            </div>

            <div className="text-center mb-8">
              <div className="text-white/60 mb-2">Professional Plan</div>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl md:text-7xl font-bold text-white">$9</span>
                <span className="text-white/60">/month</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                "Unlimited testimonials",
                "Custom branded forms",
                "Embeddable widgets",
                "Email notifications",
                "Export to JSON/CSV",
                "Remove TestiFy branding",
                "Priority support",
                "Analytics dashboard"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400">✓</span>
                  {feature}
                </div>
              ))}
            </div>

            <button 
              onClick={() => signIn()}
              className="w-full bg-white text-black py-4 rounded-2xl font-semibold text-lg hover:bg-white/90 transition-all hover:scale-[1.02]"
            >
              Start 7-Day Free Trial
            </button>

            <p className="text-center text-white/40 text-sm mt-4">
              Credit card required. Cancel anytime. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready to Boost Your Conversions?
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Join 1,000+ businesses using TestiFy to collect testimonials that convert.
          </p>
          <button 
            onClick={() => signIn()}
            className="bg-white text-black px-12 py-5 rounded-full font-semibold text-xl hover:bg-white/90 transition-all hover:scale-105"
          >
            Get Started Free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💬</span>
              <span className="text-white text-xl font-bold">TestiFy</span>
            </div>
            <div className="text-white/40 text-sm">
              © 2026 TestiFy. Made with 💜 to help businesses grow.
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-white/60 hover:text-white transition-colors">Twitter</Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors">LinkedIn</Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-on-scroll {
          transition: all 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
