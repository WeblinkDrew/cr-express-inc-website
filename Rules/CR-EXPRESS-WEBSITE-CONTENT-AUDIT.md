# CR Express Website Content Audit

## 📋 HOW TO USE THIS DOCUMENTATION

**Purpose:** This document provides a complete, accurate audit of the CR Express website for content migration and copywriting purposes.

**For Copywriters & Developers:**
- Each page section lists **exact template structures** and **content patterns**
- **ACF Field Names** are documented precisely as they exist in the codebase (including typos)
- **Hardcoded content** is clearly marked vs. dynamic field content
- **Schema markup** details show what's embedded in templates
- **Technical notes** explain functionality and dependencies

**Key Information:**
- ✅ All content is managed via Advanced Custom Fields (ACF)
- ✅ Field names documented with [Note: typo] where applicable for accuracy
- ✅ Hardcoded text marked with (hardcoded) notation
- ✅ Dynamic content marked with "Dynamic field (field_name)"
- ✅ Repeater fields clearly identified
- ✅ Conditional content sections noted
- ✅ FAQ sections fully detailed per page

**Important Notes:**
- Phone numbers: +1 (224) 402-9537 (primary in content) and (847) 354-7979 (in schemas)
- Address: 2400 Arthur Ave, Elk Grove Village, IL 60007
- MC Number: MC-721384
- DOT Number: 1717205
- Founded: 1999
- Employees: 100+

## Website Overview

CR Express Inc. is a comprehensive logistics and transportation company founded in 1999 by truck drivers. The website serves as a B2B platform showcasing their full-service logistics capabilities including bonded warehouse services, intermodal drayage, air cargo operations, and over-the-road freight transportation. The site features programmatic SEO pages targeting 26 Chicago-area cities for bonded warehouse services, with dynamic economic data integration.

## 🎯 QUICK REFERENCE: PAGE FAQ BREAKDOWN

**Pages WITH FAQs:**
1. **Homepage (/)** - 11 general logistics FAQs
2. **Services Page (/services/)** - THREE separate FAQ sections:
   - Bonded Warehouse FAQ (6 questions)
   - Drayage Services FAQ (6 questions)
   - Air Cargo Services FAQ (6 questions)
3. **Bonded Warehouse City Pages** (26 pages) - 6 city-specific FAQs each

**Pages WITHOUT FAQs:**
- About Page
- Contact Page
- Careers Page
- Blog Page
- Individual Service Pages (these show content from /services/ with conditional logic)

**FAQ Implementation:**
- All FAQs include full FAQPage schema markup
- Homepage FAQs via template part: `template-parts/faq-section.php`
- Services page FAQs inline in `services.php` with conditional display
- City page FAQs inline in `page-bonded-warehouse-city.php` with dynamic variables

## Complete Sitemap

### Primary Pages
- **Home** (/)
- **Services** (/services/)
  - Warehousing (/warehousing/)
  - Air Cargo (/air-cargo/)
  - Drayage (/drayage/)
  - Over the Road (/over-the-road/)
  - Local Pickup & Delivery (/local-pd/)
- **About** (/about/)
- **Blog** (/blog/)
  - Individual Blog Posts
- **Careers** (/careers/)
- **Contact** (/contact-us-page/)

### Programmatic SEO Pages (26 Cities)
- /bonded-warehouse-chicago-illinois/
- /bonded-warehouse-schaumburg-illinois/
- /bonded-warehouse-arlington-heights-illinois/
- /bonded-warehouse-palatine-illinois/
- /bonded-warehouse-des-plaines-illinois/
- /bonded-warehouse-mount-prospect-illinois/
- /bonded-warehouse-hoffman-estates-illinois/
- /bonded-warehouse-rosemont-illinois/
- /bonded-warehouse-wood-dale-illinois/
- /bonded-warehouse-bensenville-illinois/
- /bonded-warehouse-addison-illinois/
- /bonded-warehouse-roselle-illinois/
- /bonded-warehouse-carol-stream-illinois/
- /bonded-warehouse-bloomingdale-illinois/
- /bonded-warehouse-glendale-heights-illinois/
- /bonded-warehouse-villa-park-illinois/
- /bonded-warehouse-wheeling-illinois/
- /bonded-warehouse-buffalo-grove-illinois/
- /bonded-warehouse-northbrook-illinois/
- /bonded-warehouse-park-ridge-illinois/
- /bonded-warehouse-niles-illinois/
- /bonded-warehouse-franklin-park-illinois/
- /bonded-warehouse-bartlett-illinois/
- /bonded-warehouse-hanover-park-illinois/
- /bonded-warehouse-streamwood-illinois/
- /bonded-warehouse-rolling-meadows-illinois/

### Utility Pages
- Search Results (/search/)
- 404 Error Page
- Archive Pages

---

## Page-by-Page Content Documentation

### Homepage (/)

**Metadata:**
- Title: CR Express Inc - Professional Logistics Services
- Meta Description: Leading logistics and transportation company providing freight, warehousing, and supply chain solutions
- URL: /
- Template: home.php

**Content Structure - 8 Main Sections:**

#### 1. Hero Section (main_header)
- **H1:** Dynamic field (header_title) - Main headline
- **H2:** Dynamic field (header_text) - Subheadline/description
- **Background Image:** Dynamic field (header_image)
- **CTAs:**
  - Primary: "Get Started" button → Links to /contact-us-page/
  - Secondary: "Call +1 (224) 402-9537" button → tel:+12244029537
- **Visual Style:** Full-width hero with centered text overlay

#### 2. Blog/News Section (home_information)
- **Section Title:** Dynamic field (blog_button_title)
- **Content:** Blog post slider showing all published posts (offset 3)
  - Each post displays: Featured image, publication date, title, arrow icon
  - Format: "F jS, Y" (e.g., "January 1st, 2024")
- **CTAs:**
  - Desktop: Dynamic button (blog_button_text) linking to (blog_button_link)
  - Mobile: "View All" button
- **Functionality:** Slick carousel implementation

#### 3. One-Stop Shop Services Grid (services_home)
- **Section Title:** Dynamic field (one-stop_shop_title)
- **Section Description:** Dynamic field (one-stop_shop_text)
- **Service Blocks:** 5 repeater fields (one-stop_shop_block_1 through block_5)
  - Each block includes:
    - Background image
    - Service title text
    - Link to service page
    - Arrow icon overlay
- **Layout:** CSS Grid with hover effects
- **Background:** Gray section (home_gray)

#### 4. Sectors We Serve (home_information)
- **Section Title:** Dynamic field (sectors_we_serve_title)
- **Section Description:** Dynamic field (sectors_we_serve_text)
- **Sector Items:** Repeater field (sectors_we_serve_list)
  - Each item: Icon image + industry name text
  - Displays horizontally in flexbox layout
- **Industries Typically Include:** Automotive, Pharmaceutical, Telecommunications, Healthcare, Retail, Manufacturing (based on template structure)

#### 5. Why Choose CR Express (why_choose_section)
- **Layout:** Two-column (text content + image)
- **H4 Section Title:** Dynamic field (why_choose_titlte) [Note: typo in field name]
- **Description:** Dynamic field (why_choose_text)
- **Benefits List:** Repeater field (why_choose_list)
  - Bulleted list of company advantages
  - Each item: Dynamic text
- **Image:** Dynamic field (why_choose_image) with alt text
- **CTA:** Dynamic button (why_choose_button_text) linking to (why_choose_button_link)
- **Background:** Gray section

#### 6. Service Plan CTA Section (servise_plan_section) [Note: typo in class name]
- **Layout:** Centered content with background image
- **H2 Title:** Dynamic field (service_plan_title)
- **Description:** Dynamic field (service_plan_text)
- **Background Image:** Dynamic field (service_plan_image)
- **CTA:** Large white button (service_plan_button_text) linking to (service_plan_button_link)
- **Style:** Full-width section with text overlay on background image

#### 7. Video Section (video_section)
- **H2 Title:** "CR Express Launches New CFS in 2023!" (hardcoded)
- **Video Source:** Dynamic field (video_link) - MP4 format
- **Video Poster:** Dynamic field (video_poster) - Preview image
- **Functionality:** Custom video player with popup modal
  - Click poster to open video
  - Close button to dismiss
  - Video controls enabled
- **Background:** Gray section
- **Video ID:** youtube_player (despite name, plays local MP4)

#### 8. FAQ Section
- **Template:** Includes 'template-parts/faq-section.php'
- **Questions:** 11 broad logistics FAQs (see FAQ Content section for full details)
- **Functionality:** Accordion-style with expand/collapse
- **Schema:** Full FAQPage schema markup included

**Technical Notes:**
- All dynamic content managed via Advanced Custom Fields (ACF)
- Blog posts pulled from WordPress posts with 'publish' status
- Offset of 3 suggests first 3 posts may display elsewhere
- Multiple sections use d-flex class for flexbox layouts
- Responsive design with mobile-specific button visibility
- All images include descriptive alt text for accessibility
- Template uses both hardcoded and dynamic H2 headings

**Critical ACF Fields Used:**
- header_title, header_text, header_image
- blog_button_title, blog_button_text, blog_button_link
- one-stop_shop_title, one-stop_shop_text, one-stop_shop_block_1-5 (repeaters)
- sectors_we_serve_title, sectors_we_serve_text, sectors_we_serve_list (repeater)
- why_choose_titlte, why_choose_text, why_choose_list (repeater), why_choose_image, why_choose_button_text, why_choose_button_link
- service_plan_title, service_plan_text, service_plan_image, service_plan_button_text, service_plan_button_link
- video_link, video_poster

---

### Services Overview (/services/)

**Metadata:**
- Title: Comprehensive Logistics Services | CR Express Inc
- Meta Description: Full-service logistics including FTL freight, LTL shipping, bonded warehouse, cross docking, container freight, and air cargo services
- URL: /services/
- Template: services.php

**Headlines:**
- H1: "Comprehensive Logistics Services"
- H2: "Full-service logistics solutions for your supply chain needs"
- H2/H3/H4: Various service section titles including warehousing, drayage, air cargo, and trucking

**Service Categories:**
1. **FTL Freight Shipping** - Full Truckload freight shipping nationwide
2. **LTL Freight Shipping** - Less Than Truckload freight shipping services
3. **Bonded Warehouse Services** - Customs bonded warehouse storage and distribution
4. **Cross Docking Services** - Cross docking and freight consolidation services
5. **Container Freight Services** - Container devanning, drayage, and freight station services
6. **Air Cargo Services** - Airport cargo pickup, delivery, and air freight services

**Enhanced Content Sections (for Warehousing page):**

#### World-Class Bonded Warehouse Facilities
- 280,000 Sq Ft scalable warehouse space
- CBW Class 3 Certified
- Strategic Location (<5 miles from O'Hare)
- Maximum Security (24/7 CCTV, secured docks)

#### Full Customs Compliance & Documentation
- Duty-Free Storage capabilities
- Complete customs documentation handling
- TSA-approved bonded transportation
- Dedicated CBP examination space
- Heavy duty equipment (up to 15,000lbs per piece)

#### Unmatched Strategic Location
- < 5 Miles from ORD
- 21 Major Railyards access
- 200+ Zip Codes coverage
- 24/7 Operations availability

#### Specialized Industry Solutions
1. **Pharmaceutical & Healthcare**
   - GDP compliant storage
   - Temperature-controlled environments
   - Cold chain validation
   - Pharmaceutical security protocols

2. **Automotive Components**
   - Just-in-time delivery
   - Hazmat certified storage
   - OEM compliance
   - Automotive parts expertise

3. **High-Value Cargo**
   - Enhanced security protocols
   - High-value carrier certification
   - Segregated storage areas
   - $300,000 Cargo Liability Insurance

#### Streamlined Bonded Operations Process
1. Cargo Receipt & Documentation
2. Inventory Management
3. Value-Added Services
4. Customs Release & Distribution

**Enhanced Content Sections (for Drayage page):**

#### Industry-Leading Equipment & Fleet
- **Privately-Owned Chassis**
  - 20ft, 40ft & 45ft capacity
  - Tri-axles for heavy containers
  - Always available fleet
  - No supply chain delays

- **7-Day Operations**
  - Monday-Sunday availability
  - Weekend pickup/drop-off
  - 24/7 dispatch support
  - Afterhours expedited services

- **500+ Container Storage**
  - Massive parking capacity
  - Strategic Chicagoland locations
  - Secure container staging
  - Flexible storage solutions

#### Strategic Railyard Network
- **North Railyard Network** - CPB direct access to Canadian markets
- **City Railyard Network** - CSX/NS/BNSF comprehensive inner-city access
- **South Railyard Network** - CN Harvey/NFS strategic southern positioning
- **Elwood/Joliet Network** - Primary intermodal hub with east-west corridor

#### Seamless Intermodal Process
1. Rail Arrival Notification
2. Rapid Container Pickup
3. Flexible Delivery Options
4. Real-Time Tracking

---

### About Page (/about/)

**Metadata:**
- Title: About CR Express Inc | Our Story & Mission
- Meta Description: Leading logistics company founded by truck drivers in 1999, providing comprehensive freight, warehousing, and supply chain solutions
- URL: /about/
- Template: about.php

**Schema Markup:**
- **Organization Schema** (hardcoded in template)
  - Name: "CR Express Inc" (alternateName: "CR Express")
  - Founded: 1999
  - Founder: Truck Drivers
  - Address: 2400 Arthur Ave, Elk Grove Village, IL 60007
  - Phone: +1-224-402-9537
  - Employees: 100+
  - Area Served: United States
  - Social: LinkedIn, Facebook
  - Expertise: Logistics, Freight Transportation, Warehousing, Supply Chain Management, Bonded Warehouse, Cross Docking, Container Freight

**Content Structure - 9 Main Sections:**

#### 1. Hero Section (main_header)
- **H1:** Dynamic field (header_title)
- **Background Image:** Dynamic field (header_image)
- **Layout:** Full-width hero with centered text, no subheadline

#### 2. Company Overview (section_about)
- **H2 Title:** Dynamic field (section_abaut_information_title) [Note: typo in field name]
- **Description Text:** Dynamic field (section_abaut_information_description)
- **Benefits/Features List:** Repeater field (section_abaut_information_list)
  - Bulleted list items
  - Each item: Dynamic text
- **Layout:** Two-column (text description on left, bulleted list on right)

#### 3. Image Gallery (section_images)
- **Five Images:** Dynamic fields (section_images_image_1 through image_5)
- **Alt Text Examples:**
  - "CR Express logistics warehouse facility"
  - "CR Express truck fleet operations"
  - "CR Express team at work"
  - "CR Express logistics operations center"
  - "CR Express freight handling equipment"
- **Layout:** Horizontal gallery, flexbox display
- **Purpose:** Visual showcase of facilities, operations, and team

#### 4. Our Vision (our_vision)
- **H2 Title:** Dynamic field (section_our_vision_title)
- **Description Text:** Dynamic field (section_our_vision_text)
- **Image:** Dynamic field (section_our_vision_image) with alt text
- **Layout:** Two-column (text on left, image on right)
- **Background:** Black section (section_black)

#### 5. Our Mission (our_mission)
- **H2 Title:** Dynamic field (section_our_mission_title)
- **Description Text:** Dynamic field (section_our_mission_text)
- **Image:** Dynamic field (section_our_mission_image) with alt text
- **Layout:** Two-column reversed (image on left, text on right)
- **Background:** White/default section

#### 6. Meet Our Team (section_black)
- **H2 Title:** Dynamic field (section_team_titlte) [Note: typo in field name]
- **Introduction Text:** Dynamic field (section_team_text)
- **Team Members:** Repeater field (section_team_team)
  - Each member includes:
    - Photo (section_team_image)
    - Name (section_team_name)
    - Role/Title (section_team_role)
    - Bio text (section_team_text_about_person)
- **Functionality:**
  - Popup modal for team member details (team-popup)
  - Click team member to view full bio
  - Close button to dismiss
- **CTA Button:** Dynamic (section_team_button_text) linking to (section_team_button_link)
- **Layout:** Team grid display with centered text
- **Background:** Black section

#### 7. Our Founder's Story
- **H2 Title:** Dynamic field (section_founder_title)
- **Description Text:** Dynamic field (section_founder_text)
- **Quote Block:**
  - Quote Text: Dynamic field (section_founder_quotes_text)
  - Attribution: Dynamic field (section_founder_quotes_founder)
  - Styled as pull quote
- **Image:** Dynamic field (section_founder_image) with alt text
- **Image Caption:** Dynamic field (section_founder_image_text)
- **Layout:** Two-column (text with quote on left, image with caption on right)
- **Background:** White/default section

#### 8. How We Do Business (section_black)
- **H2 Title:** Dynamic field (section_how_we_do_title)
- **Description Text:** Dynamic field (section_how_we_do_text)
- **Business Practices List:** Repeater field (section_how_we_do_list)
  - Bulleted list of principles/practices
  - Each item: Dynamic text
- **Image:** Dynamic field (section_how_we_do_image) with alt text
- **Layout:** Two-column reversed (image on left, text with list on right)
- **Background:** Black section

#### 9. Community & Philanthropy
- **H2 Title:** Dynamic field (section_philanthropy_title)
- **Description Text:** Dynamic field (section_philanthropy_text)
- **Image:** Dynamic field (section_philanthropy_image) with alt text
- **H3 Subtitle:** Dynamic field (section_philanthropy_list_title)
- **Organizations/Initiatives:** Repeater field (philanthropy_list)
  - Each item includes:
    - Organization Name (philanthropy_list_title)
    - Description (philanthropy_list_text)
  - Layout: Grid display with centered text
- **Layout:**
  - Top: Two-column (text on left, image on right)
  - Bottom: Organization grid spanning full width
- **Background:** White/default section

**Technical Notes:**
- All content managed via Advanced Custom Fields (ACF)
- Alternating black/white section backgrounds for visual rhythm
- Multiple typos in ACF field names (abaut, titlte) preserved for accuracy
- Consistent two-column layouts with reversible order
- Team popup functionality requires JavaScript
- Organization schema hardcoded in functions for SEO
- All images include descriptive, SEO-friendly alt text
- No FAQ section on About page

**Critical ACF Fields Used:**
- header_title, header_image
- section_abaut_information_title, section_abaut_information_description, section_abaut_information_list (repeater)
- section_images_image_1 through image_5
- section_our_vision_title, section_our_vision_text, section_our_vision_image
- section_our_mission_title, section_our_mission_text, section_our_mission_image
- section_team_titlte, section_team_text, section_team_team (repeater), section_team_button_text, section_team_button_link
- section_founder_title, section_founder_text, section_founder_quotes_text, section_founder_quotes_founder, section_founder_image, section_founder_image_text
- section_how_we_do_title, section_how_we_do_text, section_how_we_do_list (repeater), section_how_we_do_image
- section_philanthropy_title, section_philanthropy_text, section_philanthropy_image, section_philanthropy_list_title, philanthropy_list (repeater)

---

### Contact Page (/contact-us-page/)

**Metadata:**
- Title: Contact CR Express Inc | Get a Quote | (847) 354-7979 (dynamic: contact_title or fallback)
- Meta Description: Contact CR Express Inc for logistics quotes and freight services. Located in Elk Grove Village, IL near O'Hare Airport. Call (847) 354-7979 or schedule a consultation. (dynamic: contact_description or fallback)
- Keywords: contact CR Express, logistics quote, freight shipping quote, contact logistics company, CR Express phone number, Elk Grove Village logistics
- URL: /contact-us-page/
- Template: contact-us-page.php

**Schema Markup:**
- **ContactPage Schema** (hardcoded in template)
  - Organization: CR Express Inc
  - Contact Point:
    - Phone: +1-847-354-7979
    - Contact Type: customer service
    - Area Served: US
    - Language: English
  - Address: 2400 Arthur Ave, Elk Grove Village, IL 60007
  - Social: LinkedIn company page

**Content Structure - Single Section:**

#### Contact Section (contact_page)
- **Background Image:** Dynamic field (contact_background_image)
- **Layout:** Two-column split (50/50)

**Left Column - Contact Information:**
- **H1 Title:** Dynamic field (contact_title)
- **Description Text:** Dynamic field (contact_description)
- **Contact Information List:** Repeater field (contact_list)
  - Each item includes:
    - Icon image (contact_list_icon)
    - Contact detail text (contact_list_text)
  - Typical items: Phone, email, address
  - Each item displayed with icon + text in flexbox
- **CTA Button:** "Set up a call with us" (hardcoded text)
  - Links to Outlook booking system: https://outlook.office.com/bookwithme/user/[user_id]
  - Opens in new tab (target="_blank")
  - Button style: black_medium_button

**Right Column - Contact Form:**
- **Form:** Dynamic shortcode field (form_shortcode)
- **Purpose:** Quote requests and general inquiries
- **Integration:** Uses WordPress shortcode system (likely Contact Form 7 or similar)

**Technical Notes:**
- Single section layout, no FAQ
- Background image spans full section
- Meta tags with fallbacks if ACF fields empty
- Open Graph and Twitter Card meta tags included
- ContactPage schema for enhanced search presence
- Form submission handled by external form plugin
- Outlook booking integration for appointments
- Phone number in schema: +1-847-354-7979
- Alternative phone mentioned elsewhere: +1 (224) 402-9537

**Critical ACF Fields Used:**
- contact_title (with fallback)
- contact_description (with fallback)
- contact_background_image (with fallback to OG image)
- contact_list (repeater: contact_list_icon, contact_list_text)
- form_shortcode

---

### Careers Page (/careers/)

**Metadata:**
- Title: Careers at CR Express | Join Our Team
- Meta Description: Join the CR Express team. We're hiring warehouse workers, drivers, and logistics professionals.
- URL: /careers/
- Template: careers.php

**Content Structure - 3 Main Sections:**

#### 1. Hero Section (main_header)
- **H1:** Dynamic field (header_title)
- **H2:** Dynamic field (header_text)
- **Background Image:** Dynamic field (header_image)
- **Tab Navigation:** Two large white buttons
  - Tab 1: "Work for CR Express" (links to #test1)
  - Tab 2: "Drive for CR Express" (links to #test2)
- **Layout:** Full-width hero with centered text and tab buttons
- **Class:** white_large_button home_header_button tab

#### 2. General Employment Form Section (careers_section #test1)
- **ID:** test1
- **Form:** Dynamic shortcode field (work_for_cr_express_form_shortcode)
- **Purpose:** General employment applications
- **Target:** Warehouse workers, office staff, logistics professionals
- **Functionality:** Tab content, initially visible or hidden based on tab selection
- **Container:** Standard container width

#### 3. Driver Application Form Section (careers_section #test2)
- **ID:** test2
- **Class:** careers_section careers_section_drive tab_item
- **Form:** Dynamic shortcode field (drive_for_cr_express_form_shortcode)
- **Purpose:** CDL driver-specific applications
- **Target:** Truck drivers, drayage operators
- **Functionality:** Tab content, toggles with Work tab
- **Container:** Standard container width

**Technical Notes:**
- Tab-based UI using anchor links and IDs
- JavaScript handles tab switching functionality
- Both forms use WordPress shortcode system
- No FAQ section on Careers page
- Simple, focused page with minimal content outside forms
- Two separate forms allow for different application requirements
- Forms likely collect different data based on position type

**Critical ACF Fields Used:**
- header_title
- header_text
- header_image
- work_for_cr_express_form_shortcode
- drive_for_cr_express_form_shortcode

---

### Blog Page (/blog/)

**Metadata:**
- Title: Blog | CR Express News & Updates
- Meta Description: Latest news, industry insights, and company updates from CR Express Inc
- URL: /blog/
- Template: blog.php

**Content Structure - 3 Main Sections:**

#### 1. Hero Section (main_header)
- **H1:** Dynamic field (header_title)
- **H2:** Dynamic field (header_description) [Note: different from header_text]
- **Background Image:** Dynamic field (header_image)
- **Layout:** Full-width hero with centered text, no CTAs

#### 2. Latest News Section (blog_container)
- **H2 Title:** "Latest News" (hardcoded)
- **Post Display:** Grid layout (blog_posts)
- **Post Count:** 3 most recent published posts
- **Post Query:** wp_get_recent_posts()
  - Number: 3 posts
  - Status: publish
  - Order: Most recent first
- **Each Post Card Includes:**
  - Featured image (clickable)
  - Arrow icon overlay on image
  - Publication date (format: "F jS, Y" - e.g., "January 1st, 2024")
  - Post title
  - Link to full post
- **Layout:** Static grid (not slider)
- **Background:** White/default

#### 3. Other News Section (blog_container_gray)
- **H2 Title:** "Other News" (hardcoded)
- **Post Display:** Slider carousel (blog_slider)
- **Post Count:** All remaining published posts
- **Post Query:** get_posts()
  - Number: -1 (all posts)
  - Status: publish
  - Offset: 3 (skip first 3 posts shown in Latest News)
- **Each Slide Includes:**
  - Featured image (clickable)
  - Arrow icon overlay on image
  - Publication date (format: "F jS, Y")
  - Post title
  - Link to full post
- **Functionality:** Slick carousel for horizontal scrolling
- **Background:** Gray section (blog_container_gray)
- **Conditional:** Only displays if posts exist beyond first 3

**Technical Notes:**
- No FAQ section on Blog page
- Uses standard WordPress post loop
- Two different post queries:
  - wp_get_recent_posts() for featured section
  - get_posts() for archive slider
- Date format consistent across both sections
- All posts require featured images for proper display
- Ukrainian comments in code: "Кількість останніх постів" (Number of latest posts)
- setup_postdata() used in slider section for proper loop
- wp_reset_postdata() called after slider to reset global post object
- Arrow icon: /assets/images/home/right-arrows.png
- Slider uses Slick carousel library (likely)
- Post images use alt text from post title

**Critical ACF Fields Used:**
- header_title
- header_description
- header_image

**WordPress Post Data Used:**
- Post ID
- Post title
- Post permalink
- Featured image URL
- Publication date
- Post status

**Post Requirements:**
- Must have 'publish' status
- Should have featured image
- Title used for image alt text and card display
- Permalink auto-generated by WordPress

---

### Bonded Warehouse City Pages (Programmatic)

**Template Pattern for All 26 Cities:**

**Metadata:**
- Title: Bonded Warehouse [City Name] IL | CBW Class 3
- Meta Description: Professional bonded warehouse services in [City Name], IL. CBW Class 3 certified, customs compliance, duty-free storage. [X] miles from facility. Get quote today.
- URL: /bonded-warehouse-[city-slug]-illinois/

**Hero Section:**
- H1: Your #1 Bonded Warehouse Solution in [City Name]
- Description: Professional customs bonded warehouse solutions just 8 minutes from ORD Airport...
- CTAs: "Get Started" and "Call +1 (224) 402-9537"
- Stats Bar: CBW Class 3 Certified | 26+ Years Experience | 8 Minutes from ORD Airport

**Content Sections:**

1. **Why [City] Businesses Trust CR Express**
   - CBW Class 3 Certification details
   - Strategic location benefits
   - Container transloading capabilities
   - 7-day operations

2. **Strategic Location Section**
   - Distance to ORD Airport (4 miles, 8 minutes)
   - Distance to RFD Airport (55 miles, 65 minutes)
   - Rail access points:
     - BNSF Elwood/Joliet (35 miles, 45 minutes)
     - CN Harvey Rails (28 miles, 35 minutes)
     - NS Chicago Rails (22 miles, 30 minutes)
     - CP North Rails (8 miles, 12 minutes)

3. **Economic Data Section** (Dynamic)
   - Import Volume Growth
   - Manufacturing Employment
   - Warehouse Demand Index
   - Air Cargo Volume
   - Container Traffic trends
   - Current duty rates by category
   - Seasonal patterns

**Dynamic Fields per City:**
- city_name
- city_state (IL)
- distance_from_elk_grove
- driving_time_minutes
- city_population
- major_industries
- city_description
- zip_codes

---

## Services Summary

### Core Service Offerings

#### 1. Bonded Warehouse Services
- **Facility:** 280,000 sq ft CBW Class 3 certified
- **Location:** Elk Grove Village, IL (< 5 miles from O'Hare)
- **Capabilities:**
  - Duty-free storage (up to 5 years)
  - Customs documentation management
  - Container devanning and transloading
  - Heavy equipment handling (up to 15,000 lbs)
  - Temperature-controlled storage
  - GDP compliant for pharmaceuticals
  - 24/7 security with CCTV
  - Value-added services (sorting, repackaging, palletizing)

#### 2. Intermodal Drayage Services
- **Coverage:** 21 major railyards across Chicagoland
- **Equipment:** Privately-owned chassis fleet (20', 40', 45' + tri-axles)
- **Operations:** 7 days/week including weekends
- **Capacity:** 500+ container storage spots
- **Services:**
  - Same-day/next-day container pickup
  - Railyard to warehouse drayage
  - Container staging and storage
  - Real-time GPS tracking
  - TSA-approved bonded drivers

#### 3. Air Cargo Services
- **Airports:** ORD and RFD
- **Certifications:** TSA-approved, SIDA-badged drivers
- **Services:**
  - Air import/export handling
  - Plane-side pickups
  - CFS operations
  - ULD handling
  - Screened cargo deliveries
  - Same-day recovery
  - Export documentation

#### 4. Over-the-Road (OTR) Trucking
- **Coverage:** All 48 U.S. states
- **Fleet:** Top 1-2% U.S. carrier
- **Equipment:** Dry van, reefer, flatbed, specialized
- **Services:**
  - Full Truckload (FTL)
  - Less Than Truckload (LTL)
  - Dedicated trucking
  - Expedited freight
  - Real-time GPS tracking

#### 5. Local Pickup & Delivery
- **Coverage:** 200+ Chicago-area zip codes
- **Services:**
  - Same-day delivery
  - Next-day delivery
  - Last-mile logistics
  - Route optimization
  - White glove service

#### 6. Cross Docking Services
- **Facility:** 280,000 sq ft with multiple dock doors
- **Capabilities:**
  - LTL consolidation
  - Freight sorting
  - Same-day cross dock
  - E-commerce fulfillment support
  - Retail distribution

---

## Key Business Information

### Company Credentials
- **Legal Name:** CR Express Inc.
- **Founded:** 1999
- **Years in Business:** 26+ years
- **MC Number:** MC-721384
- **DOT Number:** 1717205
- **Fleet Size:** Top 1-2% of U.S. carriers

### Certifications & Compliance
- **CBW Class 3:** Customs Bonded Warehouse certified
- **TSA Approved:** For air cargo operations
- **GDP Compliant:** Good Distribution Practice for pharmaceuticals
- **SmartWay Partner:** EPA environmental excellence
- **Hazmat Certified:** For dangerous goods handling
- **High-Value Carrier:** Certified for valuable cargo
- **Insurance:** $300,000 Cargo Liability Coverage

### Facility Information
- **Size:** 280,000 square feet
- **Location:** 2400 Arthur Ave, Elk Grove Village, IL 60007
- **Features:**
  - 24/7 CCTV monitoring
  - Secured dock doors
  - Motion-activated lighting
  - Climate-controlled areas
  - High-value storage zones
  - CBP examination space
  - Heavy-duty forklifts (15,000 lb capacity)

### Geographic Coverage
- **Local:** 200+ Chicago-area zip codes
- **Regional:** Illinois and surrounding Midwest states
- **National:** All 48 continental U.S. states
- **Airports:** ORD (O'Hare) and RFD (Rockford)
- **Rail Access:** 21 major Chicagoland railyards

### Industries Served
1. **Automotive**
   - Parts distribution
   - JIT delivery
   - OEM compliance

2. **Pharmaceutical & Healthcare**
   - GDP compliant storage
   - Cold chain logistics
   - Medical device distribution

3. **Telecommunications**
   - High-value electronics
   - Secure transportation
   - Technical equipment

4. **Retail & E-commerce**
   - Cross docking
   - Last-mile delivery
   - Inventory management

5. **Manufacturing**
   - Raw materials
   - Industrial components
   - Supply chain management

### Contact Information
- **Main Phone:** (847) 354-7979
- **Alternative:** +1 (224) 402-9537
- **Address:** 2400 Arthur Ave, Elk Grove Village, IL 60007
- **Website:** crexpressinc.com
- **Call Scheduling:** Via Outlook booking system

---

## Navigation Structures

### Header Navigation (New Header Menu)
- Home
- Services
  - Warehousing
  - Air Cargo
  - Drayage
  - Over the Road
  - Local P&D
- About
- Blog
- Careers
- Contact

### Mobile Navigation
- Same as header with additional:
  - Contact Link button
  - Track Shipment button

### Footer Navigation (New Footer Menu)
- Similar structure to header
- Additional elements:
  - Logo with link
  - MC and DOT numbers display
  - Service area city links (8 cities)
  - Copyright notice

### Service Area Footer Links
Eight featured cities:
1. Chicago
2. Schaumburg
3. Arlington Heights
4. Palatine
5. Des Plaines
6. Mount Prospect
7. Hoffman Estates
8. Buffalo Grove

### Mobile Widget Panel
Floating quick-action buttons:
- Track Shipment
- Get Quote
- Fuel Surcharge Display

---

## Content Patterns & Recurring Elements

### Schema Markup Implementation
- **LocalBusiness:** Header and city pages
- **Organization:** About page
- **Service:** Services page
- **Article:** Blog posts
- **ContactPage:** Contact page
- **FAQPage:** FAQ sections
- **BreadcrumbList:** Blog and city pages

### FAQ Content - Page-Specific Sections

Each page has its own targeted FAQ section with unique questions and answers. FAQs include full schema markup for SEO.

#### Homepage FAQ Section
**Template:** `template-parts/faq-section.php`
**Number of Questions:** 11

1. **What bonded warehouse services does CR Express provide?**
   - CBW Class 3 facility in Elk Grove Village, IL
   - Duty-free storage, customs clearance warehousing, bonded distribution
   - Located less than 5 miles from O'Hare Airport
   - Secure bonded storage solutions with full customs oversight

2. **How long can cargo sit in a Class III Bonded Warehouse before being Customs Cleared?**
   - Up to 5 years without paying duties
   - Unlike 15-day rule for CFS cargo
   - Significantly more flexibility for international shipments

3. **What cross docking services are available near Chicago?**
   - Comprehensive freight consolidation and distribution services
   - Access to 21 major railyards across Chicagoland and ORD airport
   - Container devanning, LTL consolidation, same-day cross docking
   - 280,000 sq ft facility with 7-days-per-week operations

4. **Do you provide FTL and LTL freight shipping nationwide?**
   - Both Full Truckload (FTL) and Less Than Truckload (LTL) to all 48 states
   - Asset-based fleet: dry van, reefer, flatbed, specialized equipment
   - Top 1-2% U.S. fleet with dedicated trucking and expedited freight
   - Real-time GPS tracking for complete shipment visibility

5. **What air cargo services do you offer at O'Hare Airport?**
   - Comprehensive air import/export at ORD and RFD airports
   - TSA-approved, bonded drivers with SIDA badges
   - Screened cargo deliveries, plane-side pickups, CFS operations
   - Same-day air cargo recovery and specialized ULD handling

6. **What container freight services are available in Chicago?**
   - Container devanning, transloading, drayage, intermodal transportation
   - Handle 20ft, 40ft, 45ft containers with privately-owned chassis
   - Access to 21 major railyards across Chicagoland
   - Storage for 500+ containers, serving 300+ cities nationwide

7. **How do your logistics solutions support supply chain management?**
   - Integrated supply chain solutions: warehousing, distribution, freight management
   - Technology platforms with real-time visibility and automated reporting
   - Seamless coordination between air, intermodal, and OTR transportation
   - Serve automotive, pharmaceutical, healthcare, telecommunications, retail

8. **What makes your Chicago logistics location strategically advantageous?**
   - Elk Grove Village HQ less than 5 miles from O'Hare Airport (ORD)
   - Access to 21 major railyards across Chicagoland
   - Minimal transit times, same-day deliveries within 200+ zip codes
   - Seamless intermodal connections to nation's transportation network

9. **Are you GDP compliant for pharmaceutical and healthcare logistics?**
   - Yes, GDP (Good Distribution Practice) compliant
   - Temperature-controlled storage with validated cold chain logistics
   - Pharmaceutical freight services and medical device distribution
   - Full regulatory compliance and specialized handling protocols

10. **What specialized freight services do you offer for automotive logistics?**
    - Automotive parts shipping and just-in-time delivery
    - Flatbed trucking for larger components
    - Expedited services for critical parts
    - Dedicated automotive supply chain solutions for major manufacturers

11. **How long has CR Express been providing logistics services?**
    - Trusted logistics partner since 1999 (26 years)
    - Founded by truck drivers with commitment to personalized service
    - Grown to top 1-2% U.S. fleet
    - SmartWay partner focused on sustainability

#### Services Page (/services/) - Three Separate FAQ Sections

**SECTION 1: Bonded Warehouse FAQ**
**Number of Questions:** 6

1. **What is CBW Class 3 certification and why is it important?**
   - Customs Bonded Warehouse certification for duty-free storage and sorting
   - 280,000 sq ft facility with strict CBP compliance
   - Store imported goods without paying duties until ready for distribution

2. **How large is your bonded warehouse facility?**
   - 280,000 square feet of scalable warehouse space
   - Flexible storage: containers, palletized goods, high-value inventory
   - Specialized storage areas, 24/7 CCTV, climate-controlled environments

3. **What security measures are in place at your bonded warehouse?**
   - Maximum security with 24/7 CCTV monitoring
   - Secured dock doors and high-value storage areas
   - Motion-activated lighting throughout
   - Enhanced security protocols for electronics and luxury items

4. **Which industries do you serve with bonded warehouse services?**
   - Pharmaceutical & healthcare with GDP compliant storage
   - Automotive components with just-in-time delivery
   - High-value cargo with enhanced security measures
   - Various industries requiring specialized bonded storage and compliance

5. **What value-added services do you provide in the bonded warehouse?**
   - Container devanning, palletizing, sorting, repackaging
   - Heavy duty equipment handling (up to 15,000lbs per piece)
   - Customs examinations support
   - Complete customs documentation (entry forms, withdrawal documentation)

6. **How close is your bonded warehouse to major transportation hubs?**
   - Elk Grove Village facility less than 5 miles from O'Hare Airport (ORD)
   - Access to 21 major railyards across Chicagoland
   - Unparalleled access to America's transportation network
   - Same-day and next-day delivery to 200+ zip codes

**SECTION 2: Drayage Services FAQ**
**Number of Questions:** 6

1. **Do you have your own chassis fleet for container drayage?**
   - Yes, privately-owned chassis fleet prevents supply shortages
   - 20ft, 40ft & 45ft capacity chassis
   - Tri-axles for heavy containers
   - Available 24/7 with no supply chain delays

2. **How many railyards do you serve in the Chicago area?**
   - Access to 21 major railyards across Chicagoland
   - North Railyard Network (CPB)
   - City Railyard Network (CSX/NS/BNSF)
   - South Railyard Network (CN Harvey/NFS Calumet)
   - Elwood/Joliet Network (LPC/G4/CN Joliet)

3. **What are your operating hours for drayage services?**
   - 7-day operations with round-the-clock railyard pickup
   - Monday through Sunday availability
   - Weekend pickup/drop-off services
   - 24/7 dispatch support and afterhours expedited pickups/deliveries

4. **How much container storage capacity do you have?**
   - Massive container parking capacity: 500+ container storage spots
   - Strategic locations throughout Chicagoland area
   - Secure container staging and flexible storage solutions

5. **How quickly can you pick up containers from railyards?**
   - Automated notifications when containers arrive at railyard
   - Immediate pickup scheduling
   - Same-day or next-day container retrieval with dedicated chassis
   - Complete GPS tracking visibility throughout drayage process

6. **What cities do you serve with drayage services?**
   - 300+ cities with comprehensive Midwest coverage
   - 21 major railyards across Chicagoland
   - Maximum intermodal connectivity
   - 24/7 availability for time-sensitive container movements

**SECTION 3: Air Cargo Services FAQ**
**Number of Questions:** 6

1. **Do you have SIDA clearance for O'Hare Airport operations?**
   - Yes, both SIDA-approved and SIDA-badged drivers
   - SIDA-approved: screened cargo deliveries and pickups
   - SIDA-badged: plane/ramp-side deliveries and recoveries
   - Bonded drivers with full security clearance as designated agents
   - Direct aircraft access for time-critical shipments

2. **How close is your facility to O'Hare Airport?**
   - Less than 5 miles from O'Hare Airport (ORD)
   - Minimal transit times
   - Fastest cargo processing and delivery speeds in region
   - Also serve RFD airport with comprehensive air import/export

3. **What airlines do you partner with for sweep services?**
   - United Airlines (016): Monday-Friday 9:00 & 18:00
   - Lufthansa (020, 724, 105): Daily 5:00
   - Air France (074, 057): Daily 5:00
   - Delta Air Lines (006, 074, 057): Daily 4:00-6:00
   - Established relationships for reliable service and optimal schedules

4. **Can you handle specialized air cargo equipment like ULDs?**
   - Yes, specialized equipment for ULD (Unit Load Device) transfers
   - Plane-side loading/unloading capabilities
   - Cargo handling expertise for air freight containers
   - CFS recovery and breakdown capabilities
   - 1F and 1D transfer processing

5. **What air cargo documentation services do you provide?**
   - Complete in-house export documentation printing
   - Permit to transfer (PTT) creation for streamlined customs
   - 1F and 1D transfer handling
   - Customs paperwork processing

6. **What is your delivery coverage area for air cargo?**
   - 200+ zip codes within 60 miles radius of O'Hare
   - Same-day and next-day delivery
   - Integrated dispatch teams with real-time proof of delivery
   - Time stamps, consolidation & cross-docking
   - Smaller vehicle options and cost optimization

#### Bonded Warehouse City Pages FAQ Section
**Template:** Inline in `page-bonded-warehouse-city.php`
**Number of Questions:** 6 (dynamically personalized per city)

1. **How much money can [City Name] businesses save with bonded warehouse storage?**
   - Businesses typically save 15-30% on total import costs
   - Defer duty payments until goods withdrawn from CBW Class 3 facility
   - High-volume importers can save tens of thousands in cash flow annually
   - Pay duties only when goods leave warehouse
   - Hold goods up to 5 years without duty payment
   - Value-added processing before duty assessment
   - Reduced inventory costs for seasonal/slow-moving inventory

2. **What makes CR Express different from other bonded warehouses serving [City Name]?**
   - Strategic Elk Grove Village location: 8 minutes to ORD Airport
   - Direct access to 4 major rail networks
   - 280,000 sq ft scalable storage space
   - 26+ years industry experience
   - 7 days/week operations including weekends
   - Multiple certifications: CBW Class 3, GDP, TSA, Hazmat
   - Proximity to [City Name] for faster, more efficient service

3. **What industries in [City Name] benefit most from bonded warehouse services?**
   - Perfect for high-duty industries importing goods with significant rates
   - **Automotive:** Defer duties on auto parts, engines, components with JIT inventory
   - **Pharmaceutical:** GDP-compliant storage with temperature control for medications/devices
   - **Electronics:** Anti-static environments for sensitive telecommunications/computing equipment
   - **Manufacturing:** Store raw materials and components duty-free until needed
   - **Retail/E-commerce:** Manage seasonal inventory and fast-moving consumer goods

4. **How quickly can you pick up and deliver to [City Name] locations?**
   - Same-day service available
   - Strategic location approximately [X] miles from [City Name]
   - Airport cargo pickup: 8 minutes to ORD, 65 minutes to RFD
   - Rail container pickup: 12-45 minutes to major rail yards (CP, BNSF, CN, NS)
   - [City Name] delivery: [X] minutes average transit time
   - Monday-Sunday operations for maximum flexibility
   - Expedited and emergency delivery for time-sensitive shipments

5. **What documentation and compliance requirements are handled for [City Name] importers?**
   - Full compliance management: all CBW Class 3 documentation and customs requirements
   - **Documentation Services:**
     - CBW entry and withdrawal forms
     - Customs bond management
     - Inventory reporting and tracking
     - Value-added service documentation
   - **Regulatory Compliance:**
     - CBP audits and inspections
     - GDP pharmaceutical standards
     - Hazmat handling certifications
   - Experienced compliance team ensures goods meet all requirements

6. **How do I get started with bonded warehouse services for my [City Name] business?**
   - Simple 3-step process (typically 1-2 weeks setup)
   - **Step 1: Initial consultation**
     - Call +1 (224) 402-9537 or email quotes@crexpressinc.com
     - Assess import volumes, product types, specific needs
   - **Step 2: Documentation and setup**
     - Team handles all CBW paperwork and customs documentation
     - Facility preparation and coordination with existing logistics providers
   - **Step 3: First shipment**
     - Coordinate pickup from airports/rail yards
     - Begin bonded storage with real-time inventory visibility
     - Schedule deliveries to [City Name] as needed

### Dynamic Economic Data (City Pages)
Updated daily via cron job from government APIs:
- Import growth percentages
- Manufacturing employment data
- Warehouse demand indices
- Air cargo volumes
- Container traffic trends
- Current duty rates by category
- Seasonal import patterns

### Trust Signals & Credentials (Recurring)
- MC-721384 and DOT 1717205 (footer)
- CBW Class 3 Certified
- 26+ Years Experience
- TSA Approved
- GDP Compliant
- SmartWay Partner
- Top 1-2% U.S. Fleet

### Call-to-Action Patterns
- **Primary:** "Get Started" / "Request Quote"
- **Secondary:** "Call [phone number]"
- **Tertiary:** "Learn More" / "View Services"
- **Booking:** "Set up a call with us"

---

## Special Features & Functionality

### Mobile Widget System
- Floating panel with quick actions
- Fuel surcharge display
- Track shipment link
- Get quote functionality
- Toggle visibility control

### Economic Data Integration
- Daily automated updates via cron
- Government API integration (Census, BLS)
- Fallback data for reliability
- City-specific customization
- Manual update trigger for admins

### Programmatic SEO System
- 26 city-specific pages
- Dynamic content generation
- Custom URL rewrites
- SEO Press sitemap integration
- Automatic canonical tags
- Geo meta tags for local SEO

### Service Area Widget System
- Configurable city link displays
- Inline or list format options
- Shortcode support
- Widget area compatibility
- Priority-based city ordering

### Video Integration
- CFS launch video on homepage
- YouTube API integration
- Custom video player controls
- Responsive video containers

### Form Systems
- Contact form integration
- Career application forms (2 types)
- Shortcode-based implementation
- Outlook calendar booking integration

---

## Technical Implementation Notes

### ACF Field Groups
Extensive use of Advanced Custom Fields for:
- Page headers and hero sections
- Service information repeaters
- Team member profiles
- FAQ content management
- Blog/news displays
- Economic data storage
- City-specific information

### Custom Post Types
- None implemented (uses standard pages/posts)

### Menu Locations
- Primary Menu (menu-1)
- New Header Menu (active)
- New Footer Menu (active)

### Style Organization
Page-specific stylesheets:
- home.css
- about.css
- services.css
- warehouse-enhanced.css
- drayage-enhanced.css
- air-cargo-enhanced.css
- bonded-warehouse-wireframe.css (45.8KB)
- mobile-widget.css
- Single.css (16.7KB - most comprehensive)

### JavaScript Libraries
- jQuery (custom version)
- Slick carousel
- YouTube iframe API
- Custom scripts for interactions

---

## Migration Considerations

### Priority Content to Preserve
1. All service descriptions and capabilities
2. Company credentials (MC/DOT numbers)
3. Contact information
4. FAQ content (SEO-optimized)
5. Programmatic city page content
6. Economic data integration system
7. Schema markup structures

### Dynamic Content Dependencies
- ACF field values need migration
- Economic data cron jobs
- Programmatic page generation
- Menu configurations
- Widget placements

### SEO-Critical Elements
- URL structures (especially city pages)
- Meta descriptions
- Schema markup
- Sitemap integration
- Canonical tags
- 301 redirects (currently hardcoded)

### Assets to Migrate
- Logo files
- Service images
- Team photos
- Background images
- Icon sets
- Video content

---

## Recommended Improvements for Rebuild

### Technical Enhancements
1. Implement custom post types for services
2. Centralize 301 redirects management
3. Optimize image delivery (WebP, lazy loading)
4. Enhance mobile widget functionality
5. Improve form validation and UX

### Content Opportunities
1. Expand programmatic pages to other services
2. Add case studies/testimonials section
3. Implement resource/download center
4. Create service-specific landing pages
5. Enhance blog with categories/tags

### SEO Optimizations
1. Implement breadcrumbs site-wide
2. Add FAQ schema to all service pages
3. Enhance internal linking structure
4. Create XML sitemap for images
5. Implement hreflang for multi-language

### User Experience
1. Add live chat functionality
2. Implement shipment tracking portal
3. Create customer login area
4. Add quote calculator tool
5. Enhance mobile navigation

---

## Content Gaps Identified

### Missing or Incomplete Sections
1. Customer testimonials/reviews
2. Case studies/success stories
3. Detailed team bios
4. Awards/recognition section
5. Sustainability initiatives details
6. Technology/software capabilities
7. Partnership information
8. Industry association memberships

### Recommended Additions
1. Service area map visualization
2. Pricing/rate information
3. FAQ expansion per service
4. Resource library/downloads
5. News/press releases section
6. Customer portal information
7. API/integration capabilities
8. Emergency service information

---

This documentation represents a complete audit of the CR Express website as of the current date. All content, structure, and functionality has been documented to enable accurate reconstruction of the site while identifying opportunities for enhancement during the rebuild process.