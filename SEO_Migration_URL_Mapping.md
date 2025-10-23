# CR Express Website - Complete URL Mapping Document
## Migration Date: October 2025

---

## CRITICAL URL DISCREPANCIES FOUND

### HIGH PRIORITY - URLs That Differ Between Sites
| Page | OLD Site (Current Live) | NEW Site Structure | Status |
|------|------------------------|-------------------|---------|
| **About Page** | `/about-page/` | `/about/` or keep same | **CHECK REQUIREMENT** |
| **Careers Page** | `/logistics-careers/` | `/careers/` or keep same | **CHECK REQUIREMENT** |
| **Warehousing** | `/warehousing/` | `/services/warehousing/` | **NEEDS REDIRECT** |
| **Air Cargo** | `/air-cargo/` | `/services/air-cargo/` | **NEEDS REDIRECT** |
| **Drayage** | `/drayage/` | `/services/drayage/` | **NEEDS REDIRECT** |
| **Over the Road** | `/over-the-road/` | `/services/over-the-road/` | **NEEDS REDIRECT** |
| **Local P&D** | `/local-pd/` | `/services/local-pd/` | **NEEDS REDIRECT** |

---

## Complete URL Mapping (41 Pages + Expected URLs)

### ✅ EXACT MATCHES - No Redirects Needed (28 pages)

| Page Type | URL | Status |
|-----------|-----|---------|
| **Homepage** | `/` | ✅ Exact Match |
| **Contact** | `/contact-us-page/` | ✅ Exact Match |
| **Blog** | `/blog/` | ✅ Exact Match |
| **Privacy Policy** | `/privacy-policy/` | ✅ Exact Match |
| **SMS Privacy** | `/sms-privacy-policy/` | ✅ Exact Match |
| **Request Quote** | `/request-a-quote/` | ✅ Exact Match |
| **Fuel Surcharge** | `/fuel-surcharge/` | ✅ Exact Match |
| **Transportation** | `/transportation/` | ✅ Exact Match |

### ✅ CITY PAGES - All Match (26 pages)
| City | URL | Status |
|------|-----|---------|
| Chicago | `/bonded-warehouse-chicago-illinois/` | ✅ Exact Match |
| Schaumburg | `/bonded-warehouse-schaumburg-illinois/` | ✅ Exact Match |
| Arlington Heights | `/bonded-warehouse-arlington-heights-illinois/` | ✅ Exact Match |
| Palatine | `/bonded-warehouse-palatine-illinois/` | ✅ Exact Match |
| Des Plaines | `/bonded-warehouse-des-plaines-illinois/` | ✅ Exact Match |
| Mount Prospect | `/bonded-warehouse-mount-prospect-illinois/` | ✅ Exact Match |
| Hoffman Estates | `/bonded-warehouse-hoffman-estates-illinois/` | ✅ Exact Match |
| Rosemont | `/bonded-warehouse-rosemont-illinois/` | ✅ Exact Match |
| Wood Dale | `/bonded-warehouse-wood-dale-illinois/` | ✅ Exact Match |
| Bensenville | `/bonded-warehouse-bensenville-illinois/` | ✅ Exact Match |
| Addison | `/bonded-warehouse-addison-illinois/` | ✅ Exact Match |
| Roselle | `/bonded-warehouse-roselle-illinois/` | ✅ Exact Match |
| Carol Stream | `/bonded-warehouse-carol-stream-illinois/` | ✅ Exact Match |
| Bloomingdale | `/bonded-warehouse-bloomingdale-illinois/` | ✅ Exact Match |
| Glendale Heights | `/bonded-warehouse-glendale-heights-illinois/` | ✅ Exact Match |
| Villa Park | `/bonded-warehouse-villa-park-illinois/` | ✅ Exact Match |
| Wheeling | `/bonded-warehouse-wheeling-illinois/` | ✅ Exact Match |
| Buffalo Grove | `/bonded-warehouse-buffalo-grove-illinois/` | ✅ Exact Match |
| Northbrook | `/bonded-warehouse-northbrook-illinois/` | ✅ Exact Match |
| Park Ridge | `/bonded-warehouse-park-ridge-illinois/` | ✅ Exact Match |
| Niles | `/bonded-warehouse-niles-illinois/` | ✅ Exact Match |
| Franklin Park | `/bonded-warehouse-franklin-park-illinois/` | ✅ Exact Match |
| Bartlett | `/bonded-warehouse-bartlett-illinois/` | ✅ Exact Match |
| Hanover Park | `/bonded-warehouse-hanover-park-illinois/` | ✅ Exact Match |
| Streamwood | `/bonded-warehouse-streamwood-illinois/` | ✅ Exact Match |
| Rolling Meadows | `/bonded-warehouse-rolling-meadows-illinois/` | ✅ Exact Match |

---

### ⚠️ PAGES REQUIRING 301 REDIRECTS (5 Service Pages - CRITICAL)

| Old URL (Current Live) | New URL (New Structure) | Redirect Type | Priority |
|----------------------|------------------------|---------------|----------|
| `/warehousing/` | `/services/warehousing/` | 301 Permanent | **CRITICAL** |
| `/air-cargo/` | `/services/air-cargo/` | 301 Permanent | **CRITICAL** |
| `/drayage/` | `/services/drayage/` | 301 Permanent | **CRITICAL** |
| `/over-the-road/` | `/services/over-the-road/` | 301 Permanent | **CRITICAL** |
| `/local-pd/` | `/services/local-pd/` | 301 Permanent | **CRITICAL** |

---

### 🔍 NOTES ON URL STRUCTURE CHANGES

| Note | Details |
|------|---------|
| **Service Pages Moving** | All service pages moving from root to `/services/` subdirectory |
| **New Services Hub** | `/services/` will likely be a new overview/hub page |
| **About/Careers URLs** | Verify if these URLs are changing or staying same |

---

## REDIRECT STRATEGY RECOMMENDATIONS

### CRITICAL SERVICE PAGE REDIRECTS (Must Implement - SEO Critical)
1. `/warehousing/` → `/services/warehousing/` (301)
2. `/air-cargo/` → `/services/air-cargo/` (301)
3. `/drayage/` → `/services/drayage/` (301)
4. `/over-the-road/` → `/services/over-the-road/` (301)
5. `/local-pd/` → `/services/local-pd/` (301)

### Potential Vanity URL Redirects (Recommended)
1. `/bonded-warehouse/` → `/services/warehousing/`
2. `/trucking/` → `/services/over-the-road/`
3. `/logistics/` → `/`
4. `/freight/` → `/services/over-the-road/`
5. `/shipping/` → `/services/over-the-road/`

### Legacy URL Handling
Monitor 404 errors post-migration for any undocumented legacy URLs that may need redirects.

---

## MIGRATION CHECKLIST

- [ ] Implement all critical 301 redirects
- [ ] Verify all city pages maintain exact URLs
- [ ] Add missing SEO metadata to pages lacking it
- [ ] Create /services/ overview page OR implement redirect
- [ ] Test all redirects before going live
- [ ] Set up 404 monitoring post-launch
- [ ] Verify XML sitemap includes all pages
- [ ] Submit updated sitemap to Google Search Console

---

*Document Generated: October 2025*
*Total Pages Analyzed: 41*
***CRITICAL: 5 Service Page Redirects Required***
*City Pages: All 26 maintain exact URLs (No Risk)*
*Homepage & Blog: No changes needed*