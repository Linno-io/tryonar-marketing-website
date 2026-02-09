# UI/UX Guidelines

This document defines the visual and interaction design standards for the TryOnAR Marketing Website.

## Design System

### Color Palette

The website uses CSS custom properties defined in `globals.css`:

```css
:root {
  /* Primary Colors */
  --primary: /* Brand primary color */
  --primary-foreground: /* Text on primary */

  /* Neutral Colors */
  --background: /* Page background */
  --foreground: /* Primary text */
  --muted: /* Muted backgrounds */
  --muted-foreground: /* Secondary text */

  /* Semantic Colors */
  --destructive: /* Error states */
  --border: /* Border color */
  --ring: /* Focus ring */
}
```

### Typography

#### Font Families

| Font | Usage |
|------|-------|
| Sora | Headings and display text |
| Inter | Body text |
| Circular Std | Accent text |

#### Font Scale

```css
/* Tailwind Typography Classes */
.text-xs    /* 12px */
.text-sm    /* 14px */
.text-base  /* 16px */
.text-lg    /* 18px */
.text-xl    /* 20px */
.text-2xl   /* 24px */
.text-3xl   /* 30px */
.text-4xl   /* 36px */
.text-5xl   /* 48px */
.text-6xl   /* 60px */
```

### Spacing

Use Tailwind's spacing scale consistently:

```css
/* Base unit: 4px */
.p-1   /* 4px */
.p-2   /* 8px */
.p-4   /* 16px */
.p-6   /* 24px */
.p-8   /* 32px */
.p-12  /* 48px */
.p-16  /* 64px */
```

## Component Guidelines

### Buttons

Use the `Button` component from `components/ui/Button.tsx`:

```tsx
// Primary action
<Button variant="primary">Get Started</Button>

// Secondary action
<Button variant="secondary">Learn More</Button>

// Outline style
<Button variant="outline">Contact Us</Button>

// Ghost style (minimal)
<Button variant="ghost">Cancel</Button>
```

**Button Best Practices:**
- Use clear, action-oriented labels
- Primary buttons for main CTAs (one per section)
- Secondary for alternative actions
- Maintain adequate touch targets (44px minimum)

### Container

Use `Container` for consistent page width:

```tsx
<Container width="default">
  {/* Max-width: 1280px */}
</Container>

<Container width="narrow">
  {/* Max-width: 960px - for text-heavy content */}
</Container>

<Container width="wide">
  {/* Max-width: 1440px - for expansive layouts */}
</Container>
```

### Images

Use the `Image` component for optimized images:

```tsx
import Image from '@/components/ui/Image'

<Image
  src={sanityImageUrl}
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority={isAboveFold}
/>
```

**Image Best Practices:**
- Always provide descriptive alt text
- Use `priority` for above-the-fold images
- Maintain aspect ratios
- Use appropriate image sizes

### Cards

Cards should follow this structure:

```tsx
<div className="bg-white rounded-lg shadow-md p-6">
  <Image ... />
  <Heading level={3}>Card Title</Heading>
  <Text>Card description...</Text>
  <Button>Action</Button>
</div>
```

## Responsive Design

### Breakpoints

Use Tailwind's responsive prefixes:

| Prefix | Min-width | Target |
|--------|-----------|--------|
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

### Mobile-First Approach

```tsx
// Start with mobile styles, add breakpoint modifiers
<div className="
  flex flex-col        /* Mobile: stack */
  md:flex-row          /* Tablet+: row */
  gap-4                /* Mobile spacing */
  md:gap-8             /* Tablet+ spacing */
">
```

### Touch Targets

- Minimum touch target: 44x44px
- Adequate spacing between interactive elements
- Larger click areas on mobile

## Section Layout

### Standard Section Structure

```tsx
<section className="py-16 md:py-24">
  <Container>
    {/* Section Header */}
    <div className="text-center mb-12">
      <Badge>Section Label</Badge>
      <Heading level={2}>Section Title</Heading>
      <Text className="max-w-2xl mx-auto">
        Section description...
      </Text>
    </div>

    {/* Section Content */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Content items */}
    </div>

    {/* Optional CTA */}
    <div className="text-center mt-12">
      <Button>Learn More</Button>
    </div>
  </Container>
</section>
```

### Section Spacing

- Vertical padding: `py-16` (mobile), `py-24` (desktop)
- Between sections: Consistent vertical rhythm
- Internal spacing: Use `gap-` utilities

## Navigation

### Header

- Fixed/sticky positioning
- Dark theme with light text
- Mobile hamburger menu
- Clear CTA button

### Footer

- Multiple column layout
- Grouped links by category
- Social media icons
- Contact information
- Copyright notice

## Accessibility

### Color Contrast

- Minimum contrast ratio: 4.5:1 for body text
- 3:1 for large text (18px+ or 14px+ bold)
- Test with accessibility tools

### Focus States

```css
/* Ensure visible focus indicators */
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Keyboard Navigation

- All interactive elements must be focusable
- Logical tab order
- Skip links for navigation

### Screen Readers

```tsx
// Use semantic HTML
<nav aria-label="Main navigation">
<main role="main">
<footer>

// Hide decorative elements
<Image aria-hidden="true" />

// Provide labels
<button aria-label="Close menu">
  <XIcon />
</button>
```

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Animation Guidelines

### Principles

1. **Purposeful**: Animations should guide users, not distract
2. **Subtle**: Keep animations understated
3. **Fast**: Duration between 150-300ms
4. **Consistent**: Use consistent timing functions

### Recommended Durations

| Type | Duration |
|------|----------|
| Micro-interactions | 100-150ms |
| Standard transitions | 200-300ms |
| Page transitions | 300-500ms |

### Easing

```css
/* Tailwind easing classes */
.ease-in      /* Slow start */
.ease-out     /* Slow end */
.ease-in-out  /* Slow start and end */
```

## Icons

Use Lucide React icons consistently:

```tsx
import { ChevronRight, Check, X } from 'lucide-react'

<ChevronRight className="w-5 h-5" />
```

**Icon Best Practices:**
- Consistent sizing (16px, 20px, 24px)
- Pair with text labels when possible
- Use appropriate stroke width
- Maintain visual consistency

## Forms

### Input Fields

```tsx
<label htmlFor="email" className="block text-sm font-medium mb-2">
  Email Address
</label>
<input
  id="email"
  type="email"
  className="
    w-full px-4 py-3 rounded-lg
    border border-gray-300
    focus:ring-2 focus:ring-primary focus:border-primary
  "
  placeholder="you@example.com"
/>
```

### Validation States

```tsx
// Error state
<input className="border-red-500 focus:ring-red-500" />
<p className="text-red-500 text-sm mt-1">Error message</p>

// Success state
<input className="border-green-500 focus:ring-green-500" />
```

## Loading States

### Skeleton Loading

```tsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
  <div className="h-4 bg-gray-200 rounded w-1/2" />
</div>
```

### Spinner

```tsx
<div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
```

## Related Documentation

- [Best Practices](./best-practices.md)
- [Performance Optimization](./performance-optimization.md)
- [Contribution Guidelines](./contribution-guidelines.md)
