# Schema Overview

This document describes the Sanity CMS schema structure for the TryOnAR Marketing Website.

## Document Types

### Core Documents

| Type | Description | Location |
|------|-------------|----------|
| `page` | Main content pages with sections and SEO | `pageType.ts` |
| `post` | Blog posts with categories and comments | `postType.ts` |
| `user` | Author/contributor profiles | `userType.ts` |
| `category` | Content categorization | `categoryType.ts` |
| `siteSettings` | Global site configuration | `siteSettingsType.ts` |
| `seo` | SEO metadata object | `seoType.ts` |

### Page Schema

```typescript
{
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'sections', type: 'array', of: [/* 30+ section types */] },
    { name: 'seo', type: 'seo' }
  ]
}
```

### Site Settings Schema

```typescript
{
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'siteTitle', type: 'string' },
    { name: 'siteDescription', type: 'text' },
    { name: 'logo', type: 'image' },
    { name: 'favicon', type: 'image' },
    { name: 'headerMenu', type: 'array', of: ['menuItem'] },
    { name: 'footerMenus', type: 'array', of: ['footerMenu'] },
    { name: 'signinInfo', type: 'signinInfo' },
    { name: 'socialLinks', type: 'array', of: ['socialLink'] },
    { name: 'contactInfo', type: 'contactInfo' }
  ]
}
```

## Section Types

The website uses a modular section-based approach with 30+ section types:

### Hero & CTA Sections

| Type | Description |
|------|-------------|
| `heroSectionType` | Hero sections with image, title, CTA buttons |
| `ctaSectionType` | Call-to-action sections |
| `bannerSectionType` | Banner/announcement sections |

### Content Sections

| Type | Description |
|------|-------------|
| `cardsSectionType` | Card grid layouts |
| `featuredCardsSectionType` | Featured items with metrics |
| `caseStudiesSectionType` | Case study cards |
| `resourceSectionType` | Resources with icons and links |
| `gallerySectionType` | Image galleries with stats |

### Feature & Solution Sections

| Type | Description |
|------|-------------|
| `industrySolutionsSectionType` | Industry-specific solutions with tabs |
| `realitySectionType` | Tabs with metrics and details |
| `magicSectionType` | Stats/features sections |
| `workFlowSectionType` | Step-by-step process sections |
| `ecommerceChallengeType` | Challenge/solution tabs |

### Trust & Social Proof

| Type | Description |
|------|-------------|
| `successStoriesSectionType` | Testimonials and reviews |
| `trustCardSectionType` | Trust/credibility cards |
| `trustStatsSectionType` | Stats display with avatars |
| `comparisonSectionType` | Feature comparison tables |

### Pricing & FAQ

| Type | Description |
|------|-------------|
| `pricingTableSectionType` | Pricing plans with features |
| `faqSectionType` | Accordion-based FAQs |

### Additional Sections

| Type | Description |
|------|-------------|
| `partnerLogosSectionType` | Partner/client logos |
| `socialProofSectionType` | Social proof elements |
| `featureHighlightSectionType` | Feature highlights |
| `textBlockSectionType` | Rich text content blocks |

## Shared Object Types

### richTextHighlight

Used for text content with highlight support:

```typescript
{
  name: 'richTextHighlight',
  type: 'object',
  fields: [
    {
      name: 'segments',
      type: 'array',
      of: [{ type: 'textSegment' }]
    }
  ]
}
```

### textSegment

Individual text segments with styling:

```typescript
{
  name: 'textSegment',
  type: 'object',
  fields: [
    { name: 'text', type: 'string' },
    { name: 'type', type: 'string', options: { list: ['normal', 'highlight'] } }
  ]
}
```

### link

Flexible link object supporting internal and external links:

```typescript
{
  name: 'link',
  type: 'object',
  fields: [
    { name: 'label', type: 'string' },
    { name: 'linkType', type: 'string', options: { list: ['internal', 'external'] } },
    { name: 'internalLink', type: 'reference', to: [{ type: 'page' }] },
    { name: 'externalUrl', type: 'url' }
  ]
}
```

### SanityImage

Standard image object with URL and alt text:

```typescript
{
  name: 'image',
  type: 'image',
  fields: [
    { name: 'alt', type: 'string', title: 'Alternative text' }
  ]
}
```

## SEO Schema

```typescript
{
  name: 'seo',
  type: 'object',
  fields: [
    { name: 'metaTitle', type: 'string' },
    { name: 'metaDescription', type: 'text' },
    { name: 'canonicalUrl', type: 'url' },
    { name: 'ogTitle', type: 'string' },
    { name: 'ogDescription', type: 'text' },
    { name: 'ogImage', type: 'image' }
  ]
}
```

## Type Relationships

```
siteSettings (singleton)
    ├── headerMenu[] ─────► menuItem ──► page (reference)
    ├── footerMenus[] ────► footerMenu
    ├── socialLinks[]
    └── contactInfo

page (document)
    ├── sections[] ───────► [30+ section types]
    └── seo ──────────────► seo (object)

post (document)
    ├── author ───────────► user (reference)
    ├── categories[] ─────► category (reference)
    └── comments[]
```

## Schema File Organization

```
apps/studio/schemaTypes/
├── index.ts                    # Schema exports
├── pageType.ts                 # Page document
├── postType.ts                 # Blog post document
├── userType.ts                 # User/author document
├── categoryType.ts             # Category document
├── siteSettingsType.ts         # Site settings singleton
├── seoType.ts                  # SEO object
├── heroSectionType.ts          # Hero section
├── ctaSectionType.ts           # CTA section
├── industrySolutionsSectionType.ts
├── successStoriesSectionType.ts
├── realitySectionType.ts
├── resourceSectionType.ts
├── magicSectionType.ts
├── faqSectionType.ts
├── workFlowSectionType.ts
├── cardsSectionType.ts
├── trustCardSectionType.ts
├── comparisonSectionType.ts
├── pricingTableSectionType.ts
├── ecommerceChallengeType.ts
├── gallerySectionType.ts
├── caseStudiesSectionType.ts
├── featuredCardsSectionType.ts
├── trustStatsSectionType.ts
└── objects/
    ├── richTextHighlight.ts
    ├── textSegment.ts
    ├── link.ts
    └── [other objects]
```

## TypeScript Type Definitions

Frontend types are defined in `apps/web/src/lib/types/`:

```typescript
// section.ts - 30+ section interfaces
interface HeroSection {
  _type: 'heroSectionType'
  title: RichTextHighlight
  subtitle?: string
  image?: SanityImage
  buttons?: Button[]
}

// page.ts
interface Page {
  title: string
  slug: { current: string }
  sections: Section[]
  seo: Seo
}

// siteSettings.ts
interface SiteSettings {
  siteTitle: string
  siteDescription: string
  logo: SanityImage
  headerMenu: MenuItem[]
  footerMenus: FooterMenu[]
  socialLinks: SocialLink[]
  contactInfo: ContactInfo
}
```

## Related Documentation

- [Architecture Overview](./architecture-overview.md)
- [UI/UX Guidelines](./ui-ux-guidelines.md)
- [Best Practices](./best-practices.md)
