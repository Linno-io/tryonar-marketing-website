# Testing Strategy

This document outlines the testing approach for the TryOnAR Marketing Website.

## Testing Philosophy

1. **Test user behavior, not implementation details**
2. **Prioritize tests that give confidence in production**
3. **Balance coverage with maintenance cost**
4. **Automate what can be automated**

## Testing Pyramid

```
                    ┌───────────────┐
                    │     E2E       │  Fewer, slower, high confidence
                    │    Tests      │
                    ├───────────────┤
                    │  Integration  │  Moderate quantity
                    │    Tests      │
                    ├───────────────┤
                    │    Unit       │  Many, fast, focused
                    │    Tests      │
                    └───────────────┘
```

## Testing Tools

| Tool | Purpose |
|------|---------|
| Vitest | Unit testing |
| React Testing Library | Component testing |
| Playwright | E2E testing |
| MSW | API mocking |
| TypeScript | Type checking as testing |

## Unit Testing

### What to Test

- Utility functions
- Data transformations
- Business logic
- Custom hooks

### Example: Utility Function Test

```typescript
// lib/utils/formatDate.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('January 15, 2024')
  })

  it('handles invalid date', () => {
    expect(formatDate(null)).toBe('')
  })
})
```

### Example: Custom Hook Test

```typescript
// hooks/useToggle.test.ts
import { renderHook, act } from '@testing-library/react'
import { useToggle } from './useToggle'

describe('useToggle', () => {
  it('toggles state', () => {
    const { result } = renderHook(() => useToggle(false))

    expect(result.current[0]).toBe(false)

    act(() => {
      result.current[1]()
    })

    expect(result.current[0]).toBe(true)
  })
})
```

## Component Testing

### What to Test

- Component renders correctly
- User interactions work
- Conditional rendering
- Accessibility

### Example: UI Component Test

```typescript
// components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### Example: Section Component Test

```typescript
// components/sections/HeroSection.test.tsx
import { render, screen } from '@testing-library/react'
import { HeroSection } from './HeroSection'

const mockData = {
  _type: 'heroSectionType',
  title: { segments: [{ text: 'Welcome', type: 'normal' }] },
  subtitle: 'Get started today',
  buttons: [{ label: 'Learn More', linkType: 'external', externalUrl: '#' }],
}

describe('HeroSection', () => {
  it('renders title and subtitle', () => {
    render(<HeroSection {...mockData} />)

    expect(screen.getByText('Welcome')).toBeInTheDocument()
    expect(screen.getByText('Get started today')).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<HeroSection {...mockData} />)

    expect(screen.getByRole('link', { name: /learn more/i })).toBeInTheDocument()
  })
})
```

## Integration Testing

### What to Test

- Page rendering with data
- Navigation flows
- Data fetching
- Component interactions

### Example: Page Integration Test

```typescript
// app/[slug]/page.test.tsx
import { render, screen } from '@testing-library/react'
import { server } from '@/mocks/server'
import { rest } from 'msw'
import Page from './page'

describe('Dynamic Page', () => {
  it('renders page with sections', async () => {
    // Mock Sanity response
    server.use(
      rest.get('https://90a20xmm.api.sanity.io/*', (req, res, ctx) => {
        return res(ctx.json({
          title: 'About Us',
          sections: [
            { _type: 'heroSectionType', title: { segments: [{ text: 'About', type: 'normal' }] } }
          ]
        }))
      })
    )

    render(await Page({ params: { slug: 'about' } }))

    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('shows 404 for non-existent page', async () => {
    server.use(
      rest.get('https://90a20xmm.api.sanity.io/*', (req, res, ctx) => {
        return res(ctx.json(null))
      })
    )

    await expect(Page({ params: { slug: 'not-found' } }))
      .rejects.toThrow() // notFound() throws
  })
})
```

## E2E Testing

### What to Test

- Critical user journeys
- Cross-page navigation
- Form submissions
- External integrations

### Example: Playwright E2E Test

```typescript
// e2e/navigation.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('can navigate from home to about page', async ({ page }) => {
    await page.goto('/')

    await page.click('text=About')

    await expect(page).toHaveURL('/about')
    await expect(page.locator('h1')).toContainText('About')
  })

  test('mobile menu works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Open mobile menu
    await page.click('[aria-label="Open menu"]')

    // Navigate
    await page.click('text=About')

    await expect(page).toHaveURL('/about')
  })
})
```

### Visual Regression Testing

```typescript
// e2e/visual.spec.ts
import { test, expect } from '@playwright/test'

test('homepage visual regression', async ({ page }) => {
  await page.goto('/')

  // Wait for content to load
  await page.waitForSelector('[data-testid="hero-section"]')

  // Take screenshot
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  })
})
```

## Accessibility Testing

### Automated Accessibility Tests

```typescript
// Using @axe-core/playwright
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('homepage has no accessibility violations', async ({ page }) => {
    await page.goto('/')

    const results = await new AxeBuilder({ page }).analyze()

    expect(results.violations).toEqual([])
  })
})
```

### Manual Accessibility Checklist

- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] Screen reader announces content correctly
- [ ] Form inputs have labels
- [ ] Error messages are associated with inputs

## Testing Sanity Content

### Schema Validation

```typescript
// sanity/schemas/__tests__/heroSectionType.test.ts
import { validateDocument } from '@sanity/validation'
import { heroSectionType } from '../heroSectionType'

describe('heroSectionType schema', () => {
  it('requires title field', async () => {
    const doc = { _type: 'heroSectionType' }
    const result = await validateDocument(doc, heroSectionType)

    expect(result.some(r => r.path.includes('title') && r.level === 'error')).toBe(true)
  })
})
```

### Content Mocking

```typescript
// mocks/content.ts
export const mockHeroSection = {
  _type: 'heroSectionType',
  _key: 'hero-1',
  title: {
    segments: [
      { text: 'Welcome to ', type: 'normal' },
      { text: 'TryOnAR', type: 'highlight' },
    ],
  },
  subtitle: 'Experience virtual try-on',
  image: {
    asset: { url: 'https://cdn.sanity.io/images/test.jpg' },
    alt: 'Hero image',
  },
  buttons: [
    { label: 'Get Started', linkType: 'external', externalUrl: '/signup' },
  ],
}
```

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install

      - name: Type Check
        run: pnpm type-check

      - name: Unit & Integration Tests
        run: pnpm test

      - name: E2E Tests
        run: pnpm test:e2e

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://staging.example.com/
            https://staging.example.com/about
          budgetPath: ./lighthouse-budget.json
```

## Test Coverage Goals

| Category | Target Coverage |
|----------|-----------------|
| Utilities | 90%+ |
| UI Components | 80%+ |
| Sections | 70%+ |
| Pages | 60%+ |
| E2E Critical Paths | 100% |

## Testing Checklist

### Before PR

- [ ] All tests pass
- [ ] New code has tests
- [ ] No accessibility violations
- [ ] Visual regression approved (if applicable)

### Before Release

- [ ] Full test suite passes
- [ ] E2E tests pass on staging
- [ ] Performance budget met
- [ ] Accessibility audit passed

## Related Documentation

- [Best Practices](./best-practices.md)
- [Deployment Process](./deployment-process.md)
- [Contribution Guidelines](./contribution-guidelines.md)
