import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      return session
    },
    async signIn({ user, account, profile }) {
      // Add user to ConvertKit automatically
      if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
        try {
          await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              api_key: process.env.CONVERTKIT_API_KEY,
              email: user.email,
              first_name: user.name?.split(' ')[0] || '',
            }),
          })
          console.log('✅ Added to ConvertKit:', user.email)
        } catch (error) {
          console.log('⚠️ ConvertKit error (non-blocking):', error.message)
        }
      }
      return true
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
})
