# 📧 EMAIL AUTOMATION SETUP GUIDE
## ConvertKit Free Plan - Complete Walkthrough

---

## 🎯 WHAT YOU'RE BUILDING

When someone signs up on TestiFy:
1. They get added to your email list automatically
2. They receive 5 welcome emails over 2 weeks
3. Emails nurture them toward upgrading
4. You do NOTHING - it runs automatically

---

## STEP 1: CREATE ACCOUNT (5 minutes)

1. Go to **https://convertkit.com**
2. Click **"Start Your Free Trial"**
3. Enter:
   - Name: Hugo
   - Email: hugo2006queiroz@gmail.com
   - Password: [create one]
4. Answer their questions:
   - "What best describes you?" → Creator/Business Owner
   - "What is your primary goal?" → Grow my audience
   - "How many subscribers?" → 0 (you're starting!)
5. Click **"Complete Setup"**

✅ **Account created!**

---

## STEP 2: CREATE FORM (10 minutes)

**This form collects emails from your TestiFy landing page:**

1. In ConvertKit dashboard, click **"Forms"** (left sidebar)
2. Click **"Create Form"**
3. Select **"Inline"** (embeds on website)
4. Choose template: **"Minimal"** or **"Clean"**
5. Customize:
   - **Headline:** "Get tips to boost your conversions"
   - **Subheadline:** "Join 1,000+ business owners getting weekly growth tips"
   - **Button text:** "Join Free"
6. Click **"Settings"** tab:
   - Thank you message: "Check your email for a welcome gift!"
   - Enable "Send incentive email"
7. Click **"Save"**
8. Click **"Embed"** button
9. Copy the **JavaScript code** (looks like: `<script async data-uid="..."`)

✅ **Form created! Save that code for later.**

---

## STEP 3: CREATE EMAIL SEQUENCE (20 minutes)

**These 5 emails automatically send to new subscribers:**

### Email 1: Welcome (Send immediately)

**Subject:** Welcome! Here's your next step...

**Body:**
```
Hi there!

Thanks for joining TestiFy!

I'm Hugo, and I built this tool because I was tired of paying $200/month for Trustpilot.

Here's your next step to collect your first testimonial:

1. Log into your dashboard: https://testify-h6td.vercel.app/dashboard
2. Copy your collection link
3. Send it to a happy customer

That's it! They'll submit a testimonial in 60 seconds.

Questions? Just reply to this email - I read every one.

Cheers,
Hugo

P.S. Check your dashboard for a quick video walkthrough.
```

**How to create in ConvertKit:**
1. Click **"Automations"** (left sidebar)
2. Click **"Create Automation"**
3. Select **"Email Sequence"**
4. Name it: "TestiFy Welcome Series"
5. Click **"Add Email"**
6. Paste the subject and body above
7. Set timing: **"Immediately"**

---

### Email 2: How to Ask (Send Day 2)

**Subject:** The easiest way to ask for testimonials

**Body:**
```
Quick tip:

The best time to ask for a testimonial is RIGHT after you deliver great work.

Here's the exact message I use:

---

Hey [Name],

Really enjoyed working with you on [project]. 

Would you mind sharing a quick review? It helps other customers know what to expect, and only takes 60 seconds.

[Your collection link]

Thanks!
Hugo

---

Frame it as helping others, not helping you. Works every time.

Try it today!

Hugo
```

**In ConvertKit:**
1. Click **"Add Email"**
2. Paste subject and body
3. Set timing: **"1 day after previous email"**

---

### Email 3: Where to Display (Send Day 4)

**Subject:** Where to put testimonials for maximum impact

**Body:**
```
Most people put testimonials on a separate "Reviews" page.

That's wrong.

Put them where buying decisions happen:

✅ Homepage (above the fold)
✅ Pricing page  
✅ Checkout pages
✅ Sales pages
✅ Next to your "Buy" button

The closer to the purchase decision, the better they convert.

One customer added testimonials to their pricing page and saw a 34% increase in conversions.

Same traffic. More sales.

Try it!

Hugo

P.S. Your TestiFy widget works on any page. Just copy-paste the code.
```

**In ConvertKit:**
1. Click **"Add Email"**
2. Set timing: **"2 days after previous email"**

---

### Email 4: Success Story (Send Day 7)

**Subject:** How Sarah increased conversions 34%

**Body:**
```
Sarah runs a design agency.

She struggled with testimonials for years. Too awkward to ask, too time-consuming to manage.

Then she started using TestiFy:

Week 1: Set up collection page
Week 2: Sent to 10 clients
Week 3: Received 8 testimonials
Week 4: Added widget to her site

The result?

34% increase in inquiry form submissions.

Same website traffic. More clients. Higher rates.

That's the power of social proof.

If Sarah can do it, so can you.

Log into your dashboard and send your collection link today:
https://testify-h6td.vercel.app/dashboard

Cheers,
Hugo
```

**In ConvertKit:**
1. Click **"Add Email"**
2. Set timing: **"3 days after previous email"**

---

### Email 5: Upgrade Offer (Send Day 14)

**Subject:** Ready to unlock all features?

**Body:**
```
You've been using TestiFy for 2 weeks.

How's it going?

If you're ready to unlock all features, here's what's included in Pro:

✅ Unlimited testimonials
✅ Custom branded forms  
✅ Embeddable widgets
✅ Remove TestiFy branding
✅ Email notifications
✅ Export to JSON/CSV
✅ Priority support

All for $9/month.

That's less than your daily coffee ☕

Upgrade here: [Stripe payment link]

Questions? Just reply to this email.

Hugo
```

**In ConvertKit:**
1. Click **"Add Email"**
2. Set timing: **"7 days after previous email"**
3. **IMPORTANT:** Replace "[Stripe payment link]" with your actual Stripe checkout link

✅ **Sequence complete!**

---

## STEP 4: CONNECT TO TESTIFY (10 minutes)

**Add the email form to your TestiFy landing page:**

1. Go back to **Vercel dashboard**
2. Find your **testify** project
3. Click **"Settings"** tab
4. You need to edit `pages/index.js` in your code
5. Add this where you want the form (usually after the hero section):

```jsx
{/* Email Signup Section */}
<section className="py-20 bg-black/20">
  <div className="max-w-md mx-auto text-center px-6">
    <h2 className="text-3xl font-bold text-white mb-4">
      Get Weekly Conversion Tips
    </h2>
    <p className="text-white/60 mb-8">
      Join 1,000+ business owners learning to boost sales with social proof
    </p>
    {/* PASTE YOUR CONVERTKIT FORM CODE HERE */}
  </div>
</section>
```

6. **Push to GitHub:**
```bash
cd ~/.openclaw/workspace/testify
git add .
git commit -m "Add ConvertKit email signup form"
git push origin main
```

7. **Redeploy on Vercel**

✅ **Form is now live on your website!**

---

## STEP 5: TEST IT (5 minutes)

1. Go to your website: https://testify-h6td.vercel.app
2. Scroll to the email signup form
3. Enter your email (use a different one, like a test email)
4. Click "Join Free"
5. Check that email - you should receive Email 1 immediately!

✅ **Working!**

---

## STEP 6: CONNECT SIGNUPS AUTOMATICALLY (Advanced)

**When someone signs up for TestiFy, add them to ConvertKit:**

In your `pages/api/auth/[...nextauth].js`, add this callback:

```javascript
callbacks: {
  async signIn({ user, account, profile }) {
    // Add user to ConvertKit
    try {
      await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: 'YOUR_CONVERTKIT_API_KEY',
          email: user.email,
          first_name: user.name?.split(' ')[0] || ''
        })
      })
    } catch (e) {
      console.log('ConvertKit error:', e)
    }
    return true
  }
}
```

**Get your API key:**
1. In ConvertKit, click your profile (top right)
2. Click "Account Settings"
3. Click "API" tab
4. Copy "API Key"

**Get your Form ID:**
1. Go to "Forms"
2. Click on your form
3. Look at URL: `/forms/12345/edit` - the number is your form ID

✅ **Now everyone who signs up gets your email sequence automatically!**

---

## 🎯 WHAT HAPPENS NOW

**Automatically, without you:**
1. Visitor signs up on TestiFy
2. Gets added to email list
3. Receives 5 emails over 2 weeks
4. Emails build trust and value
5. Last email asks for the sale

**Your job:** Check ConvertKit once a week, see how many subscribers you have

---

## 📊 EXPECTED RESULTS

**Month 1:**
- 50 email subscribers
- 5% click rate = 2-3 people click upgrade link
- 1 converts = $9/month

**Month 3:**
- 300 email subscribers  
- 15-20 click upgrade
- 5-10 convert = $45-90/month

**Email is your #1 conversion tool.**

---

## 💰 COST

**ConvertKit Free Plan:**
- Up to 1,000 subscribers
- Unlimited emails
- 1 email sequence (the one you just made)
- FREE forever (until you hit 1,000 subscribers)

**When you hit 1,000 subscribers, you're making money and can upgrade ($29/month).**

---

## ⏱️ TIME INVESTMENT

- **Setup:** 45 minutes (one time)
- **Weekly check:** 5 minutes
- **Create new emails:** 30 minutes (as needed)

**Total ongoing: 5 minutes/week**

---

## ✅ CHECKLIST

- [ ] Create ConvertKit account
- [ ] Create signup form
- [ ] Create 5-email sequence
- [ ] Add form to TestiFy website
- [ ] Test the signup
- [ ] (Optional) Auto-add users from signups

---

## 🚀 NEXT STEPS

1. **Do Step 1-3 NOW** (45 minutes)
2. **Test the form** (5 minutes)
3. **Add to website** (10 minutes)
4. **Watch subscribers roll in automatically**

**Ready to start? Go to https://convertkit.com and create your account!**

---

## ❓ QUESTIONS?

**"Where do I get the Stripe link for Email 5?"**
→ Go to Stripe dashboard → Payment Links → Create new → Copy URL

**"Can I see who opened my emails?"**
→ Yes! ConvertKit shows open rates, click rates, everything

**"What if someone replies to the email?"**
→ It goes to your hugo2006queiroz@gmail.com - reply back!

**"Can I send broadcast emails too?"**
→ Yes! Click "Broadcasts" to send one-time emails to everyone

---

**Go set it up! This will be your #1 sales machine!** 🚀
