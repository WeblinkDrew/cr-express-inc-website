# Xero Color System Analysis & Implementation Guide

## 1. Primary Brand Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Xero Blue | `#13B5EA` | Primary brand color, logo, CTAs |
| Deep Blue | `#1C4B82` | Primary content sections, hero backgrounds |
| Dark Navy | `#1A2F45` | Footer sections, dark containers |

## 2. Secondary/Accent Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Mint Green | `#6FE9D0` | Promotional banners, special offers |
| Light Cyan | `#B8F0F5` | Background sections, subtle accents |
| Golden Yellow | `#FFC846` | Decorative elements, illustrations |

## 3. Background Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| White | `#FFFFFF` | Main background, cards |
| Light Gray | `#F5F7F9` | Subtle section backgrounds |
| Soft Blue | `#E8F7FB` | Informational sections |
| Mint Background | `#6FE9D0` | Promotional sections |
| Navy Background | `#1A2F45` / `#2C3E50` | Footer, dark feature sections |

## 4. Text Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary Text | `#1A2F45` / `#2C3E50` | Headings, primary content |
| Body Text | `#4A5568` / `#565A5E` | Body copy, descriptions |
| Muted Text | `#718096` / `#8B95A0` | Supporting text, captions |
| White Text | `#FFFFFF` | Text on dark backgrounds |

## 5. Component Color Mapping

### Hero Sections

**Pattern 1: Blue Hero**
```css
.hero-blue {
  background: #1C4B82;
  color: #FFFFFF;
}

.hero-blue h1 {
  color: #FFFFFF;
  /* "faster" and "innovations" have cyan underline */
  text-decoration-color: #13B5EA;
}

.hero-blue .cta-button {
  background: #FFFFFF;
  color: #1C4B82;
  border: 2px solid #FFFFFF;
}
```

**Pattern 2: Mint Promotional Banner**
```css
.promo-banner {
  background: #6FE9D0;
  color: #1A2F45;
  padding: 32px;
}

.promo-banner .heading {
  color: #1A2F45;
  font-weight: 700;
}

.promo-banner .link {
  color: #1A2F45;
  text-decoration: underline;
  text-underline-offset: 4px;
}
```

### Feature Cards/Boxes

**Pattern 1: Light Background Cards**
```css
.feature-card-light {
  background: #F5F7F9;
  padding: 48px 32px;
  border-radius: 8px;
}

.feature-card-light h3 {
  color: #1A2F45;
  margin-bottom: 16px;
}

.feature-card-light p {
  color: #4A5568;
  line-height: 1.6;
}

.feature-card-light .link {
  color: #1A2F45;
  text-decoration: underline;
  text-decoration-color: #13B5EA;
}
```

**Pattern 2: Blue Feature Sections**
```css
.feature-section-blue {
  background: #1C4B82;
  color: #FFFFFF;
  padding: 64px 48px;
}

.feature-section-blue h2 {
  color: #FFFFFF;
  font-size: 2.5rem;
  margin-bottom: 24px;
}

.feature-section-blue .description {
  color: #FFFFFF;
  opacity: 0.95;
}

.feature-section-blue .cta-link {
  color: #FFFFFF;
  text-decoration: underline;
  text-decoration-color: #13B5EA;
  text-underline-offset: 6px;
}
```

**Pattern 3: Dark Navy Sections**
```css
.feature-section-dark {
  background: #1A2F45;
  color: #FFFFFF;
  padding: 64px 48px;
}

.feature-section-dark h2 {
  color: #FFFFFF;
}

/* Accent text with colored underline */
.feature-section-dark .accent-text {
  text-decoration: underline;
  text-decoration-color: #13B5EA;
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
}
```

### Call-to-Action Buttons

**Primary CTA (Green/Mint)**
```css
.btn-primary {
  background: #6FE9D0;
  color: #1A2F45;
  padding: 14px 32px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  font-size: 16px;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: #5FD9C0;
}
```

**Secondary CTA (Outlined)**
```css
.btn-secondary {
  background: transparent;
  color: #FFFFFF;
  padding: 14px 32px;
  border: 2px solid #FFFFFF;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #FFFFFF;
  color: #1C4B82;
}
```

**Dark CTA (Navy)**
```css
.btn-dark {
  background: #1A2F45;
  color: #FFFFFF;
  padding: 14px 32px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
}
```

### Pricing Cards

```css
.pricing-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 40px 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.pricing-card .plan-name {
  color: #1A2F45;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.pricing-card .price {
  color: #1A2F45;
  font-size: 48px;
  font-weight: 700;
}

.pricing-card .price-suffix {
  color: #4A5568;
  font-size: 20px;
}

.pricing-card .savings-text {
  color: #13B5EA;
  font-weight: 600;
  font-size: 14px;
}

.pricing-card .cta-button {
  background: #6FE9D0;
  color: #1A2F45;
  width: 100%;
  padding: 14px;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 24px;
}

.pricing-card .feature-list {
  color: #4A5568;
}

.pricing-card .checkmark {
  color: #13B5EA;
}
```

### Section Containers

**Light Blue Container**
```css
.container-light-blue {
  background: #E8F7FB;
  padding: 80px 48px;
}

.container-light-blue h2 {
  color: #1A2F45;
}

.container-light-blue p {
  color: #4A5568;
}
```

**Mint Container (Promotional)**
```css
.container-mint {
  background: #6FE9D0;
  padding: 80px 48px;
}

.container-mint h2 {
  color: #1A2F45;
  font-size: 3rem;
}

.container-mint .price-box {
  background: #FFFFFF;
  padding: 40px;
  border-radius: 12px;
}
```

## 6. Accent Elements

### Decorative Underlines
```css
.heading-accent {
  text-decoration: underline;
  text-decoration-color: #13B5EA;
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
}
```

### Borders
```css
.card-border {
  border: 1px solid #E2E8F0;
}

.accent-border-bottom {
  border-bottom: 3px solid #13B5EA;
}
```

### Checkmarks/Icons
```css
.checkmark-icon {
  color: #13B5EA;
  font-size: 20px;
}
```

### Illustration Accent Colors
- Primary: `#13B5EA` (Cyan/Blue)
- Secondary: `#FFC846` (Golden Yellow)
- Tertiary: `#6FE9D0` (Mint Green)

## 7. Information Hierarchy Through Color

### Priority Levels

**Highest Priority**
- Background: `#6FE9D0` (Mint) or `#13B5EA` (Blue)
- Text: `#1A2F45` or `#FFFFFF`
- Used for: Main CTAs, promotional offers

**High Priority**
- Background: `#1C4B82` (Deep Blue)
- Text: `#FFFFFF`
- Used for: Hero sections, major features

**Medium Priority**
- Background: `#FFFFFF` or `#F5F7F9`
- Text: `#1A2F45`
- Used for: Content cards, pricing

**Low Priority**
- Background: `#1A2F45` (Navy)
- Text: `#FFFFFF` with lower opacity or `#8B95A0`
- Used for: Footer, supplementary content

## 8. Complete Component Examples

### Two-Column Feature Layout
```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
  <!-- Light Card -->
  <div style="
    background: #F5F7F9;
    padding: 48px;
    border-radius: 8px;
  ">
    <h3 style="
      color: #1A2F45;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
      text-decoration: underline;
      text-decoration-color: #13B5EA;
      text-decoration-thickness: 3px;
      text-underline-offset: 6px;
    ">Get set up faster</h3>
    <p style="
      color: #4A5568;
      line-height: 1.6;
      margin-bottom: 24px;
    ">Get the most out of Xero with access to our team of onboarding specialists.</p>
    <a href="#" style="
      color: #1A2F45;
      text-decoration: underline;
      text-decoration-color: #13B5EA;
      font-weight: 600;
    ">Learn more</a>
  </div>

  <!-- Dark Card -->
  <div style="
    background: #1A2F45;
    padding: 48px;
    border-radius: 8px;
  ">
    <h3 style="
      color: #FFFFFF;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
      text-decoration: underline;
      text-decoration-color: #13B5EA;
      text-decoration-thickness: 3px;
      text-underline-offset: 6px;
    ">Introducing the Xero Affiliate Program</h3>
    <p style="
      color: #FFFFFF;
      opacity: 0.9;
      line-height: 1.6;
      margin-bottom: 24px;
    ">For publishers, influencers, content creators who recommend Xero.</p>
    <a href="#" style="
      color: #FFFFFF;
      text-decoration: underline;
      text-decoration-color: #13B5EA;
      font-weight: 600;
    ">Apply now</a>
  </div>
</div>
```

### Promotional Banner
```html
<div style="
  background: #6FE9D0;
  padding: 32px 48px;
  border-radius: 8px;
  margin: 24px 0;
">
  <h3 style="
    color: #1A2F45;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
  ">LIMITED TIME OFFER: Get FREE online invoice payments for 60 days*</h3>
  <p style="
    color: #1A2F45;
    margin-bottom: 16px;
  ">Take control of your cash flow and give your customers more ways to pay with Stripe.</p>
  <a href="#" style="
    color: #1A2F45;
    text-decoration: underline;
    font-weight: 600;
  ">Get 60 days FREE</a>
</div>
```

## 9. CSS Variables Setup

```css
:root {
  /* Primary Colors */
  --xero-blue: #13B5EA;
  --xero-deep-blue: #1C4B82;
  --xero-navy: #1A2F45;
  
  /* Secondary Colors */
  --xero-mint: #6FE9D0;
  --xero-light-cyan: #B8F0F5;
  --xero-yellow: #FFC846;
  
  /* Background Colors */
  --bg-white: #FFFFFF;
  --bg-light-gray: #F5F7F9;
  --bg-soft-blue: #E8F7FB;
  --bg-mint: #6FE9D0;
  --bg-navy: #1A2F45;
  
  /* Text Colors */
  --text-primary: #1A2F45;
  --text-body: #4A5568;
  --text-muted: #718096;
  --text-white: #FFFFFF;
  
  /* Border Colors */
  --border-light: #E2E8F0;
  --border-accent: #13B5EA;
}
```

## 10. Design Principles Summary

1. **High Contrast for Clarity**: Xero uses strong contrast between backgrounds and text (dark navy on mint, white on blue)

2. **Accent Underlines**: Key headings use cyan (`#13B5EA`) underlines for visual interest without overwhelming

3. **Mint for Action**: The mint green (`#6FE9D0`) is reserved for primary CTAs and promotional content

4. **Navy for Trust**: Dark navy (`#1A2F45`) conveys professionalism in footer and product sections

5. **White Space**: Generous padding (48-64px) in containers with light backgrounds

6. **Consistent Rounding**: Border radius of 6-8px for buttons and cards

7. **Color Blocking**: Full-width colored sections create clear visual separation

8. **Limited Palette**: Sticks to 3-4 main colors per section for cohesion
