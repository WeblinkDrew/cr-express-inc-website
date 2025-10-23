# CR Express - 301 Redirect Configuration Files
## CRITICAL: Service Pages Moving to /services/ Subdirectory

---

## ⚠️ CRITICAL CHANGES - SERVICE URL STRUCTURE

**OLD Structure (Current Live):**
- `/warehousing/`
- `/air-cargo/`
- `/drayage/`
- `/over-the-road/`
- `/local-pd/`

**NEW Structure (New Site):**
- `/services/warehousing/`
- `/services/air-cargo/`
- `/services/drayage/`
- `/services/over-the-road/`
- `/services/local-pd/`

---

## OPTION 1: Apache .htaccess Configuration
*Place in root .htaccess file*

```apache
# CR Express SEO Migration Redirects
# Generated: October 2025
# CRITICAL: Service pages moving to /services/ subdirectory

# ==================================================
# CRITICAL SERVICE PAGE REDIRECTS - HIGHEST PRIORITY
# These are your main service pages with significant traffic & rankings
# ==================================================

# Warehousing Service Page
RedirectPermanent /warehousing/ https://crexpressinc.com/services/warehousing/
RedirectPermanent /warehousing https://crexpressinc.com/services/warehousing/

# Air Cargo Service Page
RedirectPermanent /air-cargo/ https://crexpressinc.com/services/air-cargo/
RedirectPermanent /air-cargo https://crexpressinc.com/services/air-cargo/

# Drayage Service Page
RedirectPermanent /drayage/ https://crexpressinc.com/services/drayage/
RedirectPermanent /drayage https://crexpressinc.com/services/drayage/

# Over the Road Service Page
RedirectPermanent /over-the-road/ https://crexpressinc.com/services/over-the-road/
RedirectPermanent /over-the-road https://crexpressinc.com/services/over-the-road/

# Local Pickup & Delivery Service Page
RedirectPermanent /local-pd/ https://crexpressinc.com/services/local-pd/
RedirectPermanent /local-pd https://crexpressinc.com/services/local-pd/

# ==================================================
# RECOMMENDED SEO-FRIENDLY VANITY REDIRECTS
# Common search terms pointing to new service URLs
# ==================================================

# Bonded Warehouse searches to Warehousing
RedirectPermanent /bonded-warehouse/ https://crexpressinc.com/services/warehousing/
RedirectPermanent /bonded-warehouse https://crexpressinc.com/services/warehousing/

# Trucking searches to Over the Road
RedirectPermanent /trucking/ https://crexpressinc.com/services/over-the-road/
RedirectPermanent /trucking https://crexpressinc.com/services/over-the-road/

# Freight/Shipping searches
RedirectPermanent /freight/ https://crexpressinc.com/services/over-the-road/
RedirectPermanent /shipping/ https://crexpressinc.com/services/over-the-road/

# General redirects
RedirectPermanent /logistics/ https://crexpressinc.com/
RedirectPermanent /quote/ https://crexpressinc.com/request-a-quote/
RedirectPermanent /contact/ https://crexpressinc.com/contact-us-page/

# Transportation page (if being removed)
# RedirectPermanent /transportation/ https://crexpressinc.com/services/
```

---

## OPTION 2: Nginx Configuration
*Place in server block*

```nginx
# CR Express SEO Migration Redirects - Nginx Version
# CRITICAL: Service pages moving to /services/ subdirectory

# Critical Service Page Redirects
location = /warehousing/ { return 301 https://crexpressinc.com/services/warehousing/; }
location = /warehousing { return 301 https://crexpressinc.com/services/warehousing/; }

location = /air-cargo/ { return 301 https://crexpressinc.com/services/air-cargo/; }
location = /air-cargo { return 301 https://crexpressinc.com/services/air-cargo/; }

location = /drayage/ { return 301 https://crexpressinc.com/services/drayage/; }
location = /drayage { return 301 https://crexpressinc.com/services/drayage/; }

location = /over-the-road/ { return 301 https://crexpressinc.com/services/over-the-road/; }
location = /over-the-road { return 301 https://crexpressinc.com/services/over-the-road/; }

location = /local-pd/ { return 301 https://crexpressinc.com/services/local-pd/; }
location = /local-pd { return 301 https://crexpressinc.com/services/local-pd/; }

# SEO-Friendly Vanity Redirects
location = /bonded-warehouse/ { return 301 https://crexpressinc.com/services/warehousing/; }
location = /bonded-warehouse { return 301 https://crexpressinc.com/services/warehousing/; }
location = /trucking/ { return 301 https://crexpressinc.com/services/over-the-road/; }
location = /trucking { return 301 https://crexpressinc.com/services/over-the-road/; }
location = /freight/ { return 301 https://crexpressinc.com/services/over-the-road/; }
location = /shipping/ { return 301 https://crexpressinc.com/services/over-the-road/; }
location = /logistics/ { return 301 https://crexpressinc.com/; }
location = /quote/ { return 301 https://crexpressinc.com/request-a-quote/; }
location = /contact/ { return 301 https://crexpressinc.com/contact-us-page/; }
```

---

## OPTION 3: WordPress functions.php
*Add to theme's functions.php or custom plugin*

```php
<?php
/**
 * CR Express SEO Migration 301 Redirects
 * CRITICAL: Service pages moving to /services/ subdirectory
 * Add to functions.php or create as a custom plugin
 */

function cr_express_seo_redirects() {
    // Get the current request URI
    $request_uri = $_SERVER['REQUEST_URI'];
    $request_uri = rtrim($request_uri, '/');

    // Define redirect mappings
    $redirects = array(
        // CRITICAL SERVICE PAGE REDIRECTS
        '/warehousing' => '/services/warehousing/',
        '/air-cargo' => '/services/air-cargo/',
        '/drayage' => '/services/drayage/',
        '/over-the-road' => '/services/over-the-road/',
        '/local-pd' => '/services/local-pd/',

        // SEO-FRIENDLY VANITY REDIRECTS
        '/bonded-warehouse' => '/services/warehousing/',
        '/trucking' => '/services/over-the-road/',
        '/freight' => '/services/over-the-road/',
        '/shipping' => '/services/over-the-road/',
        '/logistics' => '/',
        '/quote' => '/request-a-quote/',
        '/contact' => '/contact-us-page/',
    );

    // Check if current URI needs redirect
    if (isset($redirects[$request_uri])) {
        wp_redirect(home_url($redirects[$request_uri]), 301);
        exit();
    }
}

// Hook into WordPress init
add_action('init', 'cr_express_seo_redirects');
```

---

## OPTION 4: Redirection Plugin Format (WordPress)
*For use with Redirection or similar WordPress plugins*

```csv
Source URL,Target URL,HTTP Code,Title,Priority
/warehousing/,/services/warehousing/,301,Warehousing Service Redirect,CRITICAL
/air-cargo/,/services/air-cargo/,301,Air Cargo Service Redirect,CRITICAL
/drayage/,/services/drayage/,301,Drayage Service Redirect,CRITICAL
/over-the-road/,/services/over-the-road/,301,OTR Service Redirect,CRITICAL
/local-pd/,/services/local-pd/,301,Local PD Service Redirect,CRITICAL
/bonded-warehouse/,/services/warehousing/,301,Bonded Warehouse Vanity,HIGH
/trucking/,/services/over-the-road/,301,Trucking Vanity,MEDIUM
/freight/,/services/over-the-road/,301,Freight Vanity,MEDIUM
/shipping/,/services/over-the-road/,301,Shipping Vanity,MEDIUM
/logistics/,/,301,Logistics Vanity,MEDIUM
/quote/,/request-a-quote/,301,Quote Vanity,LOW
/contact/,/contact-us-page/,301,Contact Vanity,LOW
```

---

## 🚨 TESTING CHECKLIST - CRITICAL

### Pre-Launch Testing (MANDATORY)
- [ ] **Test ALL 5 service page redirects** in staging
- [ ] Verify redirects work with AND without trailing slashes
- [ ] Check no redirect chains exist (must be single hop)
- [ ] Test redirects preserve HTTPS
- [ ] Verify new `/services/` pages are live before redirects

### Service Page Redirect Testing
```bash
# Test each service redirect with curl
curl -I https://staging.crexpressinc.com/warehousing/
curl -I https://staging.crexpressinc.com/air-cargo/
curl -I https://staging.crexpressinc.com/drayage/
curl -I https://staging.crexpressinc.com/over-the-road/
curl -I https://staging.crexpressinc.com/local-pd/

# Should return: HTTP/1.1 301 Moved Permanently
# Location header should show /services/[service-name]/
```

### Post-Launch Monitoring (First 48 Hours)
- [ ] Monitor 404 errors every hour
- [ ] Check Google Search Console for crawl errors
- [ ] Verify organic traffic to service pages
- [ ] Monitor server logs for redirect loops
- [ ] Set up alerts for traffic drops >10%

---

## ⚠️ IMPLEMENTATION WARNINGS

### CRITICAL CHECKS BEFORE GOING LIVE:

1. **Verify New Pages Exist**
   - `/services/warehousing/` must be live
   - `/services/air-cargo/` must be live
   - `/services/drayage/` must be live
   - `/services/over-the-road/` must be live
   - `/services/local-pd/` must be live

2. **Check for Redirect Conflicts**
   - Ensure no existing redirects conflict
   - Clear any caching plugins/CDN
   - Test in incognito/private browsing

3. **Preserve SEO Elements**
   - New service pages MUST have same/better metadata
   - Internal links must be updated to new URLs
   - XML sitemap must reflect new structure

---

## 📊 IMPACT ASSESSMENT

### High-Risk Pages (Most Traffic/Rankings):
1. **Warehousing** - Primary service, bonded warehouse searches
2. **Drayage** - Major service line, intermodal searches
3. **Air Cargo** - O'Hare/airport related searches
4. **Over the Road** - Trucking/freight searches
5. **Local P&D** - Local delivery searches

### SEO Risk Mitigation:
- Implement redirects IMMEDIATELY when new pages go live
- Submit updated sitemap to Google same day
- Monitor Search Console daily for first week
- Keep redirects in place minimum 12 months

---

## QUICK IMPLEMENTATION - COPY & PASTE

### For Apache .htaccess (Most Common):
```apache
# Add these 5 critical lines immediately
RedirectPermanent /warehousing/ https://crexpressinc.com/services/warehousing/
RedirectPermanent /air-cargo/ https://crexpressinc.com/services/air-cargo/
RedirectPermanent /drayage/ https://crexpressinc.com/services/drayage/
RedirectPermanent /over-the-road/ https://crexpressinc.com/services/over-the-road/
RedirectPermanent /local-pd/ https://crexpressinc.com/services/local-pd/
```

---

*Configuration Generated: October 2025*
***CRITICAL: 5 Service Page Redirects Required***
*Testing Required: YES - MANDATORY*
*Risk Level: HIGH if not implemented correctly*
*Keep Redirects: Minimum 12 months*