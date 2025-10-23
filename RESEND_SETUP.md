# Resend Email Integration Setup

## ✅ Completed Integration

All forms have been successfully integrated with Resend API to send emails to `aamro@crexpressinc.com`:

### Forms Integrated:
1. **Job Application Form** (`/src/components/JobApplicationForm.tsx`)
   - Multi-step form with personal info, work preferences, and attachments
   - API: `/api/submit-job-application`

2. **Driver Application Form** (`/src/components/DriverApplicationForm.tsx`)
   - Multi-step form with CDL info, driving record, and references
   - API: `/api/submit-driver-application`

3. **Service Quote Form** (`/src/components/ServiceQuoteForm.tsx`)
   - Quick quote request for services
   - API: `/api/submit-service-quote`

4. **Location Quote Form** (`/src/components/locations/LocationQuoteForm.tsx`)
   - Location-specific quote requests
   - API: `/api/submit-location-quote`

## 📧 Email Templates

Professional HTML email templates have been created in `/src/lib/email-templates.tsx`:
- CR EXPRESS branded layout with company colors
- Structured data presentation with tables
- Mobile-responsive design
- Reply-to functionality (replies go directly to the applicant/customer)

## 🔧 Configuration

### Environment Variables
Created `.env.local` with your Resend API key:
```
RESEND_API_KEY=re_Sj4GfqbE_JZmbSrNpunz5PYo46tz1qXNi
```

### Email Delivery
All form submissions are sent to: **aamro@crexpressinc.com**

## ⚠️ IMPORTANT: Domain Verification Required

Currently, the forms are using Resend's test email address (`onboarding@resend.dev`). For production use, you need to:

### Steps to Verify Your Domain:

1. **Log in to Resend Dashboard:**
   - Go to https://resend.com/login
   - Use your account credentials

2. **Add Your Domain:**
   - Navigate to "Domains" section
   - Click "Add Domain"
   - Enter: `crexpressinc.com`
   - Follow the DNS verification steps

3. **Add DNS Records:**
   You'll need to add these DNS records to your domain registrar:
   - SPF record
   - DKIM record
   - DMARC record (recommended)

   Resend will provide the exact values in the dashboard.

4. **Update the API Routes:**
   Once verified, update the `from` email in these files:
   - `/src/app/api/submit-job-application/route.ts`
   - `/src/app/api/submit-driver-application/route.ts`
   - `/src/app/api/submit-service-quote/route.ts`
   - `/src/app/api/submit-location-quote/route.ts`

   Change from:
   ```typescript
   from: 'CR EXPRESS <onboarding@resend.dev>',
   ```

   To:
   ```typescript
   from: 'CR EXPRESS <noreply@crexpressinc.com>',
   // or
   from: 'CR EXPRESS Careers <careers@crexpressinc.com>',
   // or
   from: 'CR EXPRESS Quotes <quotes@crexpressinc.com>',
   ```

## 🚀 Testing

### Test Before Domain Verification:
The forms will work with `onboarding@resend.dev`, but emails may go to spam.

### Test After Domain Verification:
1. Fill out each form on your website
2. Check `aamro@crexpressinc.com` inbox
3. Verify:
   - Email arrives within seconds
   - Formatting looks professional
   - All form data is included
   - Reply-to works correctly

## 📱 Features Implemented

### User Experience:
- ✅ Loading states ("Submitting..." button text)
- ✅ Success/error messages
- ✅ Form validation
- ✅ Disabled submit button during submission
- ✅ Form reset after successful submission

### Email Features:
- ✅ Professional branded design
- ✅ All form fields included
- ✅ Structured layout with sections
- ✅ Reply-to applicant email
- ✅ Mobile-responsive HTML

### Developer Features:
- ✅ TypeScript types
- ✅ Error handling
- ✅ Console logging for debugging
- ✅ Clean code structure

## 📊 Email Content

Each email includes:

### Job/Driver Applications:
- Applicant name and contact info
- Full address
- Work preferences/qualifications
- References (driver apps)
- How they heard about you
- Note about attachments (if any)

### Quote Requests:
- Customer name and company
- Contact information (email & phone)
- Service requested
- Message/special requirements
- Location (for location-specific quotes)
- Call-to-action reminder (respond within 24 hours)

## 🔄 Next Steps

1. **Verify domain in Resend** (see steps above)
2. **Update API routes** with your custom email addresses
3. **Test all forms** thoroughly
4. **Monitor email delivery** in Resend dashboard
5. **Set up email forwarding** if needed (in Resend or your email provider)

## 📞 Support

If you encounter any issues:
- Check Resend dashboard for delivery logs
- Verify API key is correct in `.env.local`
- Check browser console for errors
- Ensure Next.js dev server is running: `npm run dev`

## 🎯 Email Addresses

All emails currently go to: **aamro@crexpressinc.com**

To change recipient:
- Edit the `to: ['aamro@crexpressinc.com']` line in each API route
- You can add multiple recipients: `to: ['email1@example.com', 'email2@example.com']`
