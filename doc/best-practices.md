# Best Practices

This document outlines coding standards and best practices for the TryOnAR Marketing Website.

## Code Organization

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Types | PascalCase | `section.ts` |
| Styles | kebab-case | `globals.css` |
| Schemas | camelCase | `heroSectionType.ts` |

### Component Structure

```tsx
// 1. Imports
import { memo } from 'react'
import { Container } from '@/components/ui/Container'
import type { HeroSection } from '@/lib/types/section'

// 2. Types (if not imported)
interface Props {
  data: HeroSection
}

// 3. Component
function HeroSection({ data }: Props) {
  // Hooks
  // State
  // Effects
  // Event handlers
  // Render
  return (
    <section>
      {/* ... */}
    </section>
  )
}

// 4. Export (memoized for sections)
export default memo(HeroSection)
```

### Directory Structure

```
components/
├── ui/                 # Reusable UI primitives
│   ├── Button.tsx
│   ├── Container.tsx
│   └── index.ts        # Barrel export
├── sections/           # Page sections
│   ├── HeroSection.tsx
│   └── CTASection.tsx
└── layout/             # Layout components
    ├── Navigation.tsx
    └── Footer.tsx
```

## TypeScript

### Type Definitions

```typescript
// Prefer interfaces for objects
interface User {
  id: string
  name: string
  email: string
}

// Use type for unions and intersections
type Status = 'pending' | 'active' | 'completed'
type UserWithStatus = User & { status: Status }
```

### Strict Mode

Always use strict TypeScript settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true
  }
}
```

### Avoid `any`

```typescript
// Bad
function process(data: any) { ... }

// Good
function process(data: unknown) {
  if (isValidData(data)) {
    // ...
  }
}

// Better - be specific
function process(data: SectionData) { ... }
```

## React Best Practices

### Component Patterns

```tsx
// Use functional components
function MyComponent({ title }: Props) {
  return <div>{title}</div>
}

// Memoize expensive components
export default memo(MyComponent)

// Use proper hooks
const [state, setState] = useState<Type>(initialValue)
```

### Avoid Common Pitfalls

```tsx
// Bad: Creating objects in render
<Component style={{ margin: 10 }} />

// Good: Define outside or useMemo
const style = useMemo(() => ({ margin: 10 }), [])
<Component style={style} />

// Bad: Anonymous functions in render
<button onClick={() => handleClick(id)}>

// Good: useCallback or method
const handleButtonClick = useCallback(() => {
  handleClick(id)
}, [id])
<button onClick={handleButtonClick}>
```

### Conditional Rendering

```tsx
// Good patterns
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}

// Avoid nested ternaries
// Bad
{a ? <A /> : b ? <B /> : c ? <C /> : <D />}

// Good
function getComponent() {
  if (a) return <A />
  if (b) return <B />
  if (c) return <C />
  return <D />
}
```

## Tailwind CSS

### Class Organization

Order classes logically:

```tsx
<div className="
  {/* Layout */}
  flex flex-col items-center justify-center
  {/* Sizing */}
  w-full max-w-lg h-auto
  {/* Spacing */}
  p-4 mt-8 gap-4
  {/* Typography */}
  text-lg font-medium text-gray-900
  {/* Background/Border */}
  bg-white border border-gray-200 rounded-lg
  {/* Effects */}
  shadow-md hover:shadow-lg
  {/* Transitions */}
  transition-shadow duration-200
  {/* Responsive */}
  md:flex-row md:p-8
">
```

### Avoid Inline Styles

```tsx
// Bad
<div style={{ marginTop: '20px' }}>

// Good
<div className="mt-5">
```

### Extract Repeated Patterns

```tsx
// For repeated combinations, use @apply or component abstraction
// globals.css
.btn-primary {
  @apply px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90;
}
```

## Sanity Schema Best Practices

### Schema Structure

```typescript
import { defineType } from 'sanity'

export const heroSectionType = defineType({
  name: 'heroSectionType',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title || 'Hero Section',
      subtitle: 'Hero',
    }),
  },
})
```


## GROQ Queries

### Query Optimization

```groq
// Good: Select only needed fields
*[_type == "page" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  sections[] {
    _type,
    title,
    // Only fetch what's needed
  }
}

// Bad: Fetching entire documents
*[_type == "page"]
```

### Parameterized Queries

```typescript
// Always use parameters, never string interpolation
const query = groq`*[_type == "page" && slug.current == $slug][0]`
const result = await client.fetch(query, { slug })
```

## Error Handling

### Async Operations

```typescript
// Use try-catch for async operations
async function fetchPage(slug: string) {
  try {
    const page = await client.fetch(query, { slug })
    if (!page) {
      return null
    }
    return page
  } catch (error) {
    console.error('Failed to fetch page:', error)
    throw error
  }
}
```

### Error Boundaries

```tsx
// Create error boundaries for sections
import { ErrorBoundary } from 'react-error-boundary'

<ErrorBoundary fallback={<SectionError />}>
  <DynamicSection data={section} />
</ErrorBoundary>
```

## Git Workflow

### Commit Messages

```
feat: add trust stats section with avatar support
fix: resolve mobile navigation z-index issue
docs: update deployment process documentation
refactor: extract shared button styles
chore: update dependencies
```

### Branch Naming

```
feature/add-pricing-section
fix/mobile-nav-overflow
refactor/component-structure
docs/update-readme
```

## Performance Considerations

### Image Optimization

```tsx
// Use Next.js Image component
import Image from 'next/image'

<Image
  src={imageUrl}
  alt="Description"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={blurUrl}
/>
```

### Lazy Loading

```tsx
// Lazy load below-fold components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
})
```

### Memoization

```tsx
// Memoize expensive computations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.order - b.order),
  [items]
)

// Memoize callbacks
const handleClick = useCallback(() => {
  onClick(id)
}, [onClick, id])
```

## Testing Checklist

Before submitting code:

- [ ] Component renders without errors
- [ ] Responsive design works on all breakpoints
- [ ] Keyboard navigation works
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors
- [ ] Images have alt text
- [ ] Links are accessible

## Related Documentation

- [UI/UX Guidelines](./ui-ux-guidelines.md)
- [Performance Optimization](./performance-optimization.md)
- [Security Guidelines](./security-guidelines.md)
- [Contribution Guidelines](./contribution-guidelines.md)
