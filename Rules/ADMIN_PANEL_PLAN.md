# Client Onboarding Admin Panel - Implementation Plan

## 🎯 Project Overview

Build a secure admin panel that allows creating unique, tokenized form links for clients to submit onboarding information. Forms generate PDFs and send data to Zapier for SharePoint upload.

---

## 📋 Core Requirements

### User Flow:
1. **Admin creates secure form link** → Generates unique token
2. **Client receives link** → Opens tokenized form (one-time use or expiring)
3. **Client fills form** → Submits onboarding data + W-9 upload
4. **System generates PDFs** → Onboarding PDF + W-9 PDF
5. **Send to Zapier** → Webhook with base64 PDFs or download URLs
6. **Zapier uploads to SharePoint** → Stores both PDFs

---

## 🏗️ Technical Architecture

### Stack:
- **Framework**: Next.js 15 (existing project)
- **Database**: PostgreSQL (Neon - FREE tier, 0.5 GB)
- **ORM**: Prisma
- **Auth**: Neon Auth (built-in, beta - FREE)
- **Hosting**: Vercel (existing, FREE)
- **File Storage**: Base64 to Zapier (no storage needed)
- **PDF Generation**: @react-pdf/renderer (already installed ✅)

### 💰 Total Cost: **$0/month** (100% free tier)

### Database Schema (Prisma):

> **Note**: Neon Auth automatically creates and manages the `neon_auth.users_sync` table for user authentication. We reference this table for form link creation.

```prisma
// Admin Users - Managed by Neon Auth
// Table: neon_auth.users_sync (auto-created by Neon Auth)
// We'll reference this table's user_id for form links

// Tokenized Form Links
model FormLink {
  id            String    @id @default(cuid())
  token         String    @unique // UUID for secure link
  createdByUserId String  // References neon_auth.users_sync.user_id
  expiresAt     DateTime? // Optional expiration
  maxUses       Int       @default(1) // One-time use by default
  usedCount     Int       @default(0)
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  submissions   Submission[]
}

// Client Submissions
model Submission {
  id                        String    @id @default(cuid())
  formLink                  FormLink  @relation(fields: [formLinkId], references: [id])
  formLinkId                String

  // Metadata
  submittedAt               DateTime  @default(now())
  ipAddress                 String?
  userAgent                 String?

  // Basic Client Information
  companyLegalName          String
  division                  String
  branchLocation            String
  mcDot                     String

  // Contact Information
  primaryContact            String
  primaryContactEmail       String
  primaryContactPhone       String
  secondaryContact          String?
  secondaryContactEmail     String?
  secondaryContactPhone     String?
  escalationContact         String?
  escalationContactEmail    String?
  escalationContactPhone    String?
  accountsPayableContact    String?
  accountsPayableEmail      String?
  accountsPayablePhone      String?

  // Financial Information
  billingAddress            String
  invoicingInstructions     String?
  paymentMethod             String

  // W-9 File
  w9FileName                String?
  w9FileUrl                 String? // If stored on Railway
  w9FileSize                Int?

  // Operations Information
  shipmentTypes             String // JSON array or comma-separated
  equipmentTypes            String // JSON array or comma-separated
  shipmentBuild             String
  additionalRequirements    String?
  monthlyShipments          String
  exceptionCommunication    String
  reviewFrequency           String

  // Generated PDFs
  onboardingPdfUrl          String? // If stored
  w9PdfUrl                  String? // If stored (copy of uploaded W-9)

  // Zapier Integration
  sentToZapier              Boolean   @default(false)
  zapierSentAt              DateTime?
  zapierError               String?

  @@index([formLinkId])
  @@index([companyLegalName])
  @@index([submittedAt])
}
```

---

## 🗂️ File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx               # Admin login
│   │   ├── dashboard/
│   │   │   └── page.tsx               # Admin dashboard (create links, view submissions)
│   │   └── layout.tsx                 # Protected layout with auth check
│   ├── form/
│   │   └── [token]/
│   │       └── page.tsx               # Client-facing form (tokenized)
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts           # NextAuth configuration
│   │   ├── admin/
│   │   │   ├── create-form-link/
│   │   │   │   └── route.ts           # Create new form link
│   │   │   └── submissions/
│   │   │       └── route.ts           # Get all submissions
│   │   ├── submit-onboarding/
│   │   │   └── route.ts               # Handle form submission
│   │   └── generate-onboarding-pdf/   # Already created ✅
│   │       └── route.js
│   └── components/
│       ├── pdf/
│       │   └── ClientOnboardingPDF.jsx # Already created ✅
│       ├── admin/
│       │   ├── FormLinkGenerator.tsx   # UI to create links
│       │   ├── SubmissionsList.tsx     # List all submissions
│       │   └── SubmissionDetail.tsx    # View single submission
│       └── form/
│           └── ClientOnboardingForm.tsx # Client-facing form
├── lib/
│   ├── prisma.ts                       # Prisma client
│   ├── auth.ts                         # NextAuth config
│   └── zapier.ts                       # Zapier webhook helper
└── prisma/
    └── schema.prisma                   # Database schema
```

---

## ✅ Implementation Checklist

### Phase 1: Database & Auth Setup
- [ ] Create Neon account and database (free tier)
- [ ] Install dependencies (Prisma, Neon Auth SDK)
- [ ] Setup Neon Auth from console (click to enable)
- [ ] Configure Neon Auth SDK in Next.js
- [ ] Create Prisma schema (FormLink, Submission models)
- [ ] Connect Prisma to Neon database
- [ ] Run Prisma migrations
- [ ] Create first admin user via Neon Auth
- [ ] Create admin login page (using Neon Auth)
- [ ] Protect admin routes with Neon Auth middleware

### Phase 2: Admin Panel - Form Link Generation
- [ ] Create admin dashboard page
- [ ] Build form link generator component
- [ ] API route: Create form link with token
- [ ] Display active/expired links
- [ ] Copy-to-clipboard functionality for links
- [ ] Show link usage stats (times used, expiration)

### Phase 3: Client-Facing Form
- [ ] Create tokenized form route `/form/[token]`
- [ ] Validate token (check expiration, usage limit)
- [ ] Build form UI with all fields matching Formstack
- [ ] File upload component for W-9
- [ ] Client-side validation
- [ ] Form submission handler

### Phase 4: PDF Generation & Submission
- [ ] API route: Submit onboarding form
- [ ] Generate onboarding PDF (reuse existing component ✅)
- [ ] Handle W-9 file upload
- [ ] Convert both PDFs to base64 (✅ Confirmed working with Zapier)
- [ ] Store submission in database
- [ ] Mark form link as used (increment counter)

### Phase 5: Zapier Integration
- [ ] Send webhook to Zapier with base64 PDFs
- [ ] Configure Zapier Formatter to decode base64 → PDF files
- [ ] Test Zapier → SharePoint upload flow
- [ ] Log Zapier response in database
- [ ] Error handling and retry logic

### Phase 6: Admin Dashboard - View Submissions
- [ ] List all submissions (table view)
- [ ] Filter/search by company name, date
- [ ] View individual submission details
- [ ] Download generated PDFs
- [ ] Resend to Zapier (if failed)
- [ ] Delete submissions (soft delete)

### Phase 7: Testing & Polish
- [ ] Test full flow end-to-end
- [ ] Test token expiration
- [ ] Test one-time use links
- [ ] Error handling throughout
- [ ] Loading states and feedback
- [ ] Mobile responsive design
- [ ] Security audit (SQL injection, XSS, etc.)

### Phase 8: Deployment
- [ ] Configure environment variables in Vercel
- [ ] Run Prisma migrations on Neon production database
- [ ] Create admin user via Neon Auth console
- [ ] Deploy to Vercel (git push)
- [ ] Test production deployment
- [ ] Verify Neon Auth works in production

---

## 🔐 Environment Variables

```bash
# Neon Database
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.neon.tech/dbname?sslmode=require"

# Neon Auth (from Neon console)
NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-publishable-key"
STACK_SECRET_SERVER_KEY="your-secret-key"

# Zapier
ZAPIER_WEBHOOK_URL="https://hooks.zapier.com/hooks/catch/..."

# Optional: Node environment
NODE_ENV="development" # or "production"
```

### Where to find these values:
1. **DATABASE_URL**: Neon dashboard → Connection Details
2. **Neon Auth keys**: Neon dashboard → Auth tab → View credentials
3. **ZAPIER_WEBHOOK_URL**: Zapier → Webhooks by Zapier → Copy URL

---

## 🚀 Decision: Base64 vs. File Storage

### Option A: Base64 to Zapier (Simpler)
**Pros:**
- No file storage needed
- Simpler architecture
- Zapier can decode base64 directly
- Works if Zapier supports it

**Cons:**
- Large payload sizes (~10KB per PDF = 20KB total, should be fine)
- Need to verify Zapier can handle base64 → PDF

**Implementation:**
```javascript
// In submit-onboarding API route
const onboardingPdf = await generatePDF(formData);
const w9Pdf = uploadedW9File;

const payload = {
  submission_id: submission.id,
  company_name: formData.companyLegalName,
  files: {
    onboarding_pdf: onboardingPdf.toString('base64'),
    w9_pdf: w9Pdf.toString('base64')
  },
  filenames: {
    onboarding: `Onboarding-${sanitizedName}-${uniqueId}.pdf`,
    w9: `W9-${sanitizedName}-${uniqueId}.pdf`
  }
};

await fetch(ZAPIER_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
```

### Option B: File Storage + Download URLs (More Robust)
**Pros:**
- Smaller webhook payload
- PDFs accessible for admin download
- More reliable for large files
- Can serve PDFs directly from admin panel

**Cons:**
- Need Railway storage or S3
- More complex setup
- Need to handle file cleanup

**Implementation:**
```javascript
// Store files on Railway/S3
const onboardingUrl = await uploadToStorage(onboardingPdf, filename);
const w9Url = await uploadToStorage(w9Pdf, filename);

// Send URLs to Zapier
const payload = {
  submission_id: submission.id,
  company_name: formData.companyLegalName,
  files: {
    onboarding_pdf_url: onboardingUrl,
    w9_pdf_url: w9Url
  }
};
```

**✅ DECISION MADE**: Using **Option A (base64)** - Already tested and confirmed working!

---

## 🧪 Testing Zapier Integration

### Test 1: Base64 PDF Decoding
1. Send test webhook with base64 PDF
2. In Zapier, use "Formatter" → "Text" → "Decode Base64"
3. Output to file
4. Upload to SharePoint
5. Verify PDF opens correctly

### Test 2: Download URL (if needed)
1. Store PDF on Railway with public URL
2. Send URL to Zapier
3. Zapier "Download File" action
4. Upload to SharePoint

---

## 📊 Admin Dashboard Features

### Dashboard Home:
- Total submissions count
- Recent submissions (last 10)
- Active form links count
- Quick action: Create new form link

### Form Links Management:
- Table: Token (shortened), Created, Expires, Used/Max Uses, Status
- Actions: Copy Link, Deactivate, View Submissions
- Create New Link button

### Submissions View:
- Table: Company, Submitted Date, Status (Sent to Zapier?), Actions
- Filters: Date range, Company name search
- Export to CSV
- Individual submission detail page

---

## 🎨 UI/UX Notes

### Admin Panel Style:
- Clean, professional dashboard (use Tailwind)
- Sidebar navigation (if multi-page)
- Data tables with sorting/filtering
- Toast notifications for actions

### Client Form Style:
- Match CR Express branding
- Progress indicator (multi-step form?)
- Clear validation messages
- Loading state during submission
- Success page with confirmation

---

## 🔒 Security Considerations

1. **Authentication**:
   - Managed by Neon Auth (Stack Auth behind the scenes)
   - Secure session handling built-in
   - CSRF protection included

2. **Form Tokens**:
   - UUIDs for unpredictability
   - Check expiration before showing form
   - Check usage limit before accepting submission
   - Mark as inactive after max uses

3. **File Uploads**:
   - Validate file type (PDF only for W-9)
   - File size limit (e.g., 10MB)
   - Sanitize filenames
   - Scan for malware (optional, use ClamAV if paranoid)

4. **API Routes**:
   - Rate limiting (if public-facing)
   - Input validation with Zod
   - SQL injection prevention (Prisma handles this)
   - XSS prevention (React handles this)

5. **Database**:
   - Soft deletes (don't actually delete submissions)
   - Audit logs for admin actions
   - Regular backups (Neon handles this automatically)

---

## 📦 Dependencies to Install

```bash
# Database & ORM
npm install prisma @prisma/client

# Neon Auth (Stack Auth SDK)
npm install @stackframe/stack

# Form handling & validation
npm install zod react-hook-form @hookform/resolvers

# Utilities
npm install date-fns uuid

# UI Components (optional but recommended)
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @tanstack/react-table

# Dev dependencies
npm install -D @types/uuid
```

**Note**: @react-pdf/renderer already installed ✅

---

## 🚦 Next Steps

1. ✅ **Approach confirmed**: Base64 to Zapier (tested and working!)
2. ✅ **Stack decided**: Neon (database) + Neon Auth (authentication)
3. ✅ **Cost confirmed**: $0/month (100% free tier)
4. **Ready to start Phase 1**: Create Neon account → Setup database → Install dependencies

---

## 💡 Future Enhancements (Post-MVP)

- [ ] Email notifications when submission received
- [ ] Multi-step form with progress bar
- [ ] Form templates (pre-fill common fields)
- [ ] Bulk form link creation
- [ ] Analytics dashboard (submissions over time)
- [ ] Role-based access (admin vs. viewer)
- [ ] Form customization (enable/disable fields)
- [ ] Integration with CRM (if needed)

---

**Last Updated**: November 7, 2025
**Status**: ✅ Planning Complete - Ready for Implementation
**Stack**: Neon + Neon Auth + Vercel (100% Free)
**Next Action**: Begin Phase 1 - Create Neon account and database
