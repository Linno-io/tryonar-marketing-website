# Architecture Overview

## High-Level Architecture

TryOnAR Marketing Website follows a **headless CMS architecture** with clear separation between content management and frontend presentation.

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRODUCTION                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐         ┌──────────────┐                     │
│   │   Sanity     │  GROQ   │   Next.js    │                     │
│   │   Studio     │ ──────► │   Frontend   │                     │
│   │   (CMS)      │         │   (SSR/ISR)  │                     │
│   └──────────────┘         └──────────────┘                     │
│         │                         │                              │
│         ▼                         ▼                              │
│   ┌──────────────┐         ┌──────────────┐                     │
│   │   Sanity     │         │   Netlify    │                     │
│   │   Cloud      │         │   Edge       │                     │
│   └──────────────┘         └──────────────┘                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Monorepo Structure

The project uses **pnpm workspaces** to manage a monorepo containing two applications:

```
tryonar-marketing-website/
├── apps/
│   ├── studio/              # Sanity CMS (Content Management)
│   └── web/                 # Next.js Frontend (Marketing Website)
├── doc/                     # Project Documentation
├── package.json             # Root workspace configuration
├── pnpm-workspace.yaml      # Workspace definition
└── pnpm-lock.yaml          # Dependency lockfile
```

## Technology Stack

### Frontend (apps/web)

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.0 | React framework with App Router |
| React | 19.2.3 | UI library |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| next-sanity | 12.0.5 | Sanity integration for Next.js |
| lucide-react | 0.562.0 | Icon library |
| TypeScript | 5.x | Type safety |

### CMS (apps/studio)

| Technology | Version | Purpose |
|------------|---------|---------|
| Sanity | 5.5.0 | Headless CMS |
| Structure Tool | - | Content organization |
| Vision Tool | - | GROQ query playground |
| Styled Components | 6.1.18 | Styling for Studio |

### Infrastructure

| Service | Purpose |
|---------|---------|
| Netlify | Frontend hosting & CDN |
| Sanity Cloud | CMS hosting & content API |

## Data Flow

### Content Publishing Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Editor    │     │   Sanity    │     │   Sanity    │
│   creates   │ ──► │   Studio    │ ──► │   Cloud     │
│   content   │     │   (local)   │     │   (hosted)  │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Visitor   │     │   Netlify   │     │   Next.js   │
│   views     │ ◄── │   CDN       │ ◄── │   ISR       │
│   page      │     │             │     │   (60s)     │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Request Flow

1. User requests a page (e.g., `/about`)
2. Netlify CDN checks for cached response
3. If stale/missing, Next.js fetches from Sanity via GROQ
4. Page is rendered server-side (SSR) or served from ISR cache
5. Response is cached at edge for 60 seconds

## Section-Based Architecture

Pages are composed of reusable **section components**:

```
Page
├── HeroSection
├── IndustrySolutionsSection
├── SuccessStoriesSection
├── CTASection
└── FAQSection
```

### PageRenderer Pattern

The `PageRenderer` component dynamically renders sections based on their `_type`:

```typescript
// Simplified pattern
const PageRenderer = ({ sections }) => {
  return sections.map((section) => {
    switch (section._type) {
      case 'heroSectionType':
        return <HeroSection {...section} />
      case 'ctaSectionType':
        return <CTASection {...section} />
      // ... 30+ section types
    }
  })
}
```

## Directory Structure

### Frontend (apps/web/src/)

```
src/
├── app/                     # Next.js App Router
│   ├── layout.tsx          # Root layout (Nav + Footer)
│   ├── page.tsx            # Homepage
│   ├── [slug]/page.tsx     # Dynamic pages
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Header navigation
│   ├── Footer.tsx          # Site footer
│   ├── PageRenderer.tsx    # Dynamic section renderer
│   ├── sections/           # 30+ section components
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── sanity/             # Sanity client & queries
│   ├── types/              # TypeScript definitions
│   └── utils/              # Helper functions
└── public/                 # Static assets
```

### CMS (apps/studio/)

```
apps/studio/
├── schemaTypes/            # 37 type definitions
│   ├── pageType.ts
│   ├── siteSettingsType.ts
│   ├── [section types]/
│   └── objects/            # Reusable field objects
├── sanity.config.ts        # Studio configuration
└── sanity.cli.ts           # CLI configuration
```

## Key Architectural Decisions

### 1. Headless CMS Approach
- **Why**: Decouples content from presentation
- **Benefit**: Content team can work independently of developers

### 2. Section-Based Composition
- **Why**: Enables flexible page building
- **Benefit**: Content editors can compose pages from reusable blocks

### 3. ISR (Incremental Static Regeneration)
- **Why**: Balance between static performance and content freshness
- **Benefit**: 60-second cache provides fast loads with near-real-time updates

### 4. Monorepo with pnpm
- **Why**: Single repository for related applications
- **Benefit**: Easier dependency management and coordinated releases

### 5. TypeScript Throughout
- **Why**: Type safety across the entire codebase
- **Benefit**: Catch errors at compile time, better IDE support

## Environment Configuration

### Required Environment Variables

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=90a20xmm
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=optional-for-isr
```

## Related Documentation

- [Project Overview](./project-overview.md)
- [Schema Overview](./schema-overview.md)
- [Deployment Process](./deployment-process.md)
