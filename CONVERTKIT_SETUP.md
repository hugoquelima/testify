# CONNECTING CONVERTKIT TO TESTIFY
## Automatic Email Sequence for New Signups

---

## PART 1: GET YOUR CONVERTKIT API KEY

1. **Log into ConvertKit**
   - Go to https://app.convertkit.com
   - Sign in with your account

2. **Go to Settings**
   - Click your profile picture (top right)
   - Click "Account Settings"

3. **Find API Key**
   - Scroll down to "API"
   - Copy the **API Key** (long string of letters/numbers)
   - **IMPORTANT:** Keep this secret! Don't share it publicly

---

## PART 2: ADD API KEY TO TESTIFY

**Option A: Add to Vercel Environment Variables (Recommended)**

1. Go to https://vercel.com/dashboard
2. Click your **TestiFy** project
3. Click **Settings** tab
4. Click **Environment Variables** (left sidebar)
5. Click **Add New**
6. Add these variables:

| Name | Value |
|------|-------|
| `CONVERTKIT_API_KEY` | Your API key from ConvertKit |
| `CONVERTKIT_FORM_ID` | Your form ID (see below) |

7. Click **Save**
8. Click **Redeploy**

---

## PART 3: GET YOUR FORM ID

1. In ConvertKit, click **Forms** (left sidebar)
2. Click on the form you created
3. Look at the URL: `https://app.convertkit.com/forms/12345/edit`
4. The number (12345) is your **Form ID**
5. Copy that number

---

## PART 4: SET UP THE CODE INTEGRATION

Once you have the API key and Form ID, I need to add code to TestiFy that automatically adds new users to ConvertKit.

**Send me:**
1. Your ConvertKit API Key
2. Your ConvertKit Form ID

**And I'll:**
1. Add the integration code to TestiFy
2. Make it so every new signup gets added to your email sequence automatically
3. Redeploy the app

---

## PART 5: VERIFY IT WORKS

After I add the code:

1. **Test it:**
   - Sign up for a new TestiFy account (use a different email)
   - Check ConvertKit → Subscribers
   - You should see the new email added

2. **Check the sequence:**
   - The subscriber should be in your "TestiFy Welcome Series"
   - They'll get Email 1 immediately
   - Then emails 2-5 on the schedule you set

---

## WHAT HAPPENS NOW:

**Before (manual):**
- User signs up for TestiFy
- You manually add them to ConvertKit
- They might miss emails

**After (automatic):**
- User signs up for TestiFy
- ✅ Automatically added to ConvertKit
- ✅ Immediately gets Welcome Email
- ✅ Continues through your 5-email sequence
- ✅ You do NOTHING

---

## IMPORTANT SECURITY NOTE:

**DO NOT paste your API key in this chat!** 

Instead:
1. Save it to a file on your computer
2. When you're ready, tell me "I have the API key and Form ID"
3. I'll give you a secure way to share it

Or:
1. Add it directly to Vercel yourself (Part 2 above)
2. Then tell me it's added
3. I'll add the integration code

---

## SUMMARY:

**You need to get:**
- ✅ ConvertKit API Key
- ✅ ConvertKit Form ID

**Then tell me:**
- "I have the API key and Form ID ready"

**I'll handle:**
- Adding the integration code
- Testing it works
- Redeploying

**Result:**
- Every TestiFy signup automatically joins your email sequence

---

Ready? Go grab those two values from ConvertKit! 🚀
