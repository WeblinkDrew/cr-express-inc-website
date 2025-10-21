# CR Express Website Transformation Guide

**Project:** Transforming Studio Next.js Template → CR Express Logistics Website
**Started:** October 15, 2025
**Template:** Tailwind Plus Studio Template (Next.js 15)
**Goal:** Maintain beautiful template design while replacing all content with CR Express information

---

## 📚 Reference Documents

- **Old Site Audit:** `/Rules/CR-EXPRESS-WEBSITE-CONTENT-AUDIT.md`
- **This Guide:** `/CR-EXPRESS-TRANSFORMATION-GUIDE.md`

---

## 🎯 Project Overview

### What We're Keeping
✅ **All template layouts and designs** - No visual changes to structure
✅ **All animations and interactions** - Framer Motion stays
✅ **Component architecture** - Reuse existing components
✅ **Responsive design** - Mobile-first approach
✅ **Next.js 15 App Router** - Modern framework

### What We're Changing
📝 **All written content** - Replace with CR Express messaging
📝 **Navigation structure** - Update menu items for logistics services
📝 **Page purposes** - Transform case studies → services, etc.
📝 **Images** - Replace with CR Express photos (later phase)
📝 **Contact information** - CR Express details

---

## 📋 Complete Site Map Transformation

### Old Template → New CR Express Site

| Template Page | Purpose | → | New CR Express Page | Purpose | Status |
|---------------|---------|---|---------------------|---------|--------|
| **/** | Agency homepage | → | **/** | Logistics company homepage | 🟡 In Progress |
| **/work** | Case studies listing | → | **/services** | Services overview | 🔴 Not Started |
| **/work/phobia** | Case study detail | → | **/services/warehousing** | Bonded warehouse service | 🔴 Not Started |
| **/work/unseal** | Case study detail | → | **/services/air-cargo** | Air cargo service | 🔴 Not Started |
| **/work/family-fund** | Case study detail | → | **/services/drayage** | Drayage service | 🔴 Not Started |
| **NEW** | - | → | **/services/over-the-road** | OTR trucking service | 🔴 Not Started |
| **NEW** | - | → | **/services/local-pd** | Local P&D service | 🔴 Not Started |
| **/about** | Agency about | → | **/about** | Company history & team | 🔴 Not Started |
| **/process** | Agency process | → | **/process** OR **/why-choose-us** | CR Express differentiators | 🔴 Not Started |
| **/blog** | Blog listing | → | **/blog** | CR Express news & insights | 🔴 Not Started |
| **/blog/[articles]** | Blog posts | → | **/blog/[articles]** | Logistics industry content | 🔴 Not Started |
| **/contact** | Contact form | → | **/contact** | Quote request & contact | 🔴 Not Started |
| **NEW** | - | → | **/careers** | Job opportunities | 🔴 Not Started |
| **NEW** | - | → | **/locations/[city]** | 26 city-specific pages | 🔴 Not Started |

---

## 🏗️ Implementation Phases

### ✅ PHASE 0: Setup & Planning (COMPLETED)
- [x] Analyze old CR Express site content
- [x] Understand Next.js template structure
- [x] Create transformation guide (this document)
- [x] Define implementation strategy

---

### ✅ PHASE 1: Homepage & Core Navigation (COMPLETED)

#### Tasks
- [x] **Homepage Content Rewrite** (`/src/app/page.tsx`)
  - [x] Hero section with background video
  - [x] Trust badges section (certifications)
  - [x] Core services section with new service cards
  - [x] Testimonial section
  - [x] Why Choose CR Express section
  - [x] Industries served section (Sectors We Serve)
  - [x] FAQ section (added for SEO)
  - [x] Video section placeholder
  - [x] Contact CTA section

- [x] **Navigation Update** (`/src/app/layout.tsx`)
  - [x] Update header menu items
  - [x] Update mobile navigation (6 items)
  - [x] Change header button to "Get a Quote"

- [x] **Footer Update** (`/src/components/Footer.tsx`)
  - [x] Add MC/DOT numbers
  - [x] Add service area city links
  - [x] Update company information
  - [x] Update social media links

- [x] **Contact Page Update** (`/src/app/contact/page.tsx`)
  - [x] Update contact information
  - [x] Update form fields for quote requests
  - [x] Add CR Express address/phone
  - [x] Update office locations section

- [x] **Logo Integration**
  - [x] Replace template logos with CR Express SVGs
  - [x] Implement dark/light logo switching

**Completed:** October 15, 2025

---

### ✅ PHASE 2: Service Pages (COMPLETED)

#### Task: Transform Work/Case Studies → Services

**Directory Structure Change:**
```
OLD: /src/app/work/
NEW: /src/app/services/
```

**Files Created:**

1. **Services Overview Page** ✅
   - File: `/src/app/services/page.tsx`
   - Content: Overview of all 5 core services with Heroicons
   - Template base: Current `/src/app/work/page.tsx`

2. **Warehousing Service Page** ✅
   - File: `/src/app/services/warehousing/page.mdx`
   - Template base: Current `/src/app/work/phobia/page.mdx`
   - Content: Comprehensive bonded warehouse details

3. **Air Cargo Service Page** ✅
   - File: `/src/app/services/air-cargo/page.mdx`
   - Template base: Current `/src/app/work/unseal/page.mdx`
   - Content: TSA-approved air cargo operations

4. **Drayage Service Page** ✅
   - File: `/src/app/services/drayage/page.mdx`
   - Template base: Current `/src/app/work/family-fund/page.mdx`
   - Content: Intermodal drayage with 21 railyard access

5. **Over the Road Service Page** ✅
   - File: `/src/app/services/over-the-road/page.mdx`
   - Template base: MDX service template
   - Content: Nationwide FTL/LTL trucking services

6. **Local P&D Service Page** ✅
   - File: `/src/app/services/local-pd/page.mdx`
   - Template base: MDX service template
   - Content: Chicago metro pickup & delivery

**Additional Work Completed:**
- Created `/src/app/services/wrapper.tsx` for proper layout
- Updated `next.config.mjs` to apply wrapper to service MDX pages
- Added Service interface to `/src/lib/mdx.ts`
- Fixed MDXComponents searchParams prop issue

**Completed:** October 15, 2025

---

### ✅ PHASE 3: About & Supporting Pages (COMPLETED)

#### Tasks

1. **About Page Rewrite** (`/src/app/about/page.tsx`) ✅
   - [x] Company history (founded 1999 by truck drivers)
   - [x] Leadership team section
   - [x] Mission & vision
   - [x] Company stats (280k sq ft, 100+ employees, etc.)
   - [x] Certifications display
   - [x] Community & philanthropy

2. **Process/Why Choose Us Page** (`/src/app/process/page.tsx`) ✅
   - [x] Decided: Renamed to "Why Choose Us"
   - [x] Replaced agency process with logistics differentiators
   - [x] Highlighted: Founded by drivers, 26+ years, strategic location
   - [x] Company values grid

3. **Careers Page** (NEW - `/src/app/careers/page.tsx`) ✅
   - [x] Created new page from scratch
   - [x] Job opportunities section (9 positions across 3 departments)
   - [x] Company culture section
   - [x] Application process (links to contact form)
   - [x] Benefits overview (6 comprehensive benefits)

**Completed:** October 15, 2025

---

### 🔴 PHASE 4: Blog Migration (NOT STARTED)

#### Tasks

1. **Blog Listing Page** (`/src/app/blog/page.tsx`)
   - [ ] Update intro copy for logistics industry content
   - [ ] Keep existing blog structure

2. **Create CR Express Blog Posts**
   - [ ] Decide: Keep template posts or remove?
   - [ ] Option A: Write new logistics-focused articles
   - [ ] Option B: Migrate existing blog posts from old site
   - [ ] Option C: Start fresh with new content

**Target Completion:** Week 2-3

---

### 🔴 PHASE 5: Location Pages (NOT STARTED)

#### Strategy Decision Needed

**Option A: Dynamic Route with Data Files**
```
/src/app/locations/[city]/page.tsx (template)
/src/app/locations/[city]/data/chicago.json
/src/app/locations/[city]/data/schaumburg.json
... (26 total JSON files)
```

**Option B: Individual MDX Pages**
```
/src/app/locations/chicago/page.mdx
/src/app/locations/schaumburg/page.mdx
... (26 total MDX files)
```

**Recommendation:** Start with **8 featured cities** using Option B, then evaluate

#### Featured Cities (Priority)
1. Chicago
2. Schaumburg
3. Arlington Heights
4. Palatine
5. Des Plaines
6. Mount Prospect
7. Hoffman Estates
8. Buffalo Grove

#### Additional Cities (Lower Priority)
9. Rosemont
10. Wood Dale
11. Bensenville
12. Addison
13. Roselle
14. Carol Stream
15. Bloomingdale
16. Glendale Heights
17. Villa Park
18. Wheeling
19. Northbrook
20. Park Ridge
21. Niles
22. Franklin Park
23. Bartlett
24. Hanover Park
25. Streamwood
26. Rolling Meadows

**Target Completion:** Week 3-4

---

## 📝 Content Guidelines

### Brand Voice for CR Express
- **Professional but approachable** - B2B logistics, not stuffy
- **Emphasis on expertise** - 26+ years, founded by truck drivers
- **Trust and reliability** - Certifications, compliance, credentials
- **Solution-focused** - How we solve logistics challenges
- **Local expertise** - Strategic Chicago location, O'Hare proximity

### Key Messages to Emphasize
1. **Founded by truck drivers in 1999** - Understand the industry from the ground up
2. **26+ years of experience** - Proven track record
3. **Strategic location** - <5 miles from O'Hare, 21 railyard access
4. **Comprehensive services** - One-stop shop for logistics
5. **Certifications** - CBW Class 3, TSA, GDP compliant, SmartWay
6. **Industry expertise** - Automotive, pharma, retail, manufacturing

### SEO Keywords to Include
- Bonded warehouse
- Chicago logistics
- O'Hare freight
- Intermodal drayage
- Air cargo services
- Container freight
- Supply chain solutions
- Customs compliance

---

## 🎨 Design & Layout Notes

### Components We'll Reuse Heavily
- `Container` - For all content sections
- `FadeIn` / `FadeInStagger` - Keep all animations
- `SectionIntro` - For section headers
- `GridList` / `GridListItem` - For service features
- `Testimonial` - For client quotes
- `ContactSection` - For CTAs
- `PageIntro` - For page headers

### New Components We May Need to Create
- `TrustBadge` - For certifications (CBW Class 3, TSA, etc.)
- `ServiceCard` - For service grid displays
- `IndustryIcon` - For industries served
- `StatsBar` - For facility stats (280k sq ft, etc.)
- `ProcessTimeline` - For bonded warehouse workflow
- `FaqAccordion` - For FAQ sections (if needed)

### Image Placeholders
For now, we're keeping existing template images. In future phases:
- Hero images: CR Express facility photos
- Service images: Warehouse, trucks, cargo operations
- Team photos: CR Express leadership and staff
- Client logos: Actual client logos (if available)

---

## 🔧 Technical Implementation Notes

### File Naming Conventions
- Pages: `page.tsx` for complex pages, `page.mdx` for content-heavy pages
- Components: PascalCase (e.g., `TrustBadge.tsx`)
- Images: kebab-case (e.g., `bonded-warehouse-facility.jpg`)

### MDX Front Matter Structure (for service pages)
```yaml
---
service: 'warehousing'
title: 'Bonded Warehouse Services'
description: 'CBW Class 3 certified warehouse with 280,000 sq ft of secure storage'
icon: '/images/services/warehousing.svg'
features:
  - 'CBW Class 3 Certified'
  - '280,000 Sq Ft Facility'
  - '<5 Miles from O\'Hare'
---
```

### Navigation Structure (Target)
```
Header Navigation:
- Home
- Services (dropdown)
  - Warehousing
  - Air Cargo
  - Drayage
  - Over the Road
  - Local P&D
- About
- Blog
- Careers
- Contact

Footer Navigation:
- Services (all 5)
- Company (About, Process, Careers, Contact)
- Resources (Blog, Locations)
- Connect (Social media, phone, email)
- Legal (MC/DOT numbers, copyright)
```

---

## 📞 CR Express Contact Information

**Company:** CR Express Inc.
**Address:** 2400 Arthur Ave, Elk Grove Village, IL 60007
**Primary Phone:** (847) 354-7979
**Secondary Phone:** +1 (224) 402-9537
**MC Number:** MC-721384
**DOT Number:** 1717205
**Founded:** 1999
**Employees:** 100+

---

## ✅ Completion Checklist

### Content Transformation
- [ ] Homepage content complete
- [ ] All 5 service pages created
- [ ] About page updated
- [ ] Contact page updated
- [ ] Careers page created
- [ ] Navigation updated
- [ ] Footer updated
- [ ] 8 featured city pages created
- [ ] Blog structure updated

### Technical Implementation
- [ ] All old `/work` routes redirected to `/services`
- [ ] SEO metadata updated on all pages
- [ ] Schema markup added for LocalBusiness
- [ ] Sitemap updated
- [ ] Favicon updated (CR Express logo)
- [ ] Meta descriptions written for all pages

### Quality Assurance
- [ ] All pages render without errors
- [ ] Mobile responsiveness verified
- [ ] All links functional
- [ ] Forms tested and working
- [ ] Load times optimized
- [ ] Accessibility checked (WCAG AA)

### Launch Preparation
- [ ] Image optimization complete
- [ ] Google Analytics integration
- [ ] Google Search Console setup
- [ ] 301 redirects configured (if migrating from old domain)
- [ ] SSL certificate verified
- [ ] Performance testing complete

---

## 🚧 Known Issues / Questions

### To Decide:
1. Should we keep "Process" page or rename to "Why Choose Us"?
2. Blog strategy: New content vs. migrate old vs. start fresh?
3. Dynamic vs. static for 26 city pages?
4. Forms: Build custom or integrate with external system?
5. Economic data API: Implement now or later phase?

### Technical Considerations:
- Need to update MDX loader to handle service pages
- May need dropdown navigation component for services menu
- Consider adding search functionality for blog/services
- Implement tracking for quote request forms

---

## 📊 Progress Tracking

**Overall Progress:** 60% (Phases 0, 1, 2 & 3 Complete)

### Phase Breakdown:
- Phase 0: Planning ✅ 100% Complete
- Phase 1: Homepage & Navigation ✅ 100% Complete
- Phase 2: Service Pages ✅ 100% Complete
- Phase 3: About & Supporting Pages ✅ 100% Complete
- Phase 4: Blog Migration 🔴 0% Complete
- Phase 5: Location Pages 🔴 0% Complete

---

## 📅 Timeline

**Week 1:** Phases 1-2 (Homepage, Navigation, Service Pages)
**Week 2:** Phase 3 (About, Careers, Process)
**Week 3:** Phase 4-5 (Blog, Location Pages)
**Week 4:** QA, Image Updates, Optimization

---

## 🎓 Learning & Notes

### Helpful Commands
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Useful File Paths
- Homepage: `/src/app/page.tsx`
- Root Layout: `/src/app/layout.tsx`
- Components: `/src/components/`
- MDX Loader: `/src/lib/mdx.ts`
- Images: `/src/images/`

---

**Last Updated:** October 15, 2025
**Current Focus:** Phase 1 - Homepage Content Rewrite
