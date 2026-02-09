# Project Overview

## Introduction

TryOnAR Marketing Website is a modern, content-driven marketing website built with Next.js and Sanity CMS. The project follows a headless CMS architecture, enabling content editors to create and manage pages through a user-friendly interface while developers maintain a performant, type-safe frontend.

## Project Goals

1. **Content Flexibility**: Enable non-technical users to create and manage pages
2. **Performance**: Deliver fast page loads with optimized assets
3. **Maintainability**: Clean, typed codebase with reusable components
4. **Scalability**: Section-based architecture for easy feature additions
5. **SEO**: Built-in SEO management for all pages

## Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library with latest features
- **Tailwind CSS 4** - Utility-first styling
- **TypeScript** - Type safety
- **lucide-react** - Icon library

### Content Management
- **Sanity v5** - Headless CMS
- **GROQ** - Query language for content fetching

### Infrastructure
- **Netlify** - Frontend hosting and CDN
- **Sanity Cloud** - CMS hosting

### Development Tools
- **pnpm** - Package manager
- **React Compiler** - Build optimization

## Project Structure

```
tryonar-marketing-website/
├── apps/
│   ├── studio/              # Sanity CMS Studio
│   │   ├── schemaTypes/     # Content schemas (37 types)
│   │   ├── sanity.config.ts # Studio configuration
│   │   └── package.json
│   │
│   └── web/                 # Next.js Frontend
│       ├── src/
│       │   ├── app/         # App Router pages
│       │   ├── components/  # React components
│       │   ├── lib/         # Utilities & types
│       │   └── public/      # Static assets
│       ├── next.config.ts
│       └── package.json
│
├── doc/                     # Documentation
├── pnpm-workspace.yaml      # Monorepo config
└── package.json             # Root package.json
```

## Key Features

### 1. Section-Based Page Building
Pages are composed of 30+ reusable section types:
- Hero sections
- Call-to-action blocks
- Feature showcases
- Testimonials
- Pricing tables
- FAQ accordions
- And more...

### 2. Dynamic Content Management
- Real-time preview in Sanity Studio
- GROQ queries for flexible data fetching
- ISR (Incremental Static Regeneration) for content freshness

### 3. Responsive Design
- Mobile-first approach
- Tailwind CSS breakpoints
- Optimized images with Next.js Image

### 4. SEO Management
- Per-page SEO settings
- Open Graph tags
- Canonical URLs
- Meta descriptions

### 5. Global Site Settings
- Header navigation
- Footer configuration
- Social links
- Contact information
- Logo and branding

## Getting Started

### Prerequisites
- Node.js >= 20.0.0
- pnpm >= 10.0.0

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tryonar-marketing-website

# Install dependencies
pnpm install
```

### Environment Setup

Create `.env.local` in `apps/web/`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=90a20xmm
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=<optional-for-isr>
```

### Development

```bash
# Start both apps
pnpm dev

# Or start individually
pnpm --filter web dev      # Next.js on http://localhost:3000
pnpm --filter studio dev   # Sanity on http://localhost:3333
```

### Build

```bash
# Build all apps
pnpm build

# Build individual apps
pnpm --filter web build
pnpm --filter studio build
```

## Content Workflow

1. **Content Editor** creates/updates content in Sanity Studio
2. **Sanity** stores content in the cloud
3. **Next.js** fetches content via GROQ queries
4. **ISR** regenerates pages every 60 seconds
5. **Netlify CDN** serves cached pages to visitors

## Team Responsibilities

### Content Team
- Create and manage page content in Sanity Studio
- Upload and organize media assets
- Configure SEO settings
- Manage navigation and footer

### Development Team
- Create new section components
- Define Sanity schemas
- Maintain TypeScript types
- Optimize performance
- Deploy updates

## Related Documentation

- [Architecture Overview](./architecture-overview.md)
- [Schema Overview](./schema-overview.md)
- [UI/UX Guidelines](./ui-ux-guidelines.md)
- [Contribution Guidelines](./contribution-guidelines.md)
- [Deployment Process](./deployment-process.md)
