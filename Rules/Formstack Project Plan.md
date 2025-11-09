# Formstack to SharePoint Automation - Project Plan

## 🎯 Project Overview

**Goal:** Automatically process CR Express client onboarding forms from Formstack, generate formatted PDFs, and upload both the form PDF and W-9 to SharePoint.

**Tech Stack:**
- Formstack (form submission trigger)
- Zapier (workflow orchestration)
- Next.js API Route on Vercel (PDF generation)
- React-PDF (PDF formatting)
- SharePoint (file storage)

**Total Cost:** $0/month (using existing Zapier & Vercel subscriptions)

---

## 📋 High-Level Workflow

```
Formstack Form Submission
         ↓
Zapier: New Form Submission Trigger
         ↓
Zapier: Webhooks - POST to Next.js API
  (sends all form data as JSON)
         ↓
Next.js API:
  1. Generate formatted PDF from form data
  2. Download W-9 file from Formstack URL
  3. Convert both to base64
  4. Return to Zapier
         ↓
Zapier: Upload form PDF to SharePoint
         ↓
Zapier: Upload W-9 to SharePoint
         ↓
✅ Done!
```

---

## 🛠️ Implementation Steps

### Phase 1: Next.js Setup (30 minutes)

#### Step 1: Install Dependencies
```bash
cd crexpress-nextjs-site
npm install @react-pdf/renderer
```

#### Step 2: Create File Structure
Create the following files in your Next.js project:
```
/app
  /api
    /generate-onboarding-pdf
      route.js                    ← Main API endpoint
  /components
    /pdf
      ClientOnboardingPDF.jsx     ← PDF template component
```

#### Step 3: Set Up API Route
- Create API endpoint that receives form data
- Generate PDF using React-PDF
- Download W-9 from Formstack URL
- Convert both files to base64
- Return JSON response with both files

#### Step 4: Create PDF Component
- Build React-PDF component with styled layout
- Map all form fields to PDF sections
- Apply professional styling

#### Step 5: Deploy to Vercel
```bash
git add .
git commit -m "Add Formstack onboarding PDF generation"
git push origin main
```
Vercel will auto-deploy.

---

### Phase 2: Zapier Setup (15 minutes)

#### Step 1: Create New Zap
1. Go to zapier.com
2. Click "Create Zap"
3. Name it: "Formstack → PDF → SharePoint"

#### Step 2: Configure Trigger
- **App:** Formstack
- **Event:** New Form Submission
- **Form:** CR Express Client Onboarding
- Test trigger to verify it works

#### Step 3: Add Webhook Action
- **App:** Webhooks by Zapier
- **Event:** POST
- **URL:** `https://crexpress.com/api/generate-onboarding-pdf`
- **Payload Type:** JSON
- **Data:** Map all Formstack fields (see field mapping below)

#### Step 4: Add SharePoint Upload (Form PDF)
- **App:** SharePoint
- **Event:** Upload File
- **Site:** Your SharePoint site
- **Folder:** `/Client Onboarding`
- **File Content:** `{{2. files__onboarding_pdf}}`
- **File Name:** `{{2. filenames__onboarding}}`

#### Step 5: Add SharePoint Upload (W-9)
- **App:** SharePoint
- **Event:** Upload File
- **Site:** Your SharePoint site
- **Folder:** `/W9 Documents`
- **File Content:** `{{2. files__w9_pdf}}`
- **File Name:** `{{2. filenames__w9}}`

#### Step 6: Test & Turn On
- Run a test with sample data
- Verify both files appear in SharePoint
- Turn Zap ON

---

### Phase 3: Testing & Verification (10 minutes)

#### Step 1: Submit Test Form
- Go to Formstack form
- Fill out with test data
- Upload a sample W-9 PDF
- Submit

#### Step 2: Verify Zapier Execution
- Check Zapier task history
- Confirm all steps succeeded
- Check for any error messages

#### Step 3: Verify SharePoint Files
- Navigate to SharePoint folders
- Confirm form PDF was created
- Confirm W-9 was uploaded
- Open both files to verify content

#### Step 4: Check PDF Formatting
- Open generated PDF
- Verify all fields are present
- Check styling/layout looks good
- Confirm it's readable and professional

---

## 📝 Formstack Field Mapping

When setting up the Zapier webhook, map these Formstack fields to JSON:

```json
{
  "unique_id": "{{Unique ID}}",
  "submission_time": "{{Submission Time}}",
  "ip_address": "{{IP Address}}",
  "company_legal_name": "{{What is your company's legal name?}}",
  "division": "{{What division of your company do you operate in?}}",
  "branch_location": "{{Branch Location}}",
  "mc_dot": "{{MC/DOT}}",
  "primary_contact": "{{Primary Contact}}",
  "primary_contact_email": "{{Primary Contact Email}}",
  "primary_contact_phone": "{{Primary Contact Phone Number}}",
  "secondary_contact": "{{Secondary Contact}}",
  "secondary_contact_email": "{{Secondary Contact Email}}",
  "secondary_contact_phone": "{{Secondary Contact Phone Number}}",
  "escalation_contact": "{{Escalation Contact}}",
  "escalation_contact_email": "{{Escalation Contact Email}}",
  "escalation_contact_phone": "{{Escalation Contact Phone Number}}",
  "accounts_payable_contact": "{{Primary Accounts Payable Contact}}",
  "accounts_payable_email": "{{Primary Accounts Payable Email}}",
  "accounts_payable_phone": "{{Primary Accounts Payable Phone Number}}",
  "billing_address": "{{What is your company's billing address?}}",
  "invoicing_instructions": "{{Do you have any special instructions for invoicing?}}",
  "payment_method": "{{Please specify your preferred method of payment}}",
  "w9_upload": "{{Please upload your W9 here}}",
  "shipment_types": "{{Please check all shipment types that your team may request:}}",
  "equipment_types": "{{Please check all equipment types that may be required to transport your goods:}}",
  "shipment_build": "{{How will your shipments be built?}}",
  "additional_requirements": "{{Please check any additional requirements for transport of your goods:}}",
  "monthly_shipments": "{{How many shipments on a monthly basis do you expect to request?}}",
  "exception_communication": "{{How would you like us to handle communication for exceptions that may occur}}",
  "review_frequency": "{{How often would you like to have business reviews with CR Express}}"
}
```

---

## 🎨 PDF Styling Guidelines

The PDF should include:

### Visual Elements
- ✅ Header with "CR Express Client Onboarding"
- ✅ Submission metadata (ID, date, IP)
- ✅ Clearly defined sections with headers
- ✅ Two-column layout for labels and values
- ✅ Professional color scheme (blues/grays)
- ✅ Proper spacing and padding
- ✅ Clean, readable fonts

### Sections to Include
1. Basic Client Information
2. Contact Information (Primary, Secondary, Escalation, AP)
3. Financial Information
4. Operations Information

### Styling Notes
- Use consistent spacing between sections
- Bold labels, regular weight for values
- Add subtle background colors for sections
- Use borders/dividers to separate content
- Ensure text doesn't overflow/wrap awkwardly

---

## 🚨 Potential Issues & Solutions

### Issue 1: Formstack W-9 URL Not Accessible
**Symptom:** API fails to download W-9 file
**Solution:** Ensure W-9 URLs from Formstack are publicly accessible OR add Formstack API authentication

### Issue 2: Vercel Function Timeout
**Symptom:** Zapier shows timeout error (>10 seconds)
**Solution:** 
- Optimize PDF generation
- Already using React-PDF (fast)
- If still issues, upgrade Vercel to Pro ($20/mo) for 60s timeout

### Issue 3: Base64 File Too Large for Zapier
**Symptom:** Zapier can't handle the file size
**Solution:** 
- PDFs should be small (<500KB each)
- If issue persists, upload directly from Next.js to SharePoint instead

### Issue 4: SharePoint Authentication Fails
**Symptom:** Zapier can't connect to SharePoint
**Solution:** 
- Reconnect SharePoint in Zapier
- Verify permissions
- Check if SharePoint site is accessible

### Issue 5: PDF Missing Fields
**Symptom:** Some form fields don't appear in PDF
**Solution:** 
- Check field mapping in Zapier webhook
- Verify field names match exactly
- Add console.log in API to debug

---

## ✅ Success Criteria

Project is complete when:

- ✅ Form submission triggers Zap automatically
- ✅ PDF is generated with all form data
- ✅ PDF is properly formatted and readable
- ✅ W-9 file is downloaded from Formstack
- ✅ Both files upload to correct SharePoint folders
- ✅ Files are named correctly and consistently
- ✅ Process completes in <10 seconds
- ✅ No errors in Zapier task history
- ✅ Team can access files in SharePoint

---

## 📞 Support Resources

- **React-PDF Docs:** https://react-pdf.org/
- **Vercel Docs:** https://vercel.com/docs
- **Zapier Webhooks:** https://zapier.com/apps/webhook/help
- **SharePoint API:** https://learn.microsoft.com/en-us/sharepoint/

---

## 📊 Project Timeline

- **Total Setup Time:** ~1 hour
- **Phase 1 (Next.js):** 30 minutes
- **Phase 2 (Zapier):** 15 minutes
- **Phase 3 (Testing):** 10 minutes
- **Buffer:** 5 minutes

---

## 💰 Cost Analysis

| Service | Current Cost | New Cost | Change |
|---------|--------------|----------|---------|
| Formstack | Existing | $0 | No change |
| Zapier | $19.99/mo | $19.99/mo | No change |
| Vercel | Free tier | Free tier | No change |
| SharePoint | Existing | $0 | No change |
| **Total** | **~$20/mo** | **~$20/mo** | **$0 increase** |

---

## 🎯 Next Steps

1. Review this document with team
2. Begin Phase 1 implementation
3. Test thoroughly with sample data
4. Deploy to production
5. Monitor first few real submissions
6. Document any issues/improvements

---

**Last Updated:** [Current Date]
**Project Owner:** Weblink Digital Marketing Agency
**Client:** CR Express
