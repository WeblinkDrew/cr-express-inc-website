# reCAPTCHA Fix Instructions

## Current Issue
Getting "invalid-input-response" error because the site key and secret key don't match or are misconfigured.

## Option 1: Keep Bypass Active (Recommended Short-term)
Add to Vercel Environment Variables:
```
BYPASS_RECAPTCHA=true
```
This lets forms work immediately while maintaining email and Zapier functionality.

## Option 2: Create New reCAPTCHA v3 Keys

### Step 1: Go to Google reCAPTCHA Admin
1. Visit: https://www.google.com/recaptcha/admin/create
2. Sign in with your Google account

### Step 2: Create New Site
1. **Label**: CR Express Website
2. **reCAPTCHA type**: Select "reCAPTCHA v3" (NOT v2!)
3. **Domains**: Add ALL of these:
   - crexpressinc.com
   - www.crexpressinc.com
   - localhost
   - Your Vercel domain (find in Vercel dashboard)

4. Click "Submit"

### Step 3: Copy New Keys
You'll get:
- **Site Key**: (starts with 6L...)
- **Secret Key**: (starts with 6L...)

### Step 4: Update in Code
1. Update `/src/components/ReCaptchaProvider.tsx`:
```javascript
const siteKey = 'YOUR_NEW_SITE_KEY_HERE'
```

2. Update `.env.local`:
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=YOUR_NEW_SITE_KEY
RECAPTCHA_SECRET_KEY=YOUR_NEW_SECRET_KEY
BYPASS_RECAPTCHA=false
```

### Step 5: Update in Vercel
Go to Vercel Dashboard → Settings → Environment Variables:
- Update `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- Update `RECAPTCHA_SECRET_KEY`
- Set `BYPASS_RECAPTCHA=false` or remove it

### Step 6: Redeploy
Push changes and Vercel will auto-deploy.

## Testing
1. Submit a test form
2. Check browser console for any errors
3. Verify email arrives at aamro@crexpressinc.com
4. Check Zapier webhook received data

## Why This Happened
The current keys appear to be:
- From different reCAPTCHA projects, OR
- One is v2 and one is v3, OR
- Created at different times

Creating new matching keys from the same v3 project will fix this permanently.