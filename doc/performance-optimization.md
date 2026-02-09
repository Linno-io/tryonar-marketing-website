# Performance Optimization

This document covers performance optimization strategies for the TryOnAR Marketing Website.

## Core Web Vitals

### Target Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | Main content load time |
| FID (First Input Delay) | < 100ms | Time to interactivity |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |
| TTFB (Time to First Byte) | < 600ms | Server response time |

## Image Optimization

### Next.js Image Component

```tsx
import Image from 'next/image'

// Optimized image with automatic sizing
<Image
  src={sanityImageUrl}
  alt="Hero image"
  width={1200}
  height={800}
  priority={isAboveFold}  // Load immediately for hero images
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>
```

### Sanity Image Optimization

```typescript
// Use Sanity's image builder for URL optimization
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

// Usage with transformations
urlFor(image)
  .width(800)
  .height(600)
  .format('webp')
  .quality(80)
  .url()
```

### Image Best Practices

1. **Use appropriate sizes**: Don't load 4000px images for thumbnails
2. **Lazy load below-fold**: Only `priority` for above-fold images
3. **Use modern formats**: WebP, AVIF via automatic conversion
4. **Responsive images**: Let Next.js handle srcset generation
5. **Blur placeholders**: Improve perceived performance

## Caching Strategy

### ISR (Incremental Static Regeneration)

```typescript
// pages/[slug]/page.tsx
export const revalidate = 60 // Revalidate every 60 seconds

// Or for specific data
const data = await client.fetch(query, params, {
  next: { revalidate: 60 }
})
```

### Static Generation

```typescript
// Generate static pages at build time
export async function generateStaticParams() {
  const pages = await client.fetch(groq`*[_type == "page"]{ "slug": slug.current }`)
  return pages.map((page) => ({ slug: page.slug }))
}
```

### CDN Caching

Netlify automatically caches at the edge. Configure cache headers:

```toml
# netlify.toml
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=86400, s-maxage=604800"
```

## Code Splitting

### Dynamic Imports

```tsx
import dynamic from 'next/dynamic'

// Lazy load heavy components
const PricingCalculator = dynamic(
  () => import('@/components/PricingCalculator'),
  {
    loading: () => <Skeleton className="h-96" />,
    ssr: false, // Client-only if needed
  }
)
```

### Route-Based Splitting

Next.js App Router automatically code-splits by route. Each page only loads its required code.

### Section Lazy Loading

```tsx
// For sections below the fold
const LazySection = dynamic(() => import('./HeavySection'), {
  loading: () => <SectionSkeleton />,
})

// In PageRenderer
{sectionIndex > 2 ? <LazySection data={section} /> : <Section data={section} />}
```

## Bundle Optimization

### Analyze Bundle Size

```bash
# Install bundle analyzer
pnpm add -D @next/bundle-analyzer

# Analyze bundle
ANALYZE=true pnpm build
```

### Reduce Bundle Size

```typescript
// next.config.ts
const config = {
  // Enable React Compiler for automatic optimization
  experimental: {
    reactCompiler: true,
  },
  // Optimize package imports
  optimizePackageImports: ['lucide-react'],
}
```

### Tree Shaking

```typescript
// Good: Named imports allow tree shaking
import { ChevronRight, Check } from 'lucide-react'

// Bad: Imports entire library
import * as Icons from 'lucide-react'
```

## Font Optimization

### Font Loading Strategy

```css
/* globals.css - Use font-display: swap */
@font-face {
  font-family: 'Sora';
  src: url('/fonts/Sora-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

### Self-Host Fonts

Instead of Google Fonts, self-host for better performance:

```
public/
└── fonts/
    ├── Sora-Variable.woff2
    ├── Inter-Variable.woff2
    └── CircularStd-Book.woff2
```

### Preload Critical Fonts

```tsx
// app/layout.tsx
<head>
  <link
    rel="preload"
    href="/fonts/Sora-Variable.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</head>
```

## React Performance

### Component Memoization

```tsx
import { memo, useMemo, useCallback } from 'react'

// Memoize component
export default memo(function ExpensiveComponent({ data }) {
  // Memoize expensive calculations
  const processedData = useMemo(
    () => expensiveOperation(data),
    [data]
  )

  // Memoize callbacks
  const handleClick = useCallback(() => {
    onClick(data.id)
  }, [data.id, onClick])

  return <div>{/* ... */}</div>
})
```

### React Compiler

The project uses React Compiler for automatic optimization:

```typescript
// next.config.ts
{
  experimental: {
    reactCompiler: true,
  }
}
```

### Avoid Re-renders

```tsx
// Bad: New object on every render
<Component style={{ color: 'red' }} />

// Good: Stable reference
const style = { color: 'red' }
<Component style={style} />

// Or with Tailwind (no runtime overhead)
<Component className="text-red-500" />
```

## Network Optimization

### Preconnect to Origins

```tsx
// app/layout.tsx
<head>
  <link rel="preconnect" href="https://cdn.sanity.io" />
  <link rel="dns-prefetch" href="https://cdn.sanity.io" />
</head>
```

### Prefetch Links

```tsx
import Link from 'next/link'

// Next.js automatically prefetches links in viewport
<Link href="/about" prefetch={true}>About</Link>

// Disable for less important links
<Link href="/legal/terms" prefetch={false}>Terms</Link>
```

## Sanity Query Optimization

### Select Only Required Fields

```groq
// Good: Minimal projection
*[_type == "page" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  sections[] {
    _type,
    title,
    description
  }
}

// Bad: Fetching everything
*[_type == "page" && slug.current == $slug][0]
```

### Use References Efficiently

```groq
// Dereference only when needed
sections[] {
  _type,
  author-> {
    name,
    "avatar": avatar.asset->url
  }
}
```

## Monitoring

### Performance Monitoring Tools

1. **Lighthouse**: Built into Chrome DevTools
2. **WebPageTest**: Detailed performance analysis
3. **Netlify Analytics**: Real user metrics
4. **Sentry**: Performance monitoring (if configured)

### Key Metrics to Track

```typescript
// Use web-vitals library
import { onCLS, onFID, onLCP } from 'web-vitals'

function sendToAnalytics(metric) {
  console.log(metric)
  // Send to your analytics service
}

onCLS(sendToAnalytics)
onFID(sendToAnalytics)
onLCP(sendToAnalytics)
```

## Performance Checklist

### Build Time
- [ ] Bundle size analyzed and optimized
- [ ] Unused dependencies removed
- [ ] Tree shaking working correctly

### Runtime
- [ ] Images optimized and lazy loaded
- [ ] Fonts self-hosted with proper loading
- [ ] Components memoized where appropriate
- [ ] Heavy components lazy loaded

### Network
- [ ] CDN caching configured
- [ ] Preconnect to required origins
- [ ] ISR configured appropriately

### Rendering
- [ ] No layout shifts (CLS < 0.1)
- [ ] LCP element loads quickly
- [ ] Interactive elements respond fast (FID < 100ms)

## Related Documentation

- [Best Practices](./best-practices.md)
- [Deployment Process](./deployment-process.md)
- [Architecture Overview](./architecture-overview.md)
