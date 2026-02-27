# TestiFy 🚀

Collect and display customer testimonials in 60 seconds.

## What is TestiFy?

A lightweight testimonial collection tool for small businesses, freelancers, and agencies.

**Problem:** Businesses lose customers because they have no social proof.
**Solution:** TestiFy makes collecting and displaying testimonials effortless.

## Features

- ✅ Custom branded collection forms
- ✅ One-click sharing (link, QR code, email)
- ✅ Embeddable widget for any website
- ✅ Approval workflow (review before publishing)
- ✅ Email notifications
- ✅ Export to JSON/CSV
- ✅ Beautiful, animated widget

## Pricing

**$9/month** - Unlimited testimonials, no branding, full features.

## Tech Stack

- Next.js 14
- MongoDB
- Stripe
- NextAuth
- Tailwind CSS

## Deployment

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/testify.git
cd testify
npm install
```

### 2. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

- `MONGODB_URI` - MongoDB connection string
- `NEXTAUTH_SECRET` - Random string for JWT encryption
- `NEXTAUTH_URL` - Your domain
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - Google OAuth
- `STRIPE_SECRET_KEY` & `STRIPE_PUBLISHABLE_KEY` - Stripe keys

### 3. Deploy to Vercel

```bash
vercel --prod
```

Or connect your GitHub repo to Vercel for auto-deployment.

## Usage

1. Sign up with Google
2. Get your collection link
3. Share with customers
4. Approve testimonials
5. Embed widget on your site

## API Endpoints

- `POST /api/testimonials/submit` - Submit a testimonial
- `GET /api/testimonials` - Get user's testimonials (auth required)
- `POST /api/checkout` - Create Stripe checkout session
- `GET /api/widget/[userId]` - Get public testimonials for widget

## License

MIT
